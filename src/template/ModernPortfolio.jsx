import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ArrowRight, Code, Zap, Palette } from 'lucide-react';

export default function ModernPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    { title: "AI Dashboard", desc: "Machine learning analytics platform", color: "from-purple-500 to-pink-500" },
    { title: "E-Commerce App", desc: "Modern shopping experience", color: "from-blue-500 to-cyan-500" },
    { title: "Social Network", desc: "Connect and share globally", color: "from-green-500 to-teal-500" },
  ];

  const skills = [
    { icon: <Code className="w-8 h-8" />, name: "Development", desc: "React, Node.js, Python" },
    { icon: <Zap className="w-8 h-8" />, name: "Performance", desc: "Optimization & Speed" },
    { icon: <Palette className="w-8 h-8" />, name: "Design", desc: "UI/UX Excellence" },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            DevFolio
          </div>
          
          <div className="hidden md:flex space-x-8">
            {['Home', 'Projects', 'Skills', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-purple-400 transition-colors cursor-pointer">
                {item}
              </a>
            ))}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-md">
            {['Home', 'Projects', 'Skills', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block px-6 py-3 hover:bg-purple-900/30">
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl text-center">
          <div className="mb-6 animate-pulse">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-6xl">
                👨‍💻
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
            Creative Developer
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Building digital experiences that inspire and innovate
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2">
              View Projects <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-3 border-2 border-purple-400 rounded-full font-semibold hover:bg-purple-400/20 transition-colors">
              Contact Me
            </button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className={`h-64 rounded-2xl bg-gradient-to-br ${project.color} p-1 hover:scale-105 transition-transform`}>
                  <div className="h-full bg-gray-900 rounded-xl p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300">{project.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">What I Do Best</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, idx) => (
              <div key={idx} className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/50 transition-all">
                <div className="text-purple-400 mb-4">{skill.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{skill.name}</h3>
                <p className="text-gray-300">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Build Something Amazing</h2>
          <p className="text-xl text-gray-300 mb-12">
            Ready to bring your ideas to life? Get in touch!
          </p>
          
          <div className="flex gap-6 justify-center">
            <a href="#" className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center hover:scale-110 transition-transform">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center hover:scale-110 transition-transform">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 border-t border-gray-800">
        <p>© 2025 DevFolio. Made with ❤️ and React</p>
      </footer>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}