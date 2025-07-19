import { updateTodo, deleteTodo } from '../storage.js';

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;
  const todoId = parseInt(id);

  if (req.method === 'PUT') {
    const { text, completed } = req.body;
    const updatedTodo = updateTodo(todoId, { text, completed });

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(updatedTodo);
  } 
  else if (req.method === 'DELETE') {
    const deleted = deleteTodo(todoId);

    if (!deleted) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(204).end();
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}