
import API from '@aws-amplify/api';
import { createTheft, updateTheft } from '../graphql/mutations'
import { listThefts } from "../graphql/queries"

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

// TODO: Implement
async function listByStatus(status, currentToken, limit = 1) {
  const {
    data: {
      listThefts: { items, nextToken },
    },
  } = await API.graphql({
    query: listThefts,
    variables: {
      limit: limit,
      nextToken: currentToken,
    },
  });
  return { items, nextToken }
}

export default { create, update, list, listByStatus }

