import React, { useState, useEffect } from 'react';
import { Sparkles, Rocket, Info, Infinity } from 'lucide-react';

export default function DynamicHero({ setActiveTab }) {
  const [particles, setParticles] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(newParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.speedX + 100) % 100,
        y: (p.y + p.speedY + 100) % 100,
      })));
    }, 50);

    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const stats = [
    { value: '200+', label: 'Components', icon: null },
    { value: '99%', label: 'Browser Support', icon: null },
    { value: '∞', label: 'Free & Open', icon: Infinity },
  ];

  return (

    // <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 overflow-hidden">
//  <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-slate-950 overflow-hidden">

<div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] overflow-hidden hero-section mt-0">


{/* <div className="relative min-h-screen bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#0d0d0d] overflow-hidden"> */}


{/* <div className="relative min-h-screen bg-gradient-to-br from-[#0b1020] via-[#1a1233] to-[#0b1020] overflow-hidden"> */}


{/* <div className="relative min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#020617] overflow-hidden"> */}


{/* <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] overflow-hidden"> */}

{/* <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden">  */}

{/* // <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden">  */}

{/* <div className="relative min-h-screen bg-gradient-to-br from-neutral-200 via-stone-300 to-amber-200 overflow-hidden"> */}












      {/* Interactive gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-300"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}% ${mousePos.y}%, rgba(139, 92, 246, 0.4), transparent)`,
        }}
      />
      
      {/* Particles */}
      <div className="absolute inset-0">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-purple-300"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity * 0.6,
              boxShadow: '0 0 10px rgba(216, 180, 254, 0.5)',
            }}
          />
        ))}
      </div>

      {/* Animated grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0" />
            <stop offset="50%" stopColor="#c084fc" stopOpacity="1" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(6)].map((_, i) => (
          <React.Fragment key={i}>
            <line
              x1="0%"
              y1={`${i * 20}%`}
              x2="100%"
              y2={`${i * 20}%`}
              stroke="url(#purpleGradient)"
              strokeWidth="1"
            />
            <line
              x1={`${i * 20}%`}
              y1="0%"
              x2={`${i * 20}%`}
              y2="100%"
              stroke="url(#purpleGradient)"
              strokeWidth="1"
            />
          </React.Fragment>
        ))}
      </svg>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 sm:pt-24 pb-16">
        {/* Top badge */}
        <div className="flex justify-center mb-8 animate-fadeInDown">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-purple-500/20 border border-purple-400/30 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span className="text-sm font-medium text-purple-200">Welcome to UI Inventory </span>
          </div>
        </div>

        {/* Hero text */}
        <div className="text-center space-y-8 mb-16">
          <h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight animate-fadeInUp"
          >
            <span className="text-white">Beautiful UI</span>
            <br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 bg-gradient-to-r from-purple-300 via-cyan-300 to-cyan-400 bg-clip-text text-transparent">
                Components Library
              </span>
              <span className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-cyan-400 to-cyan-500 blur-2xl opacity-40 animate-pulse"></span>
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-200">
            Build stunning web interfaces with our collection of modern, responsive, and easy-to-customize UI components. Copy, paste, and create amazing things.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp animation-delay-400">
            <button onClick={() => setActiveTab('components')} className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 rounded-xl font-semibold text-base text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 bg-[length:200%_100%] hover:bg-[position:100%_0]">
              <span className="relative z-10 flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Explore Components
              </span>
            </button>
            
            <button onClick={() => setActiveTab('about')} className="group px-8 py-4 rounded-xl font-semibold text-base text-purple-200 border-2 border-purple-400/40 backdrop-blur-sm hover:bg-purple-500/20 hover:border-purple-300/60 transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Learn More
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto animate-fadeInUp animation-delay-600">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl bg-purple-800/20 border border-purple-600/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 text-center">
                {stat.icon && <stat.icon className="w-10 h-10 text-cyan-300 mb-3 mx-auto group-hover:scale-110 transition-all" />}
                <div className="text-5xl font-bold mb-2" style={{ 
                  background: 'linear-gradient(to right, #a5f3fc, #67e8f9)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {stat.value}
                </div>
                <div className="text-purple-300 font-medium">{stat.label}</div>
              </div>

              {/* Animated corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-20 animate-pulse animation-delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-pulse animation-delay-500" />

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        /* Responsive Hero Section - Mobile vs Desktop */
        @media (max-width: 639px) {
          .hero-section {
            padding-top: 56px; /* Mobile navbar height = min-h-14 */
          }
        }
        @media (min-width: 640px) {
          .hero-section {
            padding-top: 64px; /* Desktop navbar height = sm:h-16 */
          }
        }
      `}</style>
    </div>
  );
}

