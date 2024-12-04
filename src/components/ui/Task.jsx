import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleCompleted } from '../../counter/taskSlice';

const Task = ({ id, title, description, dueDate, completed, onEdit }) => {
  const dispatch = useDispatch();

  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px 0',backgroundColor:"#f51b56",borderRadius:"5px",boxShadow:"1px 1px 5px" }}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Due: {dueDate}</p>
      <p>Status: {completed ? 'Completed' : 'Pending'}</p>
     
      <button style={{backgroundColor:"#26d333",borderRadius:"5px"}} onClick={() => dispatch(toggleCompleted(id))}>
        {completed ? 'Mark as Pending' : 'Mark as Completed'}
      </button>
      <button style={{backgroundColor:"#282526",marginLeft:"7px",borderRadius:"5px"}} onClick={() => onEdit(id)}>Edit</button>
      <button style={{backgroundColor:"#d51431",marginLeft:"7px",borderRadius:"5px"}} onClick={() => dispatch(deleteTask(id))}>Delete</button>
    
    </div>
  );
};

export default Task;
