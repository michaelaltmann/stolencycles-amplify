const AdvertisementDao = require('./AdvertisementDao')
const TheftDao = require('./TheftDao')
const { v4: UUID } = require('uuid');
const { AdvertisementStatus, TheftStatus, MatchStatus } = require('./models');
let tableName = "Match-tf5zgdee2fbdbjaop2f5bq4ffm";
if (process.env.ENV && process.env.ENV !== "NONE") {
    tableName = tableName + '-' + process.env.ENV;
}
let theftTableName = "Theft-tf5zgdee2fbdbjaop2f5bq4ffm";
if (process.env.ENV && process.env.ENV !== "NONE") {
    theftTableName = theftTableName + '-' + process.env.ENV;
}

let advertisementTableName = "Advertisement-tf5zgdee2fbdbjaop2f5bq4ffm";
if (process.env.ENV && process.env.ENV !== "NONE") {
    advertisementTableName = advertisementTableName + '-' + process.env.ENV;
}

const advertisementDao = new AdvertisementDao()
const theftDao = new TheftDao()

/**
 * id
 * sortOrder
 * status: NeedsReview, ...
 * advertisementId
 * theftId
 */

class MatchDao {
    constructor(AWS) {
        if (!AWS) AWS = require('aws-sdk')
        this.dynamodb = new AWS.DynamoDB();
        this.docClient = new AWS.DynamoDB.DocumentClient();
        this.DEBUG = false
    }

    removeBlanks(x) {
        let obj = {}
        for (var propName in x) {
            const val = x[propName]
            if (val !== null && val !== "" && val !== undefined) {
                obj[propName] = x[propName];
            }
        }
        return obj
    }
    async truncate() {
        let queryParams = {
            TableName: tableName
        }
        const dbResponse = await this.docClient.scan(queryParams).promise()
        const items = dbResponse.Items
        await Promise.all(items.map(async (item) => {
            await this.delete(item)
        }))
        return items.length
    }

    async delete(item) {
        const putItemParams = {
            TableName: tableName,
            Key: {
                id: item.id
            }
        }
        const response = await this.docClient.delete(putItemParams).promise()
        console.log("Deleted Match " + JSON.stringify(item))
        return true
    }

    async insert(item) {
        if (!item.sortOrder) item.sortOrder = "" + item.postDate + "/" + item.id
        if (!item.id) { item.id = UUID() }
        const putItemParams = {
            TableName: tableName,
            Item: this.removeBlanks(item)
        }
        const response = await this.docClient.put(putItemParams).promise()
        return item
    }

    async update(item) {
        const putItemParams = {
            TableName: tableName,
            Item: this.removeBlanks(item)
        }
        const response = await this.docClient.put(putItemParams).promise()
        return item
    }

    async upsert(item, defaults) {
        const existing = await this.findByPlatformId(item.platformName, item.platformId)
        if (existing) {
            delete item.id
            delete item.postDate
            delete item.sortOrder
            const updatedItem = { ...existing, ...item }
            if (existing == updatedItem) {
                console.log("Nothing new to upsert")
                return { item: existing, status: 'Read' }
            } else {
                const now = new Date().toISOString()
                console.log("Updating " + JSON.stringify(item))
                const updated = await this.update({ ...defaults, ...updatedItem, scrapeDate: now })
                return { item: updated, status: 'Updated' }
            }
        } else {
            const now = new Date().toISOString()
            const newItem = { ...defaults, ...item, scrapeDate: now, id: UUID() }
            console.log("Inserting " + JSON.stringify(newItem))
            const created = await this.insert(newItem)
            return { item: created, status: 'Created' }

        }
    }

    async listAll(config) {
        config = config || {}
        const defaults = {
            Limit: 10,
            LastEvaluatedKey: null,
            status: 'NeedsReview',
            expandItems: true
        }
        config = { ...defaults, ...config }
        const { LastEvaluatedKey, Limit } = config
        let query = {
            TableName: tableName,
            Limit: Limit
        }
        if (LastEvaluatedKey) query.ExclusiveStartKey = LastEvaluatedKey

        const response = await this.docClient.scan(query).promise()

        const expandedMatches = await Promise.all(response.Items.map(async (item) => {
            if (config.expandItems) {
                return await this.expand(item)
            } else {
                return item
            }
        })
        )
        return { ...response, Items: expandedMatches }
    }

    /**
     * Given a Match object, fetch and include
     * the advertisement and theft objects to
     * which it points.
     * @param {*} match 
     */
    async expand(match) {
        try {
            const { advertisementId, theftId } = match
            const advertisement = await advertisementDao.get(advertisementId)
            const theft = await theftDao.get(theftId)
            const expanded = {
                ...match,
                advertisement: advertisement,
                theft: theft
            }
            return expanded
        } catch (e) {
            console.log("ERROR ")
            console.log(e)
            return match
        }
    }

    async listByStatus(config) {
        config = config || {}
        const defaults = {
            Limit: 1,
            LastEvaluatedKey: null,
            status: 'NeedsReview'
        }
        config = { ...defaults, ...config }
        const { status, LastEvaluatedKey, Limit } = config
        let query = {
            TableName: tableName,
            Limit: Limit,
            IndexName: 'status-sortOrder-index',
            KeyConditionExpression: '#status = :status',
            ExpressionAttributeNames: {
                "#status": "status"
            },
            ExpressionAttributeValues: {
                ':status': status
            },
            ScanIndexForward: false
        }
        if (LastEvaluatedKey) query.ExclusiveStartKey = LastEvaluatedKey
        const response = await this.docClient.query(query).promise()
        console.log("MatchDao.listByStatus returned " + response.Items.length)
        const expandedMatches = await Promise.all(response.Items.map(async (item) => {
            return await this.expand(item)
        })
        )
        return { ...response, Items: expandedMatches }
    }

    /**  
     * Get advertisements that need to be checked
     * Could be smart and only get the ones that are active
     * and have a brand
     **/
    async getAdvertisements() {
        const config = {
            Limit: 1000,
            Status: AdvertisementStatus.REVIEWED
        }
        const response = await advertisementDao.listByStatus(config)
        return response.Items
    }

    async getPossibleAdvertisements(theft) {
        const statuses = [AdvertisementStatus.REVIEWED, AdvertisementStatus.REVIEWED]
        const brand = theft.brand
        const colors = [theft.color] // perhaps include similar colors

        let possibleAdvertisements = []
        for (const status of statuses) {
            for (const color of colors) {
                const ads = AdvertisementDao.listByStatusBrandColor(status, brand, color)
                possibleAdvertisements = possibleAdvertisements.concat(ads)
            }
        }
        return possibleAdvertisements
    }
    async getPossibleThefts(advertisement) {
        const statuses = [TheftStatus.REVIEWED]
        const brand = advertisement.brand
        const colors = [advertisement.color] // perhaps include similar colors

        let possibleThefts = []
        for (const status of statuses) {
            for (const color of colors) {
                const thefts = TheftDao.listByStatusBrandColor(status, brand, color)
                possibleThefts = possibleThefts.concat(thefts)
            }
        }
        return possibleThefts
    }
    /**  
   * Get thefts that need to be checked
   * Could be smart and get the ones that are active
   * and have a brand
   **/
    async getThefts() {
        const start = new Date()
        const queryParams = {
            TableName: theftTableName
        }
        const response = await this.docClient.scan(queryParams).promise()
        const stop = new Date()
        console.log('MatchDao.getThefts returned ' + (response.Items.length) + ' in ' + (stop - start) + ' ms')
        return response.Items
    }

    async get(matchId) {
        const queryParams = {
            TableName: 'Match',
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeNames: {
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": matchId
            }
        }
        const response = await this.docClient.query(queryParams).promise()

        if (response.Items.length == 1) {
            return response.Items[0]
        } else {
            return null
        }
    }

    async getByAdvertisementIdTheftId(advertisementId, theftId) {
        const queryParams = {
            TableName: tableName,
            IndexName: 'byAdvertisementIndex',
            KeyConditionExpression: "advertisementId = :advertisementId and theftId = :theftId",

            ExpressionAttributeValues: {
                ":advertisementId": advertisementId,
                ":theftId": theftId,
            }
        }
        const response = await this.docClient.query(queryParams).promise()
        if (response.Items.length == 1) {
            return response.Items[0]
        } else {
            return null
        }
    }

    /**
     * Return -1 if x or y are specified and they disagree
     * 0 if neither are specifed
     * 1 if they are both specified and match
     * @param {*} x 
     * @param {*} y 
     */
    compareModels(x, y) {
        if (x.modelSeries || x.modelNumber) {
            if (y.modelSeries || y.modelNumber) {
                if (x.toLowerCase() == y.toLowerCase()) return 1
                else return -1
            } else {
                return -1
            }
        } else {
            if (y) return -1
            else return 0
        }
    }
    stringSimilarity(x, y) {
        if (x) {
            if (y) {
                if (x.toLowerCase() == y.toLowerCase()) return 1
                else return -1
            } else {
                return -1
            }
        } else {
            if (y) return -1
            else return 0
        }
    }

    /*
        Generate a standardized version of the model.  All of these
         FX 7.3
        FX73
        73FX
        are coverted to
        {
            modelSeries = "fx",
            modelNumber = "73"
        }

    */
    splitModel(model) {
        model = model || ''
        // Ignore . in model because FX 7.3 might match FX 73 
        model = model.toLowerCase()
        model = model.replace(".", "")
        const alphaMatches = model.match(/[a-z]+/) || ['']
        const numericMatches = model.match(/\d+/) || ['']
        const modelSeries = alphaMatches[0]
        const modelNumber = numericMatches[0]

        return {
            modelSeries: modelSeries,
            modelNumber: modelNumber
        }
    }
    /**
     * Return -1 if brands, color, modelSeries or modelNumber mismatch 
     * Return 0 if nothing matches but nothing mismatches
     * Return 1 there are no mismatches and at least match
     * @param {*} advertisement 
     * @param {*} theft 
     */
    similarity(advertisement, theft) {
        const advertisementDate = Date.parse(advertisement.postDate)
        const theftDate = Date.parse(theft.postDate)
        const elapsedDays = (advertisementDate - theftDate) / (1000 * 60 * 60 * 24)
        // Adverstisement must appear after a week before the theft
        // This provides a buffer of a week for a theft to get reported.
        const minElapsedDays = -7
        if (elapsedDays > minElapsedDays) {
            const brandSimilarity = this.stringSimilarity(advertisement.brand, theft.brand)
            const colorSimilarity = this.stringSimilarity(advertisement.color, theft.color)

            const adModel = this.splitModel(advertisement.modelName)
            const theftModel = this.splitModel(theft.modelName)
            const comparisons = [
                brandSimilarity,
                colorSimilarity,
                this.stringSimilarity(adModel.modelSeries, theftModel.modelSeries),
                this.stringSimilarity(adModel.modelNumber, theftModel.modelNumber),
            ]
            const matches = comparisons.filter((x) => { return x > 0 }).length
            const mismatches = comparisons.filter((x) => { return x < 0 }).length
            if (mismatches > 0) {
                return -1
            } else {
                if (matches > 0) {
                    return 1
                } else {
                    return 0
                }
            }

        } else {
            return -1
        }
    }

    async checkAll() {
        const advertisements = await this.getAdvertisements()
        return await Promise.all(advertisements.map(async advertisement => {
            await this.checkAdvertisement(advertisement)
        }))
    }

    /**
     * Delete all matches with a given theftId
     * @param {*} theftId 
     */
    async deleteByTheftId(theftId) {
        const query = {
            TableName: tableName,
            IndexName: 'byTheftIndex',
            KeyConditionExpression: '#theftId = :theftId',
            ExpressionAttributeNames: {
                "#theftId": "theftId"
            },
            ExpressionAttributeValues: {
                ':theftId': theftId
            },
            ScanIndexForward: true
        }
        const response = await this.docClient.query(query).promise()
        await Promise.all(response.Items.map(async match => {
            await this.delete(match)
        }))
    }
    /**
     * Delete all matches with a given advertisementId
     * @param {*} theftId 
     */
    async deleteByAdvertisementId(advertisementId) {
        const query = {
            TableName: tableName,
            IndexName: 'byAdvertisementIndex',
            KeyConditionExpression: 'advertisementId = :advertisementId',
            ExpressionAttributeValues: {
                ':advertisementId': advertisementId
            },
            ScanIndexForward: true
        }
        const response = await this.docClient.query(query).promise()
        await Promise.all(response.Items.map(async match => {
            await this.delete(match)
        }))
    }

    async getByAdvertisementId(advertisementId) {
        const query = {
            TableName: tableName,
            IndexName: 'byAdvertisementIndex',
            KeyConditionExpression: 'advertisementId = :advertisementId',
            ExpressionAttributeValues: {
                ':advertisementId': advertisementId
            },
            ScanIndexForward: true
        }
        const response = await this.docClient.query(query).promise()
        return response
    }

    /**
     * When a theft has been updated,
     * create or delete corresponding matches
     * @param {*} theft 
     */
    async checkTheft(theft) {
        const newMatches = []
        if (!theft) return newMatches
        if (theft.status === TheftStatus.RECOVERED) {
            console.log("Deleting matches for recovered theft " + theft.id)
            await this.deleteByTheftId(theft.id)
            return newMatches
        } else if (theft.brand) {
            const advertisements = await this.getPossibleAdvertisements(theft)
            const now = new Date().toISOString()
            if (this.DEBUG) console.log('Checking ' + theft.id + ' against ' + advertisements.length + ' advertisements')
            await Promise.all(advertisements.map(async advertisement => {
                const similarity = this.similarity(advertisement, theft)

                if (this.DEBUG) console.log('ad:' + advertisement.id +
                    " " + advertisement.brand +
                    "/" + advertisement.color +
                    '  theft:' + theft.id +
                    " " + theft.brand +
                    "/" + theft.color +
                    ' similarity:' + similarity)

                const existing = await this.getByAdvertisementIdTheftId(
                    advertisement.id,
                    theft.id
                )
                if (similarity > 0) {
                    if (!existing) {
                        const newMatch = {
                            id: UUID(),
                            advertisementId: advertisement.id,
                            theftId: theft.id,
                            // postDate: now,
                            status: MatchStatus.UNREVIEWED,
                            //similarity: similarity
                        }
                        console.log("Inserting " + newMatch.id + ' ' +
                            advertisement.id + ':' + advertisement.brand + ' ' +
                            theft.id + ':' + theft.brand
                        )

                        await this.insert(newMatch)
                        newMatches.push(newMatch)
                    }
                } else {
                    // No longer a potential match
                    if (existing) await this.delete(existing)
                }
            }))
        }
        return newMatches
    }

    /**
     * When an Advertisement has been updated,
     * create or delete corresponding matches
     * @param {*} advertisement 
     */
    async checkAdvertisement(advertisement) {
        const newMatches = []
        if (!advertisement) return newMatches
        if (advertisement.status == AdvertisementStatus.JUNK ||
            advertisement.status == AdvertisementStatus.SOLD
        ) {
            console.log("Deleting matches for advertisement with status " + advertisement.status)
            await this.deleteByAdvertisementId(advertisement.id)
            return newMatches
        } else if (advertisement.brand) {

            const thefts = await this.getPossibleThefts(advertisement)
            const now = new Date().toISOString()
            if (this.DEBUG) console.log('Checking ' + advertisement.id + ' against ' + thefts.length + ' thefts')
            await Promise.all(thefts.map(async theft => {
                const similarity = this.similarity(advertisement, theft)
                if (this.DEBUG) console.log('Checking ad ' + advertisement.id + ':' + advertisement.brand
                    + ' and theft '
                    + theft.id + ':' + theft.brand +
                    ' similarity:' + similarity)
                const existing = await this.getByAdvertisementIdTheftId(
                    advertisement.id,
                    theft.id
                )
                if (similarity > 0) {
                    if (!existing) {

                        const newMatch = {
                            id: UUID(),
                            advertisementId: advertisement.id,
                            theftId: theft.id,
                            //postDate: now,
                            status: MatchStatus.UNREVIEWED,
                            //similarity: similarity
                        }
                        console.log("Inserting " + newMatch.id + ' ' +
                            advertisement.id + ':' + advertisement.brand + ' ' +
                            theft.id + ':' + theft.brand
                        )

                        await this.insert(newMatch)
                        newMatches.push(newMatch)
                    }
                } else {
                    // No longer a potential match
                    if (existing) await this.delete(existing)
                }
            }))
        }
        return newMatches
    }
}

module.exports = MatchDao