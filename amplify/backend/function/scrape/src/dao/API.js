const GRAPHQL_ENDPOINT = process.env.API_STOLENCYCLES_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_STOLENCYCLES_GRAPHQLAPIKEYOUTPUT;
const fetch = require('node-fetch-commonjs');

async function graphql(params) {
  const { method = "POST", query, variables } = params
  const options = {
    method: method,
    headers: {
      'x-api-key': GRAPHQL_API_KEY
    },
    body: JSON.stringify({ query, variables })
  };

  const request = new fetch.Request(GRAPHQL_ENDPOINT, options);
  const response = await fetch(request);
  const body = await response.json()
  return body
}

module.exports = { graphql }