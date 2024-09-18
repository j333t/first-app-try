import { useState, useEffect } from 'react';
import axios from 'axios';

function CreateTaskForm({ onTaskCreated, taskToEdit, onCancelEdit }) {
  const [key, setKey] = useState(taskToEdit?.key || '');
  const [taskName, setTaskName] = useState(taskToEdit?.taskName || '');
  const [startDate, setStartDate] = useState(taskToEdit?.startDate || '');
  const [endDate, setEndDate] = useState(taskToEdit?.endDate || '');
  const [assignTo, setAssignTo] = useState(taskToEdit?.assignTo || '');
  const [status, setStatus] = useState(taskToEdit?.status || '');

  // State to disable/enable submit button
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setKey(taskToEdit.key);
      setTaskName(taskToEdit.taskName);
      setStartDate(taskToEdit.startDate);
      setEndDate(taskToEdit.endDate);
      setAssignTo(taskToEdit.assignTo);
      setStatus(taskToEdit.status);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);  // Disable the button during submission

    const newTask = {
      key: parseInt(key),  // Ensure key is an integer
      taskName,
      startDate,
      endDate,
      assignTo,
      status,
    };

    try {
      if (taskToEdit) {
        // Update task
        await axios.put(`http://localhost:3001/api/data/${taskToEdit.key}`, newTask);
      } else {
        // Add new task
        await axios.post('http://localhost:3001/api/data', newTask);
        onTaskCreated(newTask);  // Notify App.jsx of the new task
      }
      resetForm();
    } catch (error) {
      console.error('Error adding/updating task:', error);
    } finally {
      setIsSubmitting(false);  // Re-enable the button after submission
    }
  };

  const resetForm = () => {
    setKey('');
    setTaskName('');
    setStartDate('');
    setEndDate('');
    setAssignTo('');
    setStatus('');
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();  // Notify parent component to stop editing mode
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Key"
        type="number"
        required
      />
      <input
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task Name"
        required
      />
      <input
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        placeholder="Start Date"
        type="date"
        required
      />
      <input
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        placeholder="End Date"
        type="date"
        required
      />
      <input
        value={assignTo}
        onChange={(e) => setAssignTo(e.target.value)}
        placeholder="Assign To"
        required
      />
      <input
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="Status"
        required
      />
      
      {/* Disable the button during submission */}
      <button type="submit" disabled={isSubmitting}>
        {taskToEdit ? 'Update Task' : 'Add Task'}
      </button>
      
      {taskToEdit && (
        <button type="button" onClick={handleCancel}>
          Cancel Update
        </button>
      )}
    </form>
  );
}

export default CreateTaskForm;
