const fetch = require('node-fetch-commonjs');
const TheftDao = require('./dao/TheftDao')

async function scrape(limit, page) {
  const baseHost = 'https://bikeindex.org/api/v3';
  const headers = {
    'accept-language': 'en-US,en;q=0.9',
    'Content-type': 'application/json'
  }
  const max_per_page = 100
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
      json: true
    }
    const request = new fetch.Request(url + "?" + new URLSearchParams(query), options);
    const response = await fetch(request);
    const body = await response.json()
    console.log("BikeIndex sent back " + body.bikes.length)
    bikesForQuery = bikesForQuery.concat(body.bikes)
    query.page = query.page + 1
    remaining = remaining - query.per_page
  }
  return await Promise.all(bikesForQuery.map(async bike => {
    const theft = bikeIndexToTheft(bike)
    await TheftDao.upsert(theft)
  }))
}

function BI2DBColor(s) {
  if (!s) return null
  const colorMap = {
    'Silver, gray or bare metal': 'Gray',
    'Brown': 'Orange',
    "Pink": "Red",
  }
  return colorMap[s] || s
}

function bikeIndexToTheft(item) {
  const biColor = (item.frame_colors.length > 0) ? item.frame_colors[0] : null
  const dbColor = BI2DBColor(biColor)
  const theft = {
    url: 'https://bikeindex.org/bikes/' + item.id,
    postDate: new Date(item.date_stolen * 1000).toISOString(),
    id: 'BIKEINDEX~' + item.id.toString(),
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


module.exports = { scrape }