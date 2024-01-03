import React, { useState } from 'react';
import TaskFilterBar from '../search/SearchBar';
import UpcomingTasks from '../task/UpcomingTask';
import CompletedTasks from '../task/CompletedTask';
import OverdueTasks from '../task/OverdueTasks';
import DeleteConfirmationModal from '../modal/DeleteConfirmationModal';
import EditModal from '../modal/EditModal';
import 'react-datepicker/dist/react-datepicker.css';
import { TaskStatus } from '../../constants';

const Dashboard = ({ tasks, editTask, deleteTask }) => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterPriority === 'All' || task.priority === filterPriority) &&
      (filterStatus === 'All' ||
        (filterStatus === TaskStatus.COMPLETED
          ? task.status === TaskStatus.COMPLETED
          : task.status !== TaskStatus.COMPLETED)),
  );

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
  if (!tasks.length) {
    return (
      <div className="no-tasks-message">
        No task has been added, please add some tasks.
      </div>
    );
  }

  return (
    <div>
      <TaskFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterPriority={filterPriority}
        onPriorityChange={setFilterPriority}
        filterStatus={filterStatus}
        onStatusChange={setFilterStatus}
      />

      <UpcomingTasks
        tasks={filteredTasks}
        deleteTask={handleDeleteConfirmation}
        openEditModal={openEditModal}
      />
      <OverdueTasks
        tasks={filteredTasks}
        deleteTask={handleDeleteConfirmation}
        openEditModal={openEditModal}
      />
      <CompletedTasks
        isCompleted={true}
        tasks={filteredTasks}
        deleteTask={handleDeleteConfirmation}
        openEditModal={openEditModal}
      />

      {/* Edit Task Modal */}
      <EditModal
        editModalIsOpen={editModalIsOpen}
        closeEditModal={closeEditModal}
        taskToEdit={taskToEdit}
        saveEditedTask={saveEditedTask}
        setTaskToEdit={setTaskToEdit}
      ></EditModal>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <DeleteConfirmationModal
          onDelete={() => handleTaskDelete(deleteConfirmation)}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default Dashboard;
