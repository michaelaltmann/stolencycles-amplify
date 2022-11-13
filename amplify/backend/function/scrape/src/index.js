const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
const BrightData = require('./BrightData');
const BikeIndex = require('./BikeIndex')
/**
 * @type {import('http').Server}
 */
const server = awsServerlessExpress.createServer(app);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  if (event['detail-type'] == 'Scheduled Event') {
    return Promise.all([BrightData.scrapeMarketplace(2), BrightData.scrapeOfferUp(3), BikeIndex.scrape(10, 1)])
  } else {
    return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
  }
};
