import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../counter/taskSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
