const express = require('express');
const cors = require('cors');
const app = express();

// Use cors middleware
app.use(cors());
app.use(express.json()); // Enable JSON body parsing

let todos = []; // In-memory storage for todos
let nextId = 1; // Simple ID generator

// GET all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// POST a new todo
app.post('/api/todos', (req, res) => {
  const { text, completed } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  const newTodo = { id: nextId++, text, completed: completed || false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT (update) a todo
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { text, completed } = req.body;
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos[todoIndex] = { ...todos[todoIndex], text: text || todos[todoIndex].text, completed: typeof completed === 'boolean' ? completed : todos[todoIndex].completed };
  res.json(todos[todoIndex]);
});

// DELETE a todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter(todo => todo.id !== id);

  if (todos.length === initialLength) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.status(204).send(); // No Content
});

// Export the app for Vercel
module.exports = app;
