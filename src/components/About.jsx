import React from 'react';

export default function About() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-gray-400 text-lg">
          Welcome to our UI Inventory. We provide a comprehensive collection of reusable components for your projects.
        </p>
      </div>
    </div>
  );
}
