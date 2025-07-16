import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
// We no longer need RegisterPage here as it's moved inside
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { SnackbarProvider } from 'notistack'; // <-- Import SnackbarProvider

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Wrap the app with SnackbarProvider */}
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              {/* The Register route is now implicitly inside MainLayout */}
              <Route path="/*" element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;