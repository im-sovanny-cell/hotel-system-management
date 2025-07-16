import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AuthService from '../../services/authService';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Alert, CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';

const RegisterDialog = ({ open, onClose }) => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const password = watch("password", "");

    useEffect(() => {
        if (!open) {
            reset(); // Clear form when dialog closes
            setServerError('');
        }
    }, [open, reset]);

    const handleRegister = (data) => {
        setLoading(true);
        setServerError('');
        AuthService.register(data.username, data.password)
            .then(() => {
                enqueueSnackbar('User registered successfully!', { variant: 'success' });
                setLoading(false);
                onClose();
            })
            .catch((err) => {
                const resMessage = (err.response && err.response.data) || err.message || err.toString();
                setServerError(resMessage);
                setLoading(false);
            });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit(handleRegister)}>
                <DialogTitle>Register New User</DialogTitle>
                <DialogContent>
                    {serverError && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{serverError}</Alert>}
                    <TextField
                        {...register("username", { required: "Username is required" })}
                        label="Username"
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        fullWidth
                        margin="normal"
                        autoFocus
                    />
                    <TextField
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" }
                        })}
                        label="Password"
                        type="password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        {...register("confirmPassword", {
                            required: "Please confirm password",
                            validate: value => value === password || "Passwords do not match"
                        })}
                        label="Confirm Password"
                        type="password"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Register'}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default RegisterDialog;
