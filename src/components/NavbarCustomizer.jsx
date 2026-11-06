import React, { useState } from 'react';
import { usePlaygroundStore } from '../store/usePlaygroundStore';

function NavbarCustomizer() {
  const {
    isDarkMode,
    navbarBgColor,
    navbarTextColor,
    navbarLogoText,
    navbarItems,
    setNavbarBgColor,
    setNavbarTextColor,
    setNavbarLogoText,
    addNavbarItem,
    removeNavbarItem,
    setTheme,
  } = usePlaygroundStore();

  const [newItemName, setNewItemName] = useState('');

  const handleAddItem = () => {
    if (newItemName.trim()) {
      addNavbarItem(newItemName);
      setNewItemName('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Customizer Panel */}
      <div className="lg:col-span-1 space-y-6">
        {/* Color Settings */}
        <div className="bg-black/30 backdrop-blur border border-purple-500/20 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-6">🎨 Navbar Colors</h3>

          {/* Background Color */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-300 block mb-2">Background Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={navbarBgColor}
                onChange={(e) => setNavbarBgColor(e.target.value)}
                className="flex-1 h-10 cursor-pointer rounded-lg border border-gray-600"
              />
              <input
                type="text"
                value={navbarBgColor}
                onChange={(e) => setNavbarBgColor(e.target.value)}
                className="flex-1 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm font-mono focus:outline-none"
              />
            </div>
          </div>

          {/* Text Color */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-300 block mb-2">Text Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={navbarTextColor}
                onChange={(e) => setNavbarTextColor(e.target.value)}
                className="flex-1 h-10 cursor-pointer rounded-lg border border-gray-600"
              />
              <input
                type="text"
                value={navbarTextColor}
                onChange={(e) => setNavbarTextColor(e.target.value)}
                className="flex-1 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm font-mono focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Logo Settings */}
        <div className="bg-black/30 backdrop-blur border border-purple-500/20 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">📝 Logo Text</h3>
          <input
            type="text"
            value={navbarLogoText}
            onChange={(e) => setNavbarLogoText(e.target.value)}
            placeholder="Enter logo text..."
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Menu Items Management */}
        <div className="bg-black/30 backdrop-blur border border-purple-500/20 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">📋 Menu Items</h3>

          <div className="space-y-2 mb-4">
            {navbarItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
                <span className="text-white text-sm">{item.name}</span>
                <button
                  onClick={() => removeNavbarItem(item.id)}
                  className="px-2 py-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded text-xs transition-all"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="New item name..."
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm"
            />
            <button
              onClick={handleAddItem}
              className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all font-medium text-sm"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="lg:col-span-2">
        <div className="bg-black/30 backdrop-blur border border-purple-500/20 rounded-lg overflow-hidden">
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{
              backgroundColor: isDarkMode ? navbarBgColor : '#ffffff',
              color: isDarkMode ? navbarTextColor : '#1f2937',
            }}
          >
            {/* Logo */}
            <div className="text-xl font-bold">{navbarLogoText}</div>

            {/* Menu Items */}
            <div className="flex gap-6">
              {navbarItems.map((item) => (
                <a
                  key={item.id}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="px-3 py-2 rounded transition font-medium hover:opacity-80"
                  style={{ color: isDarkMode ? navbarTextColor : '#1f2937' }}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded-lg transition font-medium"
                style={{
                  backgroundColor: 'transparent',
                  color: isDarkMode ? navbarTextColor : '#1f2937',
                  border: `1px solid ${isDarkMode ? navbarTextColor : '#1f2937'}`,
                }}
              >
                Login
              </button>
              <button
                className="px-4 py-2 rounded-lg transition font-medium"
                style={{
                  backgroundColor: isDarkMode ? navbarTextColor : '#1f2937',
                  color: isDarkMode ? navbarBgColor : '#ffffff',
                }}
              >
                Signup
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(!isDarkMode)}
                className="px-4 py-2 rounded-lg transition font-medium ml-4"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(200, 200, 200, 0.3)',
                  color: isDarkMode ? navbarTextColor : '#1f2937',
                  border: `1px solid ${isDarkMode ? navbarTextColor : '#9ca3af'}`,
                }}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="bg-black/50 px-6 py-4 border-t border-gray-700">
            <p className="text-xs text-gray-400">
              💡 <strong>Preview:</strong> Your navbar will appear like this with the selected colors and menu items. Use the theme toggle to preview in light or dark mode.
            </p>
          </div>
        </div>

        {/* Code Display */}
        <div className="mt-6 bg-black/30 backdrop-blur border border-purple-500/20 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">💻 Navbar Code</h3>
          <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-xs text-cyan-400 max-h-64">
            {`<nav style={{
  backgroundColor: '${navbarBgColor}',
  color: '${navbarTextColor}',
}}>
  <div className="flex items-center justify-between px-6 py-4">
    <div className="text-xl font-bold">${navbarLogoText}</div>
    <div className="flex gap-6">
${navbarItems.map((item) => `      <a href="#">${item.name}</a>`).join('\n')}
    </div>
  </div>
</nav>`}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default NavbarCustomizer;
