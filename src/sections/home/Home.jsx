import React from 'react';
import DynamicHero from '../../components/DynamicHero';
import Footer from '../../components/Footer';
import StylishComponentsPreview from './StylishComponentsPreview';

export default function HomeSection() {
  return (
    <div className="space-y-8">
      <DynamicHero />
      <StylishComponentsPreview />
      <Footer />
    </div>
  );
}