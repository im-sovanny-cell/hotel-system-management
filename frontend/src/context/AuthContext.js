import React, { createContext, useState, useContext } from 'react';
import AuthService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(AuthService.getCurrentUser());

    const login = (username, password) => {
        return AuthService.login(username, password).then(
            data => {
                setUser(data);
                return Promise.resolve(data);
            },
            error => {
                setUser(null);
                return Promise.reject(error);
            }
        );
    };

    const logout = () => {
        AuthService.logout();
        setUser(null);
    };

    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};