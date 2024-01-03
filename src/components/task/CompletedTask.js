import React from 'react';
import TaskTable from './TaskTable';
import { TaskStatus } from '../../constants';

const CompletedTasks = ({ tasks, deleteTask, openEditModal }) => {
  const completedTasks = tasks.filter(
    (task) => task.status === TaskStatus.COMPLETED,
  );
  if (!completedTasks.length) {
    return <></>;
  }
  return (
    <>
      <h3>Completed Tasks</h3>
      <TaskTable
        tasks={completedTasks}
        deleteTask={deleteTask}
        openEditModal={openEditModal}
      />
    </>
  );
};

export default CompletedTasks;
