import React from 'react';

export default function ComponentsPage({ components }) {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Components</h1>
        <p className="text-gray-400 text-lg">All components are displayed in the main library view</p>
      </div>
    </div>
  );
}
