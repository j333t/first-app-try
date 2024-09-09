import { Button, Input, Label, Card, CardHeader, CardBody } from '@shadcn/ui'; 
import { useState } from 'react';
import axios from 'axios';

function CreateTaskForm({ onTaskCreated }) {
  const [task, setTask] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { task, startDate, endDate, assignTo, status };
    
    // Example axios POST request to create a task
    axios.post('http://localhost:3001/api/create-task', newTask)
      .then(response => {
        console.log('Task created:', response.data);
        onTaskCreated(response.data);  // Call the passed function to update the task list
      })
      .catch(error => {
        console.error('Error creating task:', error);
      });
  };

  return (
    <Card>
      <CardHeader>
        <h2>Create New Task</h2>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label>Task</Label>
            <Input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter task name"
            />
          </div>
          <div className="mb-4">
            <Label>Start Date</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label>End Date</Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label>Assign To</Label>
            <Input
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              placeholder="Assign task to..."
            />
          </div>
          <div className="mb-4">
            <Label>Status</Label>
            <Input
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Task status"
            />
          </div>
          <Button type="submit">Create Task</Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default CreateTaskForm;
