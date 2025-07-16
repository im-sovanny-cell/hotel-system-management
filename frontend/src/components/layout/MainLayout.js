import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, Toolbar, Typography, AppBar } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import theme from '../../theme';
import Sidebar from './Sidebar';
import DashboardPage from '../../pages/DashboardPage';
import RoomsPage from '../../pages/RoomsPage';
import GuestsPage from '../../pages/GuestsPage';
import BookingsPage from '../../pages/BookingsPage';
import { useSnackbar } from 'notistack';

const MainLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    // This function will be passed to the Sidebar to handle the logout action
    const handleLogout = () => {
        logout();
        enqueueSnackbar('You have been logged out successfully.', { variant: 'info' });
        navigate('/login');
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        {/* The MenuIcon button is now removed from here */}
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            Hotel Management System
                        </Typography>
                    </Toolbar>
                </AppBar>
                
                {/* The Sidebar now manages its own open/close state */}
                <Sidebar onLogout={handleLogout} />
                
                <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: (theme) => theme.palette.background.default, minHeight: '100vh' }}>
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/rooms" element={<RoomsPage />} />
                        <Route path="/guests" element={<GuestsPage />} />
                        <Route path="/bookings" element={<BookingsPage />} />
                    </Routes>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default MainLayout;
