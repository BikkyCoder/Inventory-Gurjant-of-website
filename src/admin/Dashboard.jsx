import React from 'react';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">Components: <strong>100+</strong></div>
        <div className="p-4 bg-white rounded shadow">Users: <strong>—</strong></div>
        <div className="p-4 bg-white rounded shadow">Active Sessions: <strong>—</strong></div>
      </div>
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Notes</h2>
        <p className="text-sm text-gray-600">This is a starter admin dashboard. Connect backend APIs to show real data.</p>
      </div>
    </div>
  );
}
