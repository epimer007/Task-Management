import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    isFormVisible: false, // New property to manage form visibility
    filter: 'ALL',
  },
  reducers: {
    addTask: (state, action) => {
      const { id, title, description, dueDate } = action.payload;
      state.tasks.push({ id, title, description, dueDate, completed: false });
    },
    editTask: (state, action) => {
      const { id, title, description, dueDate } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
      }
    },
    deleteTask: (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    toggleCompleted: (state, action) => {
      const id = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.completed = !task.completed;
      }
    },
    showForm: (state) => {
      state.isFormVisible = true;
    },
    hideForm: (state) => {
      state.isFormVisible = false;
    },
    setFilter(state, action) {
      state.filter = action.payload; // Update the filter
    },
  },
});

export const { addTask, editTask, deleteTask, toggleCompleted, showForm, hideForm, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
