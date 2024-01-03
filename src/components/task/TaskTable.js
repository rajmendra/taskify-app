import React from 'react';
import TaskItem from './TaskItem';

const TaskTable = ({ tasks, deleteTask, openEditModal }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            openEditModal={() => openEditModal(task)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
