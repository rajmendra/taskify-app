import React from 'react';
import { TaskStatus } from '../../constants';
import dayjs from 'dayjs';
const TaskItem = ({ task, deleteTask, openEditModal }) => {
  return (
    <tr className="row">
      <td>
        <div>{task.title}</div>
      </td>
      <td>
        <div>{task.description}</div>
      </td>
      <td>
        <div>{dayjs(task.dueDate).format('MMM DD YYYY')}</div>
      </td>
      <td>
        <div>{task.priority}</div>
      </td>
      <td>{task.status}</td>

      <td className="action-buttons">
        {task.status !== TaskStatus.COMPLETED && (
          <button onClick={openEditModal}>Edit</button>
        )}
        <button className="delete-button" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TaskItem;
