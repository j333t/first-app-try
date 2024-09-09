import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BigQueryData() {
  const [data, setData] = useState([]);

  // Fetch data from your backend when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/data') // Replace with your backend URL
      .then((response) => {
        setData(response.data); // Store the response data in state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run effect only on mount

  return (
    <div>
      <h1>BigQuery Data</h1>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Task</th>
            <th>Start_Date</th>
            <th>End_Date</th>
            <th>Assign_To</th>
            <th>Status</th>
            {/* Add more columns based on your data */}
          </tr>
        </thead>
        <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.Key}</td>
            <td>{row.Task}</td>
            <td>{row.Start_Date ? 'Date Present' : 'N/A'}</td>
            <td>{row.End_Date ? 'Date Present' : 'N/A'}</td>
            <td>{row.Assign_To}</td>
            <td>{row.Status}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default BigQueryData;
