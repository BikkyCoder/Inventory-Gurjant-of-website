import React, { useState } from 'react';
import { usePlaygroundStore } from '../store/usePlaygroundStore';

function SectionsCustomizer() {
  const {
    sections,
    addSection,
    updateSection,
    deleteSection,
    updateSectionContent,
  } = usePlaygroundStore();

  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState(sections.length > 0 ? sections[0].id : null);

  const selectedSection = sections.find((s) => s.id === selectedSectionId);

  const handleAddSection = () => {
    if (newSectionTitle.trim()) {
      addSection(newSectionTitle);
      setNewSectionTitle('');
      // Select the newly added section
      setTimeout(() => {
        const lastSection = sections[sections.length - 1];
        if (lastSection) setSelectedSectionId(lastSection.id);
      }, 0);
    }
  };

  const layoutOptions = [
    { value: 'centered', label: '🎯 Centered', description: 'Content centered on page' },
    { value: 'twoColumn', label: '2️⃣ Two Column', description: 'Left and right layout' },
    { value: 'threeColumn', label: '3️⃣ Three Column', description: 'Three equal columns' },
    { value: 'fullWidth', label: '📏 Full Width', description: 'Full width layout' },
  ];

  const heightOptions = [
    { value: 'auto', label: '📏 Auto', description: 'Adjust to content' },
    { value: 'full', label: '🖥️ Full Screen', description: 'Full viewport height' },
    { value: 'half', label: '📊 Half', description: 'Half viewport height' },
  ];

  return (
    <div className="space-y-6">
      {/* Add New Section */}
      <div className="bg-black/30 backdrop-blur border border-purple-500/20 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">➕ Add New Section</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            placeholder="e.g., Features, Pricing, Team..."
            onKeyPress={(e) => e.key === 'Enter' && handleAddSection()}
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={handleAddSection}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all font-medium"
          >
            Add Section
          </button>
        </div>
      </div>

      {/* Sections List & Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sections List */}
        <div className="bg-black/30 backdrop-blur border border-purple-500/20 rounded-lg p-6 h-fit">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            📑 Sections ({sections.length})
          </h3>
          <div className="space-y-2">
            {sections.length === 0 ? (
              <p className="text-gray-400 text-sm">No sections yet. Create one!</p>
            ) : (
              sections.map((section) => (
                <div
                  key={section.id}
                  className={`p-3 rounded-lg border transition-all cursor-pointer group ${
                    selectedSectionId === section.id
                      ? 'bg-purple-600/30 border-purple-500'
                      : 'bg-gray-800/30 border-gray-700 hover:border-purple-500/50'
                  }`}
                  onClick={() => setSelectedSectionId(section.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{section.title}</p>
                      <p className="text-gray-400 text-xs mt-1">{section.layout}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSection(section.id);
                        if (selectedSectionId === section.id) {
                          setSelectedSectionId(sections.find(s => s.id !== section.id)?.id || null);
                        }
                      }}
                      className="px-2 py-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded text-xs transition-all opacity-0 group-hover:opacity-100"
                      title="Delete section"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Section Editor */}
        {selectedSection && (
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Settings */}
            <div className="bg-black/30 backdrop-blur border border-purple-500/20 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">⚙️ Section Settings</h3>

              {/* Section Title */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-300 block mb-2">Section Title</label>
                <input
                  type="text"
                  value={selectedSection.title}
                  onChange={(e) => updateSection(selectedSection.id, { title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Colors */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">Background Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={selectedSection.bgColor}
                      onChange={(e) => updateSection(selectedSection.id, { bgColor: e.target.value })}
                      className="flex-1 h-10 cursor-pointer rounded-lg border border-gray-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">Text Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={selectedSection.textColor}
                      onChange={(e) => updateSection(selectedSection.id, { textColor: e.target.value })}
                      className="flex-1 h-10 cursor-pointer rounded-lg border border-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Layout */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-300 block mb-2">Layout</label>
                <div className="grid grid-cols-2 gap-2">
                  {layoutOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateSection(selectedSection.id, { layout: opt.value })}
                      className={`p-3 rounded-lg border transition-all text-sm ${
                        selectedSection.layout === opt.value
                          ? 'bg-purple-600/30 border-purple-500'
                          : 'bg-gray-800/30 border-gray-700 hover:border-purple-500/50'
                      }`}
                    >
                      <div className="font-medium text-white">{opt.label}</div>
                      <div className="text-xs text-gray-400 mt-1">{opt.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Height */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-300 block mb-2">Height</label>
                <div className="grid grid-cols-3 gap-2">
                  {heightOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateSection(selectedSection.id, { height: opt.value })}
                      className={`p-2 rounded-lg border transition-all text-xs ${
                        selectedSection.height === opt.value
                          ? 'bg-purple-600/30 border-purple-500'
                          : 'bg-gray-800/30 border-gray-700 hover:border-purple-500/50'
                      }`}
                    >
                      <div className="font-medium text-white">{opt.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Editor */}
            <div className="bg-black/30 backdrop-blur border border-purple-500/20 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-6">✏️ Content</h3>

              {/* Use Custom Component Toggle */}
              <div className="mb-6 p-4 rounded-lg bg-purple-900/20 border border-purple-500/30">
                <label className="text-sm font-medium text-gray-300 block mb-3 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedSection.useCustomComponent}
                    onChange={(e) =>
                      updateSection(selectedSection.id, { useCustomComponent: e.target.checked })
                    }
                    className="w-4 h-4 cursor-pointer"
                  />
                  💻 Use Custom Component in this Section
                </label>
                <p className="text-xs text-purple-300">
                  Enable this to use your custom component code instead of default content
                </p>
              </div>

              {selectedSection.useCustomComponent ? (
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">Custom Component Code</label>
                  <textarea
                    value={selectedSection.customComponentCode}
                    onChange={(e) =>
                      updateSection(selectedSection.id, { customComponentCode: e.target.value })
                    }
                    placeholder="Paste your React component code here..."
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 h-32 font-mono text-sm"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Paste the component code from the Component tab here. It will override the default content.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Heading */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 block mb-2">Heading</label>
                    <input
                      type="text"
                      value={selectedSection.content.heading}
                      onChange={(e) =>
                        updateSectionContent(selectedSection.id, { heading: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Subheading */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 block mb-2">Subheading</label>
                    <textarea
                      value={selectedSection.content.subheading}
                      onChange={(e) =>
                        updateSectionContent(selectedSection.id, { subheading: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 h-20"
                    />
                  </div>

                  {/* Button Text */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 block mb-2">Button Text</label>
                    <input
                      type="text"
                      value={selectedSection.content.buttonText}
                      onChange={(e) =>
                        updateSectionContent(selectedSection.id, { buttonText: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Button Color */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 block mb-2">Button Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={selectedSection.content.buttonColor}
                        onChange={(e) =>
                          updateSectionContent(selectedSection.id, { buttonColor: e.target.value })
                        }
                        className="flex-1 h-10 cursor-pointer rounded-lg border border-gray-600"
                      />
                      <input
                        type="text"
                        value={selectedSection.content.buttonColor}
                        onChange={(e) =>
                          updateSectionContent(selectedSection.id, { buttonColor: e.target.value })
                        }
                        className="flex-1 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Preview */}
      {selectedSection && (
        <div className="bg-black/30 backdrop-blur border border-purple-500/20 rounded-lg overflow-hidden">
          <div
            className={`px-8 py-12 ${
              selectedSection.height === 'full'
                ? 'min-h-screen'
                : selectedSection.height === 'half'
                ? 'min-h-96'
                : 'min-h-48'
            }`}
            style={{
              backgroundColor: selectedSection.bgColor,
              color: selectedSection.textColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div className="text-center max-w-2xl">
              <h2 className="text-4xl font-bold mb-4">{selectedSection.content.heading}</h2>
              <p className="text-lg mb-8 opacity-90">{selectedSection.content.subheading}</p>
              <button
                className="px-8 py-3 rounded-lg transition-all font-medium hover:opacity-90"
                style={{
                  backgroundColor: selectedSection.content.buttonColor,
                  color: selectedSection.bgColor,
                }}
              >
                {selectedSection.content.buttonText}
              </button>
            </div>
          </div>

          {/* Code */}
          <div className="bg-black/50 px-6 py-4 border-t border-gray-700">
            <p className="text-xs text-gray-400 mb-3">
              💡 <strong>Preview:</strong> Your section will look like this
            </p>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-xs text-cyan-400 max-h-40">
              {`<section style={{
  backgroundColor: '${selectedSection.bgColor}',
  color: '${selectedSection.textColor}',
  minHeight: '${selectedSection.height === 'full' ? '100vh' : selectedSection.height === 'half' ? '50vh' : 'auto'}',
}} className="flex items-center justify-center px-8 py-12">
  <div className="text-center max-w-2xl">
    <h2 className="text-4xl font-bold mb-4">
      ${selectedSection.content.heading}
    </h2>
    <p className="text-lg mb-8">
      ${selectedSection.content.subheading}
    </p>
    <button style={{ backgroundColor: '${selectedSection.content.buttonColor}' }}>
      ${selectedSection.content.buttonText}
    </button>
  </div>
</section>`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default SectionsCustomizer;
