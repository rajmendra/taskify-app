import React from 'react';
import TaskForm from '../task/TaskForm';
import Modal from 'react-modal';

const EditModal = ({
  editModalIsOpen,
  closeEditModal,
  taskToEdit,
  saveEditedTask,
  setTaskToEdit,
}) => {
  return (
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
  );
};

export default EditModal;
