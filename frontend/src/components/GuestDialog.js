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
    FormHelperText
} from '@mui/material';

const GuestDialog = ({ open, onClose, onSave, guest }) => {
    // Initialize react-hook-form
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    // useEffect hook to populate the form when editing a guest or reset when adding
    useEffect(() => {
        if (guest) {
            // If a 'guest' object is provided, we are in "edit" mode
            setValue('firstName', guest.firstName);
            setValue('lastName', guest.lastName);
            setValue('email', guest.email);
            setValue('phoneNumber', guest.phoneNumber);
        } else {
            // If no 'guest' object, we are in "add" mode, so reset the form
            reset({ firstName: '', lastName: '', email: '', phoneNumber: '' });
        }
    }, [guest, open, setValue, reset]); // Rerun this effect if these values change

    // This function is called on form submission
    const handleSave = (data) => {
        // Call the onSave function passed from the parent, providing the form data
        // and the guestId if we are editing
        onSave(data, guest ? guest.guestId : null);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit(handleSave)}>
                <DialogTitle>{guest ? 'Edit Guest' : 'Add New Guest'}</DialogTitle>
                <DialogContent>
                    {/* First Name Field */}
                    <TextField 
                        {...register("firstName", { required: "First name is required." })} 
                        label="First Name" 
                        error={!!errors.firstName} 
                        helperText={errors.firstName?.message} 
                        fullWidth 
                        margin="normal" 
                        autoFocus
                    />
                    {/* Last Name Field */}
                    <TextField 
                        {...register("lastName", { required: "Last name is required." })} 
                        label="Last Name" 
                        error={!!errors.lastName} 
                        helperText={errors.lastName?.message} 
                        fullWidth 
                        margin="normal" 
                    />
                    {/* Email Field */}
                    <TextField 
                        {...register("email", { 
                            required: "Email is required.", 
                            pattern: { 
                                value: /^\S+@\S+$/i, 
                                message: "Invalid email address." 
                            }
                        })} 
                        label="Email" 
                        type="email" 
                        error={!!errors.email} 
                        helperText={errors.email?.message} 
                        fullWidth 
                        margin="normal" 
                    />
                    {/* Phone Number Field (Optional) */}
                    <TextField 
                        {...register("phoneNumber")} 
                        label="Phone Number" 
                        fullWidth 
                        margin="normal" 
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">{guest ? 'Update' : 'Save'}</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default GuestDialog;
