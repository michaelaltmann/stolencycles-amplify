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
          const year = d.getFullYear()
          const month = d.getMonth()
          const yearMonth = `${year}-${month}`
          const current = tally.get(yearMonth)
          const count = current ? 1 + (current.count) : 1
          tally.set(yearMonth, { year, month, count })
        } catch (e) {
          console.log(e)
        }
      }
    });
    currentToken = nextToken
  } while (currentToken)
  return Array.from(tally.values())
}


module.exports = { countTheftsByYearMonth }