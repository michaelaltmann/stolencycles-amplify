/* Amplify Params - DO NOT EDIT
  API_STOLENCYCLES_GRAPHQLAPIENDPOINTOUTPUT
  API_STOLENCYCLES_GRAPHQLAPIIDOUTPUT
  API_STOLENCYCLES_GRAPHQLAPIKEYOUTPUT
  ENV
  REGION
Amplify Params - DO NOT EDIT *//*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const GRAPHQL_ENDPOINT = process.env.API_STOLENCYCLES_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_STOLENCYCLES_GRAPHQLAPIKEYOUTPUT;

const fetch = require('node-fetch-commonjs');

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/ping', function (req, res) {
  // Add your code here
  res.json({ success: 'pong!', url: req.url });
});



/****************************
* Example post method *
****************************/

app.post('/marketplace', async function (req, res) {
  const now = new Date()
  const advertisement = {
    platformName: "MARKETPLACE",
    platformId: Math.round(1000 * Math.random()).toString(),
    brand: "Trek",
    status: "UNREVIEWED",
    title: "Fake ad",
    color: "BLUE",
    description: "This ad was scraped at " + now.toLocaleString(),
    postDate: now.toISOString()
  }

  const createAdvertisement = /* GraphQL */ `
  mutation CreateAdvertisement(
    $input: CreateAdvertisementInput!
    $condition: ModelAdvertisementConditionInput
  ) {
    createAdvertisement(input: $input, condition: $condition) {
      id
      title
      platformName
      platformId
      price
      description
      model
      brand
      color
      images
      status
      postDate
      sortOrder
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
  variables = { input: advertisement }

  const options = {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY
    },
    body: JSON.stringify({ query: createAdvertisement, variables })
  };

  const request = new fetch.Request(GRAPHQL_ENDPOINT, options);

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    console.log("GraphQL responded with " + JSON.stringify(body))

    if (body.errors) statusCode = 400;
  } catch (error) {
    console.log(error)
    statusCode = 400;
    body = {
      errors: [
        {
          status: response.status,
          message: error.message,
          stack: error.stack
        }
      ]
    };
  }

  res.status(statusCode)
  res.json(body)
});

app.post('/offerup', function (req, res) {
  // Add your code here
  res.json({ success: true, url: req.url, body: req.body })
});


/****************************
* Example put method *
****************************/

app.put('/item', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

app.put('/item/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

/****************************
* Example delete method *
****************************/

app.delete('/item', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/item/*', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
