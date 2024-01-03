import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './App.css'; // Import the global styles

Modal.setAppElement('#root');

function App() {
  const [tasks, setTasks] = useState([]);
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    closeAddTaskModal();
  };

  
  const editTask = (editedTask) => {
    const updatedTasks = tasks.map((task) => (task.id === editedTask.id ? editedTask : task));
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
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
        <button className="btn-primary" onClick={openAddTaskModal}>
          Add Task
        </button>
        <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask}  />
        <Modal
          isOpen={isAddTaskModalOpen}
          onRequestClose={closeAddTaskModal}
          className="modal"
          overlayClassName="overlay"
        >
          <TaskForm addTask={addTask} 
          closeModal={closeAddTaskModal} />
          
        </Modal>
      </div>
    </div>
  );
}

export default App;
