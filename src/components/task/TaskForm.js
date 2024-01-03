import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4 } from 'uuid';
import { StatusOptions, PriorityOptions, TaskStatus } from '../../constants';

const TaskForm = ({
  taskToEdit,
  addTask,
  editTask,
  setTaskToEdit,
  isEditing,
  closeModal,
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: uuidv4(),
      title: '',
      description: '',
      dueDate: new Date(),
      priority: 'Medium',
      status: 'Pending', // Default status
    },
  });

  useEffect(() => {
    // Set default form values when taskToEdit changes
    const fields = [
      'id',
      'title',
      'description',
      'dueDate',
      'priority',
      'status',
    ];

    if (taskToEdit) {
      setValue('id', taskToEdit.id || uuidv4());
      setValue('title', taskToEdit.title || '');
      setValue('description', taskToEdit.description || '');
      setValue(
        'dueDate',
        taskToEdit.dueDate ? new Date(taskToEdit.dueDate) : new Date(),
      );
      setValue('priority', taskToEdit.priority || 'Medium');
      setValue('status', taskToEdit.status || 'Pending');
    }
  }, [taskToEdit, setValue]);

  const handleDateChange = (date) => {
    setValue('dueDate', date, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    if (isEditing) {
      editTask(data);
      setTaskToEdit(null); // Reset task to edit
    } else {
      addTask(data);
    }

    // Reset form values
    setValue('id', uuidv4());
    setValue('title', '');
    setValue('description', '');
    setValue('dueDate', new Date());
    setValue('priority', 'Medium');
    setValue('status', 'Pending');
  };

  return (
    <div className="task-form-container">
      <h2>{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Title:</label>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{
              required: 'Title is required',
              minLength: {
                value: 3,
                message: 'Title must be at least 3 characters long',
              },
            }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  className={errors.title ? 'error-input' : ''}
                />
                {errors.title && (
                  <p className="error-message">{errors.title.message}</p>
                )}
              </>
            )}
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <>
                <textarea
                  {...field}
                  className={errors.description ? 'error-input' : ''}
                />
                {errors.description && (
                  <p className="error-message">{errors.description.message}</p>
                )}
              </>
            )}
          />
        </div>

        <div className="form-group">
          <label>Due Date:</label>
          <Controller
            name="dueDate"
            control={control}
            defaultValue={new Date()}
            rules={{ required: 'Due Date is required' }}
            render={({ field }) => (
              <>
                <DatePicker
                  selected={new Date(field.value)}
                  onChange={(date) => handleDateChange(date)}
                  className={errors.dueDate ? 'error-input' : ''}
                />
                {errors.dueDate && (
                  <p className="error-message">{errors.dueDate.message}</p>
                )}
              </>
            )}
          />
        </div>

        <div className="form-group">
          <label>Priority:</label>
          <Controller
            name="priority"
            control={control}
            defaultValue={'Medium'}
            render={({ field }) => (
              <select {...field}>
                {PriorityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        <div className="form-group">
          <label>Status:</label>
          <Controller
            name="status"
            control={control}
            defaultValue={TaskStatus.PENDING}
            render={({ field }) => (
              <select {...field}>
                {StatusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
        <div className="button-container">
          <button type="submit" className="button btn-primary">
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>

          <button className="button cancel-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
