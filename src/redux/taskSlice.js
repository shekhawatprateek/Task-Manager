import { createSlice } from '@reduxjs/toolkit';

const storedTasks = localStorage.getItem('tasks');
const initialState = Array.isArray(JSON.parse(storedTasks)) ? JSON.parse(storedTasks) : [];

console.log("<><>", initialState)

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        title: action.payload,
        status: 'pending',
      };
      state.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(state));
    },
    deleteTask: (state, action) => {
      const updated = state.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(updated));
      return updated;
    },
    completeTask: (state, action) => {
      const updated = state.map(task =>
        task.id === action.payload ? { ...task, status: 'completed' } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updated));
      return updated;
    },
  },
});

export const { addTask, deleteTask, completeTask } = taskSlice.actions;
export default taskSlice.reducer;
