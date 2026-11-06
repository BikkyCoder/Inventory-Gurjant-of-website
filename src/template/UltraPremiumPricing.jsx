import React, { useState } from 'react';
import { Check, X, Zap, Gem, Flame, Star, ArrowRight, Sparkles, Award, TrendingUp, Shield, Lock, Globe, Clock } from 'lucide-react';

export default function UltraPremiumPricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const plans = [
    {
      name: 'Startup',
      subtitle: 'Launch Your Vision',
      icon: Zap,
      monthlyPrice: 2999,
      annualPrice: 29990,
      savingsPercent: 17,
      color: 'cyan',
      gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
      features: {
        core: [
          { text: '25 Premium Projects', included: true },
          { text: '100GB SSD Storage', included: true },
          { text: '50K API Requests/month', included: true },
          { text: 'Real-time Collaboration', included: true }
        ],
        advanced: [
          { text: 'Custom Domain', included: true },
          { text: 'SSL Certificates', included: true },
          { text: 'Email Support (24h)', included: true },
          { text: 'Basic Analytics Dashboard', included: true }
        ],
        enterprise: [
          { text: 'Priority Support', included: false },
          { text: 'Dedicated Manager', included: false },
          { text: 'Custom Integrations', included: false }
        ]
      },
      badge: null,
      users: '1-5 users',
      popular: false
    },
    {
      name: 'Business',
      subtitle: 'Scale with Confidence',
      icon: Gem,
      monthlyPrice: 5999,
      annualPrice: 59990,
      savingsPercent: 17,
      color: 'purple',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      features: {
        core: [
          { text: 'Unlimited Projects', included: true },
          { text: '1TB SSD Storage', included: true },
          { text: '500K API Requests/month', included: true },
          { text: 'Advanced Collaboration Tools', included: true }
        ],
        advanced: [
          { text: 'Multiple Custom Domains', included: true },
          { text: 'Advanced SSL & Security', included: true },
          { text: 'Priority Support (2h)', included: true },
          { text: 'Advanced Analytics & Reports', included: true },
          { text: 'A/B Testing Tools', included: true },
          { text: 'API & Webhook Access', included: true }
        ],
        enterprise: [
          { text: 'White-label Solutions', included: true },
          { text: 'Custom Branding', included: true },
          { text: 'Advanced Integrations', included: true },
          { text: 'Team Management', included: true }
        ]
      },
      badge: 'RECOMMENDED',
      users: '5-50 users',
      popular: true
    },
    {
      name: 'Enterprise',
      subtitle: 'Unlimited Possibilities',
      icon: Flame,
      monthlyPrice: 14999,
      annualPrice: 149990,
      savingsPercent: 17,
      color: 'orange',
      gradient: 'from-orange-500 via-red-500 to-pink-600',
      features: {
        core: [
          { text: 'Unlimited Everything', included: true },
          { text: '10TB SSD Storage', included: true },
          { text: 'Unlimited API Requests', included: true },
          { text: 'Enterprise Collaboration Suite', included: true }
        ],
        advanced: [
          { text: 'Unlimited Custom Domains', included: true },
          { text: 'Enterprise-grade Security', included: true },
          { text: 'VIP Support (30min)', included: true },
          { text: 'Custom Analytics Platform', included: true },
          { text: 'Advanced Testing & Monitoring', included: true },
          { text: 'Full API & SDK Access', included: true }
        ],
        enterprise: [
          { text: 'Dedicated Account Manager', included: true },
          { text: 'Custom Development', included: true },
          { text: 'On-premise Deployment', included: true },
          { text: 'SLA Guarantee 99.99%', included: true },
          { text: 'Training & Onboarding', included: true },
          { text: 'Compliance & Audit Support', included: true }
        ]
      },
      badge: 'ULTIMATE',
      users: 'Unlimited users',
      popular: false
    }
  ];

  const features = [
    { icon: Shield, text: 'Enterprise-grade Security', color: 'text-green-400' },
    { icon: Clock, text: '99.99% Uptime SLA', color: 'text-blue-400' },
    { icon: Globe, text: 'Global CDN Network', color: 'text-purple-400' },
    { icon: Award, text: 'ISO 27001 Certified', color: 'text-yellow-400' }
  ];

  const colorMap = {
    cyan: {
      bg: 'bg-cyan-500',
      text: 'text-cyan-400',
      border: 'border-cyan-500',
      glow: 'shadow-cyan-500/50',
      from: 'from-cyan-500',
      to: 'to-blue-600'
    },
    purple: {
      bg: 'bg-purple-500',
      text: 'text-purple-400',
      border: 'border-purple-500',
      glow: 'shadow-purple-500/50',
      from: 'from-purple-500',
      to: 'to-pink-600'
    },
    orange: {
      bg: 'bg-orange-500',
      text: 'text-orange-400',
      border: 'border-orange-500',
      glow: 'shadow-orange-500/50',
      from: 'from-orange-500',
      to: 'to-red-600'
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>

      <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-full px-6 py-2 mb-6 backdrop-blur-xl">
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 font-semibold text-sm">
                LIMITED TIME OFFER
              </span>
            </div>

            <h1 className="text-7xl sm:text-8xl font-black mb-6 leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                Pricing That
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient">
                Scales With You
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
              Choose the perfect plan for your needs. Start free, scale as you grow, and unlock premium features designed for success.
            </p>

            {/* Billing Toggle with 3D Effect */}
            <div className="inline-flex items-center gap-6 bg-gradient-to-br from-gray-900 to-gray-800 p-2 rounded-2xl border border-gray-700 shadow-2xl">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  !isAnnual 
                    ? 'bg-gradient-to-r from-white to-gray-200 text-black shadow-lg scale-105' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 relative ${
                  isAnnual 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-105' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Annual
                {isAnnual && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                    SAVE 17%
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Feature Filter Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            {['all', 'core', 'advanced', 'enterprise'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Features
              </button>
            ))}
          </div>

          {/* Pricing Cards with 3D Tilt Effect */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, idx) => {
              const Icon = plan.icon;
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
              const monthlyPrice = isAnnual ? Math.round(price / 12) : price;
              const colors = colorMap[plan.color];
              
              // Combine features based on active tab
              let displayFeatures = [];
              if (activeTab === 'all') {
                displayFeatures = [...plan.features.core, ...plan.features.advanced, ...plan.features.enterprise];
              } else if (activeTab === 'core') {
                displayFeatures = plan.features.core;
              } else if (activeTab === 'advanced') {
                displayFeatures = plan.features.advanced;
              } else {
                displayFeatures = plan.features.enterprise;
              }

              return (
                <div
                  key={idx}
                  className={`relative group ${plan.popular ? 'lg:scale-105' : ''}`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                      <div className={`bg-gradient-to-r ${plan.gradient} px-6 py-2 rounded-full shadow-2xl ${colors.glow} flex items-center gap-2`}>
                        <Star className="w-4 h-4" fill="white" />
                        <span className="font-black text-sm text-white tracking-wider">{plan.badge}</span>
                      </div>
                    </div>
                  )}

                  {/* Card */}
                  <div className={`relative h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-8 border-2 transition-all duration-500 hover:scale-105 ${
                    plan.popular 
                      ? `${colors.border} shadow-2xl ${colors.glow}` 
                      : 'border-gray-700 hover:border-gray-600 shadow-xl'
                  }`}>
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none"></div>

                    {/* Header */}
                    <div className="relative">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-6 shadow-2xl ${colors.glow} group-hover:rotate-6 transition-transform duration-300`}>
                        <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                      </div>

                      <h3 className="text-3xl font-black text-white mb-2">{plan.name}</h3>
                      <p className={`text-sm font-medium ${colors.text} mb-6`}>{plan.subtitle}</p>

                      {/* Price */}
                      <div className="mb-8">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-6xl font-black text-white">₹{monthlyPrice.toLocaleString('en-IN')}</span>
                          <span className="text-gray-500 text-xl font-medium">/mo</span>
                        </div>
                        {isAnnual && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 line-through text-sm">₹{plan.monthlyPrice.toLocaleString('en-IN')}</span>
                            <span className={`${colors.text} font-bold text-sm`}>Save {plan.savingsPercent}%</span>
                          </div>
                        )}
                        <p className="text-gray-500 text-sm mt-2">{plan.users}</p>
                      </div>

                      {/* Features */}
                      <div className="space-y-3 mb-8 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                        {displayFeatures.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              feature.included 
                                ? `bg-gradient-to-br ${plan.gradient} shadow-lg ${colors.glow}` 
                                : 'bg-gray-700'
                            }`}>
                              {feature.included ? (
                                <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                              ) : (
                                <X className="w-3.5 h-3.5 text-gray-500" strokeWidth={3} />
                              )}
                            </div>
                            <span className={`text-sm ${feature.included ? 'text-white font-medium' : 'text-gray-500'}`}>
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <button className={`w-full py-5 rounded-xl font-black text-base transition-all duration-300 flex items-center justify-center gap-3 group/btn ${
                        plan.popular
                          ? `bg-gradient-to-r ${plan.gradient} text-white shadow-2xl ${colors.glow} hover:shadow-3xl hover:scale-105`
                          : 'bg-gradient-to-r from-gray-700 to-gray-600 text-white hover:from-gray-600 hover:to-gray-500 shadow-xl'
                      }`}>
                        <span>Start Free Trial</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                      </button>

                      <p className="text-center text-gray-500 text-xs mt-4">
                        No credit card required • 14-day free trial
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 text-center hover:border-gray-600 transition-all group">
                  <Icon className={`w-12 h-12 mx-auto mb-4 ${feature.color} group-hover:scale-110 transition-transform`} />
                  <p className="text-sm text-gray-300 font-semibold">{feature.text}</p>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-orange-900/30 border border-purple-500/30 rounded-3xl p-12 text-center backdrop-blur-xl">
            <h2 className="text-4xl font-black text-white mb-4">Need a Custom Solution?</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Get in touch with our sales team to discuss enterprise solutions tailored to your specific needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 hover:scale-105 transition-all">
                Contact Sales
              </button>
              <button className="px-8 py-4 bg-gray-800 text-white rounded-xl font-bold text-lg border border-gray-700 hover:bg-gray-700 transition-all">
                View Documentation
              </button>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thumb-gray-700::-webkit-scrollbar-thumb {
          background-color: #374151;
          border-radius: 20px;
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background-color: transparent;
        }
      `}</style>
    </div>
  );
}
