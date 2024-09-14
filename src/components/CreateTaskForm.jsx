import React, { useState } from 'react';
import axios from 'axios';  // Import axios to make API requests

function CreateTaskForm({ onTaskCreated }) {
  const [taskName, setTaskName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new task object for the frontend
    const newTask = {
      taskName,
      startDate,
      endDate,
    };

    // Send the task to the backend to insert into BigQuery
    try {
      await axios.post('http://localhost:3001/api/data', newTask);
      console.log('Task added to BigQuery:', newTask);

      // Call the parent function to add the task to the frontend state
      onTaskCreated(newTask);
    } catch (error) {
      console.error('Error adding task to BigQuery:', error);
    }

    // Clear the form
    setTaskName('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Task Name</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Task
      </button>
    </form>
  );
}

export default CreateTaskForm;
