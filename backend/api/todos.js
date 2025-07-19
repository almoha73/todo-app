let todos = [];
let nextId = 1;

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

  if (req.method === 'GET') {
    res.json(todos);
  } 
  else if (req.method === 'POST') {
    const { text, completed } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    const newTodo = { id: nextId++, text, completed: completed || false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  }
  else if (req.method === 'PUT' && id) {
    const todoId = parseInt(id);
    const { text, completed } = req.body;
    const todoIndex = todos.findIndex(todo => todo.id === todoId);

    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todos[todoIndex] = { 
      ...todos[todoIndex], 
      text: text !== undefined ? text : todos[todoIndex].text, 
      completed: completed !== undefined ? completed : todos[todoIndex].completed 
    };
    res.json(todos[todoIndex]);
  }
  else if (req.method === 'DELETE' && id) {
    const todoId = parseInt(id);
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