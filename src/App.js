import React, { useState } from 'react';
import { login, getProducts, createOrder } from './api';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);
      setIsLoggedIn(true);
      loadProducts();
    } catch {
      setMessage('Username বা Password ভুল!');
      setMsgType('error');
    }
  };

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.results);
    } catch {
      setMessage('Products load হয়নি!');
      setMsgType('error');
    }
  };

  const handleOrder = async (productId) => {
    try {
      await createOrder({ product_id: productId, quantity: 1 });
      setMessage('✅ Order সফল হয়েছে!');
      setMsgType('success');
      loadProducts();
    } catch {
      setMessage('❌ Order হয়নি!');
      setMsgType('error');
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', sans-serif" }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <h1 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>🛒 Ecommerce Store</h1>
          <p style={{ textAlign: 'center', color: '#888', marginBottom: '30px' }}>আপনার account-এ login করুন</p>
          {message && <div style={{ background: '#f8d7da', color: '#721c24', padding: '12px', borderRadius: '8px', marginBottom: '16px', textAlign: 'center' }}>{message}</div>}
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>Username</label>
          <input style={{ width: '100%', padding: '12px 16px', border: '2px solid #e1e5e9', borderRadius: '10px', fontSize: '16px', outline: 'none', boxSizing: 'border-box', marginBottom: '16px' }} placeholder="Username দিন" value={username} onChange={e => setUsername(e.target.value)} />
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>Password</label>
          <input style={{ width: '100%', padding: '12px 16px', border: '2px solid #e1e5e9', borderRadius: '10px', fontSize: '16px', outline: 'none', boxSizing: 'border-box', marginBottom: '24px' }} type="password" placeholder="Password দিন" value={password} onChange={e => setPassword(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleLogin()} />
          <button style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }} onClick={handleLogin}>Login করুন →</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ margin: 0, fontFamily: "'Segoe UI', sans-serif", background: '#f0f2f5', minHeight: '100vh' }}>
      <nav style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>🛒 Ecommerce Store</h1>
        <span>স্বাগতম, {username}! 👋</span>
      </nav>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' }}>
        {message && <div style={{ background: msgType === 'success' ? '#d4edda' : '#f8d7da', color: msgType === 'success' ? '#155724' : '#721c24', padding: '12px 20px', borderRadius: '10px', textAlign: 'center', marginBottom: '20px', fontWeight: '600' }}>{message}</div>}
        <h2 style={{ color: '#333', marginBottom: '20px' }}>সব Products</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {products && products.map(product => (
            <div key={product.id} style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '12px' }}>👕</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>{product.name}</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea', marginBottom: '6px' }}>৳{product.price}</div>
              <div style={{ fontSize: '13px', color: '#27ae60', marginBottom: '16px' }}>✅ Stock: {product.stock}</div>
              <button style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #27ae60, #2ecc71)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleOrder(product.id)}>🛍️ Order করুন</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;