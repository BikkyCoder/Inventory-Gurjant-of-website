import React, { useState } from 'react';
import { usePlaygroundStore } from '../store/usePlaygroundStore';

function PlaygroundSidebar() {
  const [showColorPicker, setShowColorPicker] = useState(null);
  const {
    primaryColor,
    secondaryColor,
    bgColor,
    textColor,
    layoutMode,
    spacing,
    borderRadius,
    setPrimaryColor,
    setSecondaryColor,
    setBgColor,
    setTextColor,
    setLayoutMode,
    setSpacing,
    setBorderRadius,
  } = usePlaygroundStore();

  const spacingOptions = {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
  };

  const borderRadiusOptions = {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  };

  const ColorPickerButton = ({ label, color, onChange, type }) => (
    <div className="mb-4">
      <label className="text-sm font-medium text-gray-300 block mb-2">{label}</label>
      <div className="flex gap-2">
        <button
          onClick={() => setShowColorPicker(showColorPicker === type ? null : type)}
          className="flex-1 h-10 rounded-lg border-2 border-gray-600 hover:border-purple-500 transition-all"
          style={{ backgroundColor: color }}
          title={color}
        />
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm font-mono focus:outline-none focus:border-purple-500"
        />
      </div>
      {showColorPicker === type && (
        <div className="mt-2 bg-gray-800 p-3 rounded-lg">
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-12 cursor-pointer rounded-lg border border-gray-600"
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-black/30 backdrop-blur border border-purple-500/20 rounded-lg p-6 h-fit sticky top-24">
      <h2 className="text-xl font-bold text-white mb-6">🎨 Customize</h2>

      {/* Theme Colors */}
      <div className="mb-8 pb-8 border-b border-gray-700">
        <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">Theme Colors</h3>
        
        <ColorPickerButton
          label="Primary Color"
          color={primaryColor}
          onChange={setPrimaryColor}
          type="primary"
        />
        
        <ColorPickerButton
          label="Secondary Color"
          color={secondaryColor}
          onChange={setSecondaryColor}
          type="secondary"
        />
        
        <ColorPickerButton
          label="Background Color"
          color={bgColor}
          onChange={setBgColor}
          type="bg"
        />
        
        <ColorPickerButton
          label="Text Color"
          color={textColor}
          onChange={setTextColor}
          type="text"
        />
      </div>

      {/* Layout */}
      <div className="mb-8 pb-8 border-b border-gray-700">
        <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">Layout</h3>
        
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-300 block mb-2">Mode</label>
          <select
            value={layoutMode}
            onChange={(e) => setLayoutMode(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
          >
            <option value="grid">Grid</option>
            <option value="flex">Flex</option>
            <option value="sidebar">Sidebar</option>
          </select>
        </div>
      </div>

      {/* Spacing */}
      <div className="mb-8 pb-8 border-b border-gray-700">
        <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">Spacing</h3>
        
        <div className="space-y-2">
          {Object.entries(spacingOptions).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSpacing(key)}
              className={`w-full px-3 py-2 rounded-lg transition-all text-sm font-medium ${
                spacing === key
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {key.toUpperCase()} ({value})
            </button>
          ))}
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">Border Radius</h3>
        
        <div className="space-y-2">
          {Object.entries(borderRadiusOptions).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setBorderRadius(key)}
              className={`w-full px-3 py-2 rounded-lg transition-all text-sm font-medium ${
                borderRadius === key
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlaygroundSidebar;
