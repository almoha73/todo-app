import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00E676', // Vert vif pour un contraste élevé
    },
    secondary: {
      main: '#FF3D00', // Rouge-orange vif
    },
    text: {
      primary: '#FFFFFF', // Texte blanc pour une lisibilité maximale sur fond sombre
      secondary: '#B0B0B0', // Gris clair pour le texte secondaire
    },
    background: {
      default: '#121212', // Fond très sombre
      paper: '#1E1E1E', // Un peu plus clair pour les surfaces "papier"
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
      marginBottom: '1.5rem',
      color: '#FFFFFF', // Le titre reste blanc
    },
    body1: {
      fontSize: '1.1rem',
      color: '#FFFFFF', // Le corps du texte est également blanc
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 'bold',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)', // Ombre plus visible sur fond sombre
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.6)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fond du champ de texte plus subtil
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)', // Bordure plus visible
            },
            '&:hover fieldset': {
              borderColor: '#00E676', // Bordure de couleur primaire au survol
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00E676', // Bordure de couleur primaire au focus
            },
          },
          '& .MuiInputLabel-root': {
            color: '#B0B0B0', // Label gris clair
          },
          '& .MuiInputBase-input': {
            color: '#FFFFFF', // Texte de l'input en blanc
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          marginBottom: '12px',
          borderRadius: '12px',
          background: 'rgba(30, 30, 30, 0.5)', // Fond de l'élément de liste plus sombre
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 10px 40px 0 rgba(0, 0, 0, 0.45)',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          display: 'flex',
          justifyContent: 'center',
          minHeight: '100vh',
          margin: 0,
          background: 'linear-gradient(135deg, #0D1B2A 0%, #1B263B 100%)', // Dégradé de bleu nuit
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 0, 0, 0.2)', // Conteneur principal plus sombre et transparent
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          backdropFilter: 'blur(12px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '20px',
        },
      },
    },
  },
});

export default theme;

