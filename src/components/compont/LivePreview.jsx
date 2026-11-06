import React, { useState, useEffect } from 'react';
import { LiveProvider, LiveEditor, LivePreview, LiveError } from "react-live";
import { motion, AnimatePresence } from "framer-motion";

export default function ComponentLivePreview({ code }) {
  const processCode = (code) => {
    // BULLETPROOF import/export removal - multiple methods combined
    let src = code;
    
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
function __LiveWrapper() {
  try {
    const C = typeof ${componentName} !== 'undefined' ? ${componentName} : typeof __DefaultExport !== 'undefined' ? __DefaultExport : null;
    return C ? <C /> : null;
  } catch (e) {
    return null;
  }
}

render(<__LiveWrapper />);
    `;
  };

  const scope = {
    React,
    useState: React.useState,
    useEffect: React.useEffect,
    motion,
    AnimatePresence,
    render: (element) => element
  };

  return (
    <LiveProvider 
      code={processCode(code)} 
      scope={scope} 
      noInline={true}
    >
      <div className="space-y-4">
        <div className="relative p-4 bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 rounded-lg min-h-[600px]">
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
          <LiveError className="text-red-500 mt-2 p-4 rounded-lg" />
        </div>
        <LiveEditor 
          className="rounded-lg overflow-hidden"
          style={{ 
            backgroundColor: '#1a1a1a',
            fontSize: '14px',
            fontFamily: 'monospace'
          }}
        />
      </div>
    </LiveProvider>
  );
}