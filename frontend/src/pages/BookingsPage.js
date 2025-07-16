import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Button, Container, CircularProgress, Paper, Grid, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import BookingList from '../components/BookingList';
import BookingDialog from '../components/BookingDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import BookingService from '../services/bookingService';
import GuestService from '../services/guestService';
import RoomService from '../services/roomService';
import { useSnackbar } from 'notistack';

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [guests, setGuests] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingBooking, setEditingBooking] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => { fetchData(); }, []);

    const fetchData = () => {
        setLoading(true);
        Promise.all([BookingService.getAll(), GuestService.getAll(), RoomService.getAll()])
            .then(([bookingsRes, guestsRes, roomsRes]) => {
                setBookings(bookingsRes.data);
                setGuests(guestsRes.data);
                setRooms(roomsRes.data);
                setLoading(false);
            }).catch(error => { console.error("Error fetching data:", error); setLoading(false); });
    };
    
    const filteredBookings = useMemo(() => {
        return bookings.filter(booking => {
            const guestName = `${booking.guest?.firstName} ${booking.guest?.lastName}`.toLowerCase();
            const roomNumber = booking.room?.roomNumber.toLowerCase();
            const searchMatch = guestName.includes(searchQuery.toLowerCase()) || roomNumber.includes(searchQuery.toLowerCase());
            const statusMatch = statusFilter === 'All' || (booking.status && booking.status === statusFilter);
            return searchMatch && statusMatch;
        });
    }, [bookings, searchQuery, statusFilter]);

    const handleOpenDialog = () => { setEditingBooking(null); setOpenDialog(true); };
    const handleEdit = (booking) => { setEditingBooking(booking); setOpenDialog(true); };
    const handleCloseDialog = () => setOpenDialog(false);
    
    const handleSave = (data, id) => {
        const promise = id ? BookingService.update(id, data) : BookingService.create(data);
        promise.then(() => {
            enqueueSnackbar(`Booking ${id ? 'updated' : 'created'} successfully!`, { variant: 'success' });
            fetchData();
            handleCloseDialog();
        }).catch(error => {
            const message = error.response?.data?.message || `Failed to ${id ? 'update' : 'create'} booking.`;
            enqueueSnackbar(message, { variant: 'error' });
        });
    };

    const handleDeleteRequest = (id) => { setIdToDelete(id); setConfirmOpen(true); };
    
    const handleConfirmDelete = () => {
        BookingService.remove(idToDelete).then(() => {
            enqueueSnackbar('Booking deleted successfully.', { variant: 'info' });
            fetchData();
        }).catch(err => enqueueSnackbar('Failed to delete booking.', { variant: 'error' }))
          .finally(() => { setConfirmOpen(false); setIdToDelete(null); });
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Booking Management</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenDialog} sx={{ borderRadius: '20px', px: 3, py: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>Create Booking</Button>
            </Box>

            <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: '12px', border: '1px solid #e0e0e0' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}><TextField fullWidth placeholder="Search by Guest Name or Room Number..." variant="outlined" size="small" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} InputProps={{ startAdornment: ( <InputAdornment position="start"><SearchIcon /></InputAdornment> ), }} /></Grid>
                    <Grid item xs={12} sm={4}><FormControl fullWidth size="small"><InputLabel>Status</InputLabel><Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}><MenuItem value="All">All Statuses</MenuItem><MenuItem value="Confirmed">Confirmed</MenuItem><MenuItem value="Checked-In">Checked-In</MenuItem><MenuItem value="Checked-Out">Checked-Out</MenuItem><MenuItem value="Cancelled">Cancelled</MenuItem></Select></FormControl></Grid>
                </Grid>
            </Paper>

            {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box> : <BookingList bookings={filteredBookings} onEdit={handleEdit} onDelete={handleDeleteRequest} />}
            <BookingDialog open={openDialog} onClose={handleCloseDialog} onSave={handleSave} guests={guests} rooms={rooms} booking={editingBooking} />
            <ConfirmDialog open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleConfirmDelete} title="Delete Booking" message="Are you sure you want to permanently delete this booking?" />
        </Container>
    );
};
export default BookingsPage;