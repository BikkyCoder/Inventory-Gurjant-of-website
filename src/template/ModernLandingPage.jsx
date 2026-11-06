import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Sparkles, Zap, Globe, ArrowRight } from 'lucide-react';

export default function ModernLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: Sparkles, title: "Innovative Design", desc: "Cutting-edge UI/UX that captivates users" },
    { icon: Zap, title: "Lightning Fast", desc: "Optimized performance for seamless experience" },
    { icon: Globe, title: "Global Reach", desc: "Connect with audiences worldwide" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Brand
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['Home', 'Features', 'About', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-purple-400 transition-colors duration-200 relative group">
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'Features', 'About', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block px-3 py-2 hover:bg-purple-500/20 rounded-md transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm">
            <span className="text-sm text-purple-300">✨ Welcome to the Future</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-fade-in">
            Build Something
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Extraordinary
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the next generation of web design with stunning visuals, seamless interactions, and powerful features.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center">
              Get Started
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border border-purple-500/50 rounded-lg font-semibold hover:bg-purple-500/10 transition-all duration-300 backdrop-blur-sm">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Why Choose <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Us</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
                className={`relative p-8 rounded-2xl border transition-all duration-500 cursor-pointer ${
                  activeCard === idx
                    ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50 shadow-xl shadow-purple-500/20 scale-105'
                    : 'bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/30'
                }`}
              >
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${
                  activeCard === idx
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg'
                    : 'bg-slate-700/50'
                }`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
                
                <div className={`mt-4 flex items-center text-purple-400 transition-all duration-300 ${
                  activeCard === idx ? 'translate-x-2 opacity-100' : 'translate-x-0 opacity-0'
                }`}>
                  <span className="text-sm">Explore</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-12 rounded-3xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 animate-pulse"></div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8 relative z-10">
              Join thousands of users who are already building amazing things.
            </p>
            <button className="relative z-10 px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
              Start Your Journey
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 Brand. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}