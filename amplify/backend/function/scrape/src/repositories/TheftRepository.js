const API = require("./API")
const { createTheft, updateTheft } = require('../graphql/mutations');
const { theftsByPlatformId } = require('../graphql/queries');


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

async function update(theft) {
  const {
    data: { updateTheft: item },
  } = await API.graphql({
    query: updateTheft,
    variables: {
      input: coreProperties(theft),
    },
  });
  console.log(`Updated ${theft.platformName}#${theft.platformId}`)
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
  console.log(`Inserted ${theft.platformName}#${theft.platformId}`)
  return item
}
function merge(existing, theft) {
  // Properties that we are willing to update
  const { title, description, images } = theft
  return { ...existing, title, description, images }
}
async function listByPlatformId(platformName, platformId) {

  const response = await API.graphql({
    query: theftsByPlatformId,
    variables: {
      platformName: { eq: platformName },
      platformId: platformId,
    },
  });
  const {
    data: { theftsByPlatformId: { items, nextToken } },
  } = response
  console.log(`listByPlatformId(${platformName},${platformId}) found ${items.length}`)
  return { items, nextToken }
}

async function upsert(theft) {
  const { items: existingThefts } = await listByPlatformId(theft.platformName, theft.platformId)
  if (existingThefts.length > 0) {
    await Promise.all(existingThefts.map(async existing => {
      const merged = merge(existing, theft)
      await update(merged)
    }))
  } else {
    await insert(theft)
  }
}

module.exports = { update, upsert, insert, listByPlatformId }