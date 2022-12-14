import API from '@aws-amplify/api';
import { createSeller, updateSeller } from '../graphql/mutations'
import { getSeller } from "../graphql/queries-depth-3"
import { listSellers } from "../graphql/queries-depth-4"

/**
 * 
 * @param {Advertisement} advertisement 
 * @returns Object with just the properties that can be mutated
 */
function coreProperties(seller) {
  let {
    createdAt,
    updatedAt,
    _lastChangedAt,
    _deleted,
    aliasesAsFirstSeller,
    aliasesAsSecondSeller,
    advertisements,
    ...rest
  } = seller
  return rest
}
async function create(seller) {
  const {
    data: { createSeller: item },
  } = await API.graphql({
    query: createSeller,
    variables: {
      input: coreProperties(seller),
    },
  });

  return item
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
  return item
}

async function list(currentToken, limit = 1) {
  const {
    data: {
      listSellers: { items, nextToken },
    },
  } = await API.graphql({
    query: listSellers,
    variables: {
      limit: limit,
      nextToken: currentToken
    },
  });
  return { items, nextToken }
}

async function get(id) {
  const {
    data: {
      getSeller: item,
    },
  } = await API.graphql({
    query: getSeller,
    variables: {
      id: id
    },
  });
  return item
}


export default { create, update, list, get }