import React, { useState } from 'react';
import { Check, Star, Zap, Crown, Rocket, ArrowRight, Sparkles, Shield, Users, TrendingUp } from 'lucide-react';

export default function PremiumPricingTemplate() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      tagline: 'For Beginners',
      monthlyPrice: 1499,
      annualPrice: 14990,
      discount: '17% OFF',
      description: 'Perfect to get started with premium features',
      features: [
        { text: '10 Premium Projects', highlight: false },
        { text: '50GB Cloud Storage', highlight: false },
        { text: 'Email Support', highlight: false },
        { text: 'Basic Analytics', highlight: false },
        { text: 'Mobile App Access', highlight: false },
        { text: '99.9% Uptime SLA', highlight: false }
      ],
      gradient: 'from-blue-600 via-blue-500 to-cyan-500',
      glowColor: 'shadow-blue-500/50',
      borderGlow: 'hover:shadow-blue-500/30',
      popular: false,
      badge: null
    },
    {
      name: 'Professional',
      icon: Crown,
      tagline: 'Most Popular',
      monthlyPrice: 3999,
      annualPrice: 39990,
      discount: '17% OFF',
      description: 'Everything you need to scale your business',
      features: [
        { text: 'Unlimited Projects', highlight: true },
        { text: '500GB Cloud Storage', highlight: true },
        { text: 'Priority 24/7 Support', highlight: true },
        { text: 'Advanced Analytics & Reports', highlight: false },
        { text: 'API Access & Webhooks', highlight: false },
        { text: 'Custom Integrations', highlight: false },
        { text: 'Team Collaboration (10 users)', highlight: false },
        { text: 'White-label Options', highlight: false }
      ],
      gradient: 'from-purple-600 via-pink-500 to-rose-500',
      glowColor: 'shadow-purple-500/60',
      borderGlow: 'hover:shadow-purple-500/40',
      popular: true,
      badge: 'BEST VALUE'
    },
    {
      name: 'Enterprise',
      icon: Rocket,
      tagline: 'For Large Teams',
      monthlyPrice: 9999,
      annualPrice: 99990,
      discount: '17% OFF',
      description: 'Ultimate power with dedicated support',
      features: [
        { text: 'Unlimited Everything', highlight: true },
        { text: '5TB Cloud Storage', highlight: true },
        { text: 'Dedicated Account Manager', highlight: true },
        { text: 'Custom AI Solutions', highlight: false },
        { text: 'Advanced Security & Compliance', highlight: false },
        { text: 'SLA with 99.99% Uptime', highlight: false },
        { text: 'Unlimited Team Members', highlight: false },
        { text: 'On-premise Deployment', highlight: false },
        { text: 'Custom Training & Onboarding', highlight: false }
      ],
      gradient: 'from-orange-500 via-red-500 to-pink-600',
      glowColor: 'shadow-orange-500/60',
      borderGlow: 'hover:shadow-orange-500/40',
      popular: false,
      badge: 'PREMIUM'
    }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Active Users' },
    { icon: Star, value: '4.9/5', label: 'Customer Rating' },
    { icon: Shield, value: '99.9%', label: 'Uptime SLA' },
    { icon: TrendingUp, value: '2x', label: 'Growth Rate' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Premium Pricing Plans</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 leading-tight">
              Choose Your Plan
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Unlock premium features and take your business to the next level with our flexible pricing options
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-base font-medium transition-all ${!isAnnual ? 'text-white scale-110' : 'text-slate-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-20 h-10 bg-slate-800 rounded-full border-2 border-slate-700 transition-all hover:border-purple-500 group"
              >
                <div className={`absolute top-1 w-7 h-7 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 shadow-lg ${isAnnual ? 'left-11' : 'left-1'} group-hover:shadow-purple-500/50`} />
              </button>
              <span className={`text-base font-medium transition-all ${isAnnual ? 'text-white scale-110' : 'text-slate-500'}`}>
                Annual
              </span>
              {isAnnual && (
                <div className="ml-2 animate-bounce">
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg shadow-green-500/30">
                    <Star className="w-3 h-3" fill="currentColor" />
                    Save 17%
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all group">
                  <Icon className="w-8 h-8 mx-auto mb-3 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
              const monthlyEquivalent = isAnnual ? Math.round(price / 12) : price;
              
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`relative group ${plan.popular ? 'lg:-mt-4' : ''}`}
                >
                  {/* Popular Badge */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div className={`bg-gradient-to-r ${plan.gradient} text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl ${plan.glowColor} flex items-center gap-1`}>
                        <Star className="w-3 h-3" fill="currentColor" />
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  {/* Card */}
                  <div className={`relative h-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border-2 transition-all duration-500 ${
                    plan.popular 
                      ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20' 
                      : 'border-slate-700/50 hover:border-slate-600/50'
                  } ${hoveredCard === index ? `${plan.borderGlow} shadow-2xl scale-105` : ''}`}>
                    
                    {/* Icon & Title */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className={`w-14 h-14 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg ${plan.glowColor} group-hover:scale-110 transition-transform`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                        <p className="text-sm text-slate-400">{plan.tagline}</p>
                      </div>
                    </div>

                    <p className="text-slate-300 mb-6 min-h-[3rem]">{plan.description}</p>

                    {/* Pricing */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-extrabold text-white">₹{monthlyEquivalent.toLocaleString('en-IN')}</span>
                        <span className="text-slate-400 text-lg">/month</span>
                      </div>
                      {isAnnual && (
                        <div className="mt-2">
                          <span className="text-sm text-slate-500 line-through">₹{plan.monthlyPrice.toLocaleString('en-IN')}/mo</span>
                          <span className="ml-2 text-sm font-semibold text-green-400">{plan.discount}</span>
                        </div>
                      )}
                      {isAnnual && (
                        <p className="text-xs text-slate-500 mt-1">Billed annually at ₹{price.toLocaleString('en-IN')}</p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 group/item">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            feature.highlight 
                              ? `bg-gradient-to-r ${plan.gradient}` 
                              : 'bg-slate-700'
                          }`}>
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                          <span className={`text-sm ${feature.highlight ? 'text-white font-medium' : 'text-slate-300'} group-hover/item:text-white transition-colors`}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.gradient} text-white shadow-lg ${plan.glowColor} hover:shadow-xl hover:scale-105`
                        : 'bg-slate-700 text-white hover:bg-slate-600'
                    }`}>
                      Get Started Now
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    {plan.popular && (
                      <p className="text-center text-xs text-slate-500 mt-3">
                        ⚡ Most chosen by professionals
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Section */}
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-3">Still have questions?</h3>
              <p className="text-slate-400 mb-6">
                All plans include 14-day free trial • No credit card required • Cancel anytime
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all">
                  Compare Plans
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-purple-500/30">
                  Contact Sales
                </button>
              </div>
            </div>

            <p className="text-slate-500 text-sm">
              Trusted by 50,000+ businesses worldwide • SOC 2 Certified • GDPR Compliant
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
