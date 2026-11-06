import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ButtonsPage from './pages/ButtonsPage';
import CardsPage from './pages/CardsPage';
import FormsPage from './pages/FormsPage';
import TextEffectsPage from './pages/TextEffectsPage';
import CyberGlowInfoCardPreview from './pages/imports/CyberGlowInfoCardPreview';
import ComponentsPage from './pages/ComponentsPage';
import About from './components/About';
import StylishX from './components/StylishX';
import Nexus from './components/Nexus';
import Lumina from './components/Lumina';
import RaiboWeb from './components/RaiboWeb';
import ElectroX from './components/ElectroX';
import MyWebsite from './components/MyWebsite';
import DynamicWeb from './components/DynamicWeb';
import ElectroTech from './components/ElectroTech';
import WebsiteFullPreview from './components/WebsiteFullPreview';
import BlogNew from './components/BlogNew';
import OurStory from './components/footerbutton/OurStory';
import MissionAndVision from './components/footerbutton/Mission&Vision';
import Testimonials from './components/footerbutton/Testimonials';
import UIKit from './components/footerbutton/UIKit';
import Icons from './components/footerbutton/Icons';
import Illustrations from './components/footerbutton/Illustrations';
import Documentation from './components/footerbutton/Documentation';
import Changelog from './components/footerbutton/Changelog';
import EmailUs from './components/footerbutton/EmailUs';
import SupportCenter from './components/footerbutton/SupportCenter';
import LiveChat from './components/footerbutton/LiveChat';
import AdminRoutes from './admin/AdminRoutes';

function AppRoutes({ components }) {
  return (
    <Routes>
      <Route path="/" element={<ButtonsPage components={components} />} />
      <Route path="/about" element={<About />} />
      <Route path="/components" element={<ComponentsPage components={components} />} />
      <Route
        path="/components/buttons"
        element={<ButtonsPage components={components} />}
      />
      <Route
        path="/components/cards"
        element={<CardsPage components={components} />}
      />
      <Route
        path="/components/forms"
        element={<FormsPage components={components} />}
      />
      <Route
        path="/components/text-effects"
        element={<TextEffectsPage components={components} />}
      />
      <Route
        path="/imports/cyber-glow-card"
        element={<CyberGlowInfoCardPreview />}
      />
      <Route path="/websites/stylishx" element={<StylishX />} />
      <Route path="/websites/nexus" element={<Nexus />} />
      <Route path="/websites/lumina" element={<Lumina />} />
      <Route path="/websites/raiboweb" element={<RaiboWeb />} />
      <Route path="/websites/electrox" element={<ElectroX />} />
      <Route path="/websites/mywebsite" element={<MyWebsite />} />
      <Route path="/websites/dynamicweb" element={<DynamicWeb />} />
      <Route path="/websites/electrotech" element={<ElectroTech />} />
      
      {/* Full Page Preview Routes */}
      <Route path="/preview/website/:websiteName" element={<WebsiteFullPreview />} />
      
      {/* Footer Pages Routes */}
      <Route path="/blog" element={<BlogNew />} />
      <Route path="/our-story" element={<OurStory />} />
      <Route path="/mission-vision" element={<MissionAndVision />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/ui-kit" element={<UIKit />} />
      <Route path="/icons" element={<Icons />} />
      <Route path="/illustrations" element={<Illustrations />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/changelog" element={<Changelog />} />
      <Route path="/email-us" element={<EmailUs />} />
      <Route path="/support-center" element={<SupportCenter />} />
      <Route path="/live-chat" element={<LiveChat />} />
      {/* Admin panel (mounted under /admin) */}
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}

export default AppRoutes;