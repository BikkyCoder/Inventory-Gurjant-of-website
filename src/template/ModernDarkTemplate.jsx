import React, { useState, useEffect } from 'react';
import { ChevronRight, Code, Cpu, Database, Globe, Star, TrendingUp } from 'lucide-react';

export default function ModernDarkTemplate() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = ['Overview', 'Technology', 'Performance', 'Security'];
  
  const stats = [
    { value: '99.9%', label: 'Uptime' },
    { value: '2M+', label: 'Active Users' },
    { value: '150+', label: 'Countries' },
    { value: '24/7', label: 'Support' }
  ];

  const services = [
    { icon: <Code className="w-8 h-8" />, title: 'Development', desc: 'Custom solutions built with modern frameworks' },
    { icon: <Database className="w-8 h-8" />, title: 'Data Analytics', desc: 'Real-time insights and powerful visualizations' },
    { icon: <Cpu className="w-8 h-8" />, title: 'AI Solutions', desc: 'Intelligent automation and machine learning' },
    { icon: <Globe className="w-8 h-8" />, title: 'Global Scale', desc: 'Infrastructure that grows with your needs' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800' : ''}`}>
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded"></div>
              <span className="text-xl font-bold">NEXUS</span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm">
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition">Products</a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition">Solutions</a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition">Developers</a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition">Pricing</a>
            </div>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded text-sm font-medium transition">
              Sign In
            </button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-2 mb-8">
              <Star className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-slate-400">Introducing Nexus Pro</span>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Build the future
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                with confidence
              </span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Enterprise-grade platform that empowers teams to ship faster, scale infinitely, and build amazing products that users love.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg font-medium transition flex items-center">
                Get Started Free
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
              <button className="bg-slate-900 hover:bg-slate-800 border border-slate-800 px-8 py-4 rounded-lg font-medium transition">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">{stat.value}</div>
                <div className="text-slate-500 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything you need to succeed</h2>
            <p className="text-slate-400 text-lg">Powerful tools designed for modern teams</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition group">
                <div className="text-cyan-400 mb-4 group-hover:scale-110 transition">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-slate-500 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="px-6 py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex border-b border-slate-800 mb-8 overflow-x-auto">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-6 py-4 font-medium transition whitespace-nowrap ${
                  activeTab === i
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-12">
            <div className="flex items-center justify-between">
              <div className="max-w-xl">
                <h3 className="text-3xl font-bold mb-4">Lightning-fast performance</h3>
                <p className="text-slate-400 text-lg mb-6">
                  Experience unparalleled speed with our optimized infrastructure that delivers results in milliseconds, not seconds.
                </p>
                <div className="flex items-center space-x-2 text-cyan-400">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">40% faster than competitors</span>
                </div>
              </div>
              <div className="hidden lg:block w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-slate-400 mb-10">
            Join thousands of teams already building with Nexus
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:border-cyan-500 transition"
            />
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg font-medium transition">
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-12">
        <div className="max-w-7xl mx-auto text-center text-slate-500 text-sm">
          <p>© 2024 Nexus. Empowering innovation worldwide.</p>
        </div>
      </footer>
    </div>
  );
}