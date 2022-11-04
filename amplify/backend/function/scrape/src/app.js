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

const fetch = require('node-fetch-commonjs');
const TheftRepository = require("./repositories/TheftRepository")
const AdvertisementRepository = require("./repositories/AdvertisementRepository")
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

const brands = [
  "Cannondale",
  "Bianchi",
  "Diamondback",
  "Fuji",
  "Giant",
  "Jamis",
  "Liv",
  "Marin",
  "Raleigh",
  "Salsa",
  "Schwinn",
  "Specialized",
  "Surly",
  "Trek",
  "Yuba",
]
const colors = [
  { name: "Black", rgb: "#000000" },
  { name: "Silver", rgb: "#A0A0A0" },
  { name: "Red", rgb: "#FF0000" },
  { name: "Orange", rgb: "#FFA500" },
  { name: "Yellow", rgb: "#FFFF00" },
  { name: "Green", rgb: "#008000" },
  { name: "Blue", rgb: "#0000FF" },
  { name: "Purple", rgb: "#A000A0" },
  { name: "White", rgb: "#FFFFFF" },
]
const titles = [
  "Great bike",
  "Cheap bike",
  "My grandma's bicycle",
  "Moving. Must go tonight!"
]

function select(list) {
  const i = Math.floor(Math.random() * list.length)
  return list[i]
}

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


app.get('/marketplace', async function (req, res) {
  const now = new Date()
  const advertisement = {
    platformName: "MARKETPLACE",
    platformId: Math.round(10000 * Math.random()).toString(),
    brand: select(brands),
    status: "UNREVIEWED",
    title: select(titles),
    color: select(colors).name,
    description: "This ad was scraped at " + now.toLocaleString(),
    postDate: now.toISOString()
  }
  const item = AdvertisementRepository.create(advertisement)
  res.status(200)
  return res.json(item)
});

app.post('/offerup', function (req, res) {
  // Add your code here
  res.json({ success: true, url: req.url, body: req.body })
});

app.get('/bikeindex', async function (req, res) {
  const params = req.query
  const limit = params.limit ? parseInt(params.limit) : 50
  const page = params.page ? parseInt(params.page) : 1
  const baseHost = 'https://bikeindex.org/api/v3';
  const headers = {
    'accept-language': 'en-US,en;q=0.9',
    'Content-type': 'application/json'
  }
  const max_per_page = 50
  const url = baseHost + '/search'
  let query = {
    page: page,
    per_page: limit,
    distance: 69,
    stolenness: 'proximity',
    location: '55401'
  }
  let remaining = limit ? limit : max_per_page
  let bikesForQuery = []
  while (remaining > 0) {
    query.per_page = Math.min(max_per_page, remaining)
    const options = {
      method: 'GET',
      headers: headers,
      qs: query,
      json: true
    }
    const request = new fetch.Request(url, options);
    const response = await fetch(request);
    const body = await response.json()
    console.log("BikeIndex sent back " + body.bikes.length)
    bikesForQuery = bikesForQuery.concat(body.bikes)
    query.page = query.page + 1
    remaining = remaining - query.per_page
  }
  bikesForQuery = bikesForQuery
  await Promise.all(bikesForQuery.map(async bike => {
    const theft = bikeIndexToTheft(bike)
    await TheftRepository.upsert(theft)
  }))
  return res.json({ success: true, items: bikesForQuery })
});

function BI2DBColor(s) {
  if (!s) return null
  const colorMap = {
    'Silver, gray or bare metal': 'Gray'
  }
  return colorMap[s] || s
}

function bikeIndexToTheft(item) {
  const biColor = (item.frame_colors.length > 0) ? item.frame_colors[0] : null
  const dbColor = BI2DBColor(biColor)
  const theft = {
    url: 'https://bikeindex.org/bikes/' + item.id,
    postDate: new Date(item.date_stolen * 1000).toISOString(),
    platformId: item.id.toString(),
    platformName: 'BIKEINDEX',
    title: item.title,
    brand: item.manufacturer_name,
    model: item.frame_model,
    color: dbColor,
    description: item.description,
    status: 'UNREVIEWED',
    images: JSON.stringify([item.thumb || item.large_img])
  }
  return theft
}


app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
