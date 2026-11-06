import React, { useState } from 'react';
import { Check, Minus, Info, Zap, Cpu, Rocket, Users, Database, Lock, Headphones, Code, BarChart, Globe, Award, RefreshCw, Cloud } from 'lucide-react';

export default function ModernComparisonPricing() {
  const [billingCycle, setBillingCycle] = useState('yearly');
  const [showComparison, setShowComparison] = useState(false);

  const plans = [
    {
      name: 'Essential',
      icon: Zap,
      tagline: 'Perfect to start',
      price: { monthly: 1999, yearly: 19990 },
      highlighted: false,
      color: 'blue',
      description: 'Get started with essential features for individuals and small teams.',
      cta: 'Start Free Trial',
      features: {
        'Core Features': { limit: '10 projects', included: true },
        'Storage': { limit: '50GB', included: true },
        'Team Members': { limit: '3 users', included: true },
        'API Calls': { limit: '10K/month', included: true },
        'Support': { limit: 'Email only', included: true },
        'Custom Domain': { limit: '1 domain', included: true },
        'Analytics': { limit: 'Basic', included: true },
        'Integrations': { limit: '5 apps', included: true },
        'Priority Support': { limit: false, included: false },
        'Advanced Security': { limit: false, included: false },
        'Custom Branding': { limit: false, included: false },
        'API Access': { limit: false, included: false },
        'Dedicated Manager': { limit: false, included: false },
        'SLA Guarantee': { limit: false, included: false },
        'On-premise': { limit: false, included: false }
      }
    },
    {
      name: 'Professional',
      icon: Cpu,
      tagline: 'Most popular choice',
      price: { monthly: 4999, yearly: 49990 },
      highlighted: true,
      color: 'purple',
      description: 'Perfect for growing businesses with advanced needs and team collaboration.',
      cta: 'Get Started Now',
      features: {
        'Core Features': { limit: 'Unlimited', included: true },
        'Storage': { limit: '500GB', included: true },
        'Team Members': { limit: '25 users', included: true },
        'API Calls': { limit: '100K/month', included: true },
        'Support': { limit: '24/7 Chat & Email', included: true },
        'Custom Domain': { limit: '10 domains', included: true },
        'Analytics': { limit: 'Advanced', included: true },
        'Integrations': { limit: 'Unlimited', included: true },
        'Priority Support': { limit: '< 2 hours', included: true },
        'Advanced Security': { limit: 'SSL + 2FA', included: true },
        'Custom Branding': { limit: 'Full white-label', included: true },
        'API Access': { limit: 'Full access', included: true },
        'Dedicated Manager': { limit: false, included: false },
        'SLA Guarantee': { limit: false, included: false },
        'On-premise': { limit: false, included: false }
      }
    },
    {
      name: 'Enterprise',
      icon: Rocket,
      tagline: 'For large organizations',
      price: { monthly: 12999, yearly: 129990 },
      highlighted: false,
      color: 'orange',
      description: 'Enterprise-grade solution with unlimited resources and dedicated support.',
      cta: 'Contact Sales',
      features: {
        'Core Features': { limit: 'Unlimited', included: true },
        'Storage': { limit: '5TB+', included: true },
        'Team Members': { limit: 'Unlimited', included: true },
        'API Calls': { limit: 'Unlimited', included: true },
        'Support': { limit: '24/7 Phone + VIP', included: true },
        'Custom Domain': { limit: 'Unlimited', included: true },
        'Analytics': { limit: 'Enterprise + Custom', included: true },
        'Integrations': { limit: 'Unlimited + Custom', included: true },
        'Priority Support': { limit: '< 30 minutes', included: true },
        'Advanced Security': { limit: 'Enterprise-grade', included: true },
        'Custom Branding': { limit: 'Complete control', included: true },
        'API Access': { limit: 'Unlimited + SDK', included: true },
        'Dedicated Manager': { limit: 'Yes', included: true },
        'SLA Guarantee': { limit: '99.99% uptime', included: true },
        'On-premise': { limit: 'Available', included: true }
      }
    }
  ];

  const featureCategories = [
    {
      name: 'Platform',
      icon: Cloud,
      features: ['Core Features', 'Storage', 'Team Members', 'API Calls']
    },
    {
      name: 'Support & Services',
      icon: Headphones,
      features: ['Support', 'Priority Support', 'Dedicated Manager', 'SLA Guarantee']
    },
    {
      name: 'Customization',
      icon: Code,
      features: ['Custom Domain', 'Custom Branding', 'Integrations', 'On-premise']
    },
    {
      name: 'Advanced',
      icon: Lock,
      features: ['Analytics', 'Advanced Security', 'API Access']
    }
  ];

  const colorSchemes = {
    blue: {
      gradient: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-500',
      text: 'text-blue-400',
      border: 'border-blue-500',
      ring: 'ring-blue-500'
    },
    purple: {
      gradient: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-500',
      text: 'text-purple-400',
      border: 'border-purple-500',
      ring: 'ring-purple-500'
    },
    orange: {
      gradient: 'from-orange-500 to-red-500',
      bg: 'bg-orange-500',
      text: 'text-orange-400',
      border: 'border-orange-500',
      ring: 'ring-orange-500'
    }
  };

  const getPrice = (plan) => {
    const price = billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly;
    return billingCycle === 'yearly' ? Math.round(price / 12) : price;
  };

  const getSavings = (plan) => {
    const monthlyCost = plan.price.monthly * 12;
    const yearlyCost = plan.price.yearly;
    return Math.round(((monthlyCost - yearlyCost) / monthlyCost) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Award className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium">Trusted by 100,000+ businesses worldwide</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className={`font-semibold ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-16 h-8 bg-slate-700 rounded-full transition-all hover:bg-slate-600"
            >
              <div className={`absolute top-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 shadow-lg ${
                billingCycle === 'yearly' ? 'left-9' : 'left-1'
              }`} />
            </button>
            <span className={`font-semibold ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-400'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                Save up to 17%
              </span>
            )}
          </div>

          {/* Comparison Toggle */}
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            <BarChart className="w-4 h-4" />
            {showComparison ? 'Hide' : 'Show'} detailed comparison
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12">
        {/* Pricing Cards */}
        {!showComparison && (
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, idx) => {
              const Icon = plan.icon;
              const colors = colorSchemes[plan.color];
              
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                    plan.highlighted ? 'ring-4 ' + colors.ring + ' scale-105' : ''
                  }`}
                >
                  {plan.highlighted && (
                    <div className={`bg-gradient-to-r ${colors.gradient} text-white text-center py-3 font-bold text-sm`}>
                      ⭐ MOST POPULAR
                    </div>
                  )}

                  <div className="p-8">
                    {/* Icon & Name */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                        <p className="text-sm text-slate-500">{plan.tagline}</p>
                      </div>
                    </div>

                    <p className="text-slate-600 mb-6 min-h-[3rem]">{plan.description}</p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-slate-900">₹{getPrice(plan).toLocaleString('en-IN')}</span>
                        <span className="text-slate-500">/month</span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <div className="mt-2">
                          <span className="text-sm text-slate-500">Billed yearly at ₹{plan.price.yearly.toLocaleString('en-IN')}</span>
                          <span className="ml-2 text-sm font-bold text-green-600">Save {getSavings(plan)}%</span>
                        </div>
                      )}
                    </div>

                    {/* Key Features */}
                    <ul className="space-y-3 mb-8">
                      {Object.entries(plan.features).slice(0, 8).map(([key, value], i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors.text}`} strokeWidth={3} />
                          <div>
                            <span className="text-slate-700 font-medium">{key}</span>
                            {value.limit && value.limit !== true && (
                              <span className="text-slate-500 text-sm ml-2">({value.limit})</span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
                      plan.highlighted
                        ? `bg-gradient-to-r ${colors.gradient} shadow-lg hover:shadow-xl hover:scale-105`
                        : 'bg-slate-900 hover:bg-slate-800'
                    }`}>
                      {plan.cta}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Comparison Table */}
        {showComparison && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-16">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-6 text-left font-bold text-lg">Features</th>
                    {plans.map((plan, idx) => {
                      const Icon = plan.icon;
                      const colors = colorSchemes[plan.color];
                      return (
                        <th key={idx} className={`p-6 text-center ${plan.highlighted ? 'bg-gradient-to-r ' + colors.gradient : ''}`}>
                          <div className="flex flex-col items-center gap-2">
                            <Icon className="w-8 h-8" />
                            <div className="font-bold text-xl">{plan.name}</div>
                            <div className="text-3xl font-black">₹{getPrice(plan).toLocaleString('en-IN')}</div>
                            <div className="text-sm opacity-75">/month</div>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {featureCategories.map((category, catIdx) => {
                    const CategoryIcon = category.icon;
                    return (
                      <React.Fragment key={catIdx}>
                        <tr className="bg-slate-100">
                          <td colSpan={4} className="p-4">
                            <div className="flex items-center gap-2 font-bold text-slate-700">
                              <CategoryIcon className="w-5 h-5" />
                              {category.name}
                            </div>
                          </td>
                        </tr>
                        {category.features.map((featureName, featIdx) => (
                          <tr key={featIdx} className="border-b border-slate-200 hover:bg-slate-50">
                            <td className="p-4 font-medium text-slate-700">{featureName}</td>
                            {plans.map((plan, planIdx) => {
                              const feature = plan.features[featureName];
                              const colors = colorSchemes[plan.color];
                              return (
                                <td key={planIdx} className="p-4 text-center">
                                  {feature.included ? (
                                    feature.limit && feature.limit !== true ? (
                                      <div className="flex flex-col items-center">
                                        <Check className={`w-5 h-5 ${colors.text} mb-1`} strokeWidth={3} />
                                        <span className="text-sm text-slate-600">{feature.limit}</span>
                                      </div>
                                    ) : (
                                      <Check className={`w-6 h-6 ${colors.text} mx-auto`} strokeWidth={3} />
                                    )
                                  ) : (
                                    <Minus className="w-6 h-6 text-slate-300 mx-auto" />
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer CTA */}
            <div className="bg-slate-50 p-8 grid md:grid-cols-3 gap-6">
              {plans.map((plan, idx) => {
                const colors = colorSchemes[plan.color];
                return (
                  <button
                    key={idx}
                    className={`py-4 rounded-xl font-bold text-white transition-all ${
                      plan.highlighted
                        ? `bg-gradient-to-r ${colors.gradient} shadow-lg hover:shadow-xl hover:scale-105`
                        : 'bg-slate-900 hover:bg-slate-800'
                    }`}
                  >
                    {plan.cta}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: 'Can I change plans anytime?',
                a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, debit cards, UPI, and net banking.'
              },
              {
                q: 'Is there a setup fee?',
                a: 'No setup fees. You only pay for your chosen plan. Get started in minutes.'
              },
              {
                q: 'What happens after the trial?',
                a: 'After 14 days, you\'ll be charged based on your selected plan. Cancel anytime before.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl p-6 hover:border-purple-300 transition-colors">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                    <p className="text-slate-600 text-sm">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Section */}
        <div className="text-center pb-16">
          <div className="inline-flex flex-wrap items-center justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <span className="text-sm font-medium">SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              <span className="text-sm font-medium">30-Day Money Back</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">100K+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">Global Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
