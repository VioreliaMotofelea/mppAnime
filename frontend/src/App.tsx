import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Home from './pages/Home';
import AnimeDetail from './pages/AnimeDetail';
import Navbar from './components/Navbar';

// Create a custom anime-themed theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF69B4', // Hot pink - common in anime
      light: '#FFB6C1',
      dark: '#C71585',
    },
    secondary: {
      main: '#4A90E2', // Bright blue
      light: '#87CEEB',
      dark: '#1E3A8A',
    },
    background: {
      default: '#1A1A2E', // Dark blue background
      paper: '#16213E', // Slightly lighter blue for cards
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B8B8B8',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
        }}>
          <Navbar />
          <Box sx={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '2rem',
            '@media (max-width: 600px)': {
              padding: '1rem',
            },
          }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/anime/:id" element={<AnimeDetail />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
