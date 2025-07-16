import React, { useState, useEffect, useMemo } from 'react';
import { 
    Box, 
    Typography, 
    Button, 
    Container, 
    CircularProgress, 
    Paper, 
    Grid, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem,
    TextField,
    InputAdornment,
    Fade,
    Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import RoomList from '../components/RoomList';
import RoomDialog from '../components/RoomDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import RoomService from '../services/roomService';

const RoomsPage = () => {
    // State for the main list of rooms from the API
    const [rooms, setRooms] = useState([]);
    // State to control the loading spinner
    const [loading, setLoading] = useState(true);
    // State to control the Add/Edit dialog
    const [open, setOpen] = useState(false);
    // State to hold the room data when editing
    const [editingRoom, setEditingRoom] = useState(null);
    // State to control the delete confirmation dialog
    const [confirmOpen, setConfirmOpen] = useState(false);
    // State to hold the ID of the room to be deleted
    const [idToDelete, setIdToDelete] = useState(null);

    // --- State for Filters ---
    const [statusFilter, setStatusFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // Fetch rooms from the API when the component first loads
    useEffect(() => {
        fetchRooms();
    }, []);

    // Function to fetch all rooms from the backend
    const fetchRooms = () => {
        setLoading(true);
        RoomService.getAll().then(response => {
            setRooms(response.data);
            setLoading(false);
        }).catch(error => {
            console.error("Error fetching rooms:", error);
            setLoading(false);
        });
    };

    // --- Filtering Logic ---
    const filteredRooms = useMemo(() => {
        return rooms.filter(room => {
            const statusMatch = statusFilter === 'All' || room.status === statusFilter;
            const typeMatch = typeFilter === 'All' || room.type === typeFilter;
            const searchMatch = room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase());
            
            const minPriceParsed = parseFloat(minPrice);
            const maxPriceParsed = parseFloat(maxPrice);
            const minPriceMatch = isNaN(minPriceParsed) || room.pricePerNight >= minPriceParsed;
            const maxPriceMatch = isNaN(maxPriceParsed) || room.pricePerNight <= maxPriceParsed;

            return statusMatch && typeMatch && searchMatch && minPriceMatch && maxPriceMatch;
        });
    }, [rooms, statusFilter, typeFilter, searchQuery, minPrice, maxPrice]);

    // Handler to reset all filters to their default state
    const handleResetFilters = () => {
        setStatusFilter('All');
        setTypeFilter('All');
        setSearchQuery('');
        setMinPrice('');
        setMaxPrice('');
    };

    // ... (other handler functions remain the same) ...
    const handleOpenDialog = () => { setEditingRoom(null); setOpen(true); };
    const handleEdit = (room) => { setEditingRoom(room); setOpen(true); };
    const handleCloseDialog = () => setOpen(false);
    const handleSave = (data, id) => {
        const promise = id ? RoomService.update(id, data) : RoomService.create(data);
        promise.then(() => { fetchRooms(); handleCloseDialog(); }).catch(error => console.error("Error saving room:", error));
    };
    const handleDelete = (id) => { setIdToDelete(id); setConfirmOpen(true); };
    const handleConfirmDelete = () => {
        RoomService.remove(idToDelete).then(() => { fetchRooms(); setConfirmOpen(false); }).catch(error => console.error("Error deleting room:", error));
    };

    return (
        <Fade in={true}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Room Management
                    </Typography>
                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />} 
                        onClick={handleOpenDialog}
                        sx={{ borderRadius: '20px', px: 3, py: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                    >
                        Add New Room
                    </Button>
                </Box>

                {/* --- New, Unified Filter Bar Style --- */}
                <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: '12px', border: '1px solid #e0e0e0' }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                label="Search Room"
                                variant="outlined"
                                size="small"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                InputProps={{
                                    startAdornment: ( <InputAdornment position="start"><SearchIcon /></InputAdornment> ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                             <FormControl fullWidth size="small">
                                <InputLabel>Type</InputLabel>
                                <Select value={typeFilter} label="Type" onChange={(e) => setTypeFilter(e.target.value)}>
                                    <MenuItem value="All">All Types</MenuItem>
                                    <MenuItem value="Single">Single</MenuItem>
                                    <MenuItem value="Double">Double</MenuItem>
                                    <MenuItem value="Suite">Suite</MenuItem>
                                    <MenuItem value="Family">Family</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Status</InputLabel>
                                <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
                                    <MenuItem value="All">All Statuses</MenuItem>
                                    <MenuItem value="Available">Available</MenuItem>
                                    <MenuItem value="Occupied">Occupied</MenuItem>
                                    <MenuItem value="Maintenance">Maintenance</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <TextField fullWidth label="Min Price" variant="outlined" type="number" size="small" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} />
                                <TextField fullWidth label="Max Price" variant="outlined" type="number" size="small" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={2} sx={{textAlign: 'right'}}>
                             <Button onClick={handleResetFilters} variant="text">Reset Filters</Button>
                        </Grid>
                    </Grid>
                </Paper>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <RoomList rooms={filteredRooms} onEdit={handleEdit} onDelete={handleDelete} />
                )}
                
                <RoomDialog open={open} onClose={handleCloseDialog} onSave={handleSave} room={editingRoom} />
                
                <ConfirmDialog open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleConfirmDelete} title="Delete Room" message="Are you sure you want to delete this room?" />
            </Container>
        </Fade>
    );
};

export default RoomsPage;
