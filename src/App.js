import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Dashboard from './components/dashboard';
import AddTaskModal from './components/modal/AddTaskModal';
import { getStoredData, updateStorageData } from './utils';
import './App.css'; // Import the global styles

Modal.setAppElement('#root');

function App() {
  const [tasks, setTasks] = useState([]);
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);

  useEffect(() => {
    const storedTasks = getStoredData();
    setTasks(storedTasks);
  }, []);

  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    updateStorageData(updatedTasks);
    closeAddTaskModal();
  };

  const editTask = (editedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === editedTask.id ? editedTask : task,
    );
    setTasks(updatedTasks);
    updateStorageData(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    updateStorageData(updatedTasks);
  };

  const openAddTaskModal = () => {
    setAddTaskModalOpen(true);
  };

  const closeAddTaskModal = () => {
    setAddTaskModalOpen(false);
  };

  return (
    <div className="container">
      <div className="App">
        <h1>Taskify - Task Management</h1>
        <button className="button btn-primary" onClick={openAddTaskModal}>
          Add Task
        </button>
        <Dashboard tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
        <AddTaskModal
          isAddTaskModalOpen={isAddTaskModalOpen}
          closeAddTaskModal={closeAddTaskModal}
          addTask={addTask}
        ></AddTaskModal>
      </div>
    </div>
  );
}

export default App;
