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
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">🛒 Ecommerce Store</h1>
          <p className="text-center text-gray-500 mb-8">আপনার account-এ login করুন</p>

          {message && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4 text-center">
              {message}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                placeholder="Username দিন"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Password দিন"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200"
            >
              Login করুন
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white px-6 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">🛒 Ecommerce Store</h1>
          <span className="text-blue-200">স্বাগতম, {username}!</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {message && (
          <div className={`mb-6 px-4 py-3 rounded-lg text-center font-medium ${
            msgType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-800 mb-6">সব Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products && products.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 p-6">
              <div className="text-4xl mb-3 text-center">👕</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-2xl font-bold text-blue-600 mb-1">৳{product.price}</p>
              <p className={`text-sm mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `✅ Stock: ${product.stock}` : '❌ Stock নেই'}
              </p>
              <button
                onClick={() => handleOrder(product.id)}
                disabled={product.stock === 0}
                className={`w-full py-2 rounded-lg font-bold transition duration-200 ${
                  product.stock > 0
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.stock > 0 ? '🛍️ Order করুন' : 'Stock নেই'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;