
import API from '@aws-amplify/api';
import { createMatch, updateMatch } from '../graphql/mutations'
import { listMatches } from "../graphql/queries"

/**
 * 
 * @param {Match} match 
 * @returns Object with just the properties that can be mutated
 */
function coreProperties(match) {
  let {
    createdAt,
    updatedAt,
    _lastChangedAt,
    _deleted,
    advertisement,
    theft,
    ...rest
  } = match
  return rest
}

async function create(match) {
  const {
    data: { createMatch: item },
  } = await API.graphql({
    query: createMatch,
    variables: {
      input: coreProperties(match),
    },
  });
  return item
}
async function update(match) {
  const {
    data: { updateMatch: item },
  } = await API.graphql({
    query: updateMatch,
    variables: {
      input: coreProperties(match),
    },
  });
  return item
}

async function list(currentToken, limit = 1) {
  const {
    data: {
      listMatches: { items, nextToken },
    },
  } = await API.graphql({
    query: listMatches,
    variables: {
      limit: limit,
      nextToken: currentToken,
      sortDirection: "DESC"
    },
  });
  return { items, nextToken }
}

//TODO: Implement
async function listByStatus(status, currentToken, limit = 1) {
  const {
    data: {
      listMatches: { items, nextToken },
    },
  } = await API.graphql({
    query: listMatches,
    variables: {
      limit: limit,
      nextToken: currentToken,
    },
  });
  return { items, nextToken }
}

export default { create, update, list, listByStatus }

