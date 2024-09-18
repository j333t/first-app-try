import React, { useState, useEffect } from 'react';
import BigQueryData from './BigQueryData';
import CreateTaskForm from './components/CreateTaskForm';
import TaskTable from './components/TaskTable';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null); // Track task to edit

  // Fetch tasks on page load (example implementation)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/data');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = async (updatedTask) => {
    try {
      await axios.put(`http://localhost:3001/api/data/${updatedTask.key}`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.key === updatedTask.key ? updatedTask : task))
      );
      setTaskToEdit(null); // Clear the form after update
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (key) => {
    try {
      await axios.delete(`http://localhost:3001/api/data/${key}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.key !== key));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Edit task - populate the form with the task data
  const editTask = (task) => {
    setTaskToEdit(task); // Pass the task to be edited to the form
  };

  // Cancel the edit operation and reset form
  const cancelEdit = () => {
    setTaskToEdit(null); // Reset the form and stop edit mode
  };

  return (
    <div>
      <h1>Welcome to My React App</h1>
      <BigQueryData />  {/* This will display the BigQuery data */}
      
      {/* Form to add or update tasks */}
      <CreateTaskForm
        onTaskCreated={addTask}
        taskToEdit={taskToEdit}
        onTaskUpdated={updateTask}
        onCancelEdit={cancelEdit}
      />

      {/* Table to display the list of tasks */}
      <TaskTable tasks={tasks} onUpdateTask={editTask} onDeleteTask={deleteTask} />
    </div>
  );
}

export default App;
