
const AdvertisementDao = require("./dao/AdvertisementDao");
const SellerDao = require("./dao/SellerDao");

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
  "Great bike. Greater breaks",
  "Cheap bike. It is a steal!",
  "My grandma's bicycle",
  "Moving. Must go tonight!"
]

const images = ["https://surlybikes.com/uploads/bikes/_medium_image/Lowside_BK0534_Background-2000x1333.jpg",
  "https://www.transitionbikes.com/images/2022_PatrolCarbon_Gallery1.jpg",
  "https://www.government.nl/binaries/large/content/gallery/rijksoverheid/content-afbeeldingen/onderwerpen/bijzondere-voertuigen/bbf_7507-rdw.jpg",
  "https://electrek.co/wp-content/uploads/sites/3/2021/08/new-electric-bird-bike-high-tech-eco-conscious-fun-you-can-own-6.jpeg?quality=82&strip=all"]

const sellers = [
  {
    id: "MARKETPLACE#1",
    name: "Vincent"
  },
  {
    id: "MARKETPLACE#2",
    name: "Jessie"
  },
  ,
  {
    id: "MARKETPLACE#3",
    name: "Trenton"
  }
]
function select(list) {
  const i = Math.floor(Math.random() * list.length)
  return list[i]
}

async function scrapeMarketplace(limit) {
  console.log("scrapeMarketplace " + limit)
  const nums = [...Array(limit).keys()].map(i => i + 1)
  let items = await Promise.all(nums.map(async i => {
    const now = new Date()
    const seller = select(sellers)
    const advertisement = {
      url: "https://www.facebook.com/marketplace",
      platformName: "MARKETPLACE",
      platformId: Math.round(10000 * Math.random()).toString(),
      brand: select(brands),
      status: "UNREVIEWED",
      title: select(titles),
      color: select(colors).name,
      images: JSON.stringify([select(images)]),
      sellerId: seller?.id,
      sellerName: seller?.name,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      postDate: now.toISOString()
    }
    const item = await AdvertisementDao.upsert(advertisement)
    return item
  }))
  return items
}

async function scrapeOfferUp(limit) {
  const nums = [...Array(limit).keys()].map(i => i + 1)
  let items = await Promise.all(nums.map(async i => {
    const now = new Date()
    const advertisement = {
      url: "https://www.offerup.com",
      platformName: "OFFERUP",
      platformId: Math.round(10000 * Math.random()).toString(),
      brand: select(brands),
      status: "UNREVIEWED",
      title: select(titles),
      color: select(colors).name,
      images: JSON.stringify([select(images)]),
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      postDate: now.toISOString()
    }
    const item = await AdvertisementDao.upsert(advertisement)
    return item
  }))
  console.log(items)
  return items
}


module.exports = { scrapeMarketplace, scrapeOfferUp }