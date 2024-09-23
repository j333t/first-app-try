import express from 'express';
import { BigQuery } from '@google-cloud/bigquery';
import cors from 'cors';

// Initialize express app
const app = express();

const bigQueryClient = new BigQuery({
  keyFilename: 'credentials/boxwood-ellipse-432510-p7-1908eb7a8403.json',  // Use forward slashes
  projectId: 'boxwood-ellipse-432510-p7',  // Your Google Cloud project ID
  scopes: ['https://www.googleapis.com/auth/drive']  // Add Google Drive scope
});


// Middleware setup
app.use(cors());  // Enable CORS
app.use(express.json()); // To handle JSON requests

// Route to get data from BigQuery
app.get('/api/data', async (req, res) => {
  try {
    const query = 'SELECT * FROM `boxwood-ellipse-432510-p7.Demo.Test_1_native` LIMIT 10';
    const [rows] = await bigQueryClient.query(query);
    console.log('Data fetched from BigQuery:', rows);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error querying BigQuery:', err.message, err.stack);  // Detailed error logging
    res.status(500).json({ message: err.message, stack: err.stack });
  }
});


// Assuming the correct data is passed from the frontend:
app.post('/api/data', async (req, res) => {
  const { key, taskName, startDate, endDate, assignTo, status } = req.body;

  const query = `
    INSERT INTO \`boxwood-ellipse-432510-p7.Demo.Test_1_native\` (Key, Task, Start_Date, End_Date, Assign_To, Status)
    VALUES (@key, @taskName, @startDate, @endDate, @assignTo, @status)
  `;

  const options = {
    query: query,
    params: { key, taskName, startDate, endDate, assignTo, status },
  };

  try {
    const [job] = await bigQueryClient.createQueryJob(options);
    await job.getQueryResults();
    res.status(200).send({ message: 'Task inserted successfully.' });
  } catch (error) {
    console.error('Error inserting data into BigQuery:', error);
    res.status(500).send({ error: 'Failed to insert task into BigQuery.' });
  }
});


// Update Task in BigQuery
app.put('/api/data/:key', async (req, res) => {
  const { key } = req.params;
  const { taskName, startDate, endDate, assignTo, status } = req.body;

  const query = `
    UPDATE \`boxwood-ellipse-432510-p7.Demo.Test_1_native\`
    SET Task = @taskName, Start_Date = @startDate, End_Date = @endDate, Assign_To = @assignTo, Status = @status
    WHERE Key = @key
  `;

  const options = {
    query: query,
    params: { key: parseInt(key), taskName, startDate, endDate, assignTo, status },
  };

  try {
    const [job] = await bigQueryClient.createQueryJob(options);
    await job.getQueryResults();
    res.status(200).send({ message: 'Task updated successfully.' });
  } catch (error) {
    console.error('Error updating task in BigQuery:', error);
    res.status(500).send({ error: 'Failed to update task in BigQuery.' });
  }
});

// Delete Task from BigQuery
app.delete('/api/data/:key', async (req, res) => {
  const { key } = req.params;

  const query = `
    DELETE FROM \`boxwood-ellipse-432510-p7.Demo.Test_1_native\`
    WHERE Key = @key
  `;

  const options = {
    query: query,
    params: { key: parseInt(key) },
  };

  try {
    const [job] = await bigQueryClient.createQueryJob(options);
    await job.getQueryResults();
    res.status(200).send({ message: 'Task deleted successfully.' });
  } catch (error) {
    console.error('Error deleting task from BigQuery:', error);
    res.status(500).send({ error: 'Failed to delete task from BigQuery.' });
  }
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
