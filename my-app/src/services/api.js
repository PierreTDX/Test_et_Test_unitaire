import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://jsonplaceholder.typicode.com';

export const getUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
};

export const addUser = async (user) => {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
};

const api = {
    getUsers,
    addUser,
};

export default api;