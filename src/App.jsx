import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import logo from './assets/logo.jpg';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live';

import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import CustomizeWeb from './components/CustomizeWeb';
import WebsiteGallery from './components/WebsiteGallery';
import ComponentsByCategory from './components/compont/ComponentsByCategory';
import StylishX from './components/StylishX'; 
import Nexus from './components/Nexus';
import Lumina from './components/Lumina';
import RaiboWeb from './components/RaiboWeb';
import MyWebsite from './components/MyWebsite';
import DynamicWeb from './components/DynamicWeb';
import ElectroTech from './components/ElectroTech';
import About from './components/about/About';
import Template from './template/Template';
import BlogNew from './components/BlogNew';

import Home from './components/Home';
// import ElectroX from './components/ElectroX';
import './styles/globals.css';
// import {
//   SandpackProvider,
//   SandpackLayout,
//   SandpackPreview,
//   SandpackCodeEditor,
// } from "@codesandbox/sandpack-react";
// import { atomDark } from "@codesandbox/sandpack-themes";
// import ComponentLivePreview from './components/LivePreview';

import OurStory from './components/footerbutton/OurStory'
import MissionAndVision from './components/footerbutton/Mission&Vision'
import Testimonials from './components/footerbutton/Testimonials'
import UIKit from './components/footerbutton/UIKit'
import Icons from './components/footerbutton/Icons'
import Illustrations from './components/footerbutton/Illustrations'
import Blog from './components/footerbutton/Blog'
import Documentation from './components/footerbutton/Documentation'
import Changelog from './components/footerbutton/Changelog'
import EmailUs from './components/footerbutton/EmailUs'
import SupportCenter from './components/footerbutton/SupportCenter'
import LiveChat from './components/footerbutton/LiveChat'
import { usePlaygroundStore } from './store/usePlaygroundStore';
import PlaygroundCodeEditor from './components/PlaygroundCodeEditor';
import useComponentSSE from './hooks/useComponentSSE';


const API_URL = import.meta.env.VITE_API_URL;

const COMPONENTS_LIST = [

];

// Components from seed.js (Backend)


function ComponentsPreviewPage({ isLoggedIn }) {
  const [components, setComponents] = useState([]);
  const [groupedComponents, setGroupedComponents] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [iframeKey, setIframeKey] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'cards', 'headers', 'footers', 'hero', 'logocloud', 'feature', 'pricing', 'faq', 'testimonial', 'cta'
  const [codeMessage, setCodeMessage] = useState('');
  const [importsMessage, setImportsMessage] = useState('');
  const [requirementsMessage, setRequirementsMessage] = useState('');
  const [viewMode, setViewMode] = useState('both'); // 'code', 'preview', 'both'
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [codeWidth, setCodeWidth] = useState(33); // percent width for code pane when in 'both' mode
  const containerRef = React.useRef(null);
  const leftRef = React.useRef(null);
  const draggingRef = React.useRef(false);
  const [isEditing, setIsEditing] = useState(false);
  const setComponentCode = usePlaygroundStore(state => state.setComponentCode);
  const componentCode = usePlaygroundStore(state => state.componentCode);

  // API URL for SSE hook
  const apiUrl = import.meta.env.VITE_API_URL || '/api';

  // Ref to track if this is the initial load
  const initialLoadRef = React.useRef(true);

  // Track screen width for mobile detection

  React.useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle mobile view mode - set to preview by default on screens below 700px
  React.useEffect(() => {
    if (screenWidth < 700 && viewMode === 'both') {
      setViewMode('preview');
    }
  }, [screenWidth]);

  // Drag handlers for resizing panes (both mode) - cleanup listeners
  useEffect(() => {
    // Cleanup function to remove event listeners on unmount
    return () => {
      // Any lingering event listeners will be cleaned up here
    };
  }, []);

  // Card subcategories mapping
  const CARD_SUBCATEGORIES = {
    'Card Example': 'Basic Cards',
    'Feature Card': 'Feature Cards',
    'Info Card': 'Info Cards',
    'Single Card': 'Single Cards',
    'Product Card': 'Product Cards',
    'Course Card': 'Course Cards',
    'Recipe Card': 'Recipe Cards',
    'Travel Card': 'Travel Cards',
    'Game Card': 'Game Cards',
    'Compact Stylish Card': 'Stylish Variants',
    'Compact stylish Card': 'Stylish Variants',
    'compactstylish Card': 'Stylish Variants',
    'Stylish Card': 'Stylish Variants',
    'stylish Card': 'Stylish Variants',
    'StylishComponents': 'Stylish Variants',
    'Premium Card': 'Premium Cards',
    'Premium card': 'Premium Cards',
    'Subscription Card': 'Subscription Cards',
    'subscriptian Card': 'Subscription Cards',
    'subscriptian card': 'Subscription Cards',
    'Action Card': 'Action Cards',
    'actioncard': 'Action Cards',
    'action card': 'Action Cards',
    'Ultimate Card': 'Ultimate Cards',
    'ultimatecard': 'Ultimate Cards',
    'ultimate card': 'Ultimate Cards',
    'Pro Card': 'Pro Cards',
    'procard': 'Pro Cards',
    'pro card': 'Pro Cards',
    'ProDeveloperCard': 'Pro Cards',
    'prodevelopercard': 'Pro Cards',
    'pro developer card': 'Pro Cards',
    'Elite Card': 'Elite Cards',
    'elitecard': 'Elite Cards',
    'elite card': 'Elite Cards',
    'Luxe Card': 'Luxury Cards',
    'luxecard': 'Luxury Cards',
    'luxe card': 'Luxury Cards',
    'Cosmic Card': 'Cosmic Cards',
    'cosmiccard': 'Cosmic Cards',
    'cosmic card': 'Cosmic Cards',
  };

  const HEADER_SUBCATEGORIES = {
    'Hero Header': 'Hero Headers',
    'hero header': 'Hero Headers',
    'Navigation Header': 'Navigation Headers',
    'navigation header': 'Navigation Headers',
    'Minimal Header': 'Minimal Headers',
    'minimal header': 'Minimal Headers',
    'Transparent Header': 'Transparent Headers',
    'transparent header': 'Transparent Headers',
    'Sticky Header': 'Sticky Headers',
    'sticky header': 'Sticky Headers',
    'Gradient Header': 'Gradient Headers',
    'gradient header': 'Gradient Headers',
    'Dark Header': 'Dark Headers',
    'dark header': 'Dark Headers',
    'Light Header': 'Light Headers',
    'light header': 'Light Headers',
  };

  const FOOTER_SUBCATEGORIES = {
    'Basic Footer': 'Basic Footers',
    'basic footer': 'Basic Footers',
    'Link Footer': 'Link Footers',
    'link footer': 'Link Footers',
    'Newsletter Footer': 'Newsletter Footers',
    'newsletter footer': 'Newsletter Footers',
    'Social Footer': 'Social Footers',
    'social footer': 'Social Footers',
    'Dark Footer': 'Dark Footers',
    'dark footer': 'Dark Footers',
    'Light Footer': 'Light Footers',
    'light footer': 'Light Footers',
    'Minimal Footer': 'Minimal Footers',
    'minimal footer': 'Minimal Footers',
  };

  // Reusable fetch function - can be called on initial load and on SSE updates
  const fetchComponents = React.useCallback(async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) {
        setIsRefreshing(true);
      }
      console.log('Fetching from:', `${apiUrl}/components`);
      const res = await fetch(`${apiUrl}/components?visible=true`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('Response:', res.status, res.statusText);
      if (!res.ok) throw new Error(`Failed to fetch components: ${res.status} ${res.statusText}`);
      const data = await res.json();
      console.log('Fetched components:', data);
      
      // Preserve selected component if it still exists in new data
      setComponents(prevComponents => {
        const currentSelectedId = selectedId;
        const stillExists = data.some(c => c._id === currentSelectedId);
        
        // Group components by category and subcategory for cards
        const grouped = data.reduce((acc, component) => {
          let category = component.category || 'Headers';
          
          // If it's a card, use subcategory from mapping
          if (category === 'Cards') {
            // Normalize name variants (lowercase, remove spaces) so 'UltimateCard', 'ultimatecard', and 'Ultimate Card' all match
            const rawName = component.name || '';
            const normalized = rawName.toLowerCase().replace(/\s+/g, '');
            const mapped = CARD_SUBCATEGORIES[rawName] || CARD_SUBCATEGORIES[rawName.toLowerCase()] || CARD_SUBCATEGORIES[rawName.replace(/\s+/g, '')] || CARD_SUBCATEGORIES[normalized];

            if (mapped) {
              category = mapped;
            } else {
              // Card without mapping stays in Cards (don't move to Headers)
              category = 'Cards';
            }
          } else if (category === 'Footer') {
            // Apply footer subcategory mapping
            const rawName = component.name || '';
            const normalized = rawName.toLowerCase().replace(/\s+/g, '');
            const mapped = FOOTER_SUBCATEGORIES[rawName] || FOOTER_SUBCATEGORIES[rawName.toLowerCase()] || FOOTER_SUBCATEGORIES[rawName.replace(/\s+/g, '')] || FOOTER_SUBCATEGORIES[normalized];

            if (mapped) {
              category = mapped;
            } else {
              // Footer without mapping stays in Footers
              category = 'Footers';
            }
          } else if (category === 'Header') {
            // Apply header subcategory mapping for headers only
            const rawName = component.name || '';
            const normalized = rawName.toLowerCase().replace(/\s+/g, '');
            const mapped = HEADER_SUBCATEGORIES[rawName] || HEADER_SUBCATEGORIES[rawName.toLowerCase()] || HEADER_SUBCATEGORIES[rawName.replace(/\s+/g, '')] || HEADER_SUBCATEGORIES[normalized];

            if (mapped) {
              category = mapped;
            } else {
              // Header without mapping stays in Headers
              category = 'Headers';
            }
          }
          // Keep all other categories (Hero Section, Logo Cloud, Feature, Pricing, FAQ, Testimonial, Call to Action) as-is
          
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(component);
          return acc;
        }, {});
        
        setGroupedComponents(grouped);
        
        if (data.length > 0 && (!stillExists || initialLoadRef.current)) {
          // On initial load or if selected component was deleted, select first component
          setSelectedId(data[0]._id);
          setIframeKey(prev => prev + 1);
        }
        
        setLastUpdated(new Date().toLocaleTimeString());
        initialLoadRef.current = false;
        setLoading(false);
        
        return data;
      });
    } catch (err) {
      console.error('Error fetching components:', err);
      setError(err.message);
      setLoading(false);
    } finally {
      setIsRefreshing(false);
    }
  }, [apiUrl]);

  // Initial load
  useEffect(() => {
    fetchComponents();
  }, [fetchComponents]);

  // SSE/auto-refresh hook
  useComponentSSE(apiUrl, fetchComponents, 30000);


  const current = components.find(c => c._id === selectedId);
  const code = current?.code || '';

  // Filter categories based on activeFilter
  let displayedCategories = Object.keys(groupedComponents).sort();
  let filteredGrouped = groupedComponents;

  if (activeFilter === 'cards') {
    // Show only Cards category
    displayedCategories = displayedCategories.filter(cat => cat === 'Cards');
    filteredGrouped = {};
    if (groupedComponents['Cards']) {
      filteredGrouped['Cards'] = groupedComponents['Cards'];
    }
  } else if (activeFilter === 'headers') {
    // Show only Headers category
    displayedCategories = displayedCategories.filter(cat => cat === 'Headers');
    filteredGrouped = {};
    if (groupedComponents['Headers']) {
      filteredGrouped['Headers'] = groupedComponents['Headers'];
    }
  } else if (activeFilter === 'footers') {
    // Show only Footers category
    displayedCategories = displayedCategories.filter(cat => cat === 'Footers');
    filteredGrouped = {};
    if (groupedComponents['Footers']) {
      filteredGrouped['Footers'] = groupedComponents['Footers'];
    }
  } else if (activeFilter === 'hero') {
    displayedCategories = displayedCategories.filter(cat => cat === 'Hero Section');
    filteredGrouped = {};
    if (groupedComponents['Hero Section']) {
      filteredGrouped['Hero Section'] = groupedComponents['Hero Section'];
    }
  } else if (activeFilter === 'logocloud') {
    displayedCategories = displayedCategories.filter(cat => cat === 'Logo Cloud');
    filteredGrouped = {};
    if (groupedComponents['Logo Cloud']) {
      filteredGrouped['Logo Cloud'] = groupedComponents['Logo Cloud'];
    }
  } else if (activeFilter === 'feature') {
    displayedCategories = displayedCategories.filter(cat => cat === 'Feature');
    filteredGrouped = {};
    if (groupedComponents['Feature']) {
      filteredGrouped['Feature'] = groupedComponents['Feature'];
    }
  } else if (activeFilter === 'pricing') {
    displayedCategories = displayedCategories.filter(cat => cat === 'Pricing');
    filteredGrouped = {};
    if (groupedComponents['Pricing']) {
      filteredGrouped['Pricing'] = groupedComponents['Pricing'];
    }
  } else if (activeFilter === 'faq') {
    displayedCategories = displayedCategories.filter(cat => cat === 'FAQ');
    filteredGrouped = {};
    if (groupedComponents['FAQ']) {
      filteredGrouped['FAQ'] = groupedComponents['FAQ'];
    }
  } else if (activeFilter === 'testimonial') {
    displayedCategories = displayedCategories.filter(cat => cat === 'Testimonial');
    filteredGrouped = {};
    if (groupedComponents['Testimonial']) {
      filteredGrouped['Testimonial'] = groupedComponents['Testimonial'];
    }
  } else if (activeFilter === 'cta') {
    displayedCategories = displayedCategories.filter(cat => cat === 'Call to Action');
    filteredGrouped = {};
    if (groupedComponents['Call to Action']) {
      filteredGrouped['Call to Action'] = groupedComponents['Call to Action'];
    }
  }

  if (loading) return <div className="w-full h-screen flex items-center justify-center text-white bg-slate-900">Loading components from seed.js (MongoDB)...</div>;
  if (error) return <div className="w-full h-screen flex items-center justify-center text-red-400 bg-slate-900">Error: {error}</div>;
  if (components.length === 0) return <div className="w-full h-screen flex items-center justify-center text-gray-400 bg-slate-900">No components found. Run: npm run seed</div>;

  return (
    <div ref={containerRef} className="flex h-screen w-full gap-0 overflow-hidden">
      {/* Left Sidebar */}
      <div ref={leftRef} className="w-44 md:w-80 bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-y-auto border-r border-white/10">
        <div className="p-4 sticky top-0 bg-slate-900/95 backdrop-blur z-10 border-b border-white/10">
          <h2 className="text-lg font-bold mb-4">Components</h2>
          
          {/* Filter Buttons - Scrollable */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-2 flex-nowrap min-w-min">
            <button
              onClick={() => {
                setActiveFilter('all');
                // Select first component
                if (groupedComponents && Object.keys(groupedComponents).length > 0) {
                  const firstCategory = Object.keys(groupedComponents).sort()[0];
                  if (groupedComponents[firstCategory].length > 0) {
                    setSelectedId(groupedComponents[firstCategory][0]._id);
                    setIframeKey(prev => prev + 1);
                  }
                }
              }}
              className={`px-3 py-2 rounded-lg transition-all text-xs font-bold whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                setActiveFilter('cards');
                if (groupedComponents) {
                  const cardCategories = Object.keys(groupedComponents).filter(cat => cat !== 'Headers' && cat !== 'Footers').sort();
                  if (cardCategories.length > 0 && groupedComponents[cardCategories[0]].length > 0) {
                    setSelectedId(groupedComponents[cardCategories[0]][0]._id);
                    setIframeKey(prev => prev + 1);
                  }
                }
              }}
              className={`px-3 py-2 rounded-lg transition-all text-xs font-bold whitespace-nowrap ${
                activeFilter === 'cards'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => {
                setActiveFilter('headers');
                if (groupedComponents && groupedComponents['Headers'] && groupedComponents['Headers'].length > 0) {
                  setSelectedId(groupedComponents['Headers'][0]._id);
                  setIframeKey(prev => prev + 1);
                }
              }}
              className={`px-3 py-2 rounded-lg transition-all text-xs font-bold whitespace-nowrap ${
                activeFilter === 'headers'
                  ? 'bg-cyan-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Headers
            </button>
            <button
              onClick={() => {
                setActiveFilter('footers');
                if (groupedComponents && groupedComponents['Footers'] && groupedComponents['Footers'].length > 0) {
                  setSelectedId(groupedComponents['Footers'][0]._id);
                  setIframeKey(prev => prev + 1);
                }
              }}
              className={`px-3 py-2 rounded-lg transition-all text-xs font-bold whitespace-nowrap ${
                activeFilter === 'footers'
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Footers
            </button>
            <button
              onClick={() => {
                setActiveFilter('hero');
                if (groupedComponents && groupedComponents['Hero Section'] && groupedComponents['Hero Section'].length > 0) {
                  setSelectedId(groupedComponents['Hero Section'][0]._id);
                  setIframeKey(prev => prev + 1);
                }
              }}
              className={`px-3 py-2 rounded-lg transition-all text-xs font-bold whitespace-nowrap ${
                activeFilter === 'hero'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Hero
            </button>
            <button
              onClick={() => {
                setActiveFilter('logocloud');
                if (groupedComponents && groupedComponents['Logo Cloud'] && groupedComponents['Logo Cloud'].length > 0) {
                  setSelectedId(groupedComponents['Logo Cloud'][0]._id);
                  setIframeKey(prev => prev + 1);
                }
              }}
              className={`px-3 py-2 rounded-lg transition-all text-xs font-bold whitespace-nowrap ${
                activeFilter === 'logocloud'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Logo Cloud
            </button>
            <button
              onClick={() => {
                setActiveFilter('feature');
                if (groupedComponents && groupedComponents['Feature'] && groupedComponents['Feature'].length > 0) {
                  setSelectedId(groupedComponents['Feature'][0]._id);
                  setIframeKey(prev => prev + 1);
                }
              }}
              className={`px-3 py-2 rounded-lg transition-all text-xs font-bold whitespace-nowrap ${
                activeFilter === 'feature'
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Feature
            </button>
            <button
              onClick={() => {
                setActiveFilter('pricing');
                if (groupedComponents && groupedComponents['Pricing'] && groupedComponents['Pricing'].length > 0) {
                  setSelectedId(groupedComponents['Pricing'][0]._id);
                  setIframeKey(prev => prev + 1);
                }
              }}
              className={`px-3 py-2 rounded-lg transition-all text-xs font-bold whitespace-nowrap ${
                activeFilter === 'pricing'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Pricing
            </button>
            <button
              onClick={() => {
                setActiveFilter('faq');
                if (groupedComponents && groupedComponents['FAQ'] && groupedComponents['FAQ'].length > 0) {
                  setSelectedId(groupedComponents['FAQ'][0]._id);
                  setIframeKey(prev => prev + 1);
                }
              }}
              className={`px-3 py-2 rounded-lg transition-all text-xs font-bold whitespace-nowrap ${
                activeFilter === 'faq'
                  ? 'bg-yellow-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => {
                setActiveFilter('testimonial');
                if (groupedComponents && groupedComponents['Testimonial'] && groupedComponents['Testimonial'].length > 0) {
                  setSelectedId(groupedComponents['Testimonial'][0]._id);
                  setIframeKey(prev => prev + 1);
                }
              }}
              className={`px-3 py-2 rounded-lg transition-all text-xs font-bold whitespace-nowrap ${
                activeFilter === 'testimonial'
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Testimonial
            </button>
            <button
              onClick={() => {
                setActiveFilter('cta');
                if (groupedComponents && groupedComponents['Call to Action'] && groupedComponents['Call to Action'].length > 0) {
                  setSelectedId(groupedComponents['Call to Action'][0]._id);
                  setIframeKey(prev => prev + 1);
                }
              }}
              className={`px-3 py-2 rounded-lg transition-all text-xs font-bold whitespace-nowrap ${
                activeFilter === 'cta'
                  ? 'bg-fuchsia-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              CTA
            </button>
            </div>
          </div>
        </div>
        
        <div className="p-3 space-y-6">
          {displayedCategories.map((category) => (
            <div key={category}>
              <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest px-2 py-2 mb-2">
                {category}
              </h3>
              <div className="space-y-1">
                {filteredGrouped[category].map((comp) => (
                  <button
                    key={comp._id}
                    onClick={() => {
                      setSelectedId(comp._id);
                      setIframeKey(prev => prev + 1);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                      selectedId === comp._id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white/5 hover:bg-white/10 text-gray-200'
                    }`}
                  >
                    {comp.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Code Area */}
      <div
        className={`${viewMode === 'preview' ? 'hidden' : viewMode === 'code' ? 'flex-1' : ''} bg-gradient-to-b from-slate-950 to-slate-900 text-white border-r border-white/10 min-h-0 overflow-y-auto`}
        style={viewMode === 'both' ? { flexBasis: `${codeWidth}%`, minWidth: 200 } : undefined}
      >
        <div className="p-4 bg-slate-950/95 backdrop-blur border-b border-white/10 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-300">Component Code</h3>
          {viewMode !== 'both' && (
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('code')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                viewMode === 'code'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              Code
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                viewMode === 'preview'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              Preview
            </button>
            {screenWidth >= 700 && (
              <button
                onClick={() => setViewMode('both')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                  viewMode === 'both'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                Both
              </button>
            )}
          </div>
          )}
        </div>
        <div className="p-4">
          {/* Code Section with Copy Button */}
            <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400 font-semibold">Full Code</span>
              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    setCodeMessage('❌ Please login first!');
                    setTimeout(() => setCodeMessage(''), 2000);
                    return;
                  }
                  navigator.clipboard.writeText(code).then(() => {
                    setCodeMessage('Code Copied! ✓');
                    setTimeout(() => setCodeMessage(''), 1600);
                  });
                }}
                className="px-3 py-1 text-xs font-bold bg-green-600 text-white rounded-md hover:bg-green-700 transition-all flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            </div>
            <pre
              onClick={() => {
                if (!isLoggedIn) {
                  setCodeMessage('❌ Please login first!');
                  setTimeout(() => setCodeMessage(''), 2000);
                  return;
                }
                setComponentCode(code);
                setIsEditing(true);
                setViewMode('both');
                setIframeKey(prev => prev + 1);
                setCodeMessage('Loaded to editor ✓');
                setTimeout(() => setCodeMessage(''), 1600);
              }}
              className="rounded-lg overflow-x-auto overflow-y-auto max-h-96 cursor-pointer"
              title="Click to edit this component in the playground"
            >
              <SyntaxHighlighter language="jsx" style={dracula} customStyle={{ margin: 0, borderRadius: '8px', fontSize: '13px' }}>
                {code}
              </SyntaxHighlighter>
            </pre>
            {codeMessage && <div className={`text-xs mt-2 font-semibold ${codeMessage.includes('✓') ? 'text-green-400' : 'text-red-400'}`}>{codeMessage}</div>}
          </div>

          {/* Minimal Imports Section with Copy Button */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs font-semibold">Minimal imports</span>
              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    setImportsMessage('❌ Please login first!');
                    setTimeout(() => setImportsMessage(''), 2000);
                    return;
                  }
                  const importText = 'import { useState } from "react";';
                  navigator.clipboard.writeText(importText).then(() => {
                    setImportsMessage('Import Copied! ✓');
                    setTimeout(() => setImportsMessage(''), 1600);
                  });
                }}
                className="px-3 py-1 text-xs font-bold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            </div>
            <pre className="bg-[#0b1220] text-[13px] text-[#e6eef8] p-2 rounded overflow-x-auto m-0">
              <code>import {'{ useState, useEffect  }'} from "react";</code>
            </pre>
            {importsMessage && <div className={`text-xs mt-2 font-semibold ${importsMessage.includes('✓') ? 'text-green-400' : 'text-red-400'}`}>{importsMessage}</div>}
          </div>

          {/* Requirements Section with Copy Button */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs font-semibold">Requirements note</span>
              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    setRequirementsMessage('❌ Please login first!');
                    setTimeout(() => setRequirementsMessage(''), 2000);
                    return;
                  }
                  const requirementsText = 'Requires:\n- React\n- Tailwind CSS';
                  navigator.clipboard.writeText(requirementsText).then(() => {
                    setRequirementsMessage('Requirements Copied! ✓');
                    setTimeout(() => setRequirementsMessage(''), 1600);
                  });
                }}
                className="px-3 py-1 text-xs font-bold bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            </div>
            <pre className="bg-[#0b1220] text-[13px] text-[#e6eef8] p-2 rounded overflow-x-auto m-0">
              <code>Requires:
  - React
  - Tailwind CSS</code>
            </pre>
            {requirementsMessage && <div className={`text-xs mt-2 font-semibold ${requirementsMessage.includes('✓') ? 'text-green-400' : 'text-red-400'}`}>{requirementsMessage}</div>}
          </div>

          {/* Duplicate Read-only Code Block under Requirements note */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-300">Component Code (Read-only)</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (!isLoggedIn) {
                        setCodeMessage('❌ Please login first!');
                        setTimeout(() => setCodeMessage(''), 2000);
                        return;
                      }
                      navigator.clipboard.writeText(code).then(() => {
                        setCodeMessage('Code Copied! ✓');
                        setTimeout(() => setCodeMessage(''), 1600);
                      });
                    }}
                    className="px-3 py-1 text-xs font-bold bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-all flex items-center gap-1"
                  >
                    Copy
                  </button>

                  {!isEditing ? (
                    <button
                      onClick={() => {
                        if (!isLoggedIn) {
                          setCodeMessage('❌ Please login first!');
                          setTimeout(() => setCodeMessage(''), 2000);
                          return;
                        }
                        // Load into playground and switch to both view so user can edit + preview
                        setComponentCode(code);
                        setIsEditing(true);
                        setViewMode('both');
                        setIframeKey(prev => prev + 1);
                        setCodeMessage('Loaded to editor ✓');
                        setTimeout(() => setCodeMessage(''), 1600);
                      }}
                      className="px-3 py-1 text-xs font-bold bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all flex items-center gap-1"
                    >
                      Edit Preview
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setCodeMessage('Editor closed');
                        setTimeout(() => setCodeMessage(''), 1400);
                      }}
                      className="px-3 py-1 text-xs font-bold bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-all flex items-center gap-1"
                    >
                      Done Editing
                    </button>
                  )}
                </div>
              </div>
            <div className="bg-black/40 border border-white/10 rounded-lg p-3 text-xs overflow-x-auto font-mono text-gray-300 max-h-72">
              {isEditing ? (
                <PlaygroundCodeEditor />
              ) : (
                <pre
                  onClick={() => {
                    if (!isLoggedIn) {
                      setCodeMessage('❌ Please login first!');
                      setTimeout(() => setCodeMessage(''), 2000);
                      return;
                    }
                    setComponentCode(code);
                    setIsEditing(true);
                    setViewMode('both');
                    setIframeKey(prev => prev + 1);
                    setCodeMessage('Loaded to editor ✓');
                    setTimeout(() => setCodeMessage(''), 1600);
                  }}
                  className="m-0 cursor-pointer"
                  title="Click to edit this component in the playground"
                >
                  <code>{code}</code>
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Resizer (only shown in 'both' mode) */}
      {viewMode === 'both' && (
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            draggingRef.current = true;
            document.body.style.cursor = 'col-resize';
            
            // Disable pointer events on iframe during drag
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(iframe => {
              iframe.style.pointerEvents = 'none';
            });
            
            // attach listeners (they are removed in onMouseUp)
            const onMouseMove = (ev) => {
              if (!draggingRef.current) return;
              if (!containerRef.current || !leftRef.current) return;
              
              const containerRect = containerRef.current.getBoundingClientRect();
              const leftWidth = leftRef.current.getBoundingClientRect().width;
              const relX = ev.clientX - containerRect.left; // Calculate relative X position from container's left edge
              const availableWidth = containerRect.width; // Total available width of the container

              // Prevent resizing beyond safe bounds (accounting for left pane)
              if (relX < leftWidth + 50) return; // Min 50px for code section
              if (relX > availableWidth - 50) return; // Max 50px for preview section

              // Calculate percentage correctly, accounting for left pane width
              const pct = ((relX - leftWidth) / (availableWidth - leftWidth)) * 100;
              setCodeWidth(pct);
            };

            const onMouseUp = () => {
              draggingRef.current = false;
              document.body.style.cursor = '';
              
              // Re-enable pointer events on iframe after drag
              const iframes = document.querySelectorAll('iframe');
              iframes.forEach(iframe => {
                iframe.style.pointerEvents = 'auto';
              });
              
              document.removeEventListener('mousemove', onMouseMove);
              document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
          }}
          className="hidden md:block bg-transparent hover:bg-gray-200/30"
          style={{ width: 8, cursor: 'col-resize', display: 'block' }}
          aria-hidden
        />
      )}

      {/* Right Preview Area */}
      <div className={`${viewMode === 'code' ? 'hidden' : viewMode === 'preview' ? 'flex-1' : 'flex-1'} bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex flex-col`} style={viewMode === 'both' ? { flexBasis: `${100 - codeWidth}%` } : undefined}>
        <div className="p-4 bg-white/95 backdrop-blur border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-700">Live Preview</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('code')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                viewMode === 'code'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              Code
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                viewMode === 'preview'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              Preview
            </button>
            {screenWidth >= 700 && (
              <button
                onClick={() => setViewMode('both')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                  viewMode === 'both'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                Both
              </button>
            )}
          </div>
        </div>
            <div className="flex-1 overflow-hidden min-h-0 flex flex-col bg-gray-900">
              {code ? (
                <LiveProvider code={code} scope={{ React }}>
                  <div className="flex-1 overflow-auto p-4 bg-white/5">
                    <LivePreview className="min-h-full" />
                  </div>
                  <div className="border-t border-white/10 p-3 bg-red-900/20">
                    <LiveError className="text-red-400 text-sm font-mono" />
                  </div>
                </LiveProvider>
              ) : (
                <div className="text-center flex items-center justify-center h-full">
                  <p className="text-gray-500 font-semibold">Select a component to preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

// Website Code Examples
const WEB_EXAMPLES = [
  {
    id: 'portfolio',
    name: '🎨 Portfolio',
    description: 'Beautiful portfolio website',
    code: ` function App() {

const [theme,setTheme] = useState("dark")

const toggleTheme = ()=>{
setTheme(t => t === "dark" ? "light" : "dark")
}

const features = [
"Modern UI Design",
"Fast Performance",
"SEO Friendly",
"Mobile Responsive",
"Secure Backend",
"Clean Code Architecture"
]

const skills = [
"React",
"JavaScript",
"Node.js",
"MongoDB",
"Tailwind",
"Next.js",
"Express",
"REST API"
]

const services = [
{
title:"Web Development",
desc:"Building modern responsive websites."
},
{
title:"Backend Development",
desc:"Creating powerful APIs and server systems."
},
{
title:"UI / UX Design",
desc:"Designing clean and modern interfaces."
},
{
title:"SEO Optimization",
desc:"Improving website search ranking."
}
]

const portfolio = [
{
title:"Ecommerce Platform",
desc:"Full online shopping system."
},
{
title:"Dashboard System",
desc:"Business analytics dashboard."
},
{
title:"AI Chat Application",
desc:"Real time chatbot system."
}
]

return (

<div className={theme === "dark"
? "min-h-screen bg-slate-900 text-white"
: "min-h-screen bg-gray-100 text-black"}>

{/* NAVBAR */}

<nav className="container mx-auto px-6 py-6 flex justify-between">

<h1 className="text-xl font-bold">
Modern Web Platform
</h1>

<button
onClick={toggleTheme}
className="px-4 py-2 bg-indigo-600 rounded"
>
Toggle Theme
</button>

</nav>

{/* HERO */}

<section className="text-center py-28">

<h2 className="text-6xl font-bold">
Build Powerful Web Experiences
</h2>

<p className="mt-6 text-gray-400 max-w-2xl mx-auto">
A modern platform for building scalable and high performance web applications.
</p>

<div className="mt-10 flex justify-center gap-4">

<button className="px-6 py-3 bg-indigo-600 rounded">
Get Started
</button>

<button className="px-6 py-3 border rounded">
Learn More
</button>

</div>

</section>

{/* STATS */}

<section className="container mx-auto px-6 py-20">

<div className="grid md:grid-cols-4 gap-6 text-center">

<div className="bg-slate-800 p-8 rounded-xl">
<h3 className="text-4xl font-bold">500+</h3>
<p className="text-gray-400">Projects</p>
</div>

<div className="bg-slate-800 p-8 rounded-xl">
<h3 className="text-4xl font-bold">200+</h3>
<p className="text-gray-400">Clients</p>
</div>

<div className="bg-slate-800 p-8 rounded-xl">
<h3 className="text-4xl font-bold">10+</h3>
<p className="text-gray-400">Years Experience</p>
</div>

<div className="bg-slate-800 p-8 rounded-xl">
<h3 className="text-4xl font-bold">24/7</h3>
<p className="text-gray-400">Support</p>
</div>

</div>

</section>

{/* FEATURES */}

<section className="container mx-auto px-6 py-20">

<h2 className="text-4xl font-bold text-center">
Platform Features
</h2>

<div className="grid md:grid-cols-3 gap-6 mt-10">

{features.map((f,i)=>(
<div key={i} className="p-8 bg-slate-800 rounded-xl">

<h3 className="text-xl font-semibold">
{f}
</h3>

<p className="text-gray-400 mt-3">
Professional quality web architecture and design.
</p>

</div>
))}

</div>

</section>

{/* SKILLS */}

<section className="container mx-auto px-6 py-20">

<h2 className="text-4xl font-bold text-center">
Technology Stack
</h2>

<div className="grid md:grid-cols-4 gap-6 mt-10">

{skills.map((s,i)=>(
<div key={i} className="bg-slate-800 p-6 text-center rounded-xl">
{s}
</div>
))}

</div>

</section>

{/* SERVICES */}

<section className="container mx-auto px-6 py-20">

<h2 className="text-4xl font-bold text-center">
Services
</h2>

<div className="grid md:grid-cols-4 gap-6 mt-10">

{services.map((s,i)=>(
<div key={i} className="bg-slate-800 p-8 rounded-xl">

<h3 className="text-xl font-bold">
{s.title}
</h3>

<p className="text-gray-400 mt-3">
{s.desc}
</p>

</div>
))}

</div>

</section>

{/* PORTFOLIO */}

<section className="container mx-auto px-6 py-20">

<h2 className="text-4xl font-bold text-center">
Portfolio
</h2>

<div className="grid md:grid-cols-3 gap-6 mt-10">

{portfolio.map((p,i)=>(
<div key={i} className="bg-slate-800 p-8 rounded-xl">

<h3 className="text-xl font-bold">
{p.title}
</h3>

<p className="text-gray-400 mt-3">
{p.desc}
</p>

</div>
))}

</div>

</section>

{/* TESTIMONIALS */}

<section className="container mx-auto px-6 py-20">

<h2 className="text-4xl font-bold text-center">
Client Feedback
</h2>

<div className="grid md:grid-cols-3 gap-6 mt-10">

<div className="bg-slate-800 p-6 rounded-xl">
Great experience working together.
</div>

<div className="bg-slate-800 p-6 rounded-xl">
Highly professional and reliable service.
</div>

<div className="bg-slate-800 p-6 rounded-xl">
Delivered high quality results.
</div>

</div>

</section>

{/* PRICING */}

<section className="container mx-auto px-6 py-20">

<h2 className="text-4xl font-bold text-center">
Pricing
</h2>

<div className="grid md:grid-cols-3 gap-6 mt-10">

<div className="bg-slate-800 p-8 rounded-xl text-center">

<h3 className="text-xl font-bold">Basic</h3>

<p className="text-4xl mt-4">$99</p>

<ul className="mt-6 space-y-2 text-gray-400">
<li>Landing Page</li>
<li>Responsive Design</li>
<li>Email Support</li>
</ul>

</div>

<div className="bg-slate-800 p-8 rounded-xl text-center">

<h3 className="text-xl font-bold">Pro</h3>

<p className="text-4xl mt-4">$299</p>

<ul className="mt-6 space-y-2 text-gray-400">
<li>Full Website</li>
<li>Admin Dashboard</li>
<li>API Integration</li>
</ul>

</div>

<div className="bg-slate-800 p-8 rounded-xl text-center">

<h3 className="text-xl font-bold">Enterprise</h3>

<p className="text-4xl mt-4">$999</p>

<ul className="mt-6 space-y-2 text-gray-400">
<li>Custom Platform</li>
<li>Backend System</li>
<li>24/7 Support</li>
</ul>

</div>

</div>

</section>

{/* CONTACT */}

<section className="container mx-auto px-6 py-20">

<h2 className="text-4xl font-bold text-center">
Contact
</h2>

<form className="grid gap-4 max-w-xl mx-auto mt-10">

<input
placeholder="Name"
className="p-3 border rounded bg-transparent"
/>

<input
placeholder="Email"
className="p-3 border rounded bg-transparent"
/>

<textarea
placeholder="Message"
className="p-3 border rounded h-32 bg-transparent"
/>

<button className="bg-indigo-600 py-3 rounded">
Send Message
</button>

</form>

</section>

{/* FOOTER */}

<footer className="text-center py-10 border-t">

<p className="text-gray-400">
© 2026 Modern Web Platform
</p>

</footer>

</div>

)

}`
  },
  {
    id: 'ecommerce',
    name: '🛒 E-Commerce',
    description: 'Product store with cart',
    code: `function App(){

const [cart,setCart] = useState([])

const products = [

{
id:1,
name:"Premium Sneakers",
img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff"
},

{
id:2,
name:"Smart Watch",
img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
},

{
id:3,
name:"Wireless Headphones",
img:"https://images.unsplash.com/photo-1518443895914-6c53b2c3c02b"
},

{
id:4,
name:"Gaming Keyboard",
img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
}

]

const addToCart = (product)=>{
setCart([...cart,product])
}

return(

<div className="min-h-screen bg-gray-100">

{/* NAVBAR */}

<nav className="bg-white shadow">

<div className="container mx-auto px-6 py-4 flex justify-between">

<h1 className="text-2xl font-bold">
Online Store
</h1>

<div className="bg-indigo-600 text-white px-4 py-2 rounded">
Cart ({cart.length})
</div>

</div>

</nav>


{/* HERO */}

<section className="bg-indigo-600 text-white py-24 text-center">

<h2 className="text-5xl font-bold">
Welcome To Our Store
</h2>

<p className="mt-4">
Discover amazing products online
</p>

</section>


{/* PRODUCTS */}

<section className="container mx-auto px-6 py-16">

<h2 className="text-3xl font-bold text-center">
Products
</h2>

<div className="grid md:grid-cols-3 gap-8 mt-10">

{products.map((product)=>(

<div
key={product.id}
className="bg-white rounded-xl shadow hover:shadow-xl transition"
>

<img
src={product.img}
className="h-56 w-full object-cover rounded-t-xl"
/>

<div className="p-6">

<h3 className="text-xl font-bold">
{product.name}
</h3>

<p className="mt-2 text-gray-500">
High quality product
</p>

<button
onClick={()=>addToCart(product)}
className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
>
Add To Cart
</button>

</div>

</div>

))}

</div>

</section>


{/* FEATURES */}

<section className="bg-white py-16">

<div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">

<div>
🚚
<h3 className="mt-4 font-bold">Fast Delivery</h3>
</div>

<div>
🔒
<h3 className="mt-4 font-bold">Secure Payment</h3>
</div>

<div>
⭐
<h3 className="mt-4 font-bold">Best Quality</h3>
</div>

</div>

</section>


{/* FOOTER */}

<footer className="bg-black text-white py-8 text-center">

<p>
© 2026 Online Store
</p>

</footer>

</div>

)

}`
  },
  {
    id: 'blog',
    name: '📝 Blog Platform',
    description: 'Blog with search & filtering',
    code: `function App() {
  const [search, setSearch] = React.useState('');
  
  const posts = [
    { id: 1, title: 'Getting Started with React', category: 'React', excerpt: 'Learn the basics of React and hooks' },
    { id: 2, title: 'CSS Grid Mastery', category: 'CSS', excerpt: 'Master modern CSS Grid layouts' },
    { id: 3, title: 'JavaScript ES6 Features', category: 'JavaScript', excerpt: 'Explore ES6 and modern JavaScript' },
    { id: 4, title: 'Web Performance Tips', category: 'Performance', excerpt: 'Optimize your website speed' },
  ];

  const filtered = posts.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold">My Tech Blog</h1>
          <p className="mt-4 text-lg">Thoughts on web development</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <input 
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-indigo-600"
          />
        </div>

        <div className="grid gap-6">
          {filtered.length > 0 ? (
            filtered.map(post => (
              <article key={post.id} className="border-l-4 border-indigo-600 pl-6 py-4">
                <span className="text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded">{post.category}</span>
                <h2 className="text-2xl font-bold mt-2">{post.title}</h2>
                <p className="text-gray-600 mt-3">{post.excerpt}</p>
              </article>
            ))
          ) : (
            <p className="text-center text-gray-500">No posts found</p>
          )}
        </div>
      </main>
    </div>
  );
}`
  },
  {
    id: 'saas',
    name: '🚀 SaaS Landing',
    description: 'Modern SaaS pricing page',
    code: `function App() {
  const plans = [
    { name: 'Starter', price: 29, features: ['10 projects', '5GB storage', 'Basic support'] },
    { name: 'Pro', price: 79, features: ['100 projects', '100GB storage', 'Priority support'], popular: true },
    { name: 'Enterprise', price: 'Custom', features: ['Unlimited', 'Unlimited storage', '24/7 support'] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white">
      <header className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-6xl font-bold mb-6">PowerTools</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">The all-in-one solution for your team to collaborate and build amazing things</p>
      </header>

      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Simple, Transparent Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={"p-8 rounded-lg border transition " + (plan.popular ? 'border-blue-500 bg-blue-900 bg-opacity-20 scale-105' : 'border-gray-700 hover:border-gray-500')}>
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="text-4xl font-bold mb-6">
                {typeof plan.price === 'number' ? '$' + plan.price : plan.price}
                {typeof plan.price === 'number' && <span className="text-lg text-gray-400">/month</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={"w-full py-3 rounded-lg font-bold transition " + (plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'border border-gray-500 hover:border-white')}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}`
  },
  {
    id: 'dashboard',
    name: '📊 Dashboard',
    description: 'Analytics dashboard UI',
    code: `function App() {
  const [data] = React.useState([
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 78 },
    { label: 'Mar', value: 90 },
    { label: 'Apr', value: 81 },
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Export</button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Users', value: '12,543', change: '+12%' },
            { label: 'Revenue', value: '$54,231', change: '+8%' },
            { label: 'Orders', value: '1,324', change: '+25%' },
            { label: 'Conversion', value: '3.2%', change: '+0.5%' },
          ].map((card, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm">{card.label}</p>
              <p className="text-3xl font-bold mt-2">{card.value}</p>
              <p className="text-green-600 text-sm mt-2">{card.change} vs last month</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-6">Monthly Sales</h2>
          <div className="flex items-end justify-around h-48">
            {data.map((d, i) => (
              <div key={i} className="text-center">
                <div className="bg-blue-500 rounded-t w-12" style={{height: d.value + 'px'}}></div>
                <p className="mt-2 text-sm">{d.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}`
  },
  {
    id: 'portfolio-pro',
    name: '👨‍💻 Portfolio Pro',
    description: 'Professional developer portfolio',
    code: `function App() {
  const [theme, setTheme] = React.useState('dark');
  
  const projects = [
    { title: 'AI Chat App', desc: 'Smart conversational UI with context awareness.', tags: ['React', 'AI', 'Socket'] },
    { title: 'E-Commerce Platform', desc: 'Checkout, inventory, and analytics — production ready.', tags: ['Node', 'Stripe', 'MongoDB'] },
    { title: 'Analytics Dashboard', desc: 'Real-time charts and KPIs for business teams.', tags: ['Charts', 'Realtime', 'Websockets'] },
  ];

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <div className={theme === 'dark' ? 'min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 text-white' : 'min-h-screen bg-gradient-to-b from-rose-50 via-white to-cyan-50 text-slate-900'}>
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center font-bold shadow-lg">JS</div>
          <div>
            <h1 className="text-lg font-semibold">Gurjant — Dev</h1>
            <p className="text-xs text-gray-400">Design · Frontend · Product</p>
          </div>
        </div>
        <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-slate-700/40 transition">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </nav>

      <header className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">Crafting beautiful, fast & delightful interfaces</h2>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">I build production-ready web apps with a focus on UX, performance, and developer experience.</p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition">See my work</button>
          <button className="px-6 py-3 rounded-full border border-white/10">About me</button>
        </div>
      </header>

      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Featured Work</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <article key={i} className="bg-slate-700 p-6 rounded-xl shadow-lg border border-white/5 hover:border-indigo-500/50 transition">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-gray-300">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map(t => (
                  <span key={t} className="text-xs bg-slate-800/40 px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl bg-slate-700/40 border border-white/5">
            <h3 className="text-2xl font-semibold">About me</h3>
            <p className="mt-4 text-gray-300">I'm a frontend developer who loves clean code, delightful UI, and fast apps. I focus on shipping features users love.</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>• 3+ years building web apps</li>
              <li>• Performance & accessibility focused</li>
              <li>• Enjoy mentoring and code reviews</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/40 border border-white/5">
            <h4 className="font-medium">Tech & tools</h4>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-200">
              <span>React</span>
              <span>Tailwind</span>
              <span>Node.js</span>
              <span>MongoDB</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto bg-slate-800/40 p-8 rounded-2xl border border-white/6">
          <h3 className="text-2xl font-semibold">Get in touch</h3>
          <p className="text-gray-300 mt-2">I'm available for freelance work and new opportunities.</p>
          <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); alert('Thanks! I will get back to you.'); }}>
            <input required placeholder="Your name" className="p-3 rounded-md bg-transparent border border-white/6 text-white" />
            <input required type="email" placeholder="you@example.com" className="p-3 rounded-md bg-transparent border border-white/6 text-white" />
            <textarea required placeholder="Message" className="p-3 rounded-md bg-transparent border border-white/6 md:col-span-2 h-32 text-white" />
            <button type="submit" className="md:col-span-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500">Send message</button>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/6 py-8 mt-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-400">© 2024 Gurjant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}`
  },
  {
    id: 'all-components',
    name: '🎨 All Components',
    description: 'All-in-One Component Showcase',
    code: `function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">
      <h1 className="text-4xl font-bold mb-6 text-center">All-in-One React Component Showcase</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Card + Button + Alert</h2>
            <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-4 mb-4">
              <h3 className="font-bold">Heads up!</h3>
              <p className="text-sm">This is an alert inside the card.</p>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">Click Me</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Tabs + Input</h2>
            <div className="space-y-4">
              <div className="flex gap-2 mb-4">
                <button className="flex-1 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium">Account</button>
                <button className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition">Settings</button>
              </div>
              <input placeholder="Enter your name" className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400" />
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Accordion</h2>
            <div className="space-y-2">
              <div className="border border-white/20 rounded-lg overflow-hidden">
                <button className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 text-left font-medium transition flex justify-between items-center">
                  What is this?
                  <span>+</span>
                </button>
                <div className="px-4 py-3 bg-white/5 text-sm">
                  This is a fully imported component demo.
                </div>
              </div>
              <div className="border border-white/20 rounded-lg overflow-hidden">
                <button className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 text-left font-medium transition flex justify-between items-center">
                  How to use?
                  <span>+</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Avatars, Badges, Progress */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Avatars + Badges + Progress</h2>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold">SH</div>
              <span className="px-3 py-1 bg-purple-600 rounded-full text-sm">Pro User</span>
            </div>

            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{width: '70%'}}></div>
                       </div>
            <p className="mt-2 text-sm opacity-80">Profile Completion: 70%</p>
          </div>
        </div>

        {/* Switch + Loading Icon */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 md:col-span-2">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Switch + Loader</h2>

            <div className="flex items-center gap-4">
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/10 border border-white/20">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
              </button>
              <span className="text-2xl">⏳</span>
            </div>

            <div className="my-4 border-t border-white/20"></div>
            <p className="text-sm opacity-80">All UI components working together!</p>
          </div>
        </div>
      </div>
    </div>
  );
}`
  },
];

function FullWebPreview() {
  const [selectedExample, setSelectedExample] = useState('dynamic-react');
  const [iframeKey, setIframeKey] = useState(0);
  const [activeTab, setActiveTab] = useState('preview');

  const example = WEB_EXAMPLES.find(e => e.id === selectedExample);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">Full Web Preview System</h1>
        <p className="text-gray-600 mb-6">Select a website to preview its code and see how it renders</p>

        {/* Button Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
          {WEB_EXAMPLES.map((ex) => (
            <button
              key={ex.id}
              onClick={() => {
                setSelectedExample(ex.id);
                setIframeKey(prev => prev + 1);
              }}
              className={`p-4 rounded-lg border-2 transition-all text-sm font-medium ${
                selectedExample === ex.id
                  ? 'border-blue-600 bg-blue-50 text-blue-900'
                  : 'border-gray-200 bg-white text-gray-800 hover:border-blue-300'
              }`}
            >
              {ex.name}
            </button>
          ))}
        </div>
      </div>

      {example && (
        <div>
          {/* Toggle Buttons */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => setActiveTab('code')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'code'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Code
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'preview'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Preview
            </button>
          </div>

          {/* Code Display */}
          {activeTab === 'code' && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gray-800 text-white px-4 py-3 font-mono text-sm flex justify-between items-center">
                <span>{example.name}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(example.code);
                    alert('Code copied to clipboard!');
                  }}
                  className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                >
                  Copy Code
                </button>
              </div>
              <pre className="p-4 overflow-auto max-h-96 bg-gray-900 text-gray-100 text-xs leading-relaxed">
                <code>{example.code}</code>
              </pre>
            </div>
          )}

          {/* Live Preview with Iframe - DISABLED */}
          {activeTab === 'preview' && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gray-800 text-white px-4 py-3 font-mono text-sm">
                Live Preview - Disabled
              </div>
              <div className="h-96 bg-gray-50 overflow-auto border-t flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 font-semibold">Component Preview is Disabled</p>
                  <p className="text-gray-400 text-sm mt-2">Copy the code and test it in your own environment</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900">💡 How it works:</h3>
        <ul className="text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside">
          <li>Each button shows a different website example</li>
          <li>Left side displays the React component code</li>
          <li>Right side shows the live preview using iframe + Babel transpiling</li>
          <li>Click "Copy Code" to get the complete code</li>
          <li>All examples use React, Tailwind CSS & standard web APIs</li>
        </ul>
      </div>
    </div>
  );
}


const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.$isDarkMode 
    ? 'linear-gradient(135deg, #030718 0%, #020718 25%, #020617 50%, #030819 75%, #030719 100%)' 
    : 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 25%, #eff2f5 50%, #f5f7fa 75%, #f9fafb 100%)'};
  transition: background 0.3s ease;
`;

const Header = styled.header`
  background-color: #1a202c;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const NavButton = styled.button`
  background: transparent;
  color: #030718;
  border: 1px solid #030718;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
  
  @media (max-width: 700px) {
    font-size: 0.875rem;
    padding: 0.4rem 0.8rem;
  }

  &:hover {
    background: #030718;
    color: white;
  }
`;

const Main = styled.main`
  ${(props) => {
    // For preview pages, use full width
    if (props.$isPreview) {
      return `
        margin: 0;
        padding: 0;
        margin-top: 80px;
        width: 100%;
        height: calc(100vh - 80px);
      `;
    }
    // For home page, use full width
    if (props.$isHome) {
      return `
        margin: 0;
        padding: 0;
        margin-top: 80px;
        width: 100%;
      `;
    }
    // For about page, use full width
    if (props.$isAbout) {
      return `
        margin: 0;
        padding: 0;
        margin-top: 80px;
        width: 100%;
      `;
    }
    // For other pages, use max-width container
    return `
      margin: 0 auto;
      margin-top: 80px;
      padding: 2rem 1rem;
      max-width: 1200px;
    `;
  }}
`;

const ComponentPreview = styled.div`
  margin: 2rem 0;
  padding: 2rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CodeBlock = styled.pre`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
`;

const Footer = styled.footer`
  background: ${props => props.$isDarkMode 
    ? 'linear-gradient(135deg, #0f172a 0%, #1a202c 50%, #0f172a 100%)' 
    : 'linear-gradient(135deg, #f3f4f6 0%, #f9fafb 50%, #f3f4f6 100%)'};
  padding: 4rem 2rem;
  margin-top: 6rem;
  color: ${props => props.$isDarkMode ? '#CBD5E0' : '#4b5563'};
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border-top: 1px solid ${props => props.$isDarkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(75, 85, 99, 0.1)'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at top right, rgba(168, 85, 247, 0.1), transparent 50%),
                radial-gradient(ellipse at bottom left, rgba(59, 130, 246, 0.1), transparent 50%);
    pointer-events: none;
  }
`;

const FooterTop = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 3rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${props => props.$isDarkMode ? 'rgba(203, 213, 224, 0.2)' : 'rgba(75, 85, 99, 0.2)'};
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const LogoImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
  transition: all 0.3s ease;
  filter: drop-shadow(0 4px 12px rgba(168, 85, 247, 0.3));

  &:hover {
    transform: scale(1.1) rotate(5deg);
    filter: drop-shadow(0 8px 20px rgba(168, 85, 247, 0.5));
  }
`;

const BrandInfo = styled.div`
  h2 {
    margin:${props => props.$isDarkMode ? 'white' : '#1f2937'};
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #a855f7, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    margin: 0.25rem 0 0 0;
    font-size: 0.875rem;
    color: ${props => props.$isDarkMode ? '#94a3b8' : '#6b7280'};
    transition: all 0.3s ease75rem;
    color: #94a3b8;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.75rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${props => props.$isDarkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(75, 85, 99, 0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(203, 213, 224, 0.1);

  &:hover {
    background: linear-gradient(135deg, #a855f7, #3b82f6);
    transform: translateY(-4px) scale(1.1);
    border-color: rgba(168, 85, 247, 0.5);
    box-shadow: 0 8px 16px rgba(168, 85, 247, 0.3);
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  h3 {
    color: ${props => props.$isDarkMode ? 'white' : '#1f2937'};
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.75rem;
  }

  a {
    color: ${props => props.isDarkMode ? '#CBD5E0' : '#6b7280'};
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #4299E1;
    }
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  margin-top: 2rem;
  text-align: center;
  color: ${props => props.$isDarkMode ? '#718096' : '#9ca3af'};
  border-top: 1px solid ${props => props.$isDarkMode ? 'rgba(75, 85, 99, 0.1)' : 'rgba(75, 85, 99, 0.2)'};
  transition: all 0.3s ease;
`;

const PreviewContainer = styled.div`
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;
`;

function App() {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [viewingInternal, setViewingInternal] = useState(null);
  const [footerPage, setFooterPage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Tab to URL path mapping
  const TAB_TO_PATH = {
    'home': '/',
    'components': '/components',
    'library': '/library',
    'web': '/websites',
    'fullweb': '/full-web',
    'about': '/about',
    'template': '/template',
    'blog': '/blog',
    'customizeweb': '/customize-web',
    'testimonials': '/testimonials',
    'our-story': '/our-story',
    'mission-vision': '/mission-vision',
    'documentation': '/documentation',
    'changelog': '/changelog',
    'icons': '/icons',
  };

  // Path to tab reverse mapping
  const PATH_TO_TAB = {
    '/': 'home',
    '/home': 'home',
    '/components': 'components',
    '/library': 'library',
    '/websites': 'web',
    '/full-web': 'fullweb',
    '/about': 'about',
    '/template': 'template',
    '/blog': 'blog',
    '/customize-web': 'customizeweb',
    '/testimonials': 'testimonials',
    '/our-story': 'our-story',
    '/mission-vision': 'mission-vision',
    '/documentation': 'documentation',
    '/changelog': 'changelog',
    '/icons': 'icons',
  };


  // Custom setActiveTab that also updates the URL
  const handleSetActiveTab = useCallback((tab) => {
    setActiveTab(tab);
    setFooterPage(null);
    const path = TAB_TO_PATH[tab];
    if (path !== undefined) {
      navigate(path);
    }
  }, [navigate]);

  // Sync activeTab from URL on mount and path changes
  useEffect(() => {
    if (!location) return;
    const path = location.pathname || '';
    const tab = PATH_TO_TAB[path];
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
      setFooterPage(null);
    }
  }, [location]);

  useEffect(() => {
    const handler = (e) => {
      try {
        const page = e?.detail;
        if (page) setFooterPage(page);
      } catch (err) {
        console.warn('openFooterPage event handler error', err);
      }
    };
    window.addEventListener('openFooterPage', handler);
    return () => window.removeEventListener('openFooterPage', handler);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      try {
        const tab = e?.detail;
        if (tab) handleSetActiveTab(tab);
      } catch (err) {
        console.warn('setActiveTab event handler error', err);
      }
    };
    window.addEventListener('setActiveTab', handler);
    return () => window.removeEventListener('setActiveTab', handler);
  }, [handleSetActiveTab]);

  // sample imported components to preview in "imports" tab
  

  // Initialize login state from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedIsDarkMode = localStorage.getItem('isDarkMode');
    
    if (storedUser && storedIsLoggedIn === 'true') {
      try {
        setIsLoggedIn(true);
        setUserInfo(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error restoring user from localStorage:', err);
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isLoggedIn');
      }
    }

    if (storedIsDarkMode) {
      setIsDarkMode(JSON.parse(storedIsDarkMode));
    }
    
    fetchComponents();
  }, []);

  const fetchComponents = async () => {
    try {
      const response = await fetch(`${API_URL}/components?visible=true`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setComponents(data);
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Persist isDarkMode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Check if user is blocked periodically (every 30 seconds if logged in)
  useEffect(() => {
    if (!isLoggedIn) return;

    const checkUserStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch(`${API_URL}/user/status`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          if (response.status === 403) {
            // User is blocked
            const data = await response.json();
            alert(`Your account has been blocked. Reason: ${data.blockReason || 'No reason provided'}`);
            // Logout user
            setIsLoggedIn(false);
            setUserInfo(null);
            localStorage.removeItem('userInfo');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('token');
            return;
          }
          if (response.status === 401) {
            // Token expired or invalid
            setIsLoggedIn(false);
            setUserInfo(null);
            localStorage.removeItem('userInfo');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('token');
            return;
          }
        }

        const data = await response.json();
        if (data.blocked) {
          // User is blocked
          alert(`Your account has been blocked. Reason: ${data.blockReason || 'No reason provided'}`);
          setIsLoggedIn(false);
          setUserInfo(null);
          localStorage.removeItem('userInfo');
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Error checking user status:', error);
      }
    };

    // Check immediately on login
    checkUserStatus();

    // Then check every 30 seconds
    const interval = setInterval(checkUserStatus, 30000);

    return () => clearInterval(interval);
  }, [isLoggedIn, API_URL]);

  // Apply Tailwind 'dark' class to the document root so `dark:` utilities work
  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (err) {
      // safe fallback for non-browser environments
      console.warn('Could not toggle dark class on document:', err);
    }
  }, [isDarkMode]);

  const theme = {
    mode: isDarkMode ? 'dark' : 'light',
    colors: {
      background: isDarkMode ? '#1a202c' : '#f7fafc',
      text: isDarkMode ? '#ffffff' : '#1a202c',
    }
  };

  if (error) return <ErrorState error={error} onRetry={fetchComponents} />;
  // Show loading only on initial load if we don't have components
  if (loading && components.length === 0) return <LoadingState />;
  // don't block entire app when components list is empty;
  // show empty state only inside the "components" tab below
  // if (!components.length) return <EmptyState />;
  
  return (
    <ThemeProvider theme={theme}>
      <Container $isDarkMode={isDarkMode}>
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={handleSetActiveTab}
          onLoginClick={() => setIsLoginOpen(true)}
          onSignupClick={() => {
            setIsLoginOpen(false);
            setIsSignupOpen(true);
          }}
          isLoggedIn={isLoggedIn}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onLogout={() => {
            console.log('[LOGOUT] Starting logout process...');
            setIsLoggedIn(false);
            setUserInfo(null);
            handleSetActiveTab('home');
            setLoading(false);
            setError(null);
            localStorage.removeItem('userInfo');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('token');
            console.log('[LOGOUT] Logout complete - redirected to home');
          }}
          userInfo={userInfo}
          onUpdateProfile={(updatedUser) => {
            setUserInfo(updatedUser);
            localStorage.setItem('userInfo', JSON.stringify(updatedUser));
          }}
        />
        <LoginModal 
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)}
          onSignupClick={() => {
            setIsLoginOpen(false);
            setIsSignupOpen(true);
          }}
          onLoginSuccess={(email) => {
            setIsLoggedIn(true);
            const userDetails = { email };
            setUserInfo(userDetails);
            localStorage.setItem('userInfo', JSON.stringify(userDetails));
            localStorage.setItem('isLoggedIn', 'true');
            setIsLoginOpen(false);
          }}
        />
        <SignupModal 
          isOpen={isSignupOpen} 
          onClose={() => setIsSignupOpen(false)}
          onSignupSuccess={(name, email) => {
            setIsLoggedIn(true);
            const userDetails = { name, email };
            setUserInfo(userDetails);
            localStorage.setItem('userInfo', JSON.stringify(userDetails));
            localStorage.setItem('isLoggedIn', 'true');
            setIsSignupOpen(false);
          }}
        />
        <Main $isPreview={activeTab === 'components' || activeTab === 'library' || activeTab === 'fullweb' || activeTab === 'template'} $isHome={activeTab === 'home'} $isAbout={activeTab === 'about'}>
          {activeTab === 'home' ? (
            <>

<Home setActiveTab={handleSetActiveTab} />

              {/* {HeroSection && <HeroSection onExploreClick={() => setActiveTab('components')} onLearnMoreClick={() => setActiveTab('about')} />} */}
              <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FeatureCard
                    icon="🎨"
                    title="Modern Design"
                    description="Beautifully crafted components with modern design principles"
                  />
                  <FeatureCard
                    icon="📱"
                    title="Responsive"
                    description="Fully responsive components that work on all devices"
                  />
                  <FeatureCard
                    icon="🚀"
                    title="Easy to Use"
                    description="Simple integration with copy-paste functionality"
                  />
                </div>
              </div>
            </>
          ) : activeTab === 'components' ? (
            <ComponentsPreviewPage isLoggedIn={isLoggedIn} />
          ) : activeTab === 'library' ? (
            <ComponentsByCategory />
          ) : activeTab === 'web' ? (
            viewingInternal === 'stylishx' ? (
              <div className="relative">
                <button
                  onClick={() => setViewingInternal(null)}
                  className="fixed top-20 left-4 z-40 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  ← Back to Gallery
                </button>
                <StylishX />
              </div>
            ) : viewingInternal === 'nexus' ? (
              <div className="relative">
                <button
                  onClick={() => setViewingInternal(null)}
                  className="fixed top-20 left-4 z-40 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  ← Back to Gallery
                </button>
                <Nexus />
              </div>
            ) : viewingInternal === 'lumina' ? (
              <div className="relative">
                <button
                  onClick={() => setViewingInternal(null)}
                  className="fixed top-20 left-4 z-40 px-4 py-2 rounded-lg hover:opacity-90 transition"
                  style={{ backgroundColor: '#d4af37', color: '#000' }}
                >
                  ← Back to Gallery
                </button>
                <Lumina />
              </div>
            ) : viewingInternal === 'raiboweb' ? (
              <div className="relative">
                <button
                  onClick={() => setViewingInternal(null)}
                  className="fixed top-20 left-4 z-40 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition"
                >
                  ← Back to Gallery
                </button>
                <RaiboWeb />
              </div>
            ) : viewingInternal === 'electrox' ? (
              <div className="relative">
                <button
                  onClick={() => setViewingInternal(null)}
                  className="fixed top-20 left-4 z-40 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  ← Back to Gallery
                </button>
                <ElectroX />
              </div>
            ) : viewingInternal === 'mywebsite' ? (
              <div className="relative">
                <button
                  onClick={() => setViewingInternal(null)}
                  className="fixed top-20 left-4 z-40 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  ← Back to Gallery
                </button>
                <MyWebsite />
              </div>
            ) : viewingInternal === 'dynamicweb' ? (
              <div className="relative">
                <button
                  onClick={() => setViewingInternal(null)}
                  className="fixed top-20 left-4 z-40 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                >
                  ← Back to Gallery
                </button>
                <DynamicWeb />
              </div>
            ) : viewingInternal === 'electrotech' ? (
              <div className="relative">
                <button
                  onClick={() => setViewingInternal(null)}
                  className="fixed top-20 left-4 z-40 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  ← Back to Gallery
                </button>
                <ElectroTech />
              </div>
            ) : (
              <WebsiteGallery onViewInternal={setViewingInternal} />
            )
          ) : activeTab === 'fullweb' ? (
            <>
              <FullWebPreview />
            </>
          ) : activeTab === 'template' ? (
            <Template />
          ) : activeTab === 'blog' ? (
            <BlogNew />
          ) : activeTab === 'customizeweb' ? (
            <CustomizeWeb />
          ) : activeTab === 'testimonials' ? (
            <Testimonials />
          ) : activeTab === 'our-story' ? (
            <OurStory />
          ) : activeTab === 'mission-vision' ? (
            <MissionAndVision />
          ) : activeTab === 'documentation' ? (
            <Documentation />
          ) : activeTab === 'changelog' ? (
            <Changelog />
          ) : activeTab === 'about' ? (
            <About />
          ) : activeTab === 'icons' ? (
            <Icons />
          ) : null}
        </Main>
        {footerPage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setFooterPage(null)} />
            <div className="relative bg-white dark:bg-slate-800 rounded-lg max-w-3xl w-full mx-4 p-6 overflow-auto z-10">
              <button
                className="absolute right-4 top-4 text-sm text-gray-600 hover:text-gray-900"
                onClick={() => setFooterPage(null)}
              >
                Close
              </button>
              <div className="mt-6">
                {(() => {
                  switch (footerPage) {
                    case 'OurStory': return <OurStory />;
                    case 'MissionVision': return <MissionAndVision />;
                    case 'Testimonials': return <Testimonials />;
                    case 'UIKit': return <UIKit />;
                    case 'Icons': return <Icons />;
                    case 'Illustrations': return <Illustrations />;
                    case 'Blog': return <Blog />;
                    case 'Documentation': return <Documentation />;
                    case 'Changelog': return <Changelog />;
                    case 'EmailUs': return <EmailUs />;
                    case 'SupportCenter': return <SupportCenter />;
                    case 'LiveChat': return <LiveChat />;
                    default: return null;
                  }
                })()}
              </div>
            </div>
          </div>
        )}

        <Footer $isDarkMode={isDarkMode}>
          <FooterTop $isDarkMode={isDarkMode}>
            <LogoSection>
              <LogoImage src={logo} alt="UI Inventory Logo" />
              <BrandInfo>
                <h2>UI Inventory</h2>
                <p>Beautiful React Components</p>
              </BrandInfo>
            </LogoSection>
            <SocialLinks>
              <SocialLink $isDarkMode={isDarkMode} href="#" title="Facebook">𝒇</SocialLink>
              <SocialLink $isDarkMode={isDarkMode} href="#" title="Instagram">📷</SocialLink>
              <SocialLink $isDarkMode={isDarkMode} href="#" title="GitHub">🐙</SocialLink>
              <SocialLink $isDarkMode={isDarkMode} href="#" title="Discord">💬</SocialLink>
            </SocialLinks>
          </FooterTop>

          <FooterContent>
            <FooterColumn $isDarkMode={isDarkMode}>
              <h3>About Us</h3>
              <ul>
                <li><a href="#" onClick={(e)=>{e.preventDefault(); handleSetActiveTab('our-story'); setFooterPage(null);}}>Our Story</a></li>
                <li><Link to="/mission-vision" className="text-inherit">Mission &amp; Vision</Link></li>
                <li><Link to="/testimonials" className="text-inherit">Testimonials</Link></li>
              </ul>
            </FooterColumn>
            <FooterColumn $isDarkMode={isDarkMode}>
              <h3>Component</h3>
              <ul>
                {/* <li><a href="#" onClick={(e)=>{e.preventDefault(); setFooterPage('UIKit')}}>UI Kit</a></li> */}
                <li><a href="#" onClick={(e)=>{e.preventDefault(); setFooterPage('Illustrations')}}>Illustrations</a></li>
                <li><a href="#" onClick={(e)=>{e.preventDefault(); setFooterPage('Icons')}}>Icons</a></li>
              </ul>
            </FooterColumn>
            <FooterColumn $isDarkMode={isDarkMode}>
              <h3>Resources</h3>
              <ul>
                <li><a href="#" onClick={(e)=>{e.preventDefault(); handleSetActiveTab('blog'); setFooterPage(null);}}>Blog</a></li>
                <li><Link to="/documentation" className="text-inherit">Documentation</Link></li>
                <li><Link to="/changelog" className="text-inherit">Changelog</Link></li>
              </ul>
            </FooterColumn>
            {/* <FooterColumn isDarkMode={isDarkMode}>
              <h3>Contact</h3>
              <ul>
                <li><a href="#" onClick={(e)=>{e.preventDefault(); setFooterPage('EmailUs')}}>Email Us</a></li>
                <li><a href="#" onClick={(e)=>{e.preventDefault(); setFooterPage('SupportCenter')}}>Support Center</a></li>
                <li><a href="#" onClick={(e)=>{e.preventDefault(); setFooterPage('LiveChat')}}>Live Chat</a></li>
              </ul>
            </FooterColumn> */}
          </FooterContent>
          <FooterBottom $isDarkMode={isDarkMode}>
            &copy; 2026 UI Inventory. All rights reserved.
          </FooterBottom>
        </Footer>
      </Container>
    </ThemeProvider>
  );
}

const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading components...</p>
    </div>
  </div>
);

const ErrorState = ({ error, onRetry }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="bg-red-50 p-6 rounded-lg border border-red-100 max-w-md">
      <h2 className="text-red-800 font-semibold mb-2">Error</h2>
      <p className="text-red-600">{error}</p>
      <button 
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center">
      <h2 className="text-lg font-semibold mb-2">No components found</h2>
      <p className="text-gray-600">It seems like we couldn't find any components to display.</p>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default App;
