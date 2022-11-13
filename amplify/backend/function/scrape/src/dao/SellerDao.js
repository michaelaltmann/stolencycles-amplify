const API = require("./API")
const { createSeller, updateSeller } = require('../graphql/mutations');
const { docClient, sellerTableName } = require("./Tables")

function packId(platformName, platformId) {
  return platformName + "#" + platformId
}

function unpackId(id) {
  return id.split("#")
}

function coreProperties(seller) {
  let {
    createdAt,
    updatedAt,
    _lastChangedAt,
    _deleted,
    ...rest
  } = seller
  return rest
}

async function get(id) {
  const queryParams = {
    TableName: sellerTableName,
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames: {
      "#id": "id"
    },
    ExpressionAttributeValues: {
      ":id": id
    }
  }
  const response = await docClient.query(queryParams).promise()
  const seller = response.Items[0]
  console.log('getSeller(' + id + ") " + seller)
  return seller
}

async function update(seller) {
  const {
    data: { updateSeller: item },
  } = await API.graphql({
    query: updateSeller,
    variables: {
      input: coreProperties(seller),
    },
  });
  console.log(`Updated ${seller.id}`)
  return item
}

async function insert(seller) {
  const {
    data: { createSeller: item },
  } = await API.graphql({
    query: createSeller,
    variables: {
      input: coreProperties(seller),
    },
  });
  console.log(`Inserted ${seller.id}`)
  return item
}

function merge(seller, existing) {
  // Properties that we are willing to update
  const { name } = seller
  return { ...existing, name }
}


async function upsert(seller) {
  const existing = await get(seller.id)
  if (existing) {
    const merged = merge(seller, existing)
    await update(merged)
  } else {
    await insert(seller)
  }
}

module.exports = { get, update, upsert, insert, packId, unpackId }