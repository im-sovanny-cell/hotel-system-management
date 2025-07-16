import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

const BookingDialog = ({ open, onClose, onSave, guests, rooms, booking }) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    useEffect(() => {
        if (booking) { // Edit mode
            setValue('guestId', booking.guest.guestId);
            setValue('roomId', booking.room.roomId);
            setValue('checkInDate', booking.checkInDate);
            setValue('checkOutDate', booking.checkOutDate);
            setValue('status', booking.status);
        } else { // Add mode
            reset({ guestId: '', roomId: '', checkInDate: '', checkOutDate: '', status: 'Confirmed' });
        }
    }, [booking, open, setValue, reset]);

    const handleSave = (data) => {
        const bookingData = {
            guestId: data.guestId,
            roomId: data.roomId,
            checkInDate: data.checkInDate,
            checkOutDate: data.checkOutDate,
            status: data.status,
        };
        onSave(bookingData, booking ? booking.bookingId : null);
    };

    const availableRooms = booking ? rooms : rooms.filter(r => r.status.toLowerCase() === 'available');
    const bookingStatuses = ['Confirmed', 'Checked-In', 'Checked-Out', 'Cancelled'];

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit(handleSave)}>
                <DialogTitle>{booking ? 'Edit Booking' : 'Create New Booking'}</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="normal" disabled={!!booking}>
                        <InputLabel id="guest-select-label">Guest</InputLabel>
                        <Select labelId="guest-select-label" label="Guest" defaultValue={booking ? booking.guest.guestId : ""} {...register("guestId", { required: "Guest is required." })} >
                            {Array.isArray(guests) && guests.map(g => <MenuItem key={g.guestId} value={g.guestId}>{g.firstName} {g.lastName}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal" disabled={!!booking}>
                        <InputLabel id="room-select-label">Room</InputLabel>
                        <Select labelId="room-select-label" label="Room" defaultValue={booking ? booking.room.roomId : ""} {...register("roomId", { required: "Room is required." })}>
                            {Array.isArray(availableRooms) && availableRooms.map(r => <MenuItem key={r.roomId} value={r.roomId}>{r.roomNumber} ({r.type})</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField {...register("checkInDate")} type="date" label="Check-in Date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                    <TextField {...register("checkOutDate")} type="date" label="Check-out Date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                    {booking && (
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Status</InputLabel>
                            <Select defaultValue={booking.status} {...register("status")} label="Status">
                                {bookingStatuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                            </Select>
                        </FormControl>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">{booking ? 'Update' : 'Create'}</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default BookingDialog;