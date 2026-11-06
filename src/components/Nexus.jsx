import React from 'react';
import { Menu, X, ArrowRight, Sparkles, Zap, Shield, Rocket, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Nexus() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      {/* Floating Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            NEXUS
          </motion.h1>

          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Features', 'About', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                href={`#${item.toLowerCase()}`}
                className="hover:text-indigo-400 transition duration-300"
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full font-medium shadow-lg shadow-purple-500/25"
            >
              Get Started
            </motion.button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Hero Section - God Level */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-pink-900/20" />
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 80%, #6366f1 0%, transparent 50%), radial-gradient(circle at 80% 20%, #ec4899 0%, transparent 50%), radial-gradient(circle at 40% 40%, #a855f7 0%, transparent 50%)',
              backgroundSize: '200% 200%',
            }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight text-white"
          >
            Build the{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Future
            </span>
            <br />
            Today
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            Next-generation digital solutions for modern businesses. Fast. Secure. Beautiful.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button className="px-10 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-3 group text-white">
              Start Free Trial <ArrowRight className="group-hover:translate-x-2 transition" />
            </button>
            <button className="px-10 py-5 border border-white/20 backdrop-blur rounded-2xl text-lg font-semibold hover:bg-white/10 transition text-white">
              Watch Demo
            </button>
          </motion.div>

          <div className="mt-20 flex justify-center gap-10 text-gray-400">
            {[Sparkles, Zap, Shield, Rocket].map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <Icon size={40} className="hover:text-indigo-400 transition" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl md:text-6xl font-bold text-center mb-20 text-white"
          >
            Why Choose <span className="text-indigo-400">NEXUS</span>?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Blazing Fast", desc: "Optimized performance with cutting-edge technology stack", icon: "⚡" },
              { title: "Secure by Default", desc: "Enterprise-grade security built into every layer", icon: "🔒" },
              { title: "Scalable Forever", desc: "Grows with your business, no limits", icon: "📈" },
            ].map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center hover:border-indigo-500/50 transition-all duration-500"
              >
                <div className="text-6xl mb-6">{feat.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">{feat.title}</h3>
                <p className="text-gray-400">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultra Stylish Footer */}
      <footer className="bg-black/50 backdrop-blur-2xl border-t border-white/10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-10">
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent mb-6">
                NEXUS
              </h1>
              <p className="text-gray-400 mb-8">Building the future of digital experiences, one pixel at a time.</p>
              <div className="flex gap-6">
                {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                  <motion.a
                    key={i}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition"
                  >
                    <Icon size={26} />
                  </motion.a>
                ))}
              </div>
            </div>

            {['Product', 'Company', 'Resources', 'Legal'].map((title, i) => (
              <div key={i}>
                <h3 className="text-xl font-semibold mb-6 text-indigo-400">{title}</h3>
                <ul className="space-y-3 text-gray-400">
                  {['Features', 'Pricing', 'Security', 'Updates'].map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-white transition">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-white/10 text-center text-gray-500">
            © 2025 NEXUS. Made with 🔥 by Indian Developers
          </div>
        </div>
      </footer>
    </>
  );
}
