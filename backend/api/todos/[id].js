// This will be imported from todos.js in a real app
// For now, using in-memory storage (will reset on each deployment)
let todos = [];

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
    const todoIndex = todos.findIndex(todo => todo.id === todoId);

    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todos[todoIndex] = { 
      ...todos[todoIndex], 
      text: text || todos[todoIndex].text, 
      completed: typeof completed === 'boolean' ? completed : todos[todoIndex].completed 
    };
    res.json(todos[todoIndex]);
  } 
  else if (req.method === 'DELETE') {
    const initialLength = todos.length;
    todos = todos.filter(todo => todo.id !== todoId);

    if (todos.length === initialLength) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(204).end();
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}