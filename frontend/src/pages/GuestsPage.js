import React, { useState, useEffect, useMemo } from 'react';
import { 
    Box, 
    Typography, 
    Button, 
    Container, 
    CircularProgress,
    Paper,
    Grid,
    TextField,
    InputAdornment,
    Fade
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import GuestList from '../components/GuestList';
import GuestDialog from '../components/GuestDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import GuestService from '../services/guestService';

const GuestsPage = () => {
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editingGuest, setEditingGuest] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    // --- State for Filter ---
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchGuests();
    }, []);

    const fetchGuests = () => {
        setLoading(true);
        GuestService.getAll().then(response => {
            setGuests(response.data);
            setLoading(false);
        }).catch(error => {
            console.error("Error fetching guests:", error);
            setLoading(false);
        });
    };

    // --- Filtering Logic ---
    const filteredGuests = useMemo(() => {
        if (!searchQuery) {
            return guests;
        }
        return guests.filter(guest => {
            const fullName = `${guest.firstName} ${guest.lastName}`.toLowerCase();
            const email = guest.email.toLowerCase();
            const query = searchQuery.toLowerCase();
            
            return fullName.includes(query) || email.includes(query);
        });
    }, [guests, searchQuery]);

    const handleOpenDialog = () => { setEditingGuest(null); setOpen(true); };
    const handleEdit = (guest) => { setEditingGuest(guest); setOpen(true); };
    const handleCloseDialog = () => setOpen(false);
    const handleSave = (data, id) => {
        const promise = id ? GuestService.update(id, data) : GuestService.create(data);
        promise.then(() => { fetchGuests(); handleCloseDialog(); }).catch(error => console.error("Error saving guest:", error));
    };
    const handleDelete = (id) => { setIdToDelete(id); setConfirmOpen(true); };
    const handleConfirmDelete = () => {
        GuestService.remove(idToDelete).then(() => { fetchGuests(); setConfirmOpen(false); }).catch(error => console.error("Error deleting guest:", error));
    };

    return (
        <Fade in={true}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Guest Management
                    </Typography>
                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />} 
                        onClick={handleOpenDialog}
                        sx={{ borderRadius: '20px', px: 3, py: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                    >
                        Add New Guest
                    </Button>
                </Box>

                {/* --- Filter Bar --- */}
                <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: '12px', border: '1px solid #e0e0e0' }}>
                    <TextField
                        fullWidth
                        placeholder="Search by Guest Name or Email..."
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Paper>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <GuestList guests={filteredGuests} onEdit={handleEdit} onDelete={handleDelete} />
                )}
                
                <GuestDialog open={open} onClose={handleCloseDialog} onSave={handleSave} guest={editingGuest} />
                <ConfirmDialog open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleConfirmDelete} title="Delete Guest" message="Are you sure you want to delete this guest?" />
            </Container>
        </Fade>
    );
};

export default GuestsPage;
