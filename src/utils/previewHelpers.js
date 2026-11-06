// Utilities for preview iframe generation and example sites
export const generateHTML = (code) => {
  // BULLETPROOF import/export removal - multiple methods combined
  let cleanedCode = code;
  
  // METHOD 1: Filter out lines that start with import or export
  cleanedCode = cleanedCode
    .split('\n')
    .filter(line => {
      const trimmed = line.trim();
      // Remove any line starting with import or export
      return !trimmed.startsWith('import') && !trimmed.startsWith('export');
    })
    .join('\n');
  
  // METHOD 2: Aggressive regex removal (catches edge cases)
  cleanedCode = cleanedCode.replace(/^[\s]*import\s+[\s\S]*?from\s+['"`].*?['"`]\s*;?\s*$/gm, '');
  cleanedCode = cleanedCode.replace(/^[\s]*import\s+['"`].*?['"`]\s*;?\s*$/gm, '');
  cleanedCode = cleanedCode.replace(/^[\s]*import\s*\{[\s\S]*?\}\s*from\s+['"`].*?['"`]\s*;?\s*$/gm, '');
  
  // METHOD 3: Remove any export statements mid-line
  cleanedCode = cleanedCode.replace(/\bexport\s+default\s+/g, '');
  cleanedCode = cleanedCode.replace(/\bexport\s+(?:const|function|class|async|let|var)\s+/g, '');
  
  // METHOD 4: Remove dynamic imports
  cleanedCode = cleanedCode.replace(/import\s*\([\s\S]*?\)/g, '');
  
  // Clean up empty lines
  cleanedCode = cleanedCode.replace(/\n\s*\n\s*\n+/gm, '\n\n').trim();
  
  const escapedCode = cleanedCode.replace(/\\/g, '\\\\').replace(/`/g, '\`').replace(/\$/g, '\$');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; overflow-x: hidden; }
    html, body, #root { height: 100%; width: 100%; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script>
    const { useState, useEffect } = React;
    const userCode = \`${escapedCode}\`;
    try {
      const transpiledCode = Babel.transform(userCode, {
        presets: ['react']
      }).code;
      eval(transpiledCode);
      const root = ReactDOM.createRoot(document.getElementById('root'));

      const functionNameRegex = /function\\s+(\\w+)/g;
      const componentNames = [];
      let match;
      while ((match = functionNameRegex.exec(userCode)) !== null) {
        if (match[1]) componentNames.push(match[1]);
      }
      const uniqueNames = [...new Set(componentNames)];
      let rendered = false;
      for (const name of uniqueNames) {
        try {
          if (typeof window[name] === 'function') {
            root.render(React.createElement(window[name]));
            rendered = true;
            break;
          }
        } catch (e) {}
      }
      if (!rendered) {
        document.getElementById('root').innerHTML = '<div style="padding: 20px; background: #f5f5f5; color: #333; border-radius: 8px; text-align: center;"><h3>⚠️ No component found</h3><p>Found functions: ' + uniqueNames.join(', ') + '</p><p>Transpiled code length: ' + transpiledCode.length + '</p></div>';
      }
    } catch(err) {
      document.getElementById('root').innerHTML = '<div style="padding: 20px; background: #fee; color: #c33; border: 1px solid #c33; border-radius: 8px;"><h3>❌ Error:</h3><pre style="text-align: left; font-size: 12px; overflow: auto; max-height: 300px;">' + (err.stack || err.message) + '</pre></div>';
    }
  <\/script>
</body>
</html>`;
};

export const WEB_EXAMPLES = [
  {
    id: 'portfolio',
    name: '🎨 Portfolio',
    description: 'Beautiful portfolio website',
    code: `function App() {
  const projects = [
    { title: 'AI Chat App', desc: 'Smart conversational AI' },
    { title: 'E-Commerce Platform', desc: 'Full-featured store' },
    { title: 'Analytics Dashboard', desc: 'Real-time data visualization' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <header className="container mx-auto px-4 pt-36 pb-8 text-center flex flex-col items-center justify-start min-h-[48vh]">
        <h1 className="text-6xl font-bold mb-6">Hi, I'm a Developer</h1>
        <p className="text-xl text-gray-400 max-w-3xl">Crafting beautiful digital experiences</p>
      </header>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center">Featured Work</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div key={i} className="bg-slate-700 p-6 rounded-lg hover:bg-slate-600 transition">
              <h3 className="text-xl font-bold">{p.title}</h3>
              <p className="text-gray-300 mt-2">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-700 mt-20 py-8 text-center text-gray-400">
        <p>© 2024 My Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );}`
  },
  {
    id: 'ecommerce',
    name: '🛒 E-Commerce',
    description: 'Product store with cart',
    code: `function App() {
  const [cart, setCart] = React.useState([]);
  
  const products = [
    { id: 1, name: 'Wireless Headphones', price: 199 },
    { id: 2, name: 'Smart Watch', price: 299 },
    { id: 3, name: 'USB-C Cable', price: 29 },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow sticky top-0">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">TechStore</h1>
          <div className="flex items-center gap-2">
            <span>🛒 Cart:</span>
            <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center">{cart.length}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Our Products</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map(p => (
            <div key={p.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2">{p.name}</h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">\${p.price}</p>
              <button 
                onClick={() => addToCart(p)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );}`
  },
  // (other examples omitted for brevity)
];

export default null;
