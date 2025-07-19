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
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}