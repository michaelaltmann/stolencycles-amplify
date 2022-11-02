const { v4: UUID } = require('uuid');
const deepIs = require('deep-is');
const { TheftStatus } = require('./models');
let tableName = "Theft-tf5zgdee2fbdbjaop2f5bq4ffm";
if (process.env.ENV && process.env.ENV !== "NONE") {
    tableName = tableName + '-' + process.env.ENV;
}
/**
 * id
 * ...
 */

class TheftDao {
    constructor(AWS) {
        if (!AWS) AWS = require('aws-sdk')
        this.dynamodb = new AWS.DynamoDB();
        this.docClient = new AWS.DynamoDB.DocumentClient();
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
    async get(theftId) {
        console.log('getTheft ' + theftId)
        const queryParams = {
            TableName: tableName,
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeNames: {
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": theftId
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
    async insert(item) {
        if (!item.id) { item.id = UUID() }
        item.sortOrder = "" + item.postDate + "/" + item.id
        const putItemParams = {
            TableName: tableName,
            Item: this.removeBlanks(item)
        }
        const response = await this.docClient.put(putItemParams).promise()
        return item
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

    async upsert(item) {
        const existingList = await this.findByPlatformId(item.platformName, item.platformId)
        // Slight possibility that there are more than one 
        // theft with the same platformId
        if (existingList.length > 0) {
            const updatedItems = await Promise.all(existingList.map(async (existing) => {
                var item2 = this.removeBlanks(item)
                // Properties that should not be take from new version 
                delete item2.id
                delete item2.postDate
                delete item2.sortOrder
                delete item2.status
                const updatedItem = { ...existing, ...item2 }

                if (deepIs(existing, updatedItem)) {
                    console.log("Nothing to change")
                    return Promise.resolve({ item: existing, status: 'Read' })
                } else {
                    console.log("Updating " + JSON.stringify(existing) + " to " + JSON.stringify(updatedItem))
                    const updated = await this.update(updatedItem)
                    return Promise.resolve({ item: updated, status: 'Updated' })
                }
            }
            ))
            return updatedItems
        } else {
            const created = await this.insert(item)
            return Promise.resolve([{ item: created, status: 'Created' }])
        }
    }

    async listByStatus(config) {
        const dynamoQueryLimit = 500;
        config = config || {}
        const defaults = {
            Limit: 1,
            LastEvaluatedKey: null,
            Status: TheftStatus.REVIEWED,
            ScanIndexForward: false,
        }
        config = { ...defaults, ...config }
        var ExclusiveStartKey = config.LastEvaluatedKey
        const { Brand, Status, Limit, ScanIndexForward } = config
        var all = {
            LastEvaluatedKey: null,
            Items: []
        }
        const batchLimit = Limit > 0 ? Math.min(Limit, dynamoQueryLimit) : dynamoQueryLimit

        do {
            let query = {
                TableName: tableName,
                Limit: batchLimit,
                IndexName: 'matchesByStatusAdvertisementId',
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

            const response = await this.docClient.query(query).promise()
            console.log("Query returned " + response.Items.length)
            all.Items = all.Items.concat(response.Items)
            all.LastEvaluatedKey = response.LastEvaluatedKey
            ExclusiveStartKey = response.LastEvaluatedKey
        } while ((config.Limit == 0 || all.Items.length < Limit) && all.LastEvaluatedKey)
        return all
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
        const { Brand, Limit, ScanIndexForward, Color } = config
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
                    IndexName: 'theftsByBrandColor',
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
            console.log("Query returned " + response.Items.length)
            all.Items = all.Items.concat(response.Items)
            all.LastEvaluatedKey = response.LastEvaluatedKey
            ExclusiveStartKey = response.LastEvaluatedKey
        } while ((config.Limit == 0 || all.Items.length < Limit) && all.LastEvaluatedKey)
        return all
    }

    async listAll(config) {
        const dynamoQueryLimit = 500;
        config = config || {}
        const defaults = {
            Limit: 1,
            LastEvaluatedKey: null
        }
        config = { ...defaults, ...config }
        var ExclusiveStartKey = config.LastEvaluatedKey

        const { Limit } = config
        var all = {
            LastEvaluatedKey: null,
            Items: []
        }
        const batchLimit = Limit > 0 ? Math.min(Limit, dynamoQueryLimit) : dynamoQueryLimit
        do {
            let query = {
                TableName: tableName,
                Limit: batchLimit,
                ExclusiveStartKey: ExclusiveStartKey
            }
            const response = await this.docClient.scan(query).promise()
            console.log("Query returned " + response.Items.length)
            all.Items = all.Items.concat(response.Items)
            all.LastEvaluatedKey = response.LastEvaluatedKey
            ExclusiveStartKey = response.LastEvaluatedKey
        } while ((config.Limit == 0 || all.Items.length < Limit) && all.LastEvaluatedKey)
        return all
    }

    /**
     * Backfill status to UNREVIEWED if it is null
     */
    async backfillStatus() {
        const query = {
            TableName: tableName
        }
        const response = await this.docClient.scan(query).promise()
        process.stdout.write("updating ")
        response.Items.forEach(async item => {
            const putItemParams = {
                TableName: tableName,
                Item: { status: TheftStatus.UNREVIEWED, ...item }
            }
            const response = await this.docClient.put(putItemParams).promise()
            process.stdout.write("." + item.id)
        });
        process.stdout.write("done\n")
    }

    async backfillSortOrder() {
        const query = {
            TableName: tableName
        }
        const response = await this.docClient.scan(query).promise()
        process.stdout.write("updating ")
        response.Items.forEach(async item => {
            const putItemParams = {
                TableName: tableName,
                Item: { ...item, sortOrder: "" + item.postDate + "#" + item.id }
            }
            const response = await this.docClient.put(putItemParams).promise()
            process.stdout.write("." + item.id)
        });
        process.stdout.write("done\n")
    }
}

module.exports = TheftDao