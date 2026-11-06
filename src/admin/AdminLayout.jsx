import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) navigate('/admin/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-64 bg-white border-r p-4">
        <h3 className="text-lg font-bold mb-4">Admin Panel</h3>
        <nav className="flex flex-col gap-2">
          <Link to="/admin" className="py-2 px-3 rounded hover:bg-slate-100">Dashboard</Link>
          <Link to="/admin/users" className="py-2 px-3 rounded hover:bg-slate-100">Users</Link>
          <button onClick={handleLogout} className="text-left py-2 px-3 rounded hover:bg-slate-100">Logout</button>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
