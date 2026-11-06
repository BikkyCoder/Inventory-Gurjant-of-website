import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Sparkles, Zap, Globe, ArrowRight, Star, Users, TrendingUp, Shield, Code, Smartphone, Layers, Check, Play, Heart, MessageCircle, Share2, Award, Target, Rocket } from 'lucide-react';

export default function ComprehensiveLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [count, setCount] = useState({ users: 0, projects: 0, countries: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => ({
        users: prev.users < 50000 ? prev.users + 500 : 50000,
        projects: prev.projects < 10000 ? prev.projects + 100 : 10000,
        countries: prev.countries < 150 ? prev.countries + 2 : 150
      }));
    }, 20);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: Sparkles, title: "AI-Powered", desc: "Intelligent automation that learns from your workflow", color: "from-purple-500 to-pink-500" },
    { icon: Zap, title: "Lightning Fast", desc: "Optimized performance with 99.9% uptime guarantee", color: "from-yellow-500 to-orange-500" },
    { icon: Globe, title: "Global CDN", desc: "Distributed network for instant worldwide access", color: "from-blue-500 to-cyan-500" },
    { icon: Shield, title: "Enterprise Security", desc: "Bank-level encryption protecting your data", color: "from-green-500 to-emerald-500" },
    { icon: Code, title: "Developer Friendly", desc: "RESTful APIs and extensive documentation", color: "from-indigo-500 to-purple-500" },
    { icon: Smartphone, title: "Mobile First", desc: "Responsive design that works everywhere", color: "from-pink-500 to-rose-500" }
  ];

  const services = [
    { icon: Layers, title: "Cloud Infrastructure", desc: "Scalable cloud solutions", projects: "2.5k+" },
    { icon: Code, title: "Custom Development", desc: "Tailored software solutions", projects: "1.8k+" },
    { icon: Target, title: "Digital Marketing", desc: "Data-driven campaigns", projects: "3.2k+" },
    { icon: Shield, title: "Cybersecurity", desc: "Complete protection suite", projects: "1.2k+" }
  ];

  const pricing = [
    { name: "Starter", price: "$29", features: ["10 Projects", "5GB Storage", "Basic Support", "API Access"], popular: false },
    { name: "Professional", price: "$99", features: ["Unlimited Projects", "50GB Storage", "Priority Support", "Advanced API", "Custom Integrations"], popular: true },
    { name: "Enterprise", price: "$299", features: ["Unlimited Everything", "500GB Storage", "24/7 Dedicated Support", "Custom Solutions", "SLA Guarantee", "Team Training"], popular: false }
  ];

  const testimonials = [
    { name: "Sarah Johnson", role: "CTO, TechCorp", text: "This platform transformed our workflow. We've seen 300% productivity increase!", avatar: "SJ", rating: 5 },
    { name: "Michael Chen", role: "Founder, StartupXYZ", text: "Best investment we've made. The ROI was visible within the first month.", avatar: "MC", rating: 5 },
    { name: "Emma Williams", role: "Product Manager", text: "Incredibly intuitive and powerful. Our team adopted it instantly.", avatar: "EW", rating: 5 }
  ];

  const tabs = [
    { title: "Analytics", content: "Real-time analytics dashboard with comprehensive insights into user behavior, conversion rates, and performance metrics." },
    { title: "Automation", content: "Powerful automation tools that streamline repetitive tasks and boost productivity across your entire workflow." },
    { title: "Integration", content: "Seamlessly connect with 100+ popular tools and services through our robust integration ecosystem." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-xl shadow-2xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Sparkles className="w-7 h-7" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                NexaFlow
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8 items-center">
              {['Home', 'Features', 'Services', 'Pricing', 'Testimonials', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-purple-400 transition-colors duration-200 relative group font-medium">
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
              <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                Sign Up
              </button>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800">
            <div className="px-4 pt-4 pb-6 space-y-3">
              {['Home', 'Features', 'Services', 'Pricing', 'Testimonials', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block px-4 py-3 hover:bg-purple-500/20 rounded-lg transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-6 px-5 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm">
                <span className="text-sm text-purple-300 flex items-center">
                  <Star className="w-4 h-4 mr-2 fill-purple-400" />
                  Trusted by 50,000+ users worldwide
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Build The
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                  Future
                </span>
                <br />
                Today
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Experience the next generation of digital transformation with our cutting-edge platform. Streamline workflows, boost productivity, and scale your business effortlessly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 border-2 border-purple-500/50 rounded-xl font-semibold hover:bg-purple-500/10 transition-all duration-300 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center gap-6 mt-12">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-4 border-slate-950 flex items-center justify-center text-sm font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">4.9/5 from 2,500+ reviews</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-8 border border-purple-500/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl animate-pulse"></div>
                <div className="relative space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-slate-800/50 rounded-2xl p-6 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl"></div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">+{i * 25}%</div>
                          <div className="text-sm text-gray-400">Growth</div>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${i * 30}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud / Stats Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "Active Users", value: count.users.toLocaleString(), icon: Users },
              { label: "Projects Completed", value: count.projects.toLocaleString(), icon: Target },
              { label: "Countries", value: count.countries, icon: Globe }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 group cursor-pointer hover:scale-105">
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.value}+
                </div>
                <div className="text-gray-400 mb-4">{stat.label}</div>
                <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 rounded-lg text-sm font-semibold transition-all duration-300">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-5 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm mb-6">
              <span className="text-sm text-purple-300">✨ FEATURES</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Everything You <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Need</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Powerful features designed to transform your workflow and accelerate your business growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
                className={`relative p-8 rounded-2xl border transition-all duration-500 cursor-pointer group ${
                  activeCard === idx
                    ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50 shadow-2xl shadow-purple-500/30 scale-105'
                    : 'bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/30'
                }`}
              >
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 bg-gradient-to-br ${feature.color} ${
                  activeCard === idx ? 'shadow-xl scale-110' : 'opacity-80'
                }`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                
                <button className={`mt-6 px-5 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center ${
                  activeCard === idx 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'text-purple-400 hover:text-purple-300'
                }`}>
                  <span className="text-sm">Learn More</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700/50 backdrop-blur-sm p-8 md:p-12">
            <div className="flex flex-wrap gap-4 mb-8">
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === idx
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-xl shadow-purple-500/50'
                      : 'bg-slate-700/50 hover:bg-slate-700'
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
            <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">{tabs[activeTab].content}</p>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 inline-flex items-center">
                Explore {tabs[activeTab].title}
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="group p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-400">{service.projects}</div>
                    <div className="text-sm text-gray-400">Completed</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.desc}</p>
                <button className="px-5 py-2 bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 rounded-lg font-semibold flex items-center group-hover:translate-x-2 transition-all duration-300">
                  Explore <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Simple <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Pricing</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose the perfect plan for your business. All plans include 14-day free trial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, idx) => (
              <div
                key={idx}
                className={`relative p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50 shadow-2xl shadow-purple-500/30'
                    : 'bg-slate-800/50 border-slate-700/50 backdrop-blur-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="space-y-3">
                  <button className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl hover:shadow-purple-500/50'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}>
                    Get Started
                  </button>
                  <button className={`w-full py-3 rounded-xl font-semibold border transition-all duration-300 ${
                    plan.popular
                      ? 'border-purple-500/50 text-purple-300 hover:bg-purple-500/10'
                      : 'border-slate-600 text-gray-300 hover:bg-slate-700/50'
                  }`}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Loved by <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Thousands</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              See what our customers have to say about their experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:scale-105 group">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-2 pt-4 border-t border-slate-700">
                  <button className="flex-1 px-3 py-2 text-sm bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-1">
                    <Heart className="w-4 h-4" /> Like
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-1">
                    <MessageCircle className="w-4 h-4" /> Reply
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm bg-green-500/20 hover:bg-green-500/40 text-green-300 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-1">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative p-16 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
            
            <div className="relative z-10 text-center">
              <Rocket className="w-16 h-16 mx-auto mb-6 text-purple-400" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of companies already growing with NexaFlow. Start your free trial today—no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                  Start Free Trial
                </button>
                <button className="px-10 py-4 border-2 border-purple-500/50 rounded-xl font-semibold hover:bg-purple-500/10 transition-all duration-300">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 px-4 border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold">NexaFlow</span>
              </div>
              <p className="text-gray-400">Building the future of digital transformation, one innovation at a time.</p>
            </div>
            
            {[
              { title: "Product", links: ["Features", "Pricing", "Security", "Updates"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { title: "Support", links: ["Help Center", "Contact", "Status", "Documentation"] }
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">&copy; 2026 NexaFlow. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}