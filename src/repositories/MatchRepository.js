
import API from '@aws-amplify/api';
import { createMatch, updateMatch } from '../graphql/mutations'
import { listMatches, matchesByStatusAdvertisementId, matchesByStatusTheftId } from "../graphql/queries-depth-3"

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

async function listByStatusAdvertisement(status, advertisementId, currentToken, limit = 1) {
  const {
    data: {
      matchesByStatusAdvertisementId: { items, nextToken },
    },
  } = await API.graphql({
    query: matchesByStatusAdvertisementId,
    variables: {
      status: status,
      advertisementId: advertisementId ? { eq: advertisementId } : null,
      limit: limit,
      nextToken: currentToken
    },
  });
  return { items, nextToken }
}

async function listByStatusTheft(status, theftId, currentToken, limit = 1) {
  const {
    data: {
      matchesByStatusTheftId: { items, nextToken },
    },
  } = await API.graphql({
    query: matchesByStatusTheftId,
    variables: {
      status: status,
      theftId: theftId ? { eq: theftId } : null,
      limit: limit,
      nextToken: currentToken,
    },
  });
  return { items, nextToken }
}


export default { create, update, list, listByStatusAdvertisement, listByStatusTheft }

