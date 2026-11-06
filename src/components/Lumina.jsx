import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Instagram, Youtube } from 'lucide-react';

export default function Lumina() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Add custom styles for cursor
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .lumina-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #d4af37;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        display: block;
      }
      .lumina-cursor-follower {
        position: fixed;
        width: 30px;
        height: 30px;
        border: 1px solid #d4af37;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        display: block;
      }
      .lumina-body {
        cursor: none;
      }
      .lumina-text-gold {
        color: #d4af37 !important;
      }
      .lumina-border-gold {
        border-color: #d4af37 !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div
        className="lumina-cursor"
        style={{ left: mousePosition.x, top: mousePosition.y, transform: 'translate(-50%, -50%)' }}
      />
      <div
        className="lumina-cursor-follower"
        style={{ left: mousePosition.x, top: mousePosition.y }}
      />

      {/* Hero - Full Screen Luxury */}
      <section className="h-screen flex items-center justify-center relative bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-center z-10 px-8"
        >
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            LUMINA
          </h1>
          <p className="text-2xl md:text-4xl mt-6 lumina-text-gold font-light tracking-widest">
            COUTURE 2025
          </p>
          <p className="mt-10 text-gray-400 text-lg tracking-wider">Timeless Elegance Redefined</p>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-20"
          >
            <ArrowDown size={40} className="mx-auto lumina-text-gold" />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
          <p className="text-sm tracking-widest text-gray-500">SCROLL TO EXPLORE</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-32 px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-6xl md:text-8xl text-center mb-20 text-white"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            The Collection
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05, y: -20 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative overflow-hidden cursor-none"
              >
                <div className="aspect-[3/4] bg-gray-800 lumina-border-gold/20 relative overflow-hidden" style={{ border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                  <div className="absolute bottom-8 left-8 z-20">
                    <h3 className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Piece 0{item}
                    </h3>
                    <p className="lumina-text-gold mt-2">Limited Edition</p>
                  </div>
                  <div className="absolute inset-0 bg-gold mix-blend-overlay opacity-0 group-hover:opacity-30 transition duration-700" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Width Statement */}
      <section className="py-40 px-8 bg-black" style={{ borderTop: '1px solid rgba(212, 175, 55, 0.3)', borderBottom: '1px solid rgba(212, 175, 55, 0.3)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="text-5xl md:text-7xl leading-tight text-white"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            "Fashion fades,<br />
            <span className="lumina-text-gold">style is eternal</span>"
          </motion.p>
          <p className="mt-10 text-2xl text-gray-500">- Yves Saint Laurent</p>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-20 px-8 bg-black" style={{ borderTop: '1px solid rgba(212, 175, 55, 0.1)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              LUMINA
            </h1>
            <p className="mt-4 text-gray-500">© 2025 All Rights Reserved</p>
          </div>

          <div className="flex gap-10 mt-10 md:mt-0">
            <a href="#" className="lumina-text-gold transition"><Instagram size={28} /></a>
            <a href="#" className="lumina-text-gold transition"><Youtube size={28} /></a>
          </div>

          <div className="text-center md:text-right mt-10 md:mt-0">
            <p className="text-sm text-gray-600">Mumbai • Paris • New York</p>
            <p className="mt-2 lumina-text-gold">By Appointment Only</p>
          </div>
        </div>
      </footer>
    </>
  );
}
