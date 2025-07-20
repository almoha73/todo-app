import { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { supabase } from './supabaseClient';

interface Todo {
  id: number; // Using number for now, will be managed by Express backend
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setTodos(data || []);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (inputValue.trim() === '') return;

    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([{ text: inputValue, completed: false }])
        .select()
        .single();

      if (error) throw error;
      setTodos((prevTodos) => [data, ...prevTodos]);
      setInputValue('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id: number) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    try {
      const { data, error } = await supabase
        .from('todos')
        .update({ completed: !todoToUpdate.completed })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? data : todo
        )
      );
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Ma Liste de Tâches
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Ajouter une nouvelle tâche"
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTodo();
            }
          }}
        />
        <Button variant="contained" onClick={addTodo}>Ajouter</Button>
      </Box>
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
                <DeleteIcon sx={{ color: '#FF3D00' }} />
              </IconButton>
            }
          >
            <ListItemText 
              primary={todo.text} 
              onClick={() => toggleTodo(todo.id)} 
              sx={{ 
                textDecoration: todo.completed ? 'line-through' : 'none', 
                color: todo.completed ? '#888888' : '#FFFFFF',
                textDecorationThickness: todo.completed ? '3px' : 'initial',
                textDecorationColor: todo.completed ? '#FF6B6B' : 'initial',
                opacity: todo.completed ? 0.7 : 1,
                cursor: 'pointer'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;