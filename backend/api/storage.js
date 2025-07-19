// Simple in-memory storage (will reset on cold starts)
// In production, use a real database like Supabase, PlanetScale, etc.

let todos = [];
let nextId = 1;

export const getTodos = () => todos;
export const addTodo = (todo) => {
  const newTodo = { id: nextId++, ...todo };
  todos.push(newTodo);
  return newTodo;
};
export const updateTodo = (id, updates) => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) return null;
  todos[index] = { ...todos[index], ...updates };
  return todos[index];
};
export const deleteTodo = (id) => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) return false;
  todos.splice(index, 1);
  return true;
};