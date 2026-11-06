import React, { useState, useEffect } from 'react';

const NebulaPortalSection = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const portalCenter = { x: 50, y: 50 };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const dx = mousePos.x - portalCenter.x;
  const dy = mousePos.y - portalCenter.y;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  const distance = Math.hypot(dx, dy);

  const intensity = Math.max(0.5, Math.min(1.2, 1 - distance / 120));
  const glowScale = 1 + intensity * 0.45;

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black overflow-hidden">
      {/* Background stars */}
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        {[...Array(120)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              width: `${Math.random() > 0.85 ? 2 : 1}px`,
              height: `${Math.random() > 0.85 ? 2 : 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="relative text-center px-4 sm:px-8">
          {/* === MAIN PORTAL WITH FIXED MOON === */}
          <div
            className="relative mx-auto w-80 h-80 sm:w-[420px] sm:h-[420px] md:w-[520px] md:h-[520px] rounded-full transition-all duration-800 ease-out overflow-hidden"
            style={{
              transform: `rotate(${angle * 0.3}deg) scale(${glowScale})`,
              boxShadow: `0 0 120px rgba(168, 85, 247, ${intensity * 0.9}),
                         inset 0 0 80px rgba(255,255,255,${intensity * 0.3})`,
            }}
          >
            {/* Rotating Moon - reliable transparent GIF */}
            <img
              src="https://cdn.mos.cms.futurecdn.net/Wi95cH3JMmPJtR4rUe4yWX.gif"
              alt="360° Rotating Moon"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: `brightness(${1.1 + intensity * 0.6}) contrast(1.2) saturate(1.4)`,
                opacity: 0.94,
              }}
            />

            {/* Strong overlay to hide any background leak + nebula glow */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 50%, 
                  rgba(139,92,246,${intensity * 0.55}) 0%, 
                  rgba(168,85,247,${intensity * 0.75}) 40%, 
                  rgba(0,0,0,0.4) 80%)`,
              }}
            />

            {/* Energy rays */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `repeating-conic-gradient(
                  from ${angle + 80}deg,
                  transparent 0deg,
                  rgba(255,255,255,${intensity * 0.3}) 2.5deg,
                  transparent 7deg
                )`,
                opacity: intensity * 0.65,
              }}
            />
          </div>

          {/* Particles */}
          {[...Array(22)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-purple-300 rounded-full pointer-events-none animate-pulse"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${angle + i * 16.36}deg) translateX(${100 + Math.random() * 90}px)`,
                opacity: intensity * 0.7,
                animationDuration: '3s',
                animationDelay: `${i * 0.12}s`,
                filter: 'blur(1.5px)',
              }}
            />
          ))}

          {/* Text */}
          <div className="mt-10 sm:mt-16 pointer-events-none">
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wider"
              style={{
                background: 'linear-gradient(90deg, #c084fc, #d8b4fe, #a855f7)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                textShadow: `0 0 ${40 + intensity * 70}px rgba(168, 85, 247, ${intensity})`,
              }}
            >
              Enter The Nebula
            </h1>

            <p
              className="mt-4 text-lg sm:text-xl text-purple-200/90 max-w-lg mx-auto"
              style={{
                opacity: 0.8 + intensity * 0.2,
                textShadow: `0 0 25px rgba(168, 85, 247, ${intensity * 0.7})`,
              }}
            >
              Move your cursor to awaken the cosmic gateway...
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-twinkle {
          animation: twinkle 6s infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default NebulaPortalSection;