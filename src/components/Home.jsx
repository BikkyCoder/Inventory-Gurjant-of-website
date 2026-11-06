import React from 'react';
import DynamicHero from './home/DynamicHero';
import InteractiveWindowSection from './home/LightSection';
import Grid9Section from './home/showpreview';
import TreeSection from './home/TreeSection';
import NebulaPortalSection from './home/NebulaPortalSection';
import InteractiveWindowSection2 from './home/InteractiveWindowSection';

export default function Home({ setActiveTab }) {
  return (
    <div className="min-h-screen flex flex-col">
      <DynamicHero setActiveTab={setActiveTab} />
      {/* <InteractiveWindowSection /> */}
      <Grid9Section />
      <TreeSection />
      {/* <NebulaPortalSection /> */}
      <InteractiveWindowSection2 />

    </div>
  );
};