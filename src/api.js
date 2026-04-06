import axios from 'axios';

const API = 'https://ecommerce-api-production-3e99.up.railway.app';

const getToken = () => localStorage.getItem('token');

export const login = async (username, password) => {
    const res = await axios.post(`${API}/api/token/`, { username, password });
    localStorage.setItem('token', res.data.access);
    return res.data;
};

export const getProducts = async () => {
    const res = await axios.get(`${API}/api/products/?page_size=100`, {
        headers: { Authorization: `Bearer ${getToken()}` }
    });
    return res.data;
};
export const createProduct = async (data) => {
    const res = await axios.post(`${API}/api/products/`, data, {
        headers: { Authorization: `Bearer ${getToken()}` }
    });
    return res.data;
};

export const createOrder = async (data) => {
    const res = await axios.post(`${API}/api/orders/`, data, {
        headers: { Authorization: `Bearer ${getToken()}` }
    });
    return res.data;
};
export const getOrders = async () => {
    const res = await axios.get(`${API}/api/orders/`, {
        headers: { Authorization: `Bearer ${getToken()}` }
    });
    return res.data;
};