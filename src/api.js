const BASE_URL = import.meta.env.VITE_API_URL || 'https://ecommerce-api-production-3e99.up.railway.app';

// ── Auth ──────────────────────────────────────────────────────────────────────

export const registerUser = async (username, email, password) => {
  const res = await fetch(`${BASE_URL}/api/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  return res.json();
};

export const loginUser = async (username, password) => {
  const res = await fetch(`${BASE_URL}/api/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};

// ── Products ──────────────────────────────────────────────────────────────────

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/api/products/`);
  return res.json();
};

// ── Orders ────────────────────────────────────────────────────────────────────

export const createOrder = async (orderData, token) => {
  const res = await fetch(`${BASE_URL}/api/orders/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });
  return res.json();
};

export const getOrders = async (token) => {
  const res = await fetch(`${BASE_URL}/api/orders/`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
};

// ── Cart ──────────────────────────────────────────────────────────────────────

export const getCart = async (token) => {
  const res = await fetch(`${BASE_URL}/api/cart/`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
};

export const addToCart = async (productId, quantity, token) => {
  const res = await fetch(`${BASE_URL}/api/cart/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ product: productId, quantity }),
  });
  return res.json();
};

// ── Token Helper ──────────────────────────────────────────────────────────────

export const getToken = () => localStorage.getItem('access_token');
export const setToken = (token) => localStorage.setItem('access_token', token);
export const removeToken = () => localStorage.removeItem('access_token');
export const isLoggedIn = () => !!getToken();