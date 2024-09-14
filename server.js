import express from 'express';
import { BigQuery } from '@google-cloud/bigquery';
import cors from 'cors';

// Initialize express app
const app = express();

const bigQueryClient = new BigQuery({
  keyFilename: 'credentials/boxwood-ellipse-432510-p7-79849f7721a9.json',  // Use forward slashes
  projectId: 'boxwood-ellipse-432510-p7',  // Your Google Cloud project ID
  scopes: ['https://www.googleapis.com/auth/drive']  // Add Google Drive scope
});

// Middleware setup
app.use(cors());  // Enable CORS
app.use(express.json()); // To handle JSON requests

// Route to get data from BigQuery
app.get('/api/data', async (req, res) => {
  try {
    const query = 'SELECT * FROM `boxwood-ellipse-432510-p7.Demo.Test_1` LIMIT 10';
    const [rows] = await bigQueryClient.query(query);
    console.log('Data fetched from BigQuery:', rows);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error querying BigQuery:', err.message, err.stack);  // Detailed error logging
    res.status(500).json({ message: err.message, stack: err.stack });
  }
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
