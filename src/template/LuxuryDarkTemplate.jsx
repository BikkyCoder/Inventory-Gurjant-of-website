import React, { useState } from 'react';
import { Play, Award, Users, Rocket, Heart, MessageCircle, Share2, Eye, Calendar, ArrowUpRight, Search, Bell, Menu, X } from 'lucide-react';

export default function LuxuryDarkTemplate() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Design', 'Technology', 'Business', 'Creative', 'Innovation'];
  
  const projects = [
    { title: 'Quantum Interface Design', category: 'Design', views: '12.5K', likes: '2.3K', image: '🎨' },
    { title: 'AI Revolution Platform', category: 'Technology', views: '28.1K', likes: '5.7K', image: '🤖' },
    { title: 'Brand Identity System', category: 'Business', views: '15.8K', likes: '3.2K', image: '💼' },
    { title: 'Creative Studio Workflow', category: 'Creative', views: '9.4K', likes: '1.8K', image: '✨' },
    { title: 'Future Tech Innovation', category: 'Innovation', views: '22.6K', likes: '4.9K', image: '🚀' },
    { title: 'Digital Experience Hub', category: 'Design', views: '18.3K', likes: '3.6K', image: '🎯' },
  ];

  const testimonials = [
    { name: 'Sarah Mitchell', role: 'CEO, TechCorp', text: 'Absolutely transformative. This platform has revolutionized how we approach digital innovation.' },
    { name: 'James Chen', role: 'Creative Director', text: 'The quality and attention to detail is unmatched. Best investment we have made this year.' },
    { name: 'Emma Rodriguez', role: 'Product Manager', text: 'Seamless integration, beautiful design, and incredible performance. Could not ask for more.' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-8 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-12">
              <h1 className="text-2xl font-bold tracking-tight">LUXE<span className="text-orange-500">.</span></h1>
              <div className="hidden lg:flex space-x-8">
                <a href="#" className="text-white/60 hover:text-white transition text-sm font-medium">Showcase</a>
                <a href="#" className="text-white/60 hover:text-white transition text-sm font-medium">Services</a>
                <a href="#" className="text-white/60 hover:text-white transition text-sm font-medium">About</a>
                <a href="#" className="text-white/60 hover:text-white transition text-sm font-medium">Contact</a>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <button className="p-2 hover:bg-white/5 rounded-lg transition"><Search className="w-5 h-5" /></button>
              <button className="p-2 hover:bg-white/5 rounded-lg transition"><Bell className="w-5 h-5" /></button>
              <button className="bg-gradient-to-r from-orange-500 to-pink-600 px-6 py-2.5 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition">
                Get Started
              </button>
            </div>
            <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 lg:hidden">
          <div className="px-8 space-y-6">
            <a href="#" className="block text-2xl font-medium">Showcase</a>
            <a href="#" className="block text-2xl font-medium">Services</a>
            <a href="#" className="block text-2xl font-medium">About</a>
            <a href="#" className="block text-2xl font-medium">Contact</a>
            <button className="w-full bg-gradient-to-r from-orange-500 to-pink-600 px-6 py-4 rounded-lg text-lg font-semibold mt-8">
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-5 py-2.5 mb-8">
                <Award className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-orange-300 font-medium">Award Winning Platform 2024</span>
              </div>
              <h1 className="text-7xl lg:text-8xl font-bold leading-none mb-8">
                Create
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600">
                  Extraordinary
                </span>
                <br />
                Experiences
              </h1>
              <p className="text-xl text-white/60 mb-12 leading-relaxed max-w-xl">
                Elevate your digital presence with cutting-edge solutions that blend creativity, innovation, and performance to deliver unforgettable user experiences.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="group bg-gradient-to-r from-orange-500 to-pink-600 px-10 py-5 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition flex items-center">
                  Explore Projects
                  <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
                </button>
                <button className="px-10 py-5 rounded-xl text-lg font-semibold border-2 border-white/10 hover:bg-white/5 transition flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-pink-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl p-12 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                    <Users className="w-8 h-8 text-orange-400 mb-4" />
                    <div className="text-4xl font-bold mb-2">500K+</div>
                    <div className="text-white/60 text-sm">Active Users</div>
                  </div>
                  <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                    <Rocket className="w-8 h-8 text-pink-400 mb-4" />
                    <div className="text-4xl font-bold mb-2">98%</div>
                    <div className="text-white/60 text-sm">Satisfaction</div>
                  </div>
                  <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                    <Award className="w-8 h-8 text-purple-400 mb-4" />
                    <div className="text-4xl font-bold mb-2">50+</div>
                    <div className="text-white/60 text-sm">Awards Won</div>
                  </div>
                  <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                    <Heart className="w-8 h-8 text-red-400 mb-4" />
                    <div className="text-4xl font-bold mb-2">1M+</div>
                    <div className="text-white/60 text-sm">Projects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-32 px-8 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl font-bold mb-4">Featured Projects</h2>
              <p className="text-xl text-white/60">Discover our latest creative work</p>
            </div>
            <button className="hidden md:flex items-center text-orange-400 hover:text-orange-300 transition">
              View All
              <ArrowUpRight className="w-5 h-5 ml-2" />
            </button>
          </div>
          
          <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl overflow-hidden mb-6 aspect-[4/3] hover:border-orange-500/50 transition">
                  <div className="absolute inset-0 flex items-center justify-center text-8xl">
                    {project.image}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-8">
                    <div className="flex gap-3">
                      <button className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold group-hover:text-orange-400 transition">{project.title}</h3>
                  <span className="text-xs bg-white/5 px-3 py-1 rounded-full text-white/60">{project.category}</span>
                </div>
                <div className="flex items-center gap-6 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {project.views}
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    {project.likes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-8">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4">What Our Clients Say</h2>
          <p className="text-xl text-white/60 text-center mb-20">Trusted by industry leaders worldwide</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-10 hover:border-orange-500/50 transition">
                <MessageCircle className="w-10 h-10 text-orange-400 mb-6" />
                <p className="text-lg text-white/80 mb-8 leading-relaxed">{testimonial.text}</p>
                <div>
                  <div className="font-semibold text-lg">{testimonial.name}</div>
                  <div className="text-white/60 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 bg-gradient-to-br from-orange-500/10 via-pink-600/10 to-purple-600/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-bold mb-8">Ready to Start Your Journey?</h2>
          <p className="text-2xl text-white/60 mb-12">
            Join over 500,000 creators and innovators building the future
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full sm:w-96 px-8 py-5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500 transition text-lg"
            />
            <button className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-pink-600 px-12 py-5 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition">
              Get Started Free
            </button>
          </div>
          <p className="text-white/40 text-sm mt-6">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-8 py-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-6">LUXE<span className="text-orange-500">.</span></h3>
              <p className="text-white/60 leading-relaxed">Creating extraordinary digital experiences for the modern world.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-3 text-white/60">
                <a href="#" className="block hover:text-white transition">Features</a>
                <a href="#" className="block hover:text-white transition">Pricing</a>
                <a href="#" className="block hover:text-white transition">Security</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-3 text-white/60">
                <a href="#" className="block hover:text-white transition">About</a>
                <a href="#" className="block hover:text-white transition">Careers</a>
                <a href="#" className="block hover:text-white transition">Blog</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-3 text-white/60">
                <a href="#" className="block hover:text-white transition">Privacy</a>
                <a href="#" className="block hover:text-white transition">Terms</a>
                <a href="#" className="block hover:text-white transition">Cookie Policy</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center text-white/40 text-sm">
            © 2024 LUXE. All rights reserved. Crafted with passion and innovation.
          </div>
        </div>
      </footer>
    </div>
  );
}