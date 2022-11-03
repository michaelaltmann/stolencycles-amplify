const deepIs = require('deep-is');
const { AdvertisementStatus } = require('./models');

let tableName = "Advertisement-tf5zgdee2fbdbjaop2f5bq4ffm";
if (process.env.ENV && process.env.ENV !== "NONE") {
    tableName = tableName + '-' + process.env.ENV;
}

/**
 * Status: NeedsReview, OtherStuff, Clean, Questionable, Dirty, Sold, Recovered
 */
class AdvertisementDao {
    constructor(AWS) {
        if (!AWS) AWS = require('aws-sdk')
        this.dynamodb = new AWS.DynamoDB();
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }


    async get(advertisementId) {
        console.log('getAdvertisement ' + advertisementId)
        const queryParams = {
            TableName: tableName,
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeNames: {
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": advertisementId
            }
        }
        const response = await this.docClient.query(queryParams).promise()
        return response.Items[0]
    }

    async findByPlatformId(platformName, platformId) {
        let queryParams = {
            TableName: tableName,
            IndexName: 'platformId-platformName-index',
            KeyConditionExpression: 'platformId = :platformId and platformName = :platformName',
            ExpressionAttributeValues: {
                ":platformName": platformName,
                ":platformId": platformId
            }
        }
        const dbResponse = await this.docClient.query(queryParams).promise()
        const items = dbResponse.Items
        return items
    }

    async listByAliasId(aliasId) {
        const queryParams = {
            TableName: tableName,
            IndexName: 'aliasId-sortOrder-index',
            KeyConditionExpression: 'aliasId = :aliasId ',
            ExpressionAttributeValues: {
                ":aliasId": aliasId
            }
        }
        const dbResponse = await this.docClient.query(queryParams).promise()
        const items = dbResponse.Items
        return items
    }

    removeBlanks(x) {
        if (x !== null && x !== undefined && typeof (x) === 'object' && !Array.isArray(x)) {
            let obj = {}
            for (var propName in x) {
                const val = this.removeBlanks(x[propName])
                if (val !== null && val !== "" && val !== undefined) {
                    //     console.log('Retaining property ' + propName + ':' + val + ':')
                    obj[propName] = val;
                } else {
                    //     console.log('Delete blank property ' + propName)
                }
            }
            return obj
        } else {
            return x
        }
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

    async purge(status, retentionDays, dryRun) {
        var maxDate = new Date()
        maxDate.setDate(maxDate.getDate() - retentionDays)
        const maxDateString = maxDate.toISOString()
        process.stdout.write(`Purging ads with status ${status} before ${maxDateString}\n`)
        var query = {
            TableName: tableName,
            IndexName: 'advertisementsByStatusPostDateId',
            KeyConditionExpression: '#status = :status',
            ExpressionAttributeNames: {
                "#status": "status"
            },
            ExpressionAttributeValues: {
                ':status': status
            },
            ScanIndexForward: true,
            ExclusiveStartKey: ExclusiveStartKey
        }

        var ExclusiveStartKey
        var purgeCount = 0
        do {
            query.ExclusiveStartKey = ExclusiveStartKey
            const response = await this.docClient.query(query).promise()
            process.stdout.write(`\nReceived ${response.Items.length}\n`)
            ExclusiveStartKey = response.LastEvaluatedKey
            response.Items.forEach(async item => {
                if (item['postDate#id'] < maxDateString) {
                    purgeCount = purgeCount + 1
                    process.stdout.write(`${item['postDate#id']} ${item.status}`)
                    if (!dryRun) {
                        const deleteItemParams = {
                            TableName: tableName,
                            Key: {
                                id: item.id
                            }
                        }
                        const response = await this.docClient.delete(deleteItemParams).promise()
                    }
                    process.stdout.write(".")
                } else {
                    /* quite early when we hit our cutoff date */
                    ExclusiveStartKey = null
                }
            });
        } while (ExclusiveStartKey)
        process.stdout.write(`\nPurged ${purgeCount}\n`)

        return purgeCount
    }

    async delete(item) {
        const deleteItemParams = {
            TableName: tableName,
            Key: {
                id: item.id
            }
        }
        const response = await this.docClient.delete(deleteItemParams).promise()
        return true
    }

    async insert(item) {
        if (!item.postDate) { item.postDate = new Date(Date.parse(dateText)).toISOString() }
        item.sortOrder = "" + item.postDate + "/" + item.id
        const cleaned = this.removeBlanks(item)
        const putItemParams = {
            TableName: tableName,
            Item: cleaned
        }
        const response = await this.docClient.put(putItemParams).promise()
        return cleaned
    }

    async update(item) {
        const cleaned = this.removeBlanks(item)
        const putItemParams = {
            TableName: tableName,
            Item: cleaned
        }
        const response = await this.docClient.put(putItemParams).promise()
        return cleaned
    }

    async updateStatus(advertisementId, newStatus) {
        const params = {
            TableName: tableName,
            Key: {
                id: advertisementId
            },
            UpdateExpression: "set #status = :s",
            ExpressionAttributeNames: {
                "#status": "status"
            },
            ExpressionAttributeValues: {
                ":s": newStatus
            },
            ReturnValues: "UPDATED_NEW"
        }
        const response = await this.docClient.update(params).promise()
        console.log(response)
    }

    /*
    Return a list of pairs {item: x, status: AStatus }
    */
    async upsert(item, defaults) {
        const existingList = await this.findByPlatformId(item.platformName, item.platformId)
        // Slight possibility that there are more than one 
        // ads with the same platformId
        if (existingList.length > 0) {
            const updatedItems = await Promise.all(existingList.map(async (existing) => {
                var item2 = this.removeBlanks(item)
                delete item2.id
                delete item2.postDate
                delete item2.sortOrder
                const updatedItem = { ...existing, ...item2 }

                if (deepIs(existing, updatedItem)) {
                    console.log("Nothing to change")
                    return Promise.resolve({ item: existing, status: 'Read' })
                } else {
                    console.log("Updating " + JSON.stringify(existing) + " to " + JSON.stringify(updatedItem))
                    const updated = await this.update({ ...defaults, ...updatedItem })
                    return Promise.resolve({ item: updated, status: 'Updated' })
                }
            }
            ))
            return updatedItems
        } else {
            const newItem = { ...defaults, ...item }
            console.log("Inserting " + JSON.stringify(newItem))
            const created = await this.insert(newItem)
            return Promise.resolve([{ item: created, status: 'Created' }])

        }
    }

    async listAll() {
        const query = {
            TableName: tableName
        }
        const response = await this.docClient.scan(query).promise()
        console.log("AdvertisementDao.listAll returned " + response.Items.length)
        return response
    }

    async listByStatus(config) {
        const start = new Date()
        config = config || {}
        const defaults = {
            Limit: 20,
            LastEvaluatedKey: null,
            Status: 'NeedsReview',
            Brand: null,
            ScanIndexForward: false,
            LastEvaluatedKey: null
        }
        config = { ...defaults, ...config }
        const { Brand, Status, LastEvaluatedKey: ExclusiveStartKey, Limit, ScanIndexForward } = config
        let query = {
            TableName: tableName,
            Limit: Limit,
            IndexName: 'advertisementsByStatusPostDateId',
            KeyConditionExpression: '#status = :status',
            ExpressionAttributeNames: {
                "#status": "status"
            },
            ExpressionAttributeValues: {
                ':status': Status
            },
            ScanIndexForward: ScanIndexForward,
            ExclusiveStartKey: ExclusiveStartKey
        }
        if (Brand) {
            query.ExpressionAttributeNames["#brand"] = "brand"
            query.FilterExpression = '#brand = :brand'
            query.ExpressionAttributeValues[':brand'] = Brand
        }
        const response = await this.docClient.query(query).promise()

        const stop = new Date()
        console.log('AdvertisementDao.listByStatus returned ' + (response.Items.length) + ' in ' + (stop - start) + ' ms')
        return response
    }

    async listByBrandColor(config) {
        const dynamoQueryLimit = 500;
        config = config || {}
        const defaults = {
            Limit: 20,
            LastEvaluatedKey: null,
            Brand: null,
            ScanIndexForward: false,
            Color: null
        }
        config = { ...defaults, ...config }
        var ExclusiveStartKey = config.LastEvaluatedKey
        const { Brand, Color, Limit, ScanIndexForward } = config
        var all = {
            LastEvaluatedKey: null,
            Items: []
        }
        const batchLimit = Limit > 0 ? Math.min(Limit, dynamoQueryLimit) : dynamoQueryLimit

        do {
            let query
            if (Color) {
                query = {
                    TableName: tableName,
                    Limit: batchLimit,
                    IndexName: 'advertisementsByBrandColor',
                    KeyConditionExpression: '#brand = :brand and #color = :color',
                    ExpressionAttributeNames: {
                        "#brand": "brand",
                        "#color": "color",

                    },
                    ExpressionAttributeValues: {
                        ':brand': Brand,
                        ':color': Color,
                    },
                    ScanIndexForward: ScanIndexForward,
                    ExclusiveStartKey: ExclusiveStartKey
                }
            } else {
                query = {
                    TableName: tableName,
                    Limit: batchLimit,
                    IndexName: 'theftsByBrandColor',
                    KeyConditionExpression: '#brand = :brand',
                    ExpressionAttributeNames: {
                        "#brand": "brand",

                    },
                    ExpressionAttributeValues: {
                        ':brand': Brand,
                    },
                    ScanIndexForward: ScanIndexForward,
                    ExclusiveStartKey: ExclusiveStartKey
                }
            }

            const response = await this.docClient.query(query).promise()
            console.log(`AdvertisementDao.listByBrandColor(${Brand},${Color}) returned ${response.Items.length}`)
            all.Items = all.Items.concat(response.Items)
            all.LastEvaluatedKey = response.LastEvaluatedKey
            ExclusiveStartKey = response.LastEvaluatedKey
        } while ((config.Limit == 0 || all.Items.length < Limit) && all.LastEvaluatedKey)
        return all
    }


    async listForReview() {
        return await this.listByStatus({ Status: AdvertisementStatus.UNREVIEWED, ScanIndexForward: false })
    }

    async setStatus(newStatus) {
        const query = {
            TableName: tableName
        }
        const response = await this.docClient.scan(query).promise()

        response.Items.forEach(async item => {
            if (!item.status) {
                process.stdout.write("updating " + item.id)
                item.status = newStatus
                delete item.needsReview
                const putItemParams = {
                    TableName: tableName,
                    Item: item
                }
                const response = await this.docClient.put(putItemParams).promise()
                process.stdout.write("." + item.id)
            }
        });
        process.stdout.write("done\n")
    }

    async setReviewed() {

        var ExclusiveStartKey
        do {
            const query = {
                TableName: tableName,
                ExclusiveStartKey: ExclusiveStartKey
            }
            const response = await this.docClient.scan(query).promise()
            process.stdout.write("\nReceived " + response.Items.length)
            ExclusiveStartKey = response.LastEvaluatedKey
            response.Items.forEach(async item => {
                if (item.status == AdvertisementStatus.UNREVIEWED && item.brand && item.color) {
                    process.stdout.write("updating " + item.id)
                    item.status = AdvertisementStatus.REVIEWED
                    delete item.needsReview
                    const putItemParams = {
                        TableName: tableName,
                        Item: item
                    }
                    const response = await this.docClient.put(putItemParams).promise()
                    process.stdout.write("." + item.id)
                }
            });
        } while (ExclusiveStartKey)
        process.stdout.write("done\n")
    }


    async setLocation(location) {
        const query = {
            TableName: tableName
        }
        const response = await this.docClient.scan(query).promise()

        response.Items.forEach(async item => {
            if (!item.location) {
                process.stdout.write("updating " + item.id)
                item.location = location
                const putItemParams = {
                    TableName: tableName,
                    Item: item
                }
                const response = await this.docClient.put(putItemParams).promise()
                process.stdout.write("." + item.id)
            }
        });
        process.stdout.write("done\n")
    }

    async fixImages() {
        var updateCount = 0
        var ExclusiveStartKey
        do {
            const query = {
                TableName: tableName,
                ExclusiveStartKey: ExclusiveStartKey
            }
            const response = await this.docClient.scan(query).promise()
            //    process.stdout.write("\nReceived " + response.Items.length)
            ExclusiveStartKey = response.LastEvaluatedKey
            response.Items.forEach(async item => {
                const { images } = item
                if (item.images && !Array.isArray(images)) {
                    const newImages = [images[0]]
                    console.log("Updating images to " + newImages)
                    item.images = newImages
                    const putItemParams = {
                        TableName: tableName,
                        Item: item
                    }
                    updateCount = updateCount + 1
                    const response = await this.docClient.put(putItemParams).promise()
                    process.stdout.write(".")
                }
            });
        } while (ExclusiveStartKey)
        process.stdout.write(`\nUpdated ${updateCount}\n`)
    }
}

module.exports = AdvertisementDao