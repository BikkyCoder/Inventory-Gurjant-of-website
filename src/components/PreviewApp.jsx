// import React from 'react';
// import { Sandpack } from '@codesandbox/sandpack-react';

// // Yeh aapka main App component hai jahan preview dikhega
// export default function PreviewApp() {
//   return (
//     <div style={{ padding: '20px' }}>
//       <h1 style={{ textAlign: 'center', color: '#333' }}>HeroCard Preview in Sandpack</h1>
//       <Sandpack
//         template="react"
//         theme="dark" // Stylish dark theme ke liye
//         files={{
//           '/HeroCard.jsx': `// Yeh aapka component code yahan paste karo (upar wala pura code)
// import React from 'react';

// const HeroCard = ({ title = "Welcome to My UI", description = "A stylish card with animations", buttonText = "Explore More", onClick }) => {
//   return (
//     <div
//       style={{
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         borderRadius: '20px',
//         padding: '30px',
//         maxWidth: '400px',
//         margin: '20px auto',
//         boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
//         transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//         cursor: 'pointer',
//         position: 'relative',
//         overflow: 'hidden'
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = 'translateY(-10px)';
//         e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = 'translateY(0)';
//         e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
//       }}
//     >
//       <div
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
//           animation: 'shimmer 2s infinite',
//           opacity: 0.8
//         }}
//       />
//       <style>{\`
//         @keyframes shimmer {
//           0% { transform: translateX(-100%); }
//           const files = {
//             '/HeroCard.jsx': `// Yeh aapka component code yahan paste karo (upar wala pura code)
//     import React from 'react';

//     const HeroCard = ({ title = "Welcome to My UI", description = "A stylish card with animations", buttonText = "Explore More", onClick }) => {
//       return (
//         <div
//           style={{
//             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             borderRadius: '20px',
//             padding: '30px',
//             maxWidth: '400px',
//             margin: '20px auto',
//             boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
//             transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//             cursor: 'pointer',
//             position: 'relative',
//             overflow: 'hidden'
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = 'translateY(-10px)';
//             e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = 'translateY(0)';
//             e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
//           }}
//         >
//           <div
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
//               animation: 'shimmer 2s infinite',
//               opacity: 0.8
//             }}
//           />
//           <style>{`\n        @keyframes shimmer {\n          0% { transform: translateX(-100%); }\n          100% { transform: translateX(100%); }\n        }\n      `}</style>
      
//           <h2 style={{
//             color: 'white',
//             margin: '0 0 15px 0',
//             fontSize: '24px',
//             textAlign: 'center',
//             position: 'relative',
//             zIndex: 1
//           }}>
//             {title}
//           </h2>
//           <p style={{
//             color: 'rgba(255,255,255,0.9)',
//             margin: '0 0 20px 0',
//             textAlign: 'center',
//             lineHeight: '1.5',
//             position: 'relative',
//             zIndex: 1
//           }}>
//             {description}
//           </p>
//           <button
//             onClick={onClick}
//             style={{
//               background: 'rgba(255,255,255,0.2)',
//               color: 'white',
//               border: '2px solid rgba(255,255,255,0.3)',
//               padding: '12px 24px',
//               borderRadius: '50px',
//               cursor: 'pointer',
//               fontSize: '16px',
//               transition: 'all 0.3s ease',
//               margin: '0 auto',
//               display: 'block',
//               position: 'relative',
//               zIndex: 1
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.background = 'rgba(255,255,255,0.3)';
//               e.target.style.transform = 'scale(1.05)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.background = 'rgba(255,255,255,0.2)';
//               e.target.style.transform = 'scale(1)';
//             }}
//           >
//             {buttonText}
//           </button>
//         </div>
//       );
//     };

//     export default HeroCard;`,
//             '/App.js': `import React from 'react';
//     import HeroCard from './HeroCard';

//     function App() {
//       const handleClick = () => {
//         alert('Button clicked! Explore more...');
//       };

//       return (
//         <div style={{ padding: '40px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
//           <HeroCard 
//             title="Unique Hero Card" 
//             description="Yeh ek stylish animated card hai jo aapki UI library ke liye perfect hai!"
//             buttonText="Get Started"
//             onClick={handleClick}
//           />
//         </div>
//       );
//     }

//     export default App;`,
//             '/index.js': `import React from "react";
//     import { createRoot } from "react-dom/client";
//     import App from "./App";

//     const rootElement = document.getElementById("root");
//     const root = createRoot(rootElement);

//     root.render(<App />);`,
//             '/styles.css': `body {
//       margin: 0;
//       font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
//       -webkit-font-smoothing: antialiased;
//       -moz-osx-font-smoothing: grayscale;
//     }`
//           };

//           <Sandpack
//             template="react"
//             theme="dark" // Stylish dark theme ke liye
//             files={files}
//             options={{
//               showNavigator: true,
//               showTabs: true,
//               editorHeight: 300 // Code editor ki height adjust karo
//             }}
//           />
      
//           <div style={{ marginTop: 16 }}>
//             <div style={{ color: '#9ca3af', fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
//               Minimal imports
//             </div>
//             <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
//               <pre style={{ background: '#0b1220', color: '#e6eef8', padding: '10px', borderRadius: 8, margin: 0, overflowX: 'auto' }}>
//                 <code>import {'{ useState }'} from "react";</code>
//               </pre>
//               <button
//                 onClick={() => {
//                   const allText = `${files['/HeroCard.jsx']}\n\n${files['/App.js']}\n\nimport { useState } from \"react\";\n\nRequires:\n- React\n- Tailwind CSS`;
//                   navigator.clipboard.writeText(allText);
//                 }}
//                 style={{ padding: '6px 10px', background: '#6d28d9', color: 'white', borderRadius: 6 }}
//               >Copy all</button>
//             </div>
//           </div>