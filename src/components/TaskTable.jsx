import React from 'react';

function TaskTable({ tasks, onUpdateTask, onDeleteTask }) {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Key</th>
          <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Task Name</th>
          <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Start Date</th>
          <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">End Date</th>
          <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          task && task.taskName ? (
            <tr key={task.key}>
              <td className="py-2 px-4 border-b border-gray-200">{task.key}</td>
              <td className="py-2 px-4 border-b border-gray-200">{task.taskName}</td>
              <td className="py-2 px-4 border-b border-gray-200">{task.startDate}</td>
              <td className="py-2 px-4 border-b border-gray-200">{task.endDate}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => onUpdateTask(task)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => onDeleteTask(task.key)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ) : null
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;
