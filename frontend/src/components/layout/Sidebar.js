import React, { useState } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Typography, styled, Divider, Avatar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HotelIcon from '@mui/icons-material/Hotel';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BusinessIcon from '@mui/icons-material/Business';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import RegisterDialog from '../auth/RegisterDialog';
import ConfirmDialog from '../ConfirmDialog';
import { useAuth } from '../../context/AuthContext'; // Import useAuth to get user info

const drawerWidth = 240;
const collapsedDrawerWidth = 60;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Rooms', icon: <HotelIcon />, path: '/rooms' },
    { text: 'Guests', icon: <PeopleIcon />, path: '/guests' },
    { text: 'Bookings', icon: <CalendarMonthIcon />, path: '/bookings' },
];

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  borderRight: 'none',
  backgroundColor: '#1c2536',
  color: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: collapsedDrawerWidth,
  borderRight: 'none',
  backgroundColor: '#1c2536',
  color: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
});


const Sidebar = ({ onLogout }) => {
    const { user } = useAuth(); // Get current user from context
    const location = useLocation();
    const [open, setOpen] = useState(true); // Sidebar now manages its own state
    const [openRegister, setOpenRegister] = useState(false);
    const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleConfirmLogout = () => {
        setLogoutConfirmOpen(false);
        onLogout();
    };

    return (
        <>
            <StyledDrawer variant="permanent" open={open}>
                <Toolbar>
                    <BusinessIcon sx={{ mr: open ? 2 : 'auto', color: '#1976d2' }} />
                    <Typography variant="h6" noWrap component="div" sx={{ opacity: open ? 1 : 0 }}>
                        HotelSys
                    </Typography>
                </Toolbar>
                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}/>

                {/* User Info Section */}
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {user?.username ? user.username.charAt(0).toUpperCase() : 'A'}
                    </Avatar>
                    <Typography variant="subtitle1" sx={{ opacity: open ? 1 : 0, transition: 'opacity 0.3s' }}>
                        {user?.username || 'Admin'}
                    </Typography>
                </Box>
                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}/>
                
                {/* Main navigation menu */}
                <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton component={RouterLink} to={item.path} selected={location.pathname.startsWith(item.path)} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, color: 'rgba(255, 255, 255, 0.7)', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)', }, '&.Mui-selected': { backgroundColor: '#1976d2', color: 'white', '&:hover': { backgroundColor: '#1976d2' } }, }}>
                                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: 'inherit' }}>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                
                {/* This Box contains the bottom action items */}
                <Box>
                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}/>
                    <List>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton onClick={() => setOpenRegister(true)} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, color: 'rgba(255, 255, 255, 0.7)', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)', } }}>
                                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: 'inherit' }}><PersonAddIcon /></ListItemIcon>
                                <ListItemText primary="Register User" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton onClick={() => setLogoutConfirmOpen(true)} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, color: 'rgba(255, 255, 255, 0.7)', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)', } }}>
                                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: 'inherit' }}><LogoutIcon /></ListItemIcon>
                                <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}/>
                        {/* The new toggle button */}
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton onClick={handleDrawerToggle} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, color: 'rgba(255, 255, 255, 0.7)', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)', } }}>
                                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: 'inherit' }}>
                                    <ChevronLeftIcon sx={{ transform: open ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s' }} />
                                </ListItemIcon>
                                <ListItemText primary="Collapse" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </StyledDrawer>
            
            <RegisterDialog open={openRegister} onClose={() => setOpenRegister(false)} />
            <ConfirmDialog open={logoutConfirmOpen} onClose={() => setLogoutConfirmOpen(false)} onConfirm={handleConfirmLogout} title="Confirm Logout" message="Are you sure you want to logout?" />
        </>
    );
};

export default Sidebar;