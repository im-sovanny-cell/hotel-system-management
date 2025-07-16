import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    TextField, 
    Box, 
    Select, 
    MenuItem, 
    FormControl, 
    InputLabel,
    FormHelperText
} from '@mui/material';

const RoomDialog = ({ open, onClose, onSave, room }) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    // This useEffect hook handles setting form values when editing or resetting for a new entry.
    useEffect(() => {
        if (room) {
            // If in "edit" mode, set the form values to the existing room's data.
            setValue('roomNumber', room.roomNumber);
            setValue('type', room.type);
            setValue('pricePerNight', room.pricePerNight);
            setValue('status', room.status);
        } else {
            // If in "add" mode, reset the form with default values.
            reset({ roomNumber: '', type: '', pricePerNight: '', status: 'Available' });
        }
    }, [room, open, setValue, reset]);

    const handleSave = (data) => {
        onSave(data, room ? room.roomId : null);
    };

    const roomTypes = ['Single', 'Double', 'Suite', 'Family'];
    const roomStatuses = ['Available', 'Occupied', 'Maintenance'];

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit(handleSave)}>
                <DialogTitle>{room ? 'Edit Room' : 'Add New Room'}</DialogTitle>
                <DialogContent>
                    <TextField 
                        {...register("roomNumber", { required: "Room number is required." })} 
                        label="Room Number" 
                        error={!!errors.roomNumber} 
                        helperText={errors.roomNumber?.message} 
                        fullWidth 
                        margin="normal" 
                    />
                    
                    {/* Changed from TextField to a Select dropdown for Type */}
                    <FormControl fullWidth margin="normal" error={!!errors.type}>
                        <InputLabel id="type-select-label">Type</InputLabel>
                        <Select
                            labelId="type-select-label"
                            label="Type"
                            defaultValue={room ? room.type : ''}
                            {...register("type", { required: "Type is required." })}
                        >
                            {roomTypes.map((typeOption) => (
                                <MenuItem key={typeOption} value={typeOption}>
                                    {typeOption}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.type && <FormHelperText>{errors.type.message}</FormHelperText>}
                    </FormControl>

                    <TextField 
                        {...register("pricePerNight", { 
                            required: "Price is required.", 
                            valueAsNumber: true, 
                            min: { value: 1, message: "Price must be positive." }
                        })} 
                        label="Price Per Night" 
                        type="number" 
                        error={!!errors.pricePerNight} 
                        helperText={errors.pricePerNight?.message} 
                        fullWidth 
                        margin="normal" 
                    />
                    
                    {/* Select dropdown for Status */}
                    <FormControl fullWidth margin="normal" error={!!errors.status}>
                        <InputLabel id="status-select-label">Status</InputLabel>
                        <Select
                            labelId="status-select-label"
                            label="Status"
                            defaultValue={room ? room.status : 'Available'}
                            {...register("status", { required: "Status is required." })}
                        >
                            {roomStatuses.map((statusOption) => (
                                <MenuItem key={statusOption} value={statusOption}>
                                    {statusOption}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">{room ? 'Update' : 'Save'}</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default RoomDialog;
