import { useEffect, useRef, useState } from "react";

export default function Preview({ code }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!code) return;

    const html = `
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="p-4">
          <div id="root"></div>
          <script type="module">
            import React from "https://esm.sh/react";
            import ReactDOM from "https://esm.sh/react-dom";

            try {
              const Comp = (${code});
              ReactDOM.render(React.createElement(Comp), document.getElementById("root"));
            } catch (e) {
              document.body.innerHTML = '<pre style="color:red">' + e.toString() + '</pre>';
            }
          </script>
        </body>
      </html>
    `;

    iframeRef.current.srcdoc = html;
  }, [code]);

  return (
    <div className="border rounded-lg overflow-hidden">
      <iframe ref={iframeRef} className="w-full h-64 bg-white" />

      <div className="p-3 bg-[#071022] border-t border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-400 text-xs font-semibold mb-2">Minimal imports</div>
            <pre className="bg-[#0b1220] text-[13px] text-[#e6eef8] p-2 rounded overflow-x-auto m-0">
              <code>import {'{ useState }'} from "react";</code>
            </pre>
          </div>
          <div>
            <button
              onClick={() => {
                const allText = `${code}\n\nimport { useState } from \"react\";\n\nRequires:\n- React\n- Tailwind CSS`;
                navigator.clipboard.writeText(allText);
              }}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Copy all
            </button>
          </div>
        </div>

        <div className="mt-3">
          <div className="text-gray-400 text-xs font-semibold mb-2">Requirements note</div>
          <pre className="bg-[#0b1220] text-[13px] text-[#e6eef8] p-2 rounded overflow-x-auto m-0">
            <code>Requires:
- React
- Tailwind CSS</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
