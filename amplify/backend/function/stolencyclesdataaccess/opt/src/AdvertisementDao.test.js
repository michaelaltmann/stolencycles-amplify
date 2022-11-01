const AWS = require('aws-sdk')


var dao
const tableName = "Advertisement";
const config = {
    //   endpoint: "http://localhost:8000",
    region: 'us-east-1'
}

const init = async () => {
    jest.setTimeout(100000);

    AWS.config.update(config);
    const AdvertisementDao = require('./AdvertisementDao')

    dao = new AdvertisementDao(AWS)
    const dynamodb = new AWS.DynamoDB();

}

beforeAll(init)

beforeEach(async () => {

})

test('listAll', async () => {

    const { Items } = await dao.listAll()
    console.log(JSON.stringify(Items, null, 3))
})
