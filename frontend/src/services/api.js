import axios from 'axios';
import AuthService from './authService';

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1", // Base URL for main APIs
    headers: {
        "Content-Type": "application/json"
    }
});

// This is an Axios Interceptor. It runs before every request is sent.
api.interceptors.request.use(config => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
        // If user is logged in, add the JWT token to the Authorization header
        config.headers['Authorization'] = 'Bearer ' + user.token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
