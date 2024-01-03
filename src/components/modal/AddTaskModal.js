import React from 'react';
import TaskForm from '../task/TaskForm';
import Modal from 'react-modal';

const AddTaskModal = ({ isAddTaskModalOpen, closeAddTaskModal, addTask }) => {
  return (
    <Modal
      isOpen={isAddTaskModalOpen}
      onRequestClose={closeAddTaskModal}
      className="modal"
      overlayClassName="overlay"
    >
      <TaskForm addTask={addTask} closeModal={closeAddTaskModal} />
    </Modal>
  );
};

export default AddTaskModal;
