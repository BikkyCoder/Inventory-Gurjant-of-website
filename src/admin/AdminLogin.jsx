import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple dev-only check. Replace with real auth later.
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      alert('Invalid admin password (use admin123 for local dev)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <p className="text-sm text-gray-600 mb-4">Enter admin password to access the admin panel.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-2 border rounded mb-4 focus:outline-none"
        />
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">Sign in</button>
          <button type="button" onClick={() => navigate('/')} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
