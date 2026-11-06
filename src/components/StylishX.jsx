import React from 'react';
import { ArrowDown, Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

function StylishX() {
  React.useEffect(() => {
    // Add blob animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes blob {
        0% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
        100% { transform: translate(0px, 0px) scale(1); }
      }
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .stylishx-animate-blob {
        animation: blob 7s infinite;
      }
      .stylishx-animation-delay-2000 {
        animation-delay: 2s;
      }
      .stylishx-animation-delay-4000 {
        animation-delay: 4s;
      }
      .stylishx-animate-gradient {
        background-size: 200% 200%;
        animation: gradient 3s ease infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 to-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            StylishX
          </h1>
          <div className="hidden md:flex gap-10">
            {['Home', 'About', 'Features', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-pink-400 transition duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section - Super Stylish */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 animate-pulse"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 stylishx-animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 stylishx-animate-blob stylishx-animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 stylishx-animate-blob stylishx-animation-delay-4000"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent stylishx-animate-gradient">
            Welcome to Future
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-300">
            Ekdum stylish, modern aur unique website ban gaya tumhara!
          </p>
          <button className="px-10 py-5 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full text-lg font-semibold hover:scale-110 transition transform duration-300 shadow-2xl">
            Get Started
          </button>
          <div className="mt-20 animate-bounce">
            <ArrowDown size={40} className="mx-auto text-gray-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-10">About Us</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Yeh ek fully modern React + Tailwind wali website hai jo bilkul unique aur premium lagti hai. Tum isko apne project, portfolio ya business ke liye use kar sakte ho!
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-white/5 backdrop-blur">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">Features</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {['Lightning Fast', 'Fully Responsive', 'Modern Design'].map((feat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-8 hover:scale-105 transition transform duration-300 border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6"></div>
                <h3 className="text-2xl font-bold mb-4">{feat}</h3>
                <p className="text-gray-400">Bilkul premium feel wala component with smooth animations.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-10">Contact Us</h2>
          <p className="text-xl text-gray-300 mb-10">Kuch bhi puchna ho toh neeche links hain!</p>
        </div>
      </section>

      {/* Super Stylish Footer */}
      <footer className="bg-black/50 backdrop-blur-xl border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent mb-6">
                StylishX
              </h1>
              <p className="text-gray-400">Made with ❤️ using React & Tailwind</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3 text-gray-400">
                {['Home', 'About', 'Features', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="hover:text-pink-400 transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Contact Info</h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center gap-3">
                  <Mail size={20} />
                  <span>hello@stylishx.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={20} />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
              <div className="flex gap-6">
                <a href="#" className="hover:text-pink-400 transition"><Github size={28} /></a>
                <a href="#" className="hover:text-pink-400 transition"><Twitter size={28} /></a>
                <a href="#" className="hover:text-pink-400 transition"><Linkedin size={28} /></a>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-500">
            © 2025 StylishX. All rights reserved. | Made by You ❤️
          </div>
        </div>
      </footer>
    </div>
  );
}

export default StylishX;
