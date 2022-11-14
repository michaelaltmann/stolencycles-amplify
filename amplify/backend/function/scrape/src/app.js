/* Amplify Params - DO NOT EDIT
  API_STOLENCYCLES_ADVERTISEMENTTABLE_ARN
  API_STOLENCYCLES_ADVERTISEMENTTABLE_NAME
  API_STOLENCYCLES_GRAPHQLAPIENDPOINTOUTPUT
  API_STOLENCYCLES_GRAPHQLAPIIDOUTPUT
  API_STOLENCYCLES_GRAPHQLAPIKEYOUTPUT
  API_STOLENCYCLES_MATCHTABLE_ARN
  API_STOLENCYCLES_MATCHTABLE_NAME
  API_STOLENCYCLES_SELLERALIASTABLE_ARN
  API_STOLENCYCLES_SELLERALIASTABLE_NAME
  API_STOLENCYCLES_SELLERTABLE_ARN
  API_STOLENCYCLES_SELLERTABLE_NAME
  API_STOLENCYCLES_THEFTTABLE_ARN
  API_STOLENCYCLES_THEFTTABLE_NAME
  ENV
  REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
  API_STOLENCYCLES_ACCOUNTTABLE_ARN
  API_STOLENCYCLES_ACCOUNTTABLE_NAME
  API_STOLENCYCLES_ADVERTISEMENTTABLE_ARN
  API_STOLENCYCLES_ADVERTISEMENTTABLE_NAME
  API_STOLENCYCLES_BRANDTABLE_ARN
  API_STOLENCYCLES_BRANDTABLE_NAME
  API_STOLENCYCLES_GRAPHQLAPIENDPOINTOUTPUT
  API_STOLENCYCLES_GRAPHQLAPIIDOUTPUT
  API_STOLENCYCLES_GRAPHQLAPIKEYOUTPUT
  API_STOLENCYCLES_MATCHTABLE_ARN
  API_STOLENCYCLES_MATCHTABLE_NAME
  API_STOLENCYCLES_SELLERALIASTABLE_ARN
  API_STOLENCYCLES_SELLERALIASTABLE_NAME
  API_STOLENCYCLES_SELLERTABLE_ARN
  API_STOLENCYCLES_SELLERTABLE_NAME
  API_STOLENCYCLES_THEFTTABLE_ARN
  API_STOLENCYCLES_THEFTTABLE_NAME
  ENV
  REGION
Amplify Params - DO NOT EDIT 
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const TheftDao = require("./dao/TheftDao")
const AdvertisementDao = require("./dao/AdvertisementDao")
const MatchDao = require("./dao/MatchDao")
const BrightData = require('./BrightData');
const BikeIndex = require('./BikeIndex');

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
  console.log('Ping-pong')
  res.json({ success: 'pong!', url: req.url });
});



/****************************
* Example post method *
****************************/
app.get('/check/advertisement/:id', async function (req, res) {
  const { id } = req.params
  const advertisement = await AdvertisementDao.get(id)
  const matches = await MatchDao.checkAdvertisement(advertisement)
  return res.json({ success: 'Checked advertisement ' + id, items: matches });
});


app.get('/check/theft/:id', async function (req, res) {
  const { id } = req.params
  const theft = await TheftDao.get(id)
  const matches = await MatchDao.checkTheft(theft)
  return res.json({ success: 'Checked theft ' + id, items: matches });
});


app.get('/scrape/marketplace', async function (req, res) {
  const params = req.query
  const limit = params.limit ? parseInt(params.limit) : 50
  const items = await BrightData.scrapeMarketplace(limit)
  res.status(200)
  return res.json(items)
});

app.get('/scrape/offerup', async function (req, res) {
  const params = req.query
  const limit = params.limit ? parseInt(params.limit) : 50
  const items = await BrightData.scrapeOfferUp(limit)
  res.status(200)
  return res.json(items)
});

app.get('/scrape/bikeindex', async function (req, res) {
  const params = req.query
  const limit = params.limit ? parseInt(params.limit) : 50
  const page = params.page ? parseInt(params.page) : 1
  const thefts = await BikeIndex.scrape(limit, page)
  return res.json({ success: true, items: thefts })
});



app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
