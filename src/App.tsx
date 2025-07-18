import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { supabase } from './supabaseClient';

interface Todo {
  id: string; // Supabase UUIDs are strings
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
    const { data, error } = await supabase
      .from('todos')
      .select('id, text, completed')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching todos:', error.message);
    } else {
      setTodos(data || []);
    }
  };

  const addTodo = async () => {
    if (inputValue.trim() === '') return;

    const { data, error } = await supabase
      .from('todos')
      .insert([{ text: inputValue, completed: false }])
      .select(); // Select the inserted data to get the generated ID

    if (error) {
      console.error('Error adding todo:', error.message);
    } else if (data && data.length > 0) {
      setTodos((prevTodos) => [...prevTodos, data[0]]);
      setInputValue('');
    }
  };

  const toggleTodo = async (id: string) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const { error } = await supabase
      .from('todos')
      .update({ completed: !todoToUpdate.completed })
      .eq('id', id);

    if (error) {
      console.error('Error toggling todo:', error.message);
    } else {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    }
  };

  const deleteTodo = async (id: string) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting todo:', error.message);
    } else {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 4 }}>
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
                <DeleteIcon />
              </IconButton>
            }
            sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            <ListItemText primary={todo.text} onClick={() => toggleTodo(todo.id)} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
