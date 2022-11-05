
import API from '@aws-amplify/api';
import { createTheft, updateTheft } from '../graphql/mutations'
import { listThefts, theftsByBrandColor, theftsByStatusPostDateId } from "../graphql/queries"

/**
 * 
 * @param {Theft} theft 
 * @returns Object with just the properties that can be mutated
 */
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

async function create(theft) {
  const {
    data: { createTheft: item },
  } = await API.graphql({
    query: createTheft,
    variables: {
      input: coreProperties(theft),
    },
  });
  return item
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
  return item
}

async function list(currentToken, limit = 1) {
  const {
    data: {
      listThefts: { items, nextToken },
    },
  } = await API.graphql({
    query: listThefts,
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
      theftsByStatusPostDateId: { items, nextToken },
    },
  } = await API.graphql({
    query: theftsByStatusPostDateId,
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
      theftsByBrandColor: { items, nextToken },
    },
  } = await API.graphql({
    query: theftsByBrandColor,
    variables: {
      brand: brand,
      limit: limit,
      nextToken: currentToken,
      sortDirection: "DESC"
    },
  });
  return { items, nextToken }
}

export default { create, update, list, listByStatus, listByBrandColor }

