import React, { useState, useEffect } from 'react';

const InteractiveWindowSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowCenter] = useState({ x: 50, y: 75 }); // Window position in percentage

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate angle for light direction
  const angle = Math.atan2(
    mousePos.y - windowCenter.y,
    mousePos.x - windowCenter.x
  ) * (180 / Math.PI);

  // Calculate distance for light intensity
  const distance = Math.sqrt(
    Math.pow(mousePos.x - windowCenter.x, 2) + 
    Math.pow(mousePos.y - windowCenter.y, 2)
  );
  
  const lightIntensity = Math.max(0.3, Math.min(1, 1 - distance / 100));

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center px-4">
          {/* Window structure */}
          <div className="relative inline-block">
            {/* Window frame */}
            <div className="relative bg-gradient-to-br from-amber-900 to-amber-950 p-6 rounded-lg shadow-2xl">
              {/* Window panes */}
              <div className="grid grid-cols-2 gap-3 w-80 h-96 relative">
                {/* Dynamic light beam */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
                  style={{
                    background: `linear-gradient(${angle}deg, 
                      rgba(255, 255, 255, ${lightIntensity * 0.8}) 0%, 
                      rgba(240, 240, 240, ${lightIntensity * 0.6}) 20%,
                      rgba(220, 220, 220, ${lightIntensity * 0.4}) 40%,
                      transparent 70%)`,
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: 'center',
                  }}
                />

                {/* Radial light glow from window */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-all duration-500"
                  style={{
                    background: `radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, 
                      rgba(255, 255, 255, ${lightIntensity * 0.9}) 0%, 
                      rgba(240, 240, 240, ${lightIntensity * 0.7}) 15%,
                      rgba(220, 220, 220, ${lightIntensity * 0.4}) 30%,
                      transparent 60%)`,
                  }}
                />
                
                {/* Window panes with glass effect */}
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="relative bg-gradient-to-br from-cyan-900/40 to-blue-900/30 backdrop-blur-sm border-2 border-amber-800/50 rounded overflow-hidden"
                  >
                    {/* Glass reflection */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    
                    {/* Light rays through glass */}
                    <div 
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(${angle + 90}deg, 
                          transparent 0%, 
                          rgba(255, 255, 255, ${lightIntensity * 0.3}) 50%, 
                          transparent 100%)`,
                        opacity: lightIntensity
                      }}
                    />
                  </div>
                ))}

                {/* Center cross frame */}
                <div className="absolute top-1/2 left-0 right-0 h-3 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 transform -translate-y-1/2 shadow-lg" />
                <div className="absolute left-1/2 top-0 bottom-0 w-3 bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 transform -translate-x-1/2 shadow-lg" />
              </div>

              {/* Window sill */}
              <div className="absolute -bottom-4 left-0 right-0 h-4 bg-gradient-to-b from-amber-900 to-amber-950 rounded-b-lg shadow-xl" />
            </div>

            {/* Light beam extending from window */}
            <div 
              className="absolute pointer-events-none transition-all duration-500 ease-out"
              style={{
                width: '600px',
                height: '400px',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                transformOrigin: 'center center',
                background: `linear-gradient(90deg, 
                  rgba(255, 255, 255, ${lightIntensity * 0.6}) 0%, 
                  rgba(240, 240, 240, ${lightIntensity * 0.4}) 40%,
                  transparent 100%)`,
                opacity: lightIntensity,
                filter: 'blur(40px)',
                clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0 60%)'
              }}
            />
          </div>

          {/* Text content with light effect - moved to center with window */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none w-full px-4">
            <h1 
              className="text-5xl md:text-6xl font-bold mb-4 transition-all duration-300"
              style={{
                color: `rgba(255, 255, 255, ${0.9 + lightIntensity * 0.1})`,
                textShadow: `0 0 ${20 + lightIntensity * 30}px rgba(255, 255, 255, ${lightIntensity * 0.8})`
              }}
            >
              Light Through Darkness
            </h1>
            <p 
              className="text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-300"
              style={{
                opacity: 0.7 + lightIntensity * 0.3
              }}
            >
              Move your mouse to control the direction of light streaming through the window
            </p>
          </div>

          {/* Floating particles in light */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse pointer-events-none"
              style={{
                left: `${50 + (Math.random() - 0.5) * 40}%`,
                top: `${40 + (Math.random() - 0.5) * 30}%`,
                opacity: Math.random() * lightIntensity * 0.8,
                animation: `float ${3 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                transform: `translate(${Math.cos(angle * Math.PI / 180) * Math.random() * 100}px, ${Math.sin(angle * Math.PI / 180) * Math.random() * 100}px)`
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default InteractiveWindowSection;