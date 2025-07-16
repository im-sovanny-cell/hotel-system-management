import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthService from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Paper, Alert, CircularProgress, Avatar } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const password = watch("password", ""); // To compare with confirm password

    const onSubmit = (data) => {
        setLoading(true);
        setError('');
        setSuccess('');
        AuthService.register(data.username, data.password).then(
            (response) => {
                setSuccess("Registration successful! Redirecting to login...");
                setLoading(false);
                setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
            },
            (err) => {
                const resMessage = (err.response && err.response.data) || err.message || err.toString();
                setError(resMessage);
                setLoading(false);
            }
        );
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4, borderRadius: 2 }}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <AppRegistrationIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ width: '100%', mt: 2 }}>{success}</Alert>}
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                    <TextField
                        {...register("username", { required: "Username is required" })}
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        autoFocus
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField
                        {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <TextField
                        {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: value => value === password || "The passwords do not match"
                        })}
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading || success}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                    </Button>
                    <Box textAlign="center">
                        <Link to="/login" variant="body2">
                            {"Already have an account? Sign In"}
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default RegisterPage;