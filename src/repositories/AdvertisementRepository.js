import API from '@aws-amplify/api';
import { createAdvertisement, updateAdvertisement } from '../graphql/mutations'
import { advertisementsByBrandColor, advertisementsByStatusPostDateId, listAdvertisements } from "../graphql/queries"

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
  const { items: matches } = await API.get("scrape", "/check/advertisement/" + item.id)
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
  const { items: matches } = await API.get("scrape", "/check/advertisement/" + item.id)
  console.log(matches)
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
  return { items, nextToken }
}

async function listByBrandColor(brand, color, currentToken, limit = 1) {
  const {
    data: {
      advertisementsByBrandColor: { items, nextToken },
    },
  } = await API.graphql({
    query: advertisementsByBrandColor,
    variables: {
      brand: brand,
      color: color,
      limit: limit,
      nextToken: currentToken,
      sortDirection: "DESC"
    },
  });
  return { items, nextToken }
}

export default { create, update, list, listByStatus, listByBrandColor }