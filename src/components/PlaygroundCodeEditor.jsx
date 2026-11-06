import React, { useState } from 'react';
import { usePlaygroundStore } from '../store/usePlaygroundStore';

function PlaygroundCodeEditor() {
  const { componentCode, setComponentCode } = usePlaygroundStore();
  const [copied, setCopied] = useState(false);
  const saveProject = usePlaygroundStore(state => state.saveProject);
  const projects = usePlaygroundStore(state => state.projects);

  const handleSave = () => {
    const name = `Saved ${new Date().toLocaleString()}`;
    saveProject(name);
    alert('Saved to playground projects: ' + name);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(componentCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-black/30 backdrop-blur border border-purple-500/20 rounded-lg overflow-hidden">
      <div className="bg-black/50 px-6 py-4 border-b border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="text-xl">💻</span> Code Editor
        </h3>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyCode}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {copied ? '✓ Copied!' : '📋 Copy Code'}
          </button>
          <button onClick={handleSave} className="px-3 py-1.5 text-xs font-medium rounded bg-emerald-600 hover:bg-emerald-700 text-white">Save</button>
          <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
            JSX
          </span>
        </div>
      </div>
      
      <div className="relative">
        <textarea
          value={componentCode}
          onChange={(e) => setComponentCode(e.target.value)}
          className="w-full h-64 px-6 py-4 bg-gray-900 text-gray-100 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          placeholder="Write your React JSX component here..."
          spellCheck="false"
        />
        
        {/* Line numbers indicator */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-black/50 border-r border-gray-700 flex items-start pt-4 pointer-events-none">
          {componentCode.split('\n').map((_, i) => (
            <div
              key={i}
              className="text-right pr-3 text-gray-600 text-xs leading-6"
              style={{ minWidth: '100%' }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-black/20 px-6 py-3 border-t border-gray-700">
        <p className="text-xs text-gray-400">
          💡 <strong>Tip:</strong> Use Tailwind CSS classes, styled-components, or inline styles. 
          Your component will auto-render in the preview below.
        </p>
      </div>
    </div>
  );
}

export default PlaygroundCodeEditor;
