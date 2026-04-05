import React, { useState } from 'react';
import { login, getProducts, createOrder } from './api';

const styles = {
  body: { margin: 0, fontFamily: "'Segoe UI', sans-serif", background: '#f0f2f5', minHeight: '100vh' },
  loginPage: { minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  loginBox: { background: 'white', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' },
  loginTitle: { textAlign: 'center', fontSize: '28px', fontWeight: 'bold', color: '#333', marginBottom: '8px' },
  loginSubtitle: { textAlign: 'center', color: '#888', marginBottom: '30px' },
  label: { display: 'block', fontSize: '14px', fontWeight: '600', color: '#555', marginBottom: '6px' },
  input: { width: '100%', padding: '12px 16px', border: '2px solid #e1e5e9', borderRadius: '10px', fontSize: '16px', outline: 'none', boxSizing: 'border-box', marginBottom: '16px' },
  loginBtn: { width: '100%', padding: '14px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
  nav: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' },
  navTitle: { fontSize: '24px', fontWeight: 'bold', margin: 0 },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' },
  card: { background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', transition: 'transform 0.2s' },
  emoji: { fontSize: '48px', textAlign: 'center', marginBottom: '12px' },
  productName: { fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '8px' },
  price: { fontSize: '24px', fontWeight: 'bold', color: '#667eea', marginBottom: '6px' },
  stock: { fontSize: '13px', color: '#27ae60', marginBottom: '16px' },
  orderBtn: { width: '100%', padding: '12px', background: 'linear-gradient(135deg, #27ae60, #2ecc71)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' },
  successMsg: { background: '#d4edda', color: