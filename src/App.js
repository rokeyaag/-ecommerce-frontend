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
      setMessage('Invalid username or password!');
      setMsgType('error');
    }
  };

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.results || data);
    } catch {
      setMessage('Failed to load products!');
      setMsgType('error');
    }
  };

  const handleOrder = async (productId) => {
    try {
      await createOrder({ product_id: productId, quantity: 1 });
      setMessage('✅ Order placed successfully!');
      setMsgType('success');
      setTimeout(() => setMessage(''), 3000);
      loadProducts();
    } catch {
      setMessage('❌ Order failed!');
      setMsgType('error');
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{minHeight:'100vh',background:'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Segoe UI',sans-serif",position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',width:'300px',height:'300px',borderRadius:'50%',background:'rgba(233,69,96,0.1)',top:'-50px',left:'-50px'}}/>
        <div style={{position:'absolute',width:'200px',height:'200px',borderRadius:'50%',background:'rgba(102,126,234,0.1)',bottom:'-30px',right:'-30px'}}/>
        <div style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(20px)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'28px',padding:'52px 48px',width:'100%',maxWidth:'420px',boxShadow:'0 25px 50px rgba(0,0,0,0.5)',position:'relative',zIndex:1}}>
          <div style={{textAlign:'center',marginBottom:'40px'}}>
            <div style={{fontSize:'64px',marginBottom:'16px'}}>🛒</div>
            <h1 style={{color:'#fff',fontSize:'32px',fontWeight:'800',margin:'0 0 8px',letterSpacing:'-0.5px'}}>ShopBD</h1>
            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',margin:0}}>Bangladesh's Best Online Shop</p>
          </div>
          {message && (
            <div style={{background:'rgba(231,76,60,0.2)',border:'1px solid rgba(231,76,60,0.4)',color:'#ff6b6b',padding:'12px 16px',borderRadius:'12px',marginBottom:'24px',textAlign:'center',fontSize:'14px'}}>
              ⚠️ {message}
            </div>
          )}
          <div style={{marginBottom:'20px'}}>
            <label style={{display:'block',color:'rgba(255,255,255,0.6)',fontSize:'12px',fontWeight:'700',marginBottom:'8px',letterSpacing:'1px'}}>USERNAME</label>
            <input style={{width:'100%',padding:'14px 18px',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:'12px',color:'#fff',fontSize:'15px',outline:'none',boxSizing:'border-box'}} placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)}/>
          </div>
          <div style={{marginBottom:'32px'}}>
            <label style={{display:'block',color:'rgba(255,255,255,0.6)',fontSize:'12px',fontWeight:'700',marginBottom:'8px',letterSpacing:'1px'}}>PASSWORD</label>
            <input style={{width:'100%',padding:'14px 18px',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:'12px',color:'#fff',fontSize:'15px',outline:'none',boxSizing:'border-box'}} type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleLogin()}/>
          </div>
          <button style={{width:'100%',padding:'16px',background:'linear-gradient(135deg, #e94560 0%, #0f3460 100%)',color:'#fff',border:'none',borderRadius:'14px',fontSize:'16px',fontWeight:'800',cursor:'pointer',letterSpacing:'0.5px',boxShadow:'0 8px 24px rgba(233,69,96,0.4)'}} onClick={handleLogin}>
            Login →
          </button>
          <p style={{color:'rgba(255,255,255,0.3)',textAlign:'center',fontSize:'12px',marginTop:'24px',marginBottom:0}}>🔒 Secure login powered by JWT</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{margin:0,fontFamily:"'Segoe UI',sans-serif",background:'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',minHeight:'100vh'}}>
      <nav style={{background:'rgba(0,0,0,0.3)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.1)',padding:'16px 32px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h1 style={{color:'#fff',fontSize:'22px',fontWeight:'700',margin:0}}>🛒 ShopBD</h1>
        <span style={{background:'linear-gradient(135deg, #e94560, #0f3460)',color:'#fff',padding:'8px 20px',borderRadius:'20px',fontSize:'13px',fontWeight:'600'}}>👋 Welcome, {username}!</span>
      </nav>
      <div style={{maxWidth:'1400px',margin:'0 auto',padding:'40px 24px'}}>
        {message && <div style={{background:msgType==='success'?'rgba(39,174,96,0.2)':'rgba(231,76,60,0.2)',border:msgType==='success'?'1px solid #27ae60':'1px solid #e74c3c',color:msgType==='success'?'#2ecc71':'#ff6b6b',padding:'14px 20px',borderRadius:'10px',textAlign:'center',marginBottom:'20px',fontWeight:'600'}}>{message}</div>}
        <h2 style={{color:'#fff',fontSize:'28px',fontWeight:'700',marginBottom:'8px'}}>All Products</h2>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'32px'}}>{products.length} products found</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:'24px'}}>
          {products && products.map((product, index) => (
            <div key={product.id} style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'20px',padding:'28px'}}>
              <div style={{fontSize:'52px',textAlign:'center',marginBottom:'16px'}}>{'👕👗👟👜⌚🕶️🧥👔'.split('')[index % 8]}</div>
              <div style={{color:'#fff',fontSize:'18px',fontWeight:'700',marginBottom:'8px'}}>{product.name}</div>
              <div style={{fontSize:'26px',fontWeight:'800',marginBottom:'8px',background:'linear-gradient(135deg, #e94560, #f5a623)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>৳{product.price}</div>
              <div style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'20px'}}>📦 Stock: {product.stock} remaining</div>
              <button style={{width:'100%',padding:'12px',background:'linear-gradient(135deg,#e94560,#0f3460)',color:'#fff',border:'none',borderRadius:'10px',fontSize:'14px',fontWeight:'700',cursor:'pointer'}} onClick={()=>handleOrder(product.id)}>🛍️ Order Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;