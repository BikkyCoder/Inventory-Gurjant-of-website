import React from 'react';

export default function HeroSection({ onExploreClick, onLearnMoreClick }) {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-purple-600/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-1/4 w-96 h-96 bg-gradient-to-tr from-cyan-600/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 py-20 flex flex-col items-center justify-center text-center">
        {/* Badge */}
        <div className="mb-6 inline-block">
          <span className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
            ✨ Welcome to UI Components
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Beautiful UI
          <span className="block bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Components Library
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
          Build stunning web interfaces with our collection of modern, responsive, and easy-to-customize UI components. Copy, paste, and create amazing things.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button 
            onClick={onExploreClick}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition font-semibold flex items-center gap-2 justify-center cursor-pointer"
          >
            <span>🚀 Explore Components</span>
          </button>
          <button 
            onClick={onLearnMoreClick}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition font-semibold backdrop-blur cursor-pointer">
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl">
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 hover:bg-white/10 transition">
            <div className="text-3xl font-bold text-cyan-400 mb-2">200+</div>
            <div className="text-gray-400">Components</div>
          </div>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 hover:bg-white/10 transition">
            <div className="text-3xl font-bold text-purple-400 mb-2">99%</div>
            <div className="text-gray-400">Browser Support</div>
          </div>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 hover:bg-white/10 transition">
            <div className="text-3xl font-bold text-blue-400 mb-2">∞</div>
            <div className="text-gray-400">Free & Open</div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-purple-600/10 rounded-lg blur-xl animate-pulse"></div>
      <div className="absolute top-1/2 right-20 w-32 h-32 bg-cyan-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </section>
  );
}
