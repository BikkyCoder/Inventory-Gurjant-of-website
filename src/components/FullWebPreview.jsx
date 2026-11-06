import React, { useState } from 'react';
import { generateHTML, WEB_EXAMPLES } from '../utils/previewHelpers';

export default function FullWebPreview() {
  const [selectedExample, setSelectedExample] = useState('dynamic-react');
  const [iframeKey, setIframeKey] = useState(0);
  const [activeTab, setActiveTab] = useState('preview');
  const [device, setDevice] = useState('desktop'); // desktop | tablet | mobile

  const example = WEB_EXAMPLES.find(e => e.id === selectedExample);

  const iframeStyles = () => {
    // Return width/height based on device selection
    if (device === 'mobile') return { width: '375px', height: '812px' };
    if (device === 'tablet') return { width: '768px', height: '1024px' };
    return { width: '100%', height: '100%' };
  };

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 sm:mb-4">Full Web Preview System</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">Select a website to preview its code and see how it renders in different device sizes.</p>

        {/* Button Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6 sm:mb-8">
          {WEB_EXAMPLES.map((ex) => (
            <button
              key={ex.id}
              onClick={() => {
                setSelectedExample(ex.id);
                setIframeKey(prev => prev + 1);
              }}
              className={`p-3 rounded-lg transition-all text-sm font-medium w-full text-left shadow-sm flex items-center gap-2 ${
                selectedExample === ex.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border border-transparent'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:shadow-md'
              }`}
            >
              <span className="truncate">{ex.name}</span>
            </button>
          ))}
        </div>
      </div>

      {example && (
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-2 rounded-md font-medium transition text-sm ${
                  activeTab === 'code' ? 'bg-indigo-600 text-white shadow' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 rounded-md font-medium transition text-sm ${
                  activeTab === 'preview' ? 'bg-indigo-600 text-white shadow' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                Preview
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-xs text-gray-500 dark:text-gray-400 mr-2">Device:</div>
              <button onClick={() => setDevice('desktop')} className={`px-3 py-1 rounded-md text-sm ${device === 'desktop' ? 'bg-gray-900 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>Desktop</button>
              <button onClick={() => setDevice('tablet')} className={`px-3 py-1 rounded-md text-sm ${device === 'tablet' ? 'bg-gray-900 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>Tablet</button>
              <button onClick={() => setDevice('mobile')} className={`px-3 py-1 rounded-md text-sm ${device === 'mobile' ? 'bg-gray-900 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>Mobile</button>
            </div>
          </div>

          {/* Code Display */}
          {activeTab === 'code' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 flex items-center justify-between">
                <span className="font-mono text-sm truncate">{example.name}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(example.code);
                    setTimeout(() => alert('Code copied to clipboard!'), 50);
                  }}
                  className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md"
                >
                  Copy
                </button>
              </div>
              <pre className="p-4 overflow-auto max-h-[60vh] bg-black text-white text-xs leading-relaxed">
                <code>{example.code}</code>
              </pre>
            </div>
          )}

          {/* Live Preview with Iframe */}
          {activeTab === 'preview' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 font-medium text-sm">Live Preview — <span className="text-gray-500 dark:text-gray-400">{example.name}</span></div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t">
                <div className="mx-auto flex justify-center items-start">
                  <div className="w-full md:w-[90%] lg:w-[100%] flex justify-center">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm" style={{ width: device === 'desktop' ? '100%' : undefined }}>
                      <div className="w-full" style={{ height: device === 'mobile' ? '812px' : device === 'tablet' ? '1024px' : '72vh', maxWidth: device === 'mobile' ? 375 : device === 'tablet' ? 768 : '100vw' }}>
                        <iframe
                          key={iframeKey}
                          srcDoc={generateHTML(example.code)}
                          style={{
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            backgroundColor: 'transparent'
                          }}
                          sandbox="allow-scripts allow-modals"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
