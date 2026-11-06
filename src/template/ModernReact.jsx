import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Check, Star, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ChevronRight, Zap, Shield, TrendingUp } from 'lucide-react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Navbar */}
        <Navbar 
          darkMode={darkMode} 
          toggleTheme={toggleTheme} 
          menuOpen={menuOpen} 
          setMenuOpen={setMenuOpen}
          scrolled={scrolled}
        />

        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <Features />

        {/* About Section */}
        <About />

        {/* Services Section */}
        <Services />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Pricing Section */}
        <Pricing />

        {/* Contact Section */}
        <Contact />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

const Navbar = ({ darkMode, toggleTheme, menuOpen, setMenuOpen, scrolled }) => {
  const navLinks = ['Features', 'About', 'Services', 'Testimonials', 'Pricing', 'Contact'];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BrandLogo
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                {link}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggleTheme} className="p-2">
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-16 md:py-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            Build Your Dream Website
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              With Modern Technology
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Create stunning, responsive websites with our cutting-edge platform. Fast, secure, and built for scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Get Started
            </button>
            <button className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-700">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: <Zap className="w-8 h-8" />, title: 'Lightning Fast', description: 'Optimized performance for the best user experience' },
    { icon: <Shield className="w-8 h-8" />, title: 'Secure & Reliable', description: 'Enterprise-grade security and 99.9% uptime' },
    { icon: <TrendingUp className="w-8 h-8" />, title: 'Scalable Solution', description: 'Grows with your business needs seamlessly' }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to build and scale your online presence
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              About Our Platform
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We're dedicated to providing the best web solutions for businesses of all sizes. Our platform combines cutting-edge technology with intuitive design to deliver exceptional results.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              With years of experience and thousands of satisfied clients, we're your trusted partner in digital success.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-flex items-center">
              Learn More <ChevronRight className="ml-2" size={20} />
            </button>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl h-96 flex items-center justify-center text-white text-2xl font-bold">
            Image Placeholder
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    'Web Development', 'Mobile Apps', 'UI/UX Design', 
    'Cloud Solutions', 'SEO Optimization', 'Analytics'
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Our Services
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Comprehensive solutions tailored to your business needs
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{service}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    { name: 'John Doe', role: 'CEO, TechCorp', text: 'Outstanding service and incredible results. Highly recommend!', rating: 5 },
    { name: 'Jane Smith', role: 'Founder, StartupXYZ', text: 'The team exceeded our expectations in every way possible.', rating: 5 },
    { name: 'Mike Johnson', role: 'CTO, InnovateLab', text: 'Professional, efficient, and delivered exactly what we needed.', rating: 5 }
  ];

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Don't just take our word for it</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={idx} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ name, role, text, rating }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{text}"</p>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
  );
};

const Pricing = () => {
  const plans = [
    { name: 'Starter', price: '29', features: ['5 Projects', '10GB Storage', 'Basic Support', 'SSL Certificate'] },
    { name: 'Professional', price: '79', features: ['20 Projects', '50GB Storage', 'Priority Support', 'Advanced Analytics', 'Custom Domain'], popular: true },
    { name: 'Enterprise', price: '199', features: ['Unlimited Projects', '500GB Storage', '24/7 Support', 'Advanced Security', 'Dedicated Manager'] }
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Choose the plan that's right for you</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <PricingCard key={idx} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({ name, price, features, popular }) => {
  return (
    <div className={`relative p-8 rounded-2xl ${
      popular 
        ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl transform scale-105' 
        : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
    }`}>
      {popular && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 px-3 py-1 rounded-bl-lg rounded-tr-2xl text-sm font-semibold">
          Popular
        </div>
      )}
      <h3 className={`text-2xl font-bold mb-2 ${popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
        {name}
      </h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">${price}</span>
        <span className={popular ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}>/month</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center">
            <Check className={`w-5 h-5 mr-2 ${popular ? 'text-blue-200' : 'text-blue-600 dark:text-blue-400'}`} />
            <span className={popular ? 'text-blue-50' : 'text-gray-600 dark:text-gray-300'}>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
        popular 
          ? 'bg-white text-blue-600 hover:bg-blue-50' 
          : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600'
      }`}>
        Get Started
      </button>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300">We'd love to hear from you</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <input 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
            ></textarea>
            <button 
              onClick={handleSubmit}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              Send Message
            </button>
          </div>
          <div className="space-y-6">
            <ContactInfo icon={<Mail />} title="Email" value="hello@example.com" />
            <ContactInfo icon={<Phone />} title="Phone" value="+1 (555) 123-4567" />
            <ContactInfo icon={<MapPin />} title="Address" value="123 Business St, City, Country" />
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactInfo = ({ icon, title, value }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{value}</p>
      </div>
    </div>
  );
};

const Footer = () => {
  const socialIcons = [
    { icon: <Facebook />, link: '#' },
    { icon: <Twitter />, link: '#' },
    { icon: <Instagram />, link: '#' },
    { icon: <Linkedin />, link: '#' }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              BrandLogo
            </h3>
            <p className="text-gray-400">Building the future of web development</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialIcons.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.link}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2026 BrandLogo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default App;