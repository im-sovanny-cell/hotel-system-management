import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

/**
 * Registers a new user.
 * @param {string} username
 * @param {string} password
 * @returns {Promise}
 */
const register = (username, password) => {
    return axios.post(API_URL + 'register', { username, password });
};

/**
 * Logs in a user and stores token in localStorage.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Object>} user data including token
 */
const login = (username, password) => {
    return axios.post(API_URL + 'login', { username, password })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

/**
 * Logs out the current user.
 */
const logout = () => {
    localStorage.removeItem('user');
};

/**
 * Gets current user data from localStorage.
 * @returns {Object|null}
 */
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

/**
 * Optionally create an axios instance with token for authenticated requests.
 */
const authAxios = () => {
    const user = getCurrentUser();
    if (user && user.token) {
        return axios.create({
            baseURL: API_URL,
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
    }
    return axios.create({ baseURL: API_URL });
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    authAxios
};

export default AuthService;
