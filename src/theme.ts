import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673AB7', // Deep Purple - une couleur forte et distincte
    },
    secondary: {
      main: '#FFEB3B', // Amber - un jaune vif et contrastant
    },
    text: {
      primary: '#333333', // Texte sombre pour une meilleure lisibilité sur les éléments clairs
      secondary: '#555555',
    },
  },
  typography: {
    h4: {
      fontWeight: 700, // Plus audacieux
      marginBottom: '1.5rem',
      color: '#FFFFFF', // Titre blanc pour contraster avec le fond sombre
    },
    body1: {
      fontSize: '1.1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Coins plus arrondis
          fontWeight: 'bold', // Texte plus audacieux
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Ombre subtile
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)', // Léger soulèvement au survol
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', // Ombre plus prononcée au survol
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Coins plus arrondis
          '& .MuiOutlinedInput-root': {
            borderRadius: 12, // Appliquer aux bordures de l'input
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fond légèrement transparent pour le champ de texte
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          marginBottom: '12px', // Plus d'espace entre les éléments
          borderRadius: '12px', // Coins plus arrondis
          background: 'rgba(255, 255, 255, 0.2)', // Fond semi-transparent
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', // Ombre glassmorphism
          backdropFilter: 'blur(4px)', // Effet de flou
          border: '1px solid rgba(255, 255, 255, 0.18)', // Bordure subtile
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out', // Transition douce pour le survol
          '&:hover': {
            transform: 'translateY(-3px)', // Effet de soulèvement au survol
            boxShadow: '0 10px 40px 0 rgba(31, 38, 135, 0.45)', // Ombre encore plus prononcée au survol
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
          // Arrière-plan plus sombre pour faire ressortir le glassmorphism
          background: 'linear-gradient(135deg, #8A2BE2 0%, #FF69B4 100%)', // Un dégradé plus vibrant et contrasté
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.1)', // Fond semi-transparent pour le conteneur principal
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', // Ombre glassmorphism
          backdropFilter: 'blur(10px)', // Effet de flou plus prononcé pour le conteneur
          borderRadius: '20px', // Coins plus arrondis
          border: '1px solid rgba(255, 255, 255, 0.18)', // Bordure subtile
          padding: '20px', // Espacement interne
        },
      },
    },
  },
});

export default theme;

