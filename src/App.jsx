import React, { useState } from 'react';
import BigQueryData from './BigQueryData';  // Import BigQuery data component
import CreateTaskForm from './components/CreateTaskForm';
import TaskTable from './components/TaskTable';

function App() {
  const [tasks, setTasks] = useState([]);

  // Function to handle adding a new task to the list
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
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
