import { createTheme } from '@mui/material/styles';

// កំណត់ Palette ពណ៌ដែលមានความเป็นมืออาชีพ
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000ff', // ពណ៌ខៀវចាស់
    },
    secondary: {
      main: '#dc004e', // ពណ៌ Accent
    },
    background: {
      default: '#ffffffff', // ពណ៌พื้นหลังเทาอ่อน
      paper: '#ffffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    // កំណត់ Style เริ่มต้นสำหรับ Card
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
          },
        },
      },
    },
  },
});

export default theme;