const API = require("./API")
const { createTheft, updateTheft } = require('../graphql/mutations');
const { theftsByBrandColor } = require('../graphql/queries')
const { docClient, theftTableName } = require("./Tables");
const { JS } = require('@aws-amplify/core');

function coreProperties(theft) {
  let {
    createdAt,
    updatedAt,
    _lastChangedAt,
    _deleted,
    __typename,
    'postDate#id': postDateId,
    matches,
    ...rest
  } = theft
  return rest
}

async function get(id) {
  console.log('getTheft ' + id)
  const queryParams = {
    TableName: theftTableName,
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames: {
      "#id": "id"
    },
    ExpressionAttributeValues: {
      ":id": id
    }
  }
  const response = await docClient.query(queryParams).promise()
  return response.Items[0]
}

async function list(currentToken, limit) {
  console.log('scan ' + currentToken)
  let queryParams = {
    TableName: theftTableName,
    Limit: limit,
    ExclusiveStartKey: currentToken
  }
  const response = await docClient.scan(queryParams).promise()
  return { items: response.Items, nextToken: response.LastEvaluatedKey }
}

async function update(theft) {

  const response = await API.graphql({
    query: updateTheft,
    variables: {
      input: coreProperties(theft),
    },
  });
  const {
    data: { updateTheft: item },
  } = response
  console.log(`Updated ${theft.id}`)
  return item
}

async function insert(theft) {
  const {
    data: { createTheft: item },
  } = await API.graphql({
    query: createTheft,
    variables: {
      input: coreProperties(theft),
    },
  });
  console.log(`Inserted ${theft.id}`)
  return item
}

function merge(theft, existing) {
  // Properties that we are willing to update
  const { title, description, images } = theft
  return { ...existing, title, description, images }
}

async function upsert(theft) {
  const existing = await get(theft.id)
  if (existing) {
    const merged = merge(theft, existing)
    await update(merged)
  } else {
    await insert(theft)
  }
}

async function listByBrandColor(brand, color, currentToken, limit = 1) {
  const response = await API.graphql({
    query: theftsByBrandColor,
    variables: {
      brand: brand,
      color: { eq: color },
      limit: limit,
      nextToken: currentToken,
    },
  });
  const {
    data: {
      theftsByBrandColor: { items, nextToken },
    },
  } = response
  console.log(`listByBrandColor(${brand},${color},${currentToken}, ${limit}): ${items.length}`)
  return { items, nextToken }
}

module.exports = { get, update, upsert, insert, list, listByBrandColor }