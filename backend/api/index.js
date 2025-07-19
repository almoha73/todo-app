export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ 
    message: 'Todo API is running',
    endpoints: {
      todos: '/api/todos',
      todo: '/api/todos/[id]'
    }
  });
}