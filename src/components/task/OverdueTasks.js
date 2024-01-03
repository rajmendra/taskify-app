import React from 'react';
import TaskTable from './TaskTable';
import { TaskStatus } from '../../constants';

const OverdueTasks = ({ tasks, deleteTask, openEditModal }) => {
  const overdueTasks = tasks.filter(
    (task) =>
      task.status !== TaskStatus.COMPLETED &&
      new Date(task.dueDate) <= new Date(),
  );
  if (!overdueTasks.length) {
    return <></>;
  }
  return (
    <>
      <h3>Overdue Tasks</h3>
      <TaskTable
        tasks={overdueTasks}
        deleteTask={deleteTask}
        openEditModal={openEditModal}
      />
    </>
  );
};

export default OverdueTasks;
