import React, { useState } from 'react';
import BigQueryData from './BigQueryData';  // Import BigQuery data component
import CreateTaskForm from './components/CreateTaskForm';
import TaskTable from './components/TaskTable';

function App() {
  const [tasks, setTasks] = useState([]);

  // Function to add a new task
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Function to update an existing task
  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };


  return (
    <div>
      <h1>Welcome to My React App</h1>
      
      {/* BigQuery Data Component */}
      <BigQueryData />

      {/* Task Creation Form */}
      <CreateTaskForm onTaskCreated={addTask} />

      {/* Task Table to Display the List of Tasks */}
      <TaskTable tasks={tasks} />
    </div>
  );
}

export default App;
