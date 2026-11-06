import React, { useState, useEffect } from 'react';
import PremiumPricingTemplate from './PremiumPricingTemplate';
import UltraPremiumPricing from './UltraPremiumPricing';
import ModernComparisonPricing from './ModernComparisonPricing';
// import ModernComparisonPricing from './ModernComparisonPricing';
import NeonCyberpunkPricing from './NeonCyberpunkPricing';
import ModernPortfolio from './ModernPortfolio';
import ModernLandingPage from './ModernLandingPage';
import App from './ModernReact';
import ComprehensiveLandingPage from './ComprehensiveLandingPage';
import ModernDarkTemplate from './ModernDarkTemplate';
import LuxuryDarkTemplate from './LuxuryDarkTemplate';
import GlassmorphicTemplate from './GlassmorphicTemplate';

function Template() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Handle escape key to go back
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedTemplate) {
        setSelectedTemplate(null);
      }
    };
    
    if (selectedTemplate) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [selectedTemplate]);

  const templates = [
    {
      id: 1,
      name: 'Premium Pricing Template',
      description: 'Modern pricing page with multiple tiers and billing toggle',
      component: PremiumPricingTemplate,
      icon: '💎'
    },
    {
      id: 2,
      name: 'Ultra Premium Pricing',
      description: 'Advanced pricing with feature filters and animations',
      component: UltraPremiumPricing,
      icon: '⚡'
    },
    {
      id: 3,
      name: 'Modern Comparison Pricing',
      description: 'Detailed pricing with comparison table and FAQs',
      component: ModernComparisonPricing,
      icon: '📊'
    },
    {
      id: 4,
      name: 'Neon Cyberpunk Pricing',
      description: 'Futuristic neon-style pricing design with bold visuals',
      component: NeonCyberpunkPricing,
      icon: '⚡'
    },
    {
      id: 5,
      name: 'Modern Portfolio',
      description: 'Elegant portfolio template to showcase your work',
      component: ModernPortfolio,
      icon: '🎨'
    },
    {
      id: 6,
      name: 'Modern React',
      description: 'Clean and minimalist React template design',
      component: App,
      icon: '⚛️'
    },
    {
      id: 7,
      name: 'Modern React',
      description: 'Clean and minimalist React template design',
      component: ModernLandingPage,
      icon: '⚛️'
    },
    {
      id: 8,
      name: 'Modern React',
      description: 'Clean and minimalist React template design',
      component: ComprehensiveLandingPage,
      icon: '⚛️'
    },
    {
      id: 9,
      name: 'Modern dark template',
      description: 'Clean and minimalist React template design',
      component: ModernDarkTemplate,
      icon: '⚛️'
    },
    {
      id: 10,
      name: 'Luxury dark template',
      description: 'Elegant luxury dark template design',
      component: LuxuryDarkTemplate,
      icon: '⚛️'
    },
    {
      id: 10,
      name: 'Luxury dark template',
      description: 'Elegant luxury dark template design',
      component: GlassmorphicTemplate,
      icon: '⚛️'
    }
  ];

  // If a template is selected, show its full view
  if (selectedTemplate) {
    const template = templates.find(t => t.id === selectedTemplate);
    const handleBackClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setSelectedTemplate(null);
    };

    return (
      <div className="relative w-full h-screen overflow-hidden bg-gray-900 color-white">
        <div className="fixed top-4 left-4 z-[9999] pointer-events-auto">
          <button
            onClick={handleBackClick}
            onMouseDown={handleBackClick}
            onTouchEnd={handleBackClick}
            type="button"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 active:bg-purple-800 transition-all duration-200 cursor-pointer font-semibold shadow-lg hover:shadow-xl border-2 border-purple-500"
            style={{ 
              pointerEvents: 'auto',
              userSelect: 'none',
              WebkitUserSelect: 'none'
            }}
          >
            ← Back to Templates
          </button>
        </div>
        <div className="w-full h-screen overflow-auto">
          {template.component && <template.component />}
        </div>
      </div>
    );
  }

  // Show template gallery
  return (
    <div className="w-full h-screen flex flex-col bg-gray-800">
      {/* Header Section - Fixed */}
      <div className="flex-shrink-0 py-12 px-4 border-b border-gray-700">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">
            Templates
          </h1>
          <p className="text-xl text-gray-300">
            Explore our collection of beautiful templates
          </p>
        </div>
      </div>

      {/* Scrollable Template Grid Section */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
            {templates.map(template => (
              <div
                key={template.id}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-200"
              >
                <div className="text-6xl mb-6 text-center">{template.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {template.name}
                </h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {template.description}
                </p>

                <button
                  onClick={() =>
                    template.component && setSelectedTemplate(template.id)
                  }
                  disabled={!template.component}
                  className={`w-full py-3 rounded-lg transition font-semibold text-center ${
                    template.component
                      ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-md hover:shadow-lg"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {template.component ? "View Template" : "Coming Soon"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
}

export default Template;
