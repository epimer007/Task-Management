import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Task from '../src/components/ui/Task';
import TaskForm from '../src/components/ui/TaskForm';
import { showForm, hideForm, setFilter } from '../src/counter/taskSlice';
import { selectFilteredTasks } from '../src/counter/selectors';

export default function Dashboard() {
  const { isFormVisible, filter } = useSelector((state) => state.tasks);
  const tasks = useSelector(selectFilteredTasks); // Get filtered tasks
  const dispatch = useDispatch();
  const [currentTask, setCurrentTask] = useState(null); // Track the task being edited

  const handleAddTaskClick = () => {
    setCurrentTask(null); // Reset currentTask for new task
    dispatch(showForm());
  };

  const handleEditTask = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setCurrentTask(task); // Set the task to be edited
      dispatch(showForm());
    }
  };

  const handleCloseForm = () => {
    setCurrentTask(null); // Reset currentTask when form is closed
    dispatch(hideForm());
  };

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter)); // Update filter in Redux
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1e293b', color: 'white', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: '16rem', backgroundColor: '#111827', padding: '1rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#a855f7' }}>Task Management</h1>
        </div>
        <nav>
          {['ALL', 'COMPLETED', 'PENDING', 'OVERDUE'].map((filterType) => (
            <a
              key={filterType}
              href="#"
              onClick={() => handleFilterChange(filterType)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                color: filter === filterType ? '#a855f7' : '#94a3b8',
                textDecoration: 'none',
                marginBottom: '0.5rem',
                backgroundColor: filter === filterType ? '#6b21a8' : '#1e293b',
              }}
            >
              <span>{filterType === 'ALL' ? 'All Tasks' : `${filterType.charAt(0)}${filterType.slice(1).toLowerCase()} Tasks`}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ padding: '2rem', width: '100%' }}>
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          <div
            style={{
              gridColumn: 'span 3',
              padding: '1.5rem',
              borderRadius: '1rem',
              color: 'white',
            }}
          >
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Tasks Analytics</h2>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ backgroundColor: '#7c3aed', padding: '1rem', borderRadius: '0.5rem' }}>
                <button onClick={handleAddTaskClick}>Add Task</button>
              </div>
            </div>

            <div style={{ padding: '20px' }}>
              {isFormVisible && (
                <TaskForm onClose={handleCloseForm} initialData={currentTask} />
              )}

              <div id="taskContainer">
                {tasks.map((task) => (
                  <Task
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    dueDate={task.dueDate}
                    completed={task.completed}
                    onEdit={handleEditTask}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
