


const advertisementTableName = process.env.API_STOLENCYCLES_ADVERTISEMENTTABLE_NAME
const matchTableName = process.env.API_STOLENCYCLES_MATCHTABLE_NAME
const sellerTableName = process.env.API_STOLENCYCLES_SELLERTABLE_NAME
const theftTableName = process.env.API_STOLENCYCLES_THEFTTABLE_NAME

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = { advertisementTableName, matchTableName, sellerTableName, theftTableName, docClient }