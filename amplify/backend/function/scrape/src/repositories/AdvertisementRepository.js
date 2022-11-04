const API = require('./API');
const { createAdvertisement, updateAdvertisement } = require('../graphql/mutations')
const { advertisementsByStatusPostDateId, listAdvertisements } = require("../graphql/queries")

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
  if (advertisement.seller) {
    rest.advertisementSellerId = advertisement.seller.id
  }
  return rest
}
async function create(advertisement) {
  const {
    data: { createAdvertisement: item },
  } = await API.graphql({
    query: createAdvertisement,
    variables: {
      input: coreProperties(advertisement),
    },
  });
  const { items: matches } = await API.get("matches", "/check/advertisement/" + item.id)
  console.log(matches)
  return item
}
async function update(advertisement) {
  const {
    data: { updateAdvertisement: item },
  } = await API.graphql({
    query: updateAdvertisement,
    variables: {
      input: coreProperties(advertisement),
    },
  });
  return item
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
  console.log(`listByStatus(${platformName},${platformId}) found ${items.length}`)
  return { items, nextToken }
}

module.exports = { create, update, list, listByStatus }