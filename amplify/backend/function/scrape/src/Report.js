const TheftDao = require("./dao/TheftDao")


async function countTheftsByYearMonth() {
  let currentToken = null
  const limit = 500
  let tally = new Map()
  do {
    const { items, nextToken } = await TheftDao.list(currentToken, limit)
    items.forEach(item => {
      if (item.postDate) {
        try {
          const d = new Date(Date.parse(item.postDate))
          const yearMonth = `${d.getFullYear()}-${d.getMonth()}`
          const current = tally.get(yearMonth)
          if (!current) tally.set(yearMonth, 1)
          else tally.set(yearMonth, 1 + current)
        } catch (e) {
          console.log(e)
        }
      }
    });
    currentToken = nextToken
  } while (currentToken)
  const tallyEntries = Array.from(tally.entries()).map(x => {
    const [key, count] = x
    const [year, month] = key.split("-")
    return { year, month, count }
  })
  return tallyEntries
}


module.exports = { countTheftsByYearMonth }