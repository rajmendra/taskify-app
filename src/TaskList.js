import React, { useState } from 'react';
import TaskItem from './TaskItem';
import Modal from 'react-modal';
import TaskForm from './TaskForm';
import 'react-datepicker/dist/react-datepicker.css';

Modal.setAppElement('#root');

const TaskList = ({ tasks, editTask, deleteTask }) => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterPriority === 'All' || task.priority === filterPriority) &&
    (filterStatus === 'All' || (filterStatus === 'Completed' ? task.status === 'Completed' : task.status !== 'Completed'))
  );

  // Filter tasks based on due date and completion status
  const upcomingTasks = filteredTasks.filter(task => task.status !== 'Completed' && new Date(task.dueDate) > new Date());
  const overdueTasks = filteredTasks.filter(task => task.status !== 'Completed' && new Date(task.dueDate) <= new Date());
  const completedTasks = filteredTasks.filter(task =>  task.status === 'Completed');

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const saveEditedTask = (editedTask) => {
    editTask(editedTask);
    setEditModalIsOpen(false);
  };

  const handleDeleteConfirmation = (taskId) => {
    setDeleteConfirmation(taskId);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation(null);
  };

  const handleTaskDelete = (taskId) => {
    deleteTask(taskId);
    setDeleteConfirmation(null);
  };

  return (
    <div>

        {/* Search and Filter UI */}
        <div className="filter-container">
        <label>Search: </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <label>Priority: </label>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <label>Status: </label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {upcomingTasks.length > 0 && 
      <>
      <h3>Upcoming Tasks</h3>
      <table>
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
          {upcomingTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              deleteTask={handleDeleteConfirmation}
              openEditModal={() => openEditModal(task)}
            />
          ))}
        </tbody>
      </table>
      </>
      }

{overdueTasks.length > 0 && 
      <>
      <h3>Overdue Tasks</h3>
      <table>
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
          {overdueTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              deleteTask={handleDeleteConfirmation}
              openEditModal={() => openEditModal(task)}
            />
          ))}
        </tbody>
      </table>

      </>
}
      
{completedTasks.length > 0 && 
  <>
      <h3>Completed Tasks</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            
          </tr>
        </thead>
        <tbody>
          {completedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              deleteTask={handleDeleteConfirmation}
              openEditModal={() => openEditModal(task)}
            />
          ))}
        </tbody>
      </table>
</>}
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        className="modal"
        overlayClassName="overlay"
      >
        <TaskForm
          taskToEdit={taskToEdit}
          editTask={saveEditedTask}
          setTaskToEdit={setTaskToEdit}
          isEditing={!!taskToEdit}
          closeModal={closeEditModal}
        />
      </Modal>
      {deleteConfirmation && (
          <div className="overlay">
        <div 
        className="delete-confirmation">
          <p>Are you sure you want to delete this task?</p>
          <button onClick={() => handleTaskDelete(deleteConfirmation)}>Yes</button>
          <button onClick={handleDeleteCancel}>No</button>
        </div> </div>
      )}
    </div>
  );
};

export default TaskList;
