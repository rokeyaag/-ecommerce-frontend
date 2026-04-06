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
      setProducts(data.results || data);
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
      setTimeout(() => setMessage(''), 3000);
      loadProducts();
    } catch {
      setMessage('❌ Order হয়নি!');
      setMsgType('error');
    }
  };

  const S = {
    page: { minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', fontFamily: "'Segoe UI', sans-serif" },
    loginWrap: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
    loginCard: { background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '48px', width: '100%', maxWidth: '420px' },
    loginTitle: { color: '#fff', fontSize: '32px', fontWeight: '700', textAlign: 'center', marginBottom: '8px' },
    loginSub: { color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: '40px', fontSize: '14px' },
    label: { display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', marginBottom: '8px', letterSpacing: '0.5px' },
    input: { width: '100%', padding: '14px 18px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none', boxSizing: 'border-box', marginBottom: '20px' },
    loginBtn: { width: '100%', padding: '16px', background: 'linear-gradient(135deg, #e94560, #0f3460)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.5px' },
    nav: { background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 },
    navTitle: { color: '#fff', fontSize: '22px', fontWeight: '700', margin: 0 },
    navUser: { background: 'linear-gradient(135deg, #e94560, #0f3460)', color: '#fff', padding: '8px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' },
    container: { maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' },
    heading: { color: '#fff', fontSize: '28px', fontWeight: '700', marginBottom: '8px' },
    subHeading: { color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginBottom: '32px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' },
    card: { background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '28px', transition: 'transform 0.2s', cursor: 'default' },
    emoji: { fontSize: '52px', textAlign: 'center', marginBottom: '16px', display: 'block' },
    productName: { color: '#fff', fontSize: '18px', fontWeight: '700', marginBottom: '8px' },
    price: { background: 'linear-gradient(135deg, #e94560, #f5a623)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '26px', fontWeight: '800', marginBottom: '8px' },
    stock: { color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '20px' },
    orderBtn: { width: '100%', padding: '13px', background: 'linear-gradient(135deg, #e94560, #0f3460)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.3px' },
    successMsg: { background: 'rgba(39, 174, 96, 0.2)', border: '1px solid #27ae60', color: '#2ecc71', padding: '14px 20px', borderRadius: '12px', textAlign: 'center', marginBottom: '24px', fontWeight: '600' },
    errorMsg: { background: 'rgba(231, 76, 60, 0.2)', border: '1px solid #e74c3c', color: '#ff6b6b', padding: '14px 20px', borderRadius: '12px', textAlign: 'center', marginBottom: '24px', fontWeight: '600' },
  };

  const emojis = ['👕', '👗', '👟', '👜', '⌚', '🕶️', '🧥', '👔'];

  if (!isLoggedIn) {
    return (
      <div style={S.page}>
        <div style={S.loginWrap}>
          <div style={S.loginCard}>
            <h1 style={S.loginTitle}>🛒 ShopBD</h1>
            <p style={S.loginSub}>আপনার account-এ login করুন</p>
            {message && <div style={S.errorMsg}>{message}</div>}
            <label style={S.label}>USERNAME</label>
            <input style={S.input} placeholder="Username দিন" value={username} onChange={e => setUsername(e.target.value)} />
            <label style={S.label}>PASSWORD</label>
            <input style={S.input} type="password" placeholder="Password দিন" value={password} onChange={e => setPassword(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleLogin()} />
            <button style={S.loginBtn} onClick={handleLogin}>Login করুন →</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <nav style={S.nav}>
        <h1 style={S.navTitle}>🛒 ShopBD</h1>
        <span style={S.navUser}>👋 {username}</span>
      </nav>
      <div style={S.container}>
        {message && <div style={msgType === 'success' ? S.successMsg : S.errorMsg}>{message}</div>}
        <h2 style={S.heading}>সব Products</h2>
        <p style={S.subHeading}>{products.length} টি product পাওয়া গেছে</p>
        <div style={S.grid}>
          {products && products.map((product, index) => (
            <div key={product.id} style={S.card}>
              <span style={S.emoji}>{emojis[index % emojis.length]}</span>
              <div style={S.productName}>{product.name}</div>
              <div style={S.price}>৳{product.price}</div>
              <div style={S.stock}>📦 Stock: {product.stock} টি বাকি</div>
              <button style={S.orderBtn} onClick={() => handleOrder(product.id)}>
                🛍️ Order করুন
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;