import React, { useState, useEffect } from "react";
import { Sandpack } from "@codesandbox/sandpack-react";

export default function ImportsSection({ importedComponents = [] }) {
  const [selectedImportedId, setSelectedImportedId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    if (!selectedImportedId && importedComponents.length) {
      setSelectedImportedId(importedComponents[0]._id || importedComponents[0].id || importedComponents[0].name);
    }
  }, [importedComponents, selectedImportedId]);

  // Built-in components (minimal preview code strings)
  const builtInComponents = {
    "builtin:HeroCard": {
      name: "HeroCard (builtin)",
      code: `import React from 'react';\nexport default function HeroCard(){ return <div style={{padding:20}}>HeroCard preview</div>; }`
    },
    "builtin:Lens": {
      name: "Lens (builtin)",
      code: `import React from 'react';\nexport default function Lens(){ return <div style={{padding:20}}>Lens preview</div>; }`
    }
  };

  const categories = ["Buttons", "Cards", "Forms", "Text Effects"];

  const selectorOptions = [
    ...importedComponents.map((c) => ({ 
      id: c._id || c.id || c.name, 
      label: c.name || c.packageName || c._id || c.id, 
      item: c 
    })),
    { id: "builtin:HeroCard", label: builtInComponents["builtin:HeroCard"].name, item: "builtin:HeroCard" },
    { id: "builtin:Lens", label: builtInComponents["builtin:Lens"].name, item: "builtin:Lens" }
  ];

  const getOptionsForCategory = (cat) => {
    const keyword = cat.toLowerCase();
    return selectorOptions.filter((opt) => {
      const label = (opt.label || "").toLowerCase();
      if (keyword === "buttons") return label.includes("button") || label.includes("glass");
      if (keyword === "cards") return label.includes("card") || label.includes("hero");
      if (keyword === "forms") return label.includes("form");
      if (keyword === "text effects") return label.includes("text") || label.includes("hover");
      return false;
    });
  };

  const chooseSidebarOption = (opt) => {
    setSelectedImportedId(opt.id);
    setShowSidebar(false);
  };

  // Helper: clean code by removing imports and exports
  const cleanCodeForSandpack = (code) => {
    // BULLETPROOF import/export removal - multiple methods combined
    let cleaned = code;
    
    // METHOD 1: Filter out lines that start with import or export
    cleaned = cleaned
      .split('\n')
      .filter(line => {
        const trimmed = line.trim();
        return !trimmed.startsWith('import') && !trimmed.startsWith('export');
      })
      .join('\n');
    
    // METHOD 2: Aggressive regex removal (catches edge cases)
    cleaned = cleaned.replace(/^[\s]*import\s+[\s\S]*?from\s+['"`].*?['"`]\s*;?\s*$/gm, '');
    cleaned = cleaned.replace(/^[\s]*import\s+['"`].*?['"`]\s*;?\s*$/gm, '');
    cleaned = cleaned.replace(/^[\s]*import\s*\{[\s\S]*?\}\s*from\s+['"`].*?['"`]\s*;?\s*$/gm, '');
    
    // METHOD 3: Remove any export statements mid-line
    cleaned = cleaned.replace(/\bexport\s+default\s+/g, '');
    cleaned = cleaned.replace(/\bexport\s+(?:const|function|class|async|let|var)\s+/g, '');
    
    // METHOD 4: Remove dynamic imports
    cleaned = cleaned.replace(/import\s*\([\s\S]*?\)/g, '');
    
    // Clean up empty lines
    cleaned = cleaned.replace(/\n\s*\n\s*\n+/gm, '\n\n');
    return cleaned.trim();
  };

  const createSandpackForImported = (compOrId) => {
    // builtin id
    if (typeof compOrId === "string" && compOrId.startsWith("builtin:")) {
      const builtin = builtInComponents[compOrId];
      const files = {
        "/HeroCard.jsx": cleanCodeForSandpack(builtin.code),
        "/App.js": `import React from "react";
import HeroCard from "./HeroCard";

export default function App() {
  return (
    <div style={{ padding: 40 }}>
      <HeroCard />
    </div>
  );
}`
      };
      return {
        template: "react",
        files,
        dependencies: { react: "18.2.0", "react-dom": "18.2.0" },
        options: { showLineNumbers: true, showInlineErrors: true }
      };
    }

    // object component
    const comp = compOrId;
    const template = "react";
    const files = {};
    const deps = { react: "18.2.0", "react-dom": "18.2.0" };
    const entryPath = "/App.js";

    if (comp && comp.code) {
      files["/ImportedComponent.jsx"] = cleanCodeForSandpack(comp.code);
      files[entryPath] = `import React from "react";
import Imported from "./ImportedComponent";
export default function App(){ return <div style={{padding:40}}><Imported /></div>; }`;
    } else if (comp && comp.packageName) {
      deps[comp.packageName] = comp.packageVersion || "latest";
      const importStatement = comp.exportName ? `import { ${comp.exportName} as Imported } from "${comp.packageName}";` : `import Imported from "${comp.packageName}";`;
      files[entryPath] = `import React from "react";
${importStatement}
export default function App(){ return <div style={{padding:40}}><Imported /></div>; }`;
    }

    return { template, files, dependencies: deps, options: { showLineNumbers: true, showInlineErrors: true } };
  };

  const selectedImported = (() => {
    if (!selectedImportedId) return null;
    if (selectedImportedId.startsWith && selectedImportedId.startsWith("builtin:")) return { builtinId: selectedImportedId };
    return importedComponents.find((c) => (c._id || c.id || c.name) === selectedImportedId);
  })();

  return (
    <div>
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setShowSidebar((s) => !s)}
          className="px-3 py-1 rounded bg-slate-800 text-white"
        >
          Components
        </button>
      </div>
      
      {showSidebar && (
        <div className="fixed left-0 top-16 w-64 h-[80vh] bg-white dark:bg-slate-900 border-r shadow-lg z-50 p-4">
          <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-100">Categories</h4>
          <ul className="space-y-2 mb-4">
            {categories.map((c) => (
              <li key={c}>
                <button
                  onClick={() => setActiveCategory(c)}
                  className={`w-full text-left px-2 py-1 rounded ${
                    activeCategory === c ? "bg-slate-200 dark:bg-slate-700" : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>

          <div>
            <h5 className="text-sm font-medium mb-2 text-slate-700 dark:text-slate-200">Options</h5>
            <div className="space-y-2 overflow-auto max-h-[60vh]">
              {activeCategory ? (
                getOptionsForCategory(activeCategory).map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => chooseSidebarOption(opt)}
                    className="block w-full text-left px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {opt.label}
                  </button>
                ))
              ) : (
                <div className="text-sm text-slate-500">Choose a category</div>
              )}
            </div>
          </div>

          <div className="mt-4">
            <button onClick={() => setShowSidebar(false)} className="px-2 py-1 text-sm text-slate-600">
              Close
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Imported Components Preview
        </h2>

        <div className="flex items-center gap-4 mb-4">
          <label className="text-sm text-gray-600 dark:text-gray-300">Select component:</label>
          <select
            value={selectedImportedId || ""}
            onChange={(e) => setSelectedImportedId(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {selectorOptions.length === 0 && <option value="">No imported components</option>}
            {selectorOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-lg overflow-hidden border">
          {selectedImported ? (
            selectedImported.builtinId ? (
              <Sandpack {...createSandpackForImported(selectedImported.builtinId)} />
            ) : (
              <Sandpack {...createSandpackForImported(selectedImported)} />
            )
          ) : (
            <div className="p-4 text-gray-600 dark:text-gray-300">
              Select an imported component to preview.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}