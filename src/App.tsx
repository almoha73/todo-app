import { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Define the base URL for your Express API
const API_BASE_URL = import.meta.env.VITE_EXPRESS_API_URL;

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
      const response = await fetch(`${API_BASE_URL}/api/todos`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Todo[] = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (inputValue.trim() === '') return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputValue, completed: false }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newTodo: Todo = await response.json();
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputValue('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id: number) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/todos?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todoToUpdate.completed }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Assuming the backend returns the updated todo
      const updatedTodo: Todo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
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
              sx={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#B0B0B0' : '#FFFFFF' }}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;