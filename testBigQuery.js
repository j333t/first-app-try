import { BigQuery } from '@google-cloud/bigquery';

// Initialize BigQuery client with key file
const bigqueryClient = new BigQuery({
  keyFilename: 'credentials/boxwood-ellipse-432510-p7-79849f7721a9.json',
  projectId: 'boxwood-ellipse-432510-p7',
});

async function testBigQuery() {
  try {
    const [datasets] = await bigqueryClient.getDatasets();
    console.log('Datasets:', datasets);
  } catch (err) {
    console.error('Error:', err);
  }
}

testBigQuery();
