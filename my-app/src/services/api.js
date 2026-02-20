import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://jsonplaceholder.typicode.com';
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

// If API_TOKEN is defined, include it in the headers for all requests
const axiosConfig = API_TOKEN ? {
    headers: { Authorization: `Bearer ${API_TOKEN}` }
} : undefined;

export const getUsers = async () => {
    const response = await axios.get(`${API_URL}/users`, axiosConfig);
    return response.data;
};

export const addUser = async (user) => {
    const response = await axios.post(`${API_URL}/users`, user, axiosConfig);
    return response.data;
};

const api = {
    getUsers,
    addUser,
};

export default api;