import API from '@aws-amplify/api';
import { createAdvertisement, updateAdvertisement } from '../graphql/mutations'
import { advertisementsByStatusPostDateId, listAdvertisements } from "../graphql/queries"

async function create(advertisement) {
  const {
    data: { createAdvertisement: item },
  } = await API.graphql({
    query: createAdvertisement,
    variables: {
      input: advertisement,
    },
  });
  return item
}
async function update(advertisement) {
  const {
    data: { updateAdvertisement: item },
  } = await API.graphql({
    query: updateAdvertisement,
    variables: {
      input: advertisement,
    },
  });
  return item
}

async function list(currentToken, limit = 1) {
  const {
    data: {
      listAdvertisements: { items: list, nextToken },
    },
  } = await API.graphql({
    query: listAdvertisements,
    variables: {
      limit: limit,
      nextToken: currentToken,
      sortDirection: "DESC"
    },
  });
  return { list, nextToken }
}

async function listByStatus(status, currentToken, limit = 1) {
  const {
    data: {
      advertisementsByStatusPostDateId: { items: list, nextToken },
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
  return { list, nextToken }
}

export default { create, update, list, listByStatus }