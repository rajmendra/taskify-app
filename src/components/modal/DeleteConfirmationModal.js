import React from 'react';

const DeleteConfirmationModal = ({ onDelete, onCancel }) => {
  return (
    <div className="overlay">
      <div className="delete-confirmation">
        <p>Are you sure you want to delete this task? </p>
        <button className="button btn-primary" onClick={onDelete}>
          Yes
        </button>
        <button className="button cancel-button" onClick={onCancel}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
