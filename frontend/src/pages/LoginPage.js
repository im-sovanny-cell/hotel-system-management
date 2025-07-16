import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Paper, Alert, CircularProgress, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = (data) => {
        setLoading(true);
        setError('');
        login(data.username, data.password).then(() => {
            navigate('/dashboard'); // Redirect to dashboard on successful login
        }).catch(err => {
            setError('Login failed. Please check your username and password.');
            console.error("Login failed", err);
            setLoading(false);
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4, borderRadius: 2 }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
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
                        {...register("password", { required: "Password is required" })}
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                    </Button>
                    {/* <Box textAlign="center">
                        <Link to="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Box> */}
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;