const AdvertisementDao = require('./AdvertisementDao')
const TheftDao = require('./TheftDao')
const { AdvertisementStatus, TheftStatus, MatchStatus } = require('../models');
const GRAPHQL_ENDPOINT = process.env.API_STOLENCYCLES_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_STOLENCYCLES_GRAPHQLAPIKEYOUTPUT;

const fetch = require('node-fetch-commonjs');
const { createMatch } = require('../graphql/mutations');
const { docClient, matchTableName, theftTableName } = require('./Tables')
const DEBUG = false

async function remove(item) {
    const putItemParams = {
        TableName: matchTableName,
        Key: {
            id: item.id
        }
    }
    await docClient.delete(putItemParams).promise()
    return true
}

async function insert(item) {
    const variables = { input: item }
    const options = {
        method: 'POST',
        headers: {
            'x-api-key': GRAPHQL_API_KEY
        },
        body: JSON.stringify({ query: createMatch, variables })
    };
    const request = new fetch.Request(GRAPHQL_ENDPOINT, options);
    const response = await fetch(request);
    const body = await response.json();
    return body.data.createMatch
}

async function update(item) {
    const putItemParams = {
        TableName: matchTableName,
        Item: removeBlanks(item)
    }
    const response = await docClient.put(putItemParams).promise()
    return item
}

async function listAll(config) {
    config = config || {}
    const defaults = {
        Limit: 10,
        LastEvaluatedKey: null,
        status: MatchStatus.UNREVIEWED,
        expandItems: true
    }
    config = { ...defaults, ...config }
    const { LastEvaluatedKey, Limit } = config
    let query = {
        TableName: matchTableName,
        Limit: Limit
    }
    if (LastEvaluatedKey) query.ExclusiveStartKey = LastEvaluatedKey

    const response = await docClient.scan(query).promise()

    const expandedMatches = await Promise.all(response.Items.map(async (item) => {
        if (config.expandItems) {
            return await expand(item)
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
async function expand(match) {
    try {
        const { advertisementId, theftId } = match
        const advertisement = await AdvertisementDao.get(advertisementId)
        const theft = await TheftDao.get(theftId)
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


/**  
 * Get advertisements that need to be checked
 * Could be smart and only get the ones that are active
 * and have a brand
 **/
async function getAdvertisements() {
    const config = {
        Limit: 1000,
        Status: AdvertisementStatus.REVIEWED
    }
    const response = await AdvertisementDao.listByStatus(config)
    return response.items
}
/**
 * 
 * @param {Theft} theft 
 * @returns List of advertisements that might be matches.
 */
async function getPossibleAdvertisements(theft) {
    const statuses = [AdvertisementStatus.REVIEWED, AdvertisementStatus.FLAGGED]
    const brand = theft.brand
    const colors = [theft.color] // perhaps include similar colors

    let possibleAdvertisements = []
    for (const color of colors) {
        const { Items } = await AdvertisementDao.listByBrandColor({ Limit: 0, Brand: brand, Color: color })
        const ads = Items.filter(ad => statuses.includes(ad.status))
        possibleAdvertisements = possibleAdvertisements.concat(ads)
    }

    return possibleAdvertisements
}

/**
 * 
 * @param {Advertisement} advertisement 
 * @returns List of thefts that might be matches.
 */
async function getPossibleThefts(advertisement) {
    const statuses = [TheftStatus.REVIEWED]
    const brand = advertisement.brand
    const colors = [advertisement.color] // perhaps include similar colors

    let possibleThefts = []
    for (const color of colors) {
        const { Items } = await TheftDao.listByBrandColor({ Limit: 0, Brand: brand, Color: color })
        const thefts = Items.filter(theft => statuses.includes(theft.status))
        possibleThefts = possibleThefts.concat(thefts)
    }

    return possibleThefts
}
/**  
* Get thefts that need to be checked
* Could be smart and get the ones that are active
* and have a brand
**/
async function getThefts() {
    const start = new Date()
    const queryParams = {
        TableName: theftTableName
    }
    const response = await docClient.scan(queryParams).promise()
    const stop = new Date()
    console.log('MatchDao.getThefts returned ' + (response.Items.length) + ' in ' + (stop - start) + ' ms')
    return response.Items
}

async function get(matchId) {
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
    const response = await docClient.query(queryParams).promise()

    if (response.Items.length == 1) {
        return response.Items[0]
    } else {
        return null
    }
}

async function getByAdvertisementIdTheftId(advertisementId, theftId) {
    const queryParams = {
        TableName: matchTableName,
        IndexName: 'byAdvertisementIndex',
        KeyConditionExpression: "advertisementId = :advertisementId and theftId = :theftId",

        ExpressionAttributeValues: {
            ":advertisementId": advertisementId,
            ":theftId": theftId,
        }
    }
    const response = await docClient.query(queryParams).promise()
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
function compareModels(x, y) {
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
function stringSimilarity(x, y) {
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
function splitModel(model) {
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
function similarity(advertisement, theft) {
    const advertisementDate = Date.parse(advertisement.postDate)
    const theftDate = Date.parse(theft.postDate)
    const elapsedDays = (advertisementDate - theftDate) / (1000 * 60 * 60 * 24)
    // Adverstisement must appear after a week before the theft
    // This provides a buffer of a week for a theft to get reported.
    const minElapsedDays = -7
    if (elapsedDays > minElapsedDays) {
        const brandSimilarity = stringSimilarity(advertisement.brand, theft.brand)
        const colorSimilarity = stringSimilarity(advertisement.color, theft.color)

        const adModel = splitModel(advertisement.modelName)
        const theftModel = splitModel(theft.modelName)
        const comparisons = [
            brandSimilarity,
            colorSimilarity,
            stringSimilarity(adModel.modelSeries, theftModel.modelSeries),
            stringSimilarity(adModel.modelNumber, theftModel.modelNumber),
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

async function checkAdvertisements() {
    const advertisements = await getAdvertisements()
    return await Promise.all(advertisements.map(async advertisement => {
        return await checkAdvertisement(advertisement)
    }))
}

async function checkThefts() {
    const thefts = await getThefts()
    return await Promise.all(thefts.map(async theft => {
        return await checkTheft(theft)
    }))
}

/**
 * Delete all matches with a given theftId
 * @param {*} theftId 
 */
async function deleteByTheftId(theftId) {
    const query = {
        TableName: matchTableName,
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
    const response = await docClient.query(query).promise()
    await Promise.all(response.Items.map(async match => {
        await remove(match)
    }))
}
/**
 * Delete all matches with a given advertisementId
 * @param {*} theftId 
 */
async function deleteByAdvertisementId(advertisementId) {
    const query = {
        TableName: matchTableName,
        IndexName: 'byAdvertisementIndex',
        KeyConditionExpression: 'advertisementId = :advertisementId',
        ExpressionAttributeValues: {
            ':advertisementId': advertisementId
        },
        ScanIndexForward: true
    }
    const response = await docClient.query(query).promise()
    await Promise.all(response.Items.map(async match => {
        await remove(match)
    }))
}

async function getByAdvertisementId(advertisementId) {
    const query = {
        TableName: matchTableName,
        IndexName: 'byAdvertisementIndex',
        KeyConditionExpression: 'advertisementId = :advertisementId',
        ExpressionAttributeValues: {
            ':advertisementId': advertisementId
        },
        ScanIndexForward: true
    }
    const response = await docClient.query(query).promise()
    return response
}

/**
 * When a theft has been updated,
 * create or delete corresponding matches
 * @param {*} theft 
 */
async function checkTheft(theft) {
    const newMatches = []
    if (!theft) return newMatches
    if (theft.status === TheftStatus.RECOVERED) {
        console.log("Deleting matches for recovered theft " + theft.id)
        await deleteByTheftId(theft.id)
        return newMatches
    } else if (theft.brand) {
        const advertisements = await getPossibleAdvertisements(theft)
        const now = new Date().toISOString()
        if (DEBUG) console.log('Checking ' + theft.id + ' against ' + advertisements.length + ' advertisements')
        await Promise.all(advertisements.map(async advertisement => {
            const similarity = similarity(advertisement, theft)

            if (DEBUG) console.log('ad:' + advertisement.id +
                " " + advertisement.brand +
                "/" + advertisement.color +
                '  theft:' + theft.id +
                " " + theft.brand +
                "/" + theft.color +
                ' similarity:' + similarity)

            const existing = await getByAdvertisementIdTheftId(
                advertisement.id,
                theft.id
            )
            if (similarity > 0) {
                if (!existing) {
                    const newMatch = {
                        advertisementId: advertisement.id,
                        theftId: theft.id,
                        // postDate: now,
                        status: MatchStatus.UNREVIEWED,
                        //similarity: similarity
                    }
                    console.log("Inserting match between " +
                        advertisement.id + ':' + advertisement.brand + ':' + advertisement.color + ':' + advertisement.model + ' and ' +
                        theft.id + ':' + theft.brand + ':' + theft.color + ':' + theft.model
                    )

                    await insert(newMatch)
                    newMatches.push(newMatch)
                }
            } else {
                // No longer a potential match
                if (existing) await remove(existing)
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
async function checkAdvertisement(advertisement) {
    let newMatches = []
    if (!advertisement) return newMatches
    if (advertisement.status == AdvertisementStatus.JUNK ||
        advertisement.status == AdvertisementStatus.SOLD
    ) {
        console.log("Deleting matches for advertisement with status " + advertisement.status)
        await deleteByAdvertisementId(advertisement.id)
        return newMatches
    } else if (advertisement.brand) {

        const thefts = await getPossibleThefts(advertisement)
        const now = new Date().toISOString()
        if (DEBUG) console.log('Checking ' + advertisement.id + ' against ' + thefts.length + ' thefts')
        await Promise.all(thefts.map(async theft => {
            const similarity = similarity(advertisement, theft)
            if (DEBUG) console.log('Checking ad ' + advertisement.id + ':' + advertisement.brand
                + ' and theft '
                + theft.id + ':' + theft.brand +
                ' similarity:' + similarity)
            const existing = await getByAdvertisementIdTheftId(
                advertisement.id,
                theft.id
            )
            if (similarity > 0) {
                if (!existing) {

                    const newMatch = {
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

                    await insert(newMatch)
                    newMatches.push(newMatch)
                }
            } else {
                // No longer a potential match
                if (existing) await remove(existing)
            }
        }))
    }
    return newMatches
}


module.exports = { checkAdvertisement, checkTheft }