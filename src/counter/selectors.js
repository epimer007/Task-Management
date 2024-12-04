export const selectFilteredTasks = (state) => {
    const { tasks, filter } = state.tasks;
  
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  
    switch (filter) {
      case 'COMPLETED':
        return tasks.filter((task) => task.completed);
      case 'PENDING':
        return tasks.filter((task) => !task.completed && new Date(task.dueDate) >= new Date(currentDate));
      case 'OVERDUE':
        return tasks.filter((task) => !task.completed && new Date(task.dueDate) < new Date(currentDate));
      case 'ALL':
      default:
        return tasks;
    }
  };
  