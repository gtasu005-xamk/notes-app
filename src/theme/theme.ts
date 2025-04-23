// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0F1115',         // päätausta
      paper: '#1A1D22',           // korttien tausta
    },
    primary: {
      main: '#3B82F6',            // sininen (graafit, korostus)
    },
    secondary: {
      main: '#64748B',            // neutraali harmaa
    },
    success: {
      main: '#22C55E',            // vihreä
    },
    error: {
      main: '#EF4444',            // punainen
    },
    text: {
      primary: '#F8FAFC',         // vaalea teksti
      secondary: '#94A3B8',       // harmaampi teksti
    },
    divider: '#1F2937',           // rajat, viivat
  },
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#161A20',
          color: '#F8FAFC',
          borderRight: '1px solid #1F2937',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1D22',
          borderBottom: '1px solid #1F2937',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1D22',
          borderRadius: 12,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginInline: 4,
          '&.Mui-selected': {
            backgroundColor: '#1E293B',
            color: '#F8FAFC',
          },
          '&:hover': {
            backgroundColor: '#1F2A38',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: '#1F2937',
          },

          
        },
      },
    },
  }, 
});

export default theme;

