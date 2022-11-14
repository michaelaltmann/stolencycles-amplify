const API = require('./API');
const { createAdvertisement, updateAdvertisement } = require('../graphql/mutations')
const { advertisementsByStatusPostDateId, listAdvertisements } = require("../graphql/queries")
const { AdvertisementStatus } = require('../models')
const { docClient, advertisementTableName } = require("./Tables");

/**
 * 
 * @param {Advertisement} advertisement 
 * @returns Object with just the properties that can be mutated
 */
function coreProperties(advertisement) {
  let {
    createdAt,
    updatedAt,
    _lastChangedAt,
    _deleted,
    seller,
    matches,
    ...rest
  } = advertisement
  return rest
}

async function get(id) {
  console.log('getAdvertisement ' + id)
  const queryParams = {
    TableName: advertisementTableName,
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


async function create(advertisement) {
  console.log(`AdvertisementRepository.create ${JSON.stringify(advertisement)}`)
  const {
    data: { createAdvertisement: item },
  } = await API.graphql({
    query: createAdvertisement,
    variables: {
      input: coreProperties(advertisement),
    },
  });
  await updateMatches(advertisement)
  await cleanupStorage(advertisement)
  return item
}
async function update(advertisement) {
  console.log(`AdvertisementRepository.update ${JSON.stringify(advertisement)}`)
  const {
    data: { updateAdvertisement: item },
  } = await API.graphql({
    query: updateAdvertisement,
    variables: {
      input: coreProperties(advertisement),
    },
  });
  await updateMatches(advertisement)
  await cleanupStorage(advertisement)
  return item
}

async function cleanupStorage(advertisement) {
  if (advertisement.status === AdvertisementStatus.SOLD) {
    // Remove S3 storage
  }
}
async function updateMatches(advertisement) {

}
async function list(currentToken, limit = 1) {
  const {
    data: {
      listAdvertisements: { items, nextToken },
    },
  } = await API.graphql({
    query: listAdvertisements,
    variables: {
      limit: limit,
      nextToken: currentToken,
      sortDirection: "DESC"
    },
  });
  return { items, nextToken }
}

async function listByStatus(status, currentToken, limit = 1) {
  const {
    data: {
      advertisementsByStatusPostDateId: { items, nextToken },
    },
  } = await API.graphql({
    query: advertisementsByStatusPostDateId,
    variables: {
      status: status,
      limit: limit,
      nextToken: currentToken,
      sortDirection: "DESC"
    },
  });
  console.log(`listByStatus(${status}) found ${items.length}`)
  return { items, nextToken }
}

function mergeStatus(status, existingStatus) {
  if (status != AdvertisementStatus.UNREVIEWED) {
    return status
  } else {
    return existingStatus
  }
}

function merge(advertisement, existing) {
  // Properties that we are willing to update from a fresh scrape
  const { title, description, images, price } = advertisement
  return {
    ...existing,
    title,
    description,
    images,
    price,
    status: mergeStatus(advertisement.status, existing.status)
  }
}

async function upsert(advertisement) {
  const existing = await get(advertisement.id)
  if (existing) {
    const merged = merge(advertisement, existing)
    await update(merged)
  } else {
    await create(advertisement)
  }
  return advertisement
}

module.exports = { get, create, update, list, upsert, listByStatus }