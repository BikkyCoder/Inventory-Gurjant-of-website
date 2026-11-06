import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Top Section with Logo */}
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-12 pb-8 border-b border-slate-700">
            {/* Logo and Brand */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                <img 
                  src={logo} 
                  alt="UI Inventory Logo" 
                  className="relative w-20 h-20 rounded-lg object-cover shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  UI Inventory
                </h2>
                <p className="text-slate-400 text-sm mt-1">Beautiful React Components</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: '📱', name: 'Icons', action: 'icons' },
                { icon: '💼', name: 'LinkedIn' },
                { icon: '🐙', name: 'GitHub' },
                { icon: '💬', name: 'Discord' }
              ].map((social) => (
                <button
                  key={social.name}
                  onClick={(e) => {
                    if (social.action === 'icons') {
                      window.dispatchEvent(new CustomEvent('setActiveTab', { detail: 'icons' }));
                    }
                  }}
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  title={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* About Us */}
            <div className="group">
              <h3 className="text-lg font-bold mb-4 text-white group-hover:text-purple-400 transition-colors">
                About Us
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('openFooterPage', { detail: 'OurStory' })); }}
                    className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Our Story
                  </a>
                </li>
                <li>
                  <Link 
                    to="/mission-vision" 
                    className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Mission & Vision
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/testimonials" 
                    className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>

            {/* Component */}
            <div className="group">
              <h3 className="text-lg font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                Component
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/ui-kit" 
                    className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    UI Kit
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/icons" 
                    className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Icons
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/illustrations" 
                    className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Illustrations
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="group">
              <h3 className="text-lg font-bold mb-4 text-white group-hover:text-purple-400 transition-colors">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('setActiveTab', { detail: 'blog' })); }}
                    className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <Link 
                    to="/documentation" 
                    className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/changelog" 
                    className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="group">
              <h3 className="text-lg font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                Contact
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/email-us" 
                    className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Email Us
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/support-center" 
                    className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Support Center
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/live-chat" 
                    className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Live Chat
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-slate-700 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Description */}
              <div>
                <p className="text-slate-400 leading-relaxed">
                  A comprehensive collection of beautifully crafted, responsive React components ready for your next project.
                </p>
              </div>

              {/* Newsletter */}
              <div>
                <h4 className="font-semibold mb-3 text-white">Subscribe to Updates</h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-2 rounded-lg bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105">
                    Join
                  </button>
                </div>
              </div>

              {/* Quick Stat */}
              <div className="text-center md:text-right">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">100+</div>
                <p className="text-slate-400 text-sm">Components Available</p>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-slate-800 pt-8 text-center">
              <p className="text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} UI Inventory. All rights reserved.
              </p>
              <div className="flex justify-center gap-6 mt-4 text-sm">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}