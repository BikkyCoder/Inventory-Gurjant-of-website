import React, { useState } from 'react';
import { LiveProvider, LiveEditor, LivePreview, LiveError } from "react-live";

export default function EditableCodePreview({ initialCode }) {
  const [code, setCode] = useState(initialCode);
  const [showPreview, setShowPreview] = useState(true);
  const [copied, setCopied] = useState(false);

  const processCode = (codeStr) => {
    // BULLETPROOF import/export removal - multiple methods combined
    let src = codeStr;
    
    // METHOD 1: Filter out lines that start with import or export
    src = src
      .split('\n')
      .filter(line => {
        const trimmed = line.trim();
        return !trimmed.startsWith('import') && !trimmed.startsWith('export');
      })
      .join('\n');
    
    // METHOD 2: Aggressive regex removal (catches edge cases)
    src = src.replace(/^[\s]*import\s+[\s\S]*?from\s+['"`].*?['"`]\s*;?\s*$/gm, '');
    src = src.replace(/^[\s]*import\s+['"`].*?['"`]\s*;?\s*$/gm, '');
    src = src.replace(/^[\s]*import\s*\{[\s\S]*?\}\s*from\s+['"`].*?['"`]\s*;?\s*$/gm, '');
    
    // METHOD 3: Remove any export statements mid-line
    src = src.replace(/\bexport\s+default\s+/g, '');
    src = src.replace(/\bexport\s+(?:const|function|class|async|let|var)\s+/g, '');
    
    // METHOD 4: Remove dynamic imports
    src = src.replace(/import\s*\([\s\S]*?\)/g, '');
    
    // Clean up empty lines
    src = src.replace(/\n\s*\n\s*\n+/gm, '\n\n');

    // Try to detect component name:
    const nameMatchers = [
      src.match(/const\s+([A-Za-z_$][\w$]*)\s*=\s*\(/),              // const X = (
      src.match(/const\s+([A-Za-z_$][\w$]*)\s*=\s*async\s*\(/),      // const X = async (
      src.match(/const\s+([A-Za-z_$][\w$]*)\s*=\s*[\w$.]*=>/),       // const X = () => or const X = some=> 
      src.match(/function\s+([A-Za-z_$][\w$]*)\s*\(/),               // function X(
      src.match(/class\s+([A-Za-z_$][\w$]*)\s+/),                    // class X
      src.match(/const\s+([A-Za-z_$][\w$]*)\s*=/),                   // fallback const X =
    ];

    let componentName = null;
    for (const m of nameMatchers) {
      if (m && m[1]) {
        componentName = m[1];
        break;
      }
    }

    // If we found earlier exported identifier, prefer it
    if (!componentName && exportIdentMatch) componentName = exportIdentMatch[1];

    // If still not found but we defined __DefaultExport, use that
    if (!componentName && /const\s+__DefaultExport\b/.test(src)) componentName = '__DefaultExport';

    // Final fallback
    if (!componentName) componentName = 'PreviewComponent';

    // Build final wrapped code ensuring the component exists before render
    return `
${src}

// Ensure the component exists and render it
function __EditableWrapper() {
  try {
    const C = typeof ${componentName} !== 'undefined' ? ${componentName} : typeof __DefaultExport !== 'undefined' ? __DefaultExport : null;
    return C ? <C /> : null;
  } catch (e) {
    return null;
  }
}

render(<__EditableWrapper />);
    `;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleResetCode = () => {
    setCode(initialCode);
  };

  const scope = {
    React,
    useState: React.useState,
    useEffect: React.useEffect,
    render: (element) => element
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
      {/* Header with Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-gray-800 px-4 py-3 border-b border-gray-700 flex-wrap">
        <span className="text-sm font-semibold text-gray-300 w-full sm:w-auto">Editable Code</span>
        <div className="flex gap-2 flex-wrap w-full sm:w-auto">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 ${
              showPreview
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/50 hover:bg-purple-700'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview
          </button>
          <button
            onClick={handleCopyCode}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 ${
              copied
                ? 'bg-green-600 text-white shadow-lg shadow-green-600/50'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50'
            }`}
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
          <button
            onClick={handleResetCode}
            className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="border-t border-gray-700">
        <LiveProvider 
          code={processCode(code)}
          scope={scope}
          noInline={true}
        >
          {/* Editor */}
          <div className="bg-gray-950 overflow-hidden">
            <LiveEditor 
              onChange={(newCode) => setCode(newCode)}
              className="editable-code-editor"
              style={{ 
                backgroundColor: '#1a1a1a',
                fontSize: '13px',
                fontFamily: 'monospace',
                minHeight: '250px',
                maxHeight: '400px',
                overflow: 'auto'
              }}
            />
          </div>

          {/* Live Preview - Toggle Display */}
          {showPreview && (
            <div className="border-t border-gray-700 bg-slate-950 min-h-[200px] sm:min-h-[300px]">
              <div className="p-4 relative">
                <style>{`
                  @import url('https://cdn.tailwindcss.com');
                  
                  .backdrop-blur-xl {
                    backdrop-filter: blur(24px);
                  }
                  
                  .perspective {
                    perspective: 1000px;
                  }
                  
                  [class*='bg-[conic-gradient'] {
                    background-image: var(--tw-gradient-stops);
                    background-size: var(--tw-gradient-size, 100%);
                    background-position: var(--tw-gradient-position, center);
                  }
                `}</style>
                <div className="perspective">
                  <LivePreview />
                </div>
                <LiveError className="text-red-500 mt-2 p-4 rounded-lg bg-red-950/20 border border-red-700" />
              </div>
            </div>
          )}
        </LiveProvider>
      </div>
    </div>
  );
}
