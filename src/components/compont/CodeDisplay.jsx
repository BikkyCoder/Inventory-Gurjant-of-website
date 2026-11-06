import React, { useState } from 'react';

const CodeDisplay = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
      {/* Header with Copy Button */}
      <div className="flex justify-between items-center bg-gray-800 px-4 py-3 border-b border-gray-700">
        <span className="text-sm font-semibold text-gray-300">Component Code</span>
        <button
          onClick={handleCopyCode}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 ${
            copied
              ? 'bg-green-600 text-slate-900 shadow-lg shadow-green-600/50'
              : 'bg-blue-600 text-slate-900 hover:bg-blue-700 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50'
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
              Copy Code
            </>
          )}
        </button>
      </div>

      {/* Code Display */}
      <pre className="text-gray-100 font-mono text-sm p-4 overflow-x-auto bg-gray-950 max-h-96">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeDisplay;