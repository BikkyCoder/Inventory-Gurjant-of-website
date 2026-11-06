import React, { useState, useEffect } from 'react';
import { Check, Zap, Gem, Rocket, ChevronRight, Star, Shield, Award, Activity, Cpu, Database, Globe2, Lock, Radio, Target, Workflow, Code2, Cloud, Sparkle, ArrowUpRight } from 'lucide-react';

export default function NeonCyberpunkPricing() {
  const [activePlan, setActivePlan] = useState('pro');
  const [billingMode, setBillingMode] = useState('yearly');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      tagline: 'Essential Power',
      icon: Zap,
      priceMonthly: 1999,
      priceYearly: 19990,
      neonColor: '#00ff88',
      glowColor: 'rgba(0, 255, 136, 0.5)',
      gradient: 'from-emerald-400 via-green-500 to-teal-500',
      features: [
        { icon: Cpu, title: 'CPU Power', value: '2 vCPUs', premium: false },
        { icon: Database, title: 'RAM Memory', value: '4GB DDR5', premium: false },
        { icon: Cloud, title: 'Storage', value: '100GB NVMe', premium: false },
        { icon: Activity, title: 'Bandwidth', value: '1TB/month', premium: false },
        { icon: Globe2, title: 'Domains', value: '3 domains', premium: false },
        { icon: Lock, title: 'SSL Security', value: 'Standard', premium: false },
        { icon: Code2, title: 'API Access', value: 'Limited', premium: false },
        { icon: Shield, title: 'DDoS Protection', value: 'Basic', premium: false },
      ],
      perks: ['24/7 Support', 'Free Backups', 'One-Click Deploy'],
      buttonText: 'Launch Basic',
      recommended: false
    },
    {
      id: 'pro',
      name: 'Pro',
      tagline: 'Maximum Performance',
      icon: Gem,
      priceMonthly: 4999,
      priceYearly: 49990,
      neonColor: '#ff00ff',
      glowColor: 'rgba(255, 0, 255, 0.5)',
      gradient: 'from-fuchsia-400 via-purple-500 to-violet-500',
      features: [
        { icon: Cpu, title: 'CPU Power', value: '8 vCPUs', premium: true },
        { icon: Database, title: 'RAM Memory', value: '16GB DDR5', premium: true },
        { icon: Cloud, title: 'Storage', value: '500GB NVMe', premium: true },
        { icon: Activity, title: 'Bandwidth', value: 'Unlimited', premium: true },
        { icon: Globe2, title: 'Domains', value: 'Unlimited', premium: true },
        { icon: Lock, title: 'SSL Security', value: 'Advanced + WAF', premium: true },
        { icon: Code2, title: 'API Access', value: 'Full Access', premium: true },
        { icon: Shield, title: 'DDoS Protection', value: 'Advanced', premium: true },
        { icon: Workflow, title: 'CI/CD Pipeline', value: 'Included', premium: true },
        { icon: Target, title: 'Load Balancer', value: 'Included', premium: true },
      ],
      perks: ['Priority Support', 'Auto Scaling', 'Advanced Analytics', 'Custom Integrations'],
      buttonText: 'Activate Pro',
      recommended: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      tagline: 'Ultimate Solution',
      icon: Rocket,
      priceMonthly: 12999,
      priceYearly: 129990,
      neonColor: '#00d4ff',
      glowColor: 'rgba(0, 212, 255, 0.5)',
      gradient: 'from-cyan-400 via-blue-500 to-indigo-500',
      features: [
        { icon: Cpu, title: 'CPU Power', value: 'Custom vCPUs', premium: true },
        { icon: Database, title: 'RAM Memory', value: 'Custom RAM', premium: true },
        { icon: Cloud, title: 'Storage', value: 'Unlimited NVMe', premium: true },
        { icon: Activity, title: 'Bandwidth', value: 'Unlimited', premium: true },
        { icon: Globe2, title: 'Domains', value: 'Unlimited', premium: true },
        { icon: Lock, title: 'SSL Security', value: 'Enterprise Grade', premium: true },
        { icon: Code2, title: 'API Access', value: 'Unlimited + SDK', premium: true },
        { icon: Shield, title: 'DDoS Protection', value: 'Enterprise', premium: true },
        { icon: Workflow, title: 'CI/CD Pipeline', value: 'Advanced', premium: true },
        { icon: Target, title: 'Load Balancer', value: 'Multi-Region', premium: true },
        { icon: Radio, title: 'CDN Network', value: 'Global', premium: true },
        { icon: Award, title: 'SLA Guarantee', value: '99.99%', premium: true },
      ],
      perks: ['Dedicated Support', 'White Glove Service', 'Custom Infrastructure', 'Training & Consulting'],
      buttonText: 'Contact Sales',
      recommended: false
    }
  ];

  const testimonials = [
    { name: 'Rajesh Kumar', role: 'CTO, TechCorp', rating: 5, text: 'Best pricing we\'ve found!' },
    { name: 'Priya Sharma', role: 'CEO, StartupHub', rating: 5, text: 'Incredible value for money.' },
    { name: 'Amit Patel', role: 'Developer', rating: 5, text: 'Perfect for our needs!' }
  ];

  const getPrice = (plan) => {
    const price = billingMode === 'yearly' ? plan.priceYearly : plan.priceMonthly;
    return billingMode === 'yearly' ? Math.round(price / 12) : price;
  };

  const getSavings = (plan) => {
    return Math.round(((plan.priceMonthly * 12 - plan.priceYearly) / (plan.priceMonthly * 12)) * 100);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      
      {/* Dynamic Mouse Glow */}
      <div 
        className="fixed w-96 h-96 rounded-full pointer-events-none transition-all duration-300 blur-3xl opacity-20"
        style={{
          background: `radial-gradient(circle, ${plans.find(p => p.id === activePlan)?.glowColor} 0%, transparent 70%)`,
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Scanlines Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
        }} />
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)]" />

      {/* Neon Corner Accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-emerald-500/20 to-transparent blur-3xl" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-fuchsia-500/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-violet-500/20 to-transparent blur-3xl" />

      <div className="relative z-10 py-16 px-4">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 via-fuchsia-500/10 to-cyan-500/10 border border-fuchsia-500/30 rounded-full px-6 py-2 mb-6 backdrop-blur-xl">
            <Sparkle className="w-4 h-4 text-fuchsia-400 animate-pulse" />
            <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-fuchsia-400 to-cyan-400">
              CYBER PRICING • PREMIUM PLANS
            </span>
          </div>

          <h1 className="text-7xl md:text-9xl font-black mb-6 leading-none tracking-tighter">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-2">
              CHOOSE
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-fuchsia-400 to-cyan-400 neon-text">
              YOUR POWER
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto font-light">
            Supercharge your digital presence with our high-performance infrastructure. Built for speed, secured for tomorrow.
          </p>

          {/* Billing Toggle - Cyberpunk Style */}
          <div className="inline-flex items-center gap-2 p-2 bg-black border-2 border-fuchsia-500/30 rounded-2xl backdrop-blur-xl relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-fuchsia-500/10 to-cyan-500/10 transition-all duration-500"
              style={{
                transform: billingMode === 'yearly' ? 'translateX(50%)' : 'translateX(0%)'
              }}
            />
            <button
              onClick={() => setBillingMode('monthly')}
              className={`relative z-10 px-8 py-4 rounded-xl font-black text-sm transition-all duration-300 ${
                billingMode === 'monthly'
                  ? 'text-emerald-400 neon-text-small'
                  : 'text-gray-600'
              }`}
            >
              MONTHLY
            </button>
            <button
              onClick={() => setBillingMode('yearly')}
              className={`relative z-10 px-8 py-4 rounded-xl font-black text-sm transition-all duration-300 ${
                billingMode === 'yearly'
                  ? 'text-fuchsia-400 neon-text-small'
                  : 'text-gray-600'
              }`}
            >
              YEARLY
              {billingMode === 'yearly' && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-black text-xs font-black px-2 py-0.5 rounded-full animate-pulse">
                  -17%
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isActive = activePlan === plan.id;
            
            return (
              <div
                key={plan.id}
                onMouseEnter={() => setActivePlan(plan.id)}
                className={`relative group transition-all duration-500 ${
                  plan.recommended ? 'lg:scale-105' : ''
                } ${isActive ? 'scale-105' : ''}`}
              >
                {/* Recommended Badge */}
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div 
                      className="px-6 py-2 rounded-full font-black text-xs text-black tracking-wider flex items-center gap-2 animate-pulse"
                      style={{ backgroundColor: plan.neonColor }}
                    >
                      <Star className="w-3 h-3" fill="currentColor" />
                      RECOMMENDED
                    </div>
                  </div>
                )}

                {/* Card */}
                <div 
                  className={`relative h-full bg-gradient-to-br from-gray-950 via-black to-gray-950 rounded-3xl overflow-hidden border-2 transition-all duration-500 ${
                    isActive ? 'shadow-2xl' : ''
                  }`}
                  style={{
                    borderColor: isActive ? plan.neonColor : 'rgba(255,255,255,0.1)',
                    boxShadow: isActive ? `0 0 40px ${plan.glowColor}, inset 0 0 20px ${plan.glowColor}` : 'none'
                  }}
                >
                  {/* Animated Border Glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(45deg, transparent 40%, ${plan.glowColor} 50%, transparent 60%)`,
                      backgroundSize: '200% 200%',
                      animation: 'shimmer 3s infinite'
                    }}
                  />

                  {/* Corner Accent */}
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 opacity-20"
                    style={{
                      background: `radial-gradient(circle at top right, ${plan.neonColor}, transparent)`
                    }}
                  />

                  <div className="relative p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center relative group-hover:scale-110 transition-transform duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${plan.neonColor}20, transparent)`,
                          border: `2px solid ${plan.neonColor}`,
                          boxShadow: `0 0 20px ${plan.glowColor}`
                        }}
                      >
                        <Icon className="w-8 h-8" style={{ color: plan.neonColor }} strokeWidth={2} />
                      </div>
                      
                      {billingMode === 'yearly' && (
                        <div className="text-right">
                          <div 
                            className="text-xs font-black px-3 py-1 rounded-full"
                            style={{ 
                              backgroundColor: `${plan.neonColor}20`,
                              color: plan.neonColor,
                              border: `1px solid ${plan.neonColor}`
                            }}
                          >
                            SAVE {getSavings(plan)}%
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Plan Name */}
                    <div className="mb-6">
                      <h3 className="text-4xl font-black mb-1" style={{ color: plan.neonColor }}>
                        {plan.name}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium tracking-wider uppercase">
                        {plan.tagline}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-black text-white">
                          ₹{getPrice(plan).toLocaleString('en-IN')}
                        </span>
                        <span className="text-gray-600 text-lg font-bold">/MO</span>
                      </div>
                      {billingMode === 'yearly' && (
                        <p className="text-gray-600 text-sm mt-2 font-mono">
                          {'>'} ₹{plan.priceYearly.toLocaleString('en-IN')} billed yearly
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <div 
                            key={idx}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group/feature"
                          >
                            <FeatureIcon 
                              className="w-5 h-5 flex-shrink-0" 
                              style={{ color: feature.premium ? plan.neonColor : '#666' }}
                            />
                            <div className="flex-1 flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-300 group-hover/feature:text-white transition-colors">
                                {feature.title}
                              </span>
                              <span 
                                className="text-xs font-bold"
                                style={{ color: feature.premium ? plan.neonColor : '#666' }}
                              >
                                {feature.value}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Perks */}
                    <div className="space-y-2 mb-8 pb-8 border-b border-white/10">
                      {plan.perks.map((perk, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-4 h-4" style={{ color: plan.neonColor }} strokeWidth={3} />
                          <span className="text-sm text-gray-400">{perk}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button 
                      className="w-full py-4 rounded-xl font-black text-base transition-all duration-300 flex items-center justify-center gap-2 group/btn relative overflow-hidden"
                      style={{
                        background: isActive ? plan.neonColor : 'rgba(255,255,255,0.05)',
                        color: isActive ? '#000' : plan.neonColor,
                        border: `2px solid ${plan.neonColor}`,
                        boxShadow: isActive ? `0 0 30px ${plan.glowColor}` : 'none'
                      }}
                    >
                      <span className="relative z-10">{plan.buttonText}</span>
                      <ArrowUpRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      
                      {/* Hover Shine Effect */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                        style={{
                          background: `linear-gradient(45deg, transparent, ${plan.neonColor}40, transparent)`,
                          animation: 'shimmer 2s infinite'
                        }}
                      />
                    </button>

                    <p className="text-center text-gray-700 text-xs mt-4 font-mono">
                      {'>'} 14-day trial • No CC required
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials - Cyberpunk Style */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-black text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-fuchsia-400">
            TRUSTED BY INNOVATORS
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx}
                className="bg-gradient-to-br from-gray-950 to-black border border-fuchsia-500/30 rounded-2xl p-6 hover:border-fuchsia-500/60 transition-all"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-400 text-sm mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="text-white font-bold text-sm">{testimonial.name}</p>
                  <p className="text-gray-600 text-xs">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-gray-950 to-black border-2 border-fuchsia-500/30 rounded-3xl p-12 relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              background: 'radial-gradient(circle at center, #ff00ff 0%, transparent 70%)'
            }}
          />
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white mb-4">
              NEED CUSTOM SOLUTION?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Enterprise-grade infrastructure with tailored configurations for your specific needs.
            </p>
            <button 
              className="px-10 py-5 bg-gradient-to-r from-emerald-500 via-fuchsia-500 to-cyan-500 text-black font-black rounded-xl hover:scale-105 transition-all inline-flex items-center gap-3"
              style={{
                boxShadow: '0 0 40px rgba(255,0,255,0.5)'
              }}
            >
              CONTACT SALES TEAM
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .neon-text {
          text-shadow: 
            0 0 10px currentColor,
            0 0 20px currentColor,
            0 0 30px currentColor,
            0 0 40px currentColor;
        }
        .neon-text-small {
          text-shadow: 
            0 0 5px currentColor,
            0 0 10px currentColor;
        }
      `}</style>
    </div>
  );
}