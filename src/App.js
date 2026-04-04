import React, { useState } from 'react';
import { login, getProducts, createOrder } from './api';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);
      setIsLoggedIn(true);
      loadProducts();
    } catch {
      setMessage('Login failed!');
    }
  };

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.results);
    } catch {
      setMessage('Products load failed!');
    }
  };

  const handleOrder = async (productId) => {
    try {
      await createOrder({ product_id: productId, quantity: 1 });
      setMessage('Order হয়ে গেছে!');
      loadProducts();
    } catch {
      setMessage('Order failed!');
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
        <h2>Login</h2>
        <input placeholder="Username" value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }} />
        <input placeholder="Password" type="password" value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }} />
        <button onClick={handleLogin}
          style={{ padding: '10px 20px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>
          Login
        </button>
        {message && <p style={{ color: 'red' }}>{message}</p>}
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>🛒 Ecommerce Store</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products && products.map(product => (
          <div key={product.id} style={{
            border: '1px solid #ddd', padding: '15px',
            borderRadius: '8px', width: '200px'
          }}>
            <h3>{product.name}</h3>
            <p>দাম: ৳{product.price}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => handleOrder(product.id)}
              style={{ padding: '8px 15px', background: 'green', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
              Order করো
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;