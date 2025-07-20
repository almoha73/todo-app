import { supabase } from '../supabaseClient';

export default async function handler(req, res) {
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
    const { data, error } = await supabase.from('todos').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } 
  else if (req.method === 'POST') {
    const { text, completed } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    const { data, error } = await supabase.from('todos').insert([{ text, completed: completed || false }]).select();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
  }
  else if (req.method === 'PUT' && id) {
    const { text, completed } = req.body;
    const { data, error } = await supabase.from('todos').update({ text, completed }).eq('id', id).select();
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ error: 'Todo not found' });
    res.json(data[0]);
  }
  else if (req.method === 'DELETE' && id) {
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(204).end();
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
