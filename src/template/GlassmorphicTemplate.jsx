import React, { useState } from 'react';
import { Sparkles, Zap, Globe, Shield, TrendingUp, Star, ChevronRight, Menu, X, Check, ArrowRight, Layers, Code, Palette, Cloud, Lock, BarChart3 } from 'lucide-react';

export default function GlassmorphicTemplate() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const features = [
    { icon: <Layers className="w-6 h-6" />, title: 'Modular Design', desc: 'Build with flexible, reusable components' },
    { icon: <Code className="w-6 h-6" />, title: 'Clean Code', desc: 'Production-ready, optimized codebase' },
    { icon: <Palette className="w-6 h-6" />, title: 'Beautiful UI', desc: 'Stunning interfaces that users love' },
    { icon: <Cloud className="w-6 h-6" />, title: 'Cloud Ready', desc: 'Deploy anywhere, scale infinitely' },
    { icon: <Lock className="w-6 h-6" />, title: 'Secure', desc: 'Enterprise-grade security built-in' },
    { icon: <BarChart3 className="w-6 h-6" />, title: 'Analytics', desc: 'Deep insights into user behavior' },
  ];

  const stats = [
    { number: '99.9%', label: 'Uptime' },
    { number: '2M+', label: 'Active Users' },
    { number: '<100ms', label: 'Response Time' },
    { number: '150+', label: 'Countries' },
  ];

  const pricing = [
    {
      name: 'Starter',
      price: '29',
      features: ['5 Projects', '10GB Storage', 'Basic Support', 'API Access'],
      color: 'from-cyan-400 to-blue-500'
    },
    {
      name: 'Pro',
      price: '79',
      features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Advanced Analytics', 'Custom Domain'],
      color: 'from-violet-400 to-purple-600',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '199',
      features: ['Everything in Pro', 'Dedicated Manager', '1TB Storage', 'SLA Guarantee', 'Custom Integration', 'White Label'],
      color: 'from-pink-400 to-rose-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-10">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold">Nexus</span>
              </div>
              <div className="hidden md:flex space-x-8">
                <a href="#features" className="hover:text-cyan-300 transition">Features</a>
                <a href="#pricing" className="hover:text-cyan-300 transition">Pricing</a>
                <a href="#about" className="hover:text-cyan-300 transition">About</a>
                <a href="#contact" className="hover:text-cyan-300 transition">Contact</a>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button className="px-5 py-2 hover:bg-white/10 rounded-lg transition">Sign In</button>
              <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition">
                Start Free
              </button>
            </div>
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-pink-800/95 backdrop-blur-xl pt-20 md:hidden">
          <div className="px-6 space-y-6">
            <a href="#features" className="block text-xl font-medium">Features</a>
            <a href="#pricing" className="block text-xl font-medium">Pricing</a>
            <a href="#about" className="block text-xl font-medium">About</a>
            <a href="#contact" className="block text-xl font-medium">Contact</a>
            <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 rounded-lg font-semibold mt-6">
              Start Free Trial
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">Introducing Nexus 2.0 - Now Live!</span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              Build The Future
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400">
                With Confidence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              The ultimate platform for creators, developers, and innovators. Transform your ideas into reality with powerful tools and seamless workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition flex items-center justify-center">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-lg hover:bg-white/20 transition">
                View Demo
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 text-transparent bg-clip-text mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Powerful Features</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Everything you need to build, scale, and succeed in one integrated platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 hover:border-white/30 transition cursor-pointer">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Simple Pricing</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Choose the perfect plan for your needs. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, i) => (
              <div key={i} className={`relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold">${plan.price}</span>
                    <span className="text-white/60 ml-2">/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mr-3 flex-shrink-0`}>
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-xl font-semibold transition ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-lg hover:shadow-purple-500/50' 
                    : 'bg-white/10 border border-white/20 hover:bg-white/20'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Loved by Thousands</h2>
            <p className="text-xl text-white/70">See what our community has to say</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Alex Thompson', role: 'Founder @ TechStart', text: 'This platform completely transformed how we build products. The speed and reliability are unmatched.', rating: 5 },
              { name: 'Maria Garcia', role: 'Lead Designer', text: 'Beautiful, intuitive, and powerful. Everything I needed in one place. Highly recommend!', rating: 5 },
              { name: 'David Kim', role: 'CTO @ InnovateLab', text: 'Best investment we made this year. The ROI was immediate and our team productivity skyrocketed.', rating: 5 },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg text-white/80 mb-6 leading-relaxed">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-white/60">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500/20 via-purple-600/20 to-pink-500/20 backdrop-blur-md border border-white/20 rounded-3xl p-12 md:p-16 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Join thousands of teams already building amazing products with Nexus
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:border-cyan-400 transition"
              />
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition whitespace-nowrap">
                Start Free Trial
              </button>
            </div>
            <p className="text-white/60 text-sm mt-6">No credit card required • Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 px-6 py-12 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold">Nexus</span>
              </div>
              <p className="text-white/60 leading-relaxed">Building the future, one line of code at a time.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-3 text-white/60">
                <a href="#" className="block hover:text-white transition">Features</a>
                <a href="#" className="block hover:text-white transition">Pricing</a>
                <a href="#" className="block hover:text-white transition">Security</a>
                <a href="#" className="block hover:text-white transition">Roadmap</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-3 text-white/60">
                <a href="#" className="block hover:text-white transition">About</a>
                <a href="#" className="block hover:text-white transition">Blog</a>
                <a href="#" className="block hover:text-white transition">Careers</a>
                <a href="#" className="block hover:text-white transition">Press</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-3 text-white/60">
                <a href="#" className="block hover:text-white transition">Documentation</a>
                <a href="#" className="block hover:text-white transition">Guides</a>
                <a href="#" className="block hover:text-white transition">API Reference</a>
                <a href="#" className="block hover:text-white transition">Support</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">© 2024 Nexus. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white transition">Privacy</a>
              <a href="#" className="text-white/60 hover:text-white transition">Terms</a>
              <a href="#" className="text-white/60 hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}