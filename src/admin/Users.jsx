import React from 'react';

const MOCK_USERS = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com' },
  { id: 2, name: 'Priya Verma', email: 'priya@example.com' },
  { id: 3, name: 'Amit Singh', email: 'amit@example.com' },
];

export default function Users() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map(u => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.id}</td>
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
