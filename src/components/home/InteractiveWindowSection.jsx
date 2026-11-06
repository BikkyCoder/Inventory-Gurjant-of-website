import React, { useState } from 'react';

const InteractiveWindowSection2 = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-gray-900 via-black to-black overflow-hidden">
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
          <div 
            className="relative inline-block"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Window frame */}
            <div className="relative bg-gradient-to-br from-amber-900 to-amber-950 p-6 rounded-lg shadow-2xl">
              {/* Window panes */}
              <div className="grid grid-cols-2 gap-3 w-80 h-96 relative overflow-visible">
                {/* Left window panes (opening effect) */}
                <div 
                  className="transition-all duration-700 ease-out origin-left"
                  style={{
                    transform: isHovering ? 'perspective(600px) rotateY(-75deg)' : 'perspective(600px) rotateY(0deg)',
                  }}
                >
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="relative bg-gradient-to-br from-gray-900 to-black backdrop-blur-sm border-2 border-amber-800/50 rounded overflow-hidden mb-3 last:mb-0"
                      style={{ height: 'calc(50% - 6px)' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                    </div>
                  ))}
                </div>

                {/* Right window panes (opening effect) */}
                <div 
                  className="transition-all duration-700 ease-out origin-right"
                  style={{
                    transform: isHovering ? 'perspective(600px) rotateY(75deg)' : 'perspective(600px) rotateY(0deg)',
                  }}
                >
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="relative bg-black border-2 border-amber-800/50 rounded overflow-hidden mb-3 last:mb-0"
                      style={{ height: 'calc(50% - 6px)' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                    </div>
                  ))}
                </div>

                {/* Center cross frame */}
                <div className="absolute top-1/2 left-0 right-0 h-3 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 transform -translate-y-1/2 shadow-lg z-10" />
                <div className="absolute left-1/2 top-0 bottom-0 w-3 bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 transform -translate-x-1/2 shadow-lg z-10" />
              </div>

              {/* Window sill */}
              <div className="absolute -bottom-4 left-0 right-0 h-4 bg-gradient-to-b from-amber-900 to-amber-950 rounded-b-lg shadow-xl" />
            </div>

            {/* Wind effect particles */}
            {isHovering && [...Array(40)].map((_, i) => {
              const randomAngle = (Math.random() - 0.5) * 60;
              const randomDistance = 200 + Math.random() * 400;
              const randomDelay = Math.random() * 0.3;
              const randomDuration = 1.5 + Math.random() * 2;
              
              return (
                <div
                  key={`wind-${i}`}
                  className="absolute pointer-events-none"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '2px',
                    height: `${Math.random() * 40 + 20}px`,
                    background: `linear-gradient(to bottom, transparent, rgba(200, 230, 255, ${Math.random() * 0.7 + 0.3}), transparent)`,
                    animation: `windBlow${i} ${randomDuration}s ease-out forwards`,
                    animationDelay: `${randomDelay}s`,
                    opacity: 0.8
                  }}
                />
              );
            })}
          </div>

          {/* Text content */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center pointer-events-none w-full px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
              Light Through Darkness
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Hover over the window to open it and feel the breeze
            </p>
          </div>
        </div>
      </div>

      <style>{`
        ${[...Array(40)].map((_, i) => {
          const randomAngle = (Math.random() - 0.5) * 60;
          const randomDistance = 200 + Math.random() * 400;
          const verticalMove = -100 + Math.random() * 200;
          
          return `
            @keyframes windBlow${i} {
              0% {
                transform: translate(-50%, -50%) translateX(0) translateY(0) rotate(0deg);
                opacity: 0;
              }
              15% {
                opacity: 0.8;
              }
              100% {
                transform: translate(-50%, -50%) translateX(${randomDistance}px) translateY(${verticalMove}px) rotate(${randomAngle}deg);
                opacity: 0;
              }
            }
          `;
        }).join('')}
      `}</style>
    </div>
  );
};

export default InteractiveWindowSection2;