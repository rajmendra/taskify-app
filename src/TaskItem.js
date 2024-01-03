import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskItem = ({ task, deleteTask, openEditModal }) => {
  return (
    <tr className='row'>
      <td><div>{task.title}</div></td>
      <td><div>{task.description}</div></td>
      <td><div>{new Date(task.dueDate).toDateString()}</div></td>
      <td><div>{task.priority}</div></td>
      <td>{task.status}</td>
      {task.status !== 'Completed' &&
      <td className='action'>
        <button onClick={openEditModal}>Edit</button>
        <button className='cancel-button' onClick={() => deleteTask(task.id)}>Delete</button>
      </td>
    }
    </tr>
  );
};

export default TaskItem;
