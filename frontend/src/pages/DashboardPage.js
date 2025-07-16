import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  CircularProgress, 
  Fade,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
  Container,
  Button
} from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link as RouterLink } from 'react-router-dom'; // Import for navigation

import RoomService from '../services/roomService';
import GuestService from '../services/guestService';
import BookingService from '../services/bookingService';
import StatCardV2 from '../components/StatCardV2';

// Mock data for the chart (replace with real data from API if available)
const chartData = [
  { name: 'Jan', bookings: 12, revenue: 2400 },
  { name: 'Feb', bookings: 19, revenue: 3490 },
  { name: 'Mar', bookings: 3, revenue: 1200 },
  { name: 'Apr', bookings: 5, revenue: 2780 },
  { name: 'May', bookings: 2, revenue: 1890 },
  { name: 'Jun', bookings: 8, revenue: 2390 },
  { name: 'Jul', bookings: 15, revenue: 4500 },
];

const DashboardPage = () => {
  const [stats, setStats] = useState({ totalRooms: 0, occupiedRooms: 0, availableRooms: 0, totalGuests: 0, upcomingBookings: 0 });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      Promise.all([
        RoomService.getAll(),
        GuestService.getAll(),
        BookingService.getUpcomingCount(),
        BookingService.getAll()
      ])
      .then(([roomsRes, guestsRes, upcomingBookingsRes, allBookingsRes]) => {
        const rooms = roomsRes.data || []; // Ensure data is an array, default to empty if null/undefined
        const occupied = rooms.filter(r => r.status?.toLowerCase() === 'occupied').length || 0;
        const available = rooms.filter(r => r.status?.toLowerCase() === 'available').length || 0;
        const totalRooms = rooms.length || 0;
        const sortedBookings = allBookingsRes.data.sort((a, b) => b.bookingId - a.bookingId).slice(0, 5);

        setStats({
          totalRooms: totalRooms,
          occupiedRooms: occupied,
          availableRooms: available,
          totalGuests: guestsRes.data.length || 0,
          upcomingBookings: upcomingBookingsRes.data.count || 0
        });
        setRecentBookings(sortedBookings);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load dashboard stats:", err);
        setLoading(false); // Ensure loading state is reset on error
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Fade in={!loading}>
      <Container maxWidth="lg" sx={{ bgcolor: '#ffffffff', p: 3, borderRadius: '16px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Dashboard
          </Typography>
        </Box>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {loading ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Grid>
          ) : (
            <>
              <Grid item xs={12} sm={6} lg={3}>
                <StatCardV2 title="Total Rooms" value={stats.totalRooms} icon={<HotelIcon />} gradient="linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)" linkTo="/rooms" change="11" changeDirection="up" />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <StatCardV2 title="Occupied Rooms" value={stats.occupiedRooms} icon={<EventBusyIcon />} gradient="linear-gradient(45deg, #ff9800 30%, #ffc107 90%)" linkTo="/rooms?status=Occupied" change="15" changeDirection="up" />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <StatCardV2 title="Available Rooms" value={stats.availableRooms} icon={<CheckCircleIcon />} gradient="linear-gradient(45deg, #330091ff 30%, #a575ffff 90%)" linkTo="/rooms?status=Available" change="13" changeDirection="down" />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <StatCardV2 title="Total Guests" value={stats.totalGuests} icon={<PeopleIcon />} gradient="linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)" linkTo="/guests" change="10" changeDirection="up" />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <StatCardV2 title="Upcoming Check-ins" value={stats.upcomingBookings} icon={<EventAvailableIcon />} gradient="linear-gradient(45deg, #f44336 30%, #ff5722 90%)" linkTo="/bookings" change="13" changeDirection="down" />
              </Grid>
            </>
          )}
        </Grid>

        <Grid container spacing={3}>
          {/* Monthly Revenue Chart - Full Width */}
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Paper sx={{ p: 2, borderRadius: '16px', height: '431px', width: '720px' }}>
              <Typography variant="h6" gutterBottom>Monthly Revenue</Typography>
              <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#1976d2" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: '#1976d2' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#1976d2" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                    animationDuration={1000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Recent Activity - Full Width Below Chart */}
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Paper sx={{ p: 2, borderRadius: '16px' }}>
              <Typography variant="h6" gutterBottom>Recent Activity</Typography>
              <List>
                {recentBookings.slice(0, 4).map((booking, index) => ( // Limit to 4 bookings
                  <React.Fragment key={booking.bookingId}>
                    <ListItem 
                      sx={{
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: '8px' },
                        transition: 'background-color 0.3s ease',
                      }}
                    >
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: 'primary.light', width: 40, height: 40 }}>
                          <CheckCircleOutlineIcon fontSize="small"/>
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText 
                        primary={`Booking for ${booking.guest?.firstName || 'Guest'} in Room ${booking.room?.roomNumber || 'N/A'}`}
                        secondary={`Status: ${booking.status}`}
                        primaryTypographyProps={{ fontWeight: 'medium' }}
                        secondaryTypographyProps={{ color: 'text.secondary' }}
                      />
                    </ListItem>
                    {index < 3 && <Divider variant="inset" component="li" />} {/* Divider for first 3 items */}
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  component={RouterLink}
                  to="/bookings"
                  sx={{
                    textTransform: 'none',
                    borderRadius: '8px',
                    padding: '5px 130px',
                    fontWeight: 500,
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      backgroundColor: '#e3f2fd', // Light blue hover background
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                      borderColor: '#1976d2', // Darker primary color on hover
                    },
                  }}
                >
                  View All
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
};

export default DashboardPage;