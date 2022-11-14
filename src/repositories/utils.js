
function packId(platformName, platformId) {
  return platformName + "~" + platformId
}

function unpackId(id) {
  if (id) {
    return id.split("~")
  } else {
    return [null, null]
  }
}
module.exports = { packId, unpackId }
