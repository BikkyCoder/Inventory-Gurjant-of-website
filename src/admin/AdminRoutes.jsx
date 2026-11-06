import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminLogin from './AdminLogin';
import Dashboard from './Dashboard';
import Users from './Users';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}
