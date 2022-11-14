const API = require("./API")
const { createTheft, updateTheft } = require('../graphql/mutations');
const { docClient, theftTableName } = require("./Tables")

function coreProperties(theft) {
  let {
    createdAt,
    updatedAt,
    _lastChangedAt,
    _deleted,
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

async function update(theft) {
  const {
    data: { updateTheft: item },
  } = await API.graphql({
    query: updateTheft,
    variables: {
      input: coreProperties(theft),
    },
  });
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

module.exports = { get, update, upsert, insert }