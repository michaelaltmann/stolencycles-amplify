
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
  { name: "Orange", rgb: "#E68A00" },
  { name: "Yellow", rgb: "#FFFF00" },
  { name: "Green", rgb: "#008000" },
  { name: "Teal", rgb: "#3DCFC2" },
  { name: "Blue", rgb: "#0000FF" },
  { name: "Purple", rgb: "#A000A0" },
  { name: "White", rgb: "#FFFFFF" },
]

const titles = [
  "Great bike. Greater breaks",
  "Cheap bike. It is a steal!",
  "My grandma's bicycle",
  "Moving. Must go tonight!",
  "Selling for a friend",
  "Bought on Lake St.",
  "It's a beauty",
  "Too good to be true.",
  "Inbox me"
]

const images = [
  "https://thumbor.offerup.com/dWkWWNj9m1LNq27dLucdoR0DvUg=/1922x1442/3360/33606a42418644d2a3c98597342e7645.jpg",
  "https://www.transitionbikes.com/images/2022_PatrolCarbon_Gallery1.jpg",
  "https://thumbor.offerup.com/UL2kocINRx5Cubwi5H4N5EQYwKk=/400x266/45bd/45bd3d09ef3649d69834c4736265aa09.jpg",
  "https://thumbor.offerup.com/WBG1q23gSDbIFUhTjQQQiBPkWsQ=/1440x1920/87c9/87c992894bd74794ba71639e6dc48aaa.jpg",
  "https://thumbor.offerup.com/cjnP5iv7Tc7HYUv48FgWoXsK6B4=/718x541/5a36/5a360182f6ac4c0bb51238664914c4bd.jpg",
  "https://thumbor.offerup.com/poRijzyDP9IUtc4j6Q2_8bNkm5o=/1008x477/7484/7484deb9b21543c0862c3c6485723a44.jpg",
  "https://thumbor.offerup.com/c4arUN8sYUyl3zRCCVlcmuLAvJU=/1000x750/e26a/e26a81f037e04ba5b78906604bc3ca20.jpg",
  "https://thumbor.offerup.com/Oze85jeL74E6FkDDjZLCJMbh7Us=/1922x1442/39a7/39a7c4f79cba4cf3b815b199ead96aff.jpg",
  "https://thumbor.offerup.com/ycU107UKR2oF7Yg7fPOdYZj0flg=/1920x1440/38e5/38e5af8f90734afb8cd4878dc8bf9834.jpg",
  "https://thumbor.offerup.com/FnlnSKYsgAL4BvRpj2FO7BOs-f0=/701x1043/2d2a/2d2a9edf12e442ba82ee756aa3d4de93.jpg",
  "https://thumbor.offerup.com/N1KGrbfrYP1fxfvNiaH0sbRFZes=/1922x1442/21c1/21c1e39a55304965bfc7d90e9097a2d1.jpg"
]

const sellers = [
  {
    id: "MARKETPLACE~1",
    name: "Vincent"
  },
  {
    id: "MARKETPLACE~2",
    name: "Jessie"
  },
  ,
  {
    id: "MARKETPLACE~3",
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
      id: "MARKETPLACE~" + Math.round(10000 * Math.random()).toString(),
      url: "https://www.facebook.com/marketplace",
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
    const item = await AdvertisementDao.ingest(advertisement)
    return item
  }))
  // Filter out the null from ads that were marked sold
  return items.filter(x => x)
}

async function scrapeOfferUp(limit) {
  const nums = [...Array(limit).keys()].map(i => i + 1)
  let items = await Promise.all(nums.map(async i => {
    const now = new Date()
    const advertisement = {
      url: "https://www.offerup.com",
      id: "OFFERUP~" + Math.round(10000 * Math.random()).toString(),
      brand: select(brands),
      status: "UNREVIEWED",
      title: select(titles),
      color: select(colors).name,
      images: JSON.stringify([select(images)]),
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      postDate: now.toISOString()
    }
    const item = await AdvertisementDao.ingest(advertisement)
    return item
  }))
  console.log(items)
  // Filter out the null from ads that were marked sold
  return items.filter(x => x)
}


module.exports = { scrapeMarketplace, scrapeOfferUp }