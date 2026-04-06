import React, { useState } from 'react';
import { login, getProducts, createOrder, getOrders } from './api';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState('');
  const [loading, setLoading] = useState(false);
  const [ordering, setOrdering] = useState(null);
  const [activeTab, setActiveTab] = useState('products');

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(username, password);
      setIsLoggedIn(true);
      loadProducts();
      loadOrders();
      setMessage('');
    } catch {
      setMessage('Username বা Password ভুল!');
      setMsgType('error');
    }
    setLoading(false);
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

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch {
      setMessage('Orders load হয়নি!');
      setMsgType('error');
    }
  };

  const handleOrder = async (productId) => {
    setOrdering(productId);
    try {
      await createOrder({ product_id: productId, quantity: 1 });
      setMessage('Order সফল হয়েছে!');
      setMsgType('success');
      loadProducts();
      loadOrders();
    } catch {
      setMessage('Order হয়নি! Stock শেষ হতে পারে।');
      setMsgType('error');
    }
    setOrdering(null);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setProducts([]);
    setOrders([]);
    setUsername('');
    setPassword('');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🛍️</div>
            <h1 className="text-4xl font-bold text-white mb-2">ShopBD</h1>
            <p className="text-purple-300">বাংলাদেশের সেরা অনলাইন শপ</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Login করুন</h2>
            {message && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl mb-4 text-center text-sm">
                {message}
              </div>
            )}
            <div className="mb-4">
              <label className="block text-purple-300 text-sm font-medium mb-2">Username</label>
              <input
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 outline-none focus:border-purple-400 transition"
                placeholder="আপনার username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-purple-300 text-sm font-medium mb-2">Password</label>
              <input
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 outline-none focus:border-purple-400 transition"
                type="password"
                placeholder="আপনার password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <button
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-xl transition transform hover:scale-105 disabled:opacity-50"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login করুন →'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900/80 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🛍️</span>
            <div>
              <h1 className="text-xl font-bold text-white">ShopBD</h1>
              <p className="text-xs text-purple-400">Online Store</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">স্বাগতম, <span className="text-purple-400 font-semibold">{username}</span></span>
            <button
              onClick={handleLogout}
              className="bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 text-red-400 text-sm px-4 py-2 rounded-xl transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {message && (
          <div className={`mb-6 px-6 py-4 rounded-2xl text-center font-semibold text-sm ${
            msgType === 'success'
              ? 'bg-green-500/20 border border-green-500/30 text-green-400'
              : 'bg-red-500/20 border border-red-500/30 text-red-400'
          }`}>
            {msgType === 'success' ? '✅' : '❌'} {message}
          </div>
        )}

        <div className="flex gap-2 mb-8 bg-gray-900 p-1 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 rounded-xl font-semibold text-sm transition ${
              activeTab === 'products'
                ? 'bg-purple-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🛒 Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded-xl font-semibold text-sm transition ${
              activeTab === 'orders'
                ? 'bg-purple-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            📦 My Orders {orders.length > 0 && <span className="ml-1 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">{orders.length}</span>}
          </button>
        </div>

        {activeTab === 'products' && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-1">সব Products</h2>
              <p className="text-gray-500">আপনার পছন্দের product বেছে নিন</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products && products.map(product => (
                <div key={product.id} className="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition group">
                  <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 h-48 flex items-center justify-center text-7xl">
                    🛒
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition">{product.name}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-purple-400">৳{product.price}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.stock > 5
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : product.stock > 0
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {product.stock > 0 ? `Stock: ${product.stock}` : 'Stock শেষ'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleOrder(product.id)}
                      disabled={product.stock === 0 || ordering === product.id}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition transform hover:scale-105 disabled:scale-100 text-sm"
                    >
                      {ordering === product.id ? 'Processing...' : product.stock === 0 ? 'Stock নেই' : '🛍️ Order করুন'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-1">আমার Orders</h2>
              <p className="text-gray-500">আপনার সব orders এখানে দেখুন</p>
            </div>
            {orders.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-500 text-lg">কোনো order নেই</p>
                <button
                  onClick={() => setActiveTab('products')}
                  className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl transition"
                >
                  Products দেখুন →
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-gray-900 border border-white/10 rounded-2xl p-6 flex items-center justify-between hover:border-purple-500/30 transition">
                    <div className="flex items-center gap-4">
                      <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-3 text-2xl">📦</div>
                      <div>
                        <h3 className="font-bold text-white text-lg">{order.product_name}</h3>
                        <p className="text-gray-400 text-sm">Quantity: {order.quantity} টি</p>
                        <p className="text-gray-500 text-xs mt-1">{new Date(order.created_at).toLocaleDateString('bn-BD')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-400">৳{order.total_price}</p>
                      <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded-full">Completed</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;