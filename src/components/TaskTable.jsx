import { Table, TableRow, TableHeader, TableCell } from 'shadcn-ui';

function TaskTable({ tasks }) {
  return (
    <Table>
      <thead>
        <TableRow>
          <TableHeader>Task</TableHeader>
          <TableHeader>Start Date</TableHeader>
          <TableHeader>End Date</TableHeader>
          <TableHeader>Assigned To</TableHeader>
          <TableHeader>Status</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <TableRow key={index}>
            <TableCell>{task.task}</TableCell>
            <TableCell>{task.startDate}</TableCell>
            <TableCell>{task.endDate}</TableCell>
            <TableCell>{task.assignTo}</TableCell>
            <TableCell>{task.status}</TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}

export default TaskTable;
