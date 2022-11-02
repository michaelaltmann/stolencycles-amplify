const AWS = require('aws-sdk')
if (!process.env.ENV) {
  console.log('*** Please set amplify environment  ***')
  console.log('*** ENV=dev  ***')
  process.exit()
}
AWS.config.update({
  region: 'us-east-1',
  // ,endpoint: "http://localhost:8000"
});
const TheftDao = require('./TheftDao')
const theftDao = new TheftDao(AWS)

const init = async (done) => {
  jest.setTimeout(100000);
  done();
}
beforeAll(init)

test('listStolen', async () => {
  const config = {
    Status: 'Stolen',
    Limit: 0
  }
  const response = await theftDao.listByStatus(config)
  console.log("TheftDao.listByStatus returned " + response.Items.length)
  expect(response.Items.length > 100)
})

test('listAll', async () => {
  const config = {
    Limit: 0
  }
  const response = await theftDao.listAll(config)
  console.log("TheftDao.listAll returned " + response.Items.length)
  expect(response.Items.length > 100)
})
test('dump', async () => {
  const config = {
    Limit: 0
  }
  const response = await theftDao.listAll(config)
  console.log(JSON.stringify(response.Items, null, true))
})

test('resetMerged', async () => {
  const config = {
    Limit: 0
  }
  const response = await theftDao.listAll(config)
  await Promise.all(response.Items.map(async (item) => {
    if (item.description && item.description.startsWith('MERGED.')) {
      console.log(JSON.stringify(item))
      if (item.status != 'Merged') {
        return theftDao.update({ ...item, status: 'Merged' })
      }
    } else {
      return Promise.resolve(item)
    }
  })
  )
})
