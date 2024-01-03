import React from 'react';
import TaskTable from './TaskTable';
import { TaskStatus } from '../../constants';

const UpcomingTasks = ({ tasks, deleteTask, openEditModal }) => {
  const upcomingTasks = tasks.filter(
    (task) =>
      task.status !== TaskStatus.COMPLETED &&
      new Date(task.dueDate) > new Date(),
  );
  if (!upcomingTasks.length) {
    return <></>;
  }
  return (
    <>
      <h3>Upcoming Tasks</h3>
      <TaskTable
        tasks={upcomingTasks}
        deleteTask={deleteTask}
        openEditModal={openEditModal}
      />
    </>
  );
};

export default UpcomingTasks;
