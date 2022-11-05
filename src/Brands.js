const brands = [
  "All City",
  "Aventón",
  "Bacchetta",
  "Bianchi",
  "BionX",
  "Bottecchia",
  "Bridgestone",
  "Burley",
  "Campagnolo",
  "Cannondale",
  "Catrike",
  "Centurion",
  "Cervélo",
  "Cilo",
  "Cinelli",
  "Colnago",
  "Critical Cycles",
  "Dahon",
  "Dawes Cycles",
  "De Rosa",
  "DeBernardi",
  "Diamondback",
  "Eddy Merckx",
  "Electra Bicycle Company",
  "Ellsworth",
  "Evil",
  "Felt",
  "Firenze",
  "Focus",
  "Fuji",
  "Fyxation",
  "Gary Klein",
  "Gary Fisher",
  "Gazelle",
  "Giant",
  "Gitane",
  "Globe",
  "GT Bicycles",
  "Huffy",
  "Ibis",
  "Intense",
  "Jamis",
  "KHS Bicycles",
  "Klein Bikes",
  "Kona",
  "Kreitler",
  "Kuat",
  "Kuota",
  "Kuwahara",
  "Liv",
  "LeMond Racing Cycles",
  "Litespeed",
  "Lotus",
  "Lynskey",
  "Marin",
  "Maruishi",
  "Mercier",
  "Miyata",
  "Motobecane",
  "Murray",
  "Next",
  "Northrock",
  "Orbea",
  "Panasonic",
  "Peugeot",
  "Pinarello",
  "Pivot",
  "Pure Fix",
  "Raleigh",
  "Rans Designs",
  "Redline",
  "Rivendell Bicycle Works",
  "Rocky Mountain Bicycles",
  "Salsa",
  "Santa Cruz",
  "Scattante",
  "Schwinn",
  "SE Bikes",
  "Serotta",
  "Solé Bicycle Co.",
  "Specialized",
  "Stolen Bicycle Co.",
  "Surly",
  "Takara",
  "Tern",
  "Terry",
  "Tommaso",
  "Trek",
  "Velo Orange",
  "Vilano",
  "Viscount",
  "Vitus",
  "Voodoo",
  "Woom",
  "Xtracycle",
  "Yeti",
  "Yuba",
  "Zoom",
]
// Mapping from the lowercase version of the first word to the full brand.
const brandMap =
  Object.fromEntries(brands.map((b) =>
    [b.toLowerCase().split(/s/)[0], b]
  ));

function guessBrand(text) {
  const words = (text).split(/\s/);
  var matchingBrands = [];
  words.forEach((word) => {
    const b = brandMap[word.toLowerCase()];
    if (b) {
      matchingBrands.push(b);
    }
  });
  if (matchingBrands.length === 1) {
    return matchingBrands[0];
  }
}

module.exports = { brands, brandMap, guessBrand }