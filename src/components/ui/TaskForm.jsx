import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../../counter/taskSlice';

const TaskForm = ({ onClose, initialData }) => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();

  const dispatch = useDispatch();

  // Populate the form fields when editing a task
  useEffect(() => {
    if (initialData) {
      titleRef.current.value = initialData.title;
      descriptionRef.current.value = initialData.description;
      dueDateRef.current.value = initialData.dueDate;
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = titleRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    const dueDate = dueDateRef.current.value;

    if (title && description && dueDate) {
      if (initialData) {
        // Editing an existing task
        dispatch(
          editTask({
            id: initialData.id,
            title,
            description,
            dueDate,
          })
        );
      } else {
        // Adding a new task
        dispatch(
          addTask({
            id: Date.now(),
            title,
            description,
            dueDate,
          })
        );
      }

      onClose(); // Close the form after submission
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: 'rebeccapurple',
        height: '238px',
        width: '200px',
        placeItems: 'center',
        borderRadius: '5px',
      }}
    >
      <div>
        <label style={{ marginLeft: '5px' }}>Title:</label>
        <input type="text" style={{ marginLeft: '5px', color: 'black' }} ref={titleRef} required />
      </div>
      <div>
        <label style={{ marginLeft: '5px' }}>Description:</label>
        <textarea style={{ marginLeft: '5px', color: 'black' }} ref={descriptionRef} required></textarea>
      </div>
      <div>
        <label style={{ marginLeft: '5px' }}>Due Date:</label>
        <input type="date" style={{ marginLeft: '5px', color: 'black' }} ref={dueDateRef} required />
      </div>
      <div style={{ marginTop: '10px' }}>
        <button type="submit" style={{ backgroundColor: 'black', width: '70px', borderRadius: '5px' }}>
          {initialData ? 'Update Task' : 'Add Task'}
        </button>
        <button
          type="button"
          style={{
            backgroundColor: 'black',
            width: '70px',
            marginLeft: '7px',
            borderRadius: '5px',
          }}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
