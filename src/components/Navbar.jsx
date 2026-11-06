// import React, { useState } from 'react';
// import logo from '../assets/logo.jpg';
// import { Link } from 'react-router-dom';
// import ProfileModal from './ProfileModal';

// function Navbar({ activeTab, setActiveTab, onLoginClick, onSignupClick, isLoggedIn, onLogout, userInfo, onUpdateProfile, isDarkMode, setIsDarkMode }) {
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleProfileClick = () => {
//     setIsProfileOpen(true);
//   };

//   return (
//     <nav className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} fixed w-full top-0 z-50 mb-0 transition-all duration-300 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
//       <div className={`max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
//         <div className={`flex items-center justify-between min-h-16 sm:h-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
//           {/* Logo/Brand */}
//           <div className="flex-shrink-0 flex items-center gap-2">
//             <Link 
//               to="/" 
//               onClick={() => setActiveTab('home')} 
//               className={`flex items-center gap-2 relative text-lg sm:text-2xl font-bold group ${isDarkMode ? '' : ''}`}
//             >
//               {/* <img src={logo} alt="Logo" className="w-9 h-9 rounded-full shadow-md border-2 border-purple-400 bg-white object-cover" style={{marginRight: '6px'}} /> */}
//               <span className={`relative z-10 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-400 bg-clip-text ${isDarkMode ? 'text-transparent' : 'text-transparent'}`}>
//                 UI Inventory
//               </span>
//               <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-500 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-lg"></span>
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className={`md:hidden p-2 rounded transition ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>

//           {/* Navigation Links - Desktop */}
//           <div className="hidden md:flex space-x-2 lg:space-x-4 flex-1 ml-4 lg:ml-8">
//             <button
//               onClick={() => setActiveTab('home')}
//               className={`px-4 py-2 rounded transition font-medium ${
//                 activeTab === 'home'
//                   ? 'bg-purple-600 text-white'
//                   : isDarkMode ? 'text-white hover:text-purple-400' : 'text-gray-900 hover:text-purple-600'
//               }`}
//             >
//               Home
//             </button>

//             {/* Components Button - Simple */}
//             <button
//               onClick={() => setActiveTab('components')}
//               className={`px-4 py-2 rounded transition font-medium ${
//                 activeTab === 'components'
//                   ? 'bg-purple-600 text-white'
//                   : isDarkMode ? 'text-white hover:text-purple-400' : 'text-gray-900 hover:text-purple-600'
//               }`}
//             >
//               Components
//             </button>

//             {/* Full Web Button */}
//             <button
//               onClick={() => setActiveTab('fullweb')}
//               className={`px-4 py-2 rounded transition font-medium ${
//                 activeTab === 'fullweb'
//                   ? 'bg-purple-600 text-white'
//                   : isDarkMode ? 'text-white hover:text-purple-400' : 'text-gray-900 hover:text-purple-600'
//               }`}
//             >
//               Full Web
//             </button>

//             {/* About Button */}
//             <button
//               onClick={() => setActiveTab('about')}
//               className={`px-4 py-2 rounded transition font-medium ${
//                 activeTab === 'about'
//                   ? 'bg-purple-600 text-white'
//                   : isDarkMode ? 'text-white hover:text-purple-400' : 'text-gray-900 hover:text-purple-600'
//               }`}
//             >
//               About
//             </button>

//             {/* Template Button */}
//             <button
//               onClick={() => setActiveTab('template')}
//               className={`px-4 py-2 rounded transition font-medium ${
//                 activeTab === 'template'
//                   ? 'bg-purple-600 text-white'
//                   : isDarkMode ? 'text-white hover:text-purple-400' : 'text-gray-900 hover:text-purple-600'
//               }`}
//             >
//               Template
//             </button>

//             {/* Blog Button */}
//             <Link
//               to="/blog"
//               onClick={() => setActiveTab('blog')}
//               className={`px-4 py-2 rounded transition font-medium ${
//                 activeTab === 'blog'
//                   ? 'bg-purple-600 text-white'
//                   : isDarkMode ? 'text-white hover:text-purple-400' : 'text-gray-900 hover:text-purple-600'
//               }`}
//             >
//               Blog
//             </Link>

//           </div>

//           {/* Auth Buttons - Desktop */}
//           <div className="hidden sm:flex items-center space-x-2 sm:space-x-4">
//             {/* Theme Toggle Button */}
//             <button
//               onClick={() => setIsDarkMode(!isDarkMode)}
//               className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}
//               title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
//             >
//               {isDarkMode ? (
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
//                 </svg>
//               ) : (
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.12-2.12a4 4 0 00-5.656 0l1.414-1.414a2 2 0 012.828 0l2.828 2.828a2 2 0 01-2.828 2.828l-1.414-1.414a4 4 0 000 5.656l2.12 2.12a1 1 0 001.414-1.414l-2.12-2.12a2 2 0 010-2.828l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414a2 2 0 010-2.828z" clipRule="evenodd" />
//                 </svg>
//               )}
//             </button>

//             {isLoggedIn ? (
//               <>
//                 <button
//                   onClick={handleProfileClick}
//                   className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:opacity-80 transition"
//                   title="View Profile"
//                 >
//                   {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : userInfo?.email.charAt(0).toUpperCase()}
//                 </button>
//                 <button
//                   onClick={onLogout}
//                   className="w-10 h-10 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition flex items-center justify-center"
//                   title="Logout"
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                   </svg>
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button
//                   onClick={onLoginClick}
//                   className={`px-2 sm:px-4 py-2 transition font-medium text-sm sm:text-base ${isDarkMode ? 'text-white hover:text-purple-400' : 'text-gray-900 hover:text-purple-600'}`}
//                 >
//                   Login
//                 </button>
//                 <button
//                   onClick={onSignupClick}
//                   className="px-2 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium text-sm sm:text-base"
//                 >
//                   Signup
//                 </button>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className={`md:hidden mt-2 pb-4 pt-2 space-y-2 animate-in fade-in ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
//             <button
//               onClick={() => {
//                 setActiveTab('home');
//                 setIsMobileMenuOpen(false);
//               }}
//               className={`block w-full text-left px-4 py-2 rounded transition font-medium ${
//                 activeTab === 'home'
//                   ? 'bg-purple-600 text-white'
//                   : isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'
//               }`}
//             >
//               Home
//             </button>
//             <button
//               onClick={() => {
//                 setActiveTab('components');
//                 setIsMobileMenuOpen(false);
//               }}
//               className={`block w-full text-left px-4 py-2 rounded transition font-medium ${
//                 activeTab === 'components'
//                   ? 'bg-purple-600 text-white'
//                   : isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'
//               }`}
//             >
//               Components
//             </button>
//             <button
//               onClick={() => {
//                 setActiveTab('fullweb');
//                 setIsMobileMenuOpen(false);
//               }}
//               className={`block w-full text-left px-4 py-2 rounded transition font-medium ${
//                 activeTab === 'fullweb'
//                   ? 'bg-purple-600 text-white'
//                   : isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'
//               }`}
//             >
//               Full Web
//             </button>
//             <button
//               onClick={() => {  
//                 setActiveTab('about');
//                 setIsMobileMenuOpen(false);
//               }}
//               className={`block w-full text-left px-4 py-2 rounded transition font-medium ${
//                 activeTab === 'about'
//                   ? 'bg-purple-600 text-white'
//                   : isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'
//               }`}
//             >
//               About
//             </button>
//             <button
//               onClick={() => {
//                 setActiveTab('template');
//                 setIsMobileMenuOpen(false); 
//               }}
//               className={`block w-full text-left px-4 py-2 rounded transition font-medium ${
//                 activeTab === 'template'
//                   ? 'bg-purple-600 text-white'
//                   : isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'
//               }`}
//             >
//               Template
//             </button>
            
//             {/* <Link
//               to="/blog"
//               onClick={() => {
//                 setActiveTab('blog');
//                 setIsMobileMenuOpen(false);
//               }}
//               className={`block w-full text-left px-4 py-2 rounded transition font-medium ${
//                 activeTab === 'blog'
//                   ? 'bg-purple-600 text-white'
//                   : isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'
//               }`}
//             >
//               Blog
//             </Link> */}
            
//             {/* Mobile Auth Options */}
//             {!isLoggedIn && (
//               <>
//                 <button
//                   onClick={onLoginClick}
//                   className={`block w-full text-left px-4 py-2 transition font-medium ${isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'}`}
//                 >
//                   Login
//                 </button>
//                 <button
//                   onClick={onSignupClick}
//                   className="block w-full text-left px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition font-medium"
//                 >
//                   Signup
//                 </button>
//               </>
//             )}
            
//             {/* Mobile Theme Toggle */}
//             <button
//               onClick={() => setIsDarkMode(!isDarkMode)}
//               className={`block w-full text-left px-4 py-2 rounded transition font-medium flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}
//             >
//               {isDarkMode ? (
//                 <>
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
//                   </svg>
//                   Light Mode
//                 </>
//               ) : (
//                 <>
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.12-2.12a4 4 0 00-5.656 0l1.414-1.414a2 2 0 012.828 0l2.828 2.828a2 2 0 01-2.828 2.828l-1.414-1.414a4 4 0 000 5.656l2.12 2.12a1 1 0 001.414-1.414l-2.12-2.12a2 2 0 010-2.828l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414a2 2 0 010-2.828z" clipRule="evenodd" />
//                   </svg>
//                   Dark Mode
//                 </>
//               )}
//             </button>
//           </div>
//         )}
//       </div>

//       <ProfileModal 
//         isOpen={isProfileOpen}
//         onClose={() => setIsProfileOpen(false)}
//         userInfo={userInfo}
//         onUpdateProfile={onUpdateProfile}
//       />
//     </nav>
//   );
// }

// export default Navbar;








// new code 






import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProfileModal from './ProfileModal';

/* ── Starfield Logo ─────────────────────────────────────────────────── */
function StarfieldLogo({ onClick }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    const stars = Array.from({ length: 80 }, () => ({
      x    : Math.random() * W,
      y    : Math.random() * H,
      r    : Math.random() * 1.5 + 0.3,
      speed: Math.random() * 1.5 + 0.3,
      col  : Math.random() > 0.5 ? 'rgba(167,139,250,' : 'rgba(103,232,249,',
      phase: Math.random() * Math.PI * 2,
    }));

    let raf;
    let tick = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      tick += 0.02;

      stars.forEach(s => {
        s.x -= s.speed;
        if (s.x < 0) { s.x = W; s.y = Math.random() * H; }

        const alpha = 0.3 + 0.5 * Math.sin(tick + s.phase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.col + alpha + ')';
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <Link
      to="/"
      onClick={onClick}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
    >
      {/* Starfield canvas behind text */}
      <canvas
        ref={canvasRef}
        width={220}
        height={48}
        style={{
          position     : 'absolute',
          top          : '50%',
          left         : '50%',
          transform    : 'translate(-50%, -50%)',
          borderRadius : '12px',
          opacity      : 0.7,
          pointerEvents: 'none',
        }}
      />

      {/* Logo text */}
      <span
        style={{
          position             : 'relative',
          zIndex               : 1,
          fontSize             : '1.4rem',
          fontWeight           : 900,
          letterSpacing        : '-0.5px',
          padding              : '4px 14px',
          borderRadius         : '10px',
          background           : 'linear-gradient(90deg, #67e8f9, #a78bfa, #c4b5fd, #67e8f9)',
          backgroundSize       : '300% 100%',
          WebkitBackgroundClip : 'text',
          WebkitTextFillColor  : 'transparent',
          animation            : 'logo-shimmer 4s linear infinite',
        }}
      >
        UI Inventory
      </span>

      <style>{`
        @keyframes logo-shimmer {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
      `}</style>
    </Link>
  );
}

/* ── Navbar ─────────────────────────────────────────────────────────── */
function Navbar({
  activeTab, setActiveTab,
  onLoginClick, onSignupClick,
  isLoggedIn, onLogout,
  userInfo, onUpdateProfile,
  isDarkMode, setIsDarkMode,
}) {
  const [isProfileOpen,    setIsProfileOpen]    = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navBtn = (tab, label) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded transition font-medium ${
        activeTab === tab
          ? 'bg-purple-600 text-white'
          : isDarkMode
            ? 'text-white hover:text-purple-400'
            : 'text-gray-900 hover:text-purple-600'
      }`}
    >
      {label}
    </button>
  );

  const mobileBtn = (tab, label) => (
    <button
      key={tab}
      onClick={() => { setActiveTab(tab); setIsMobileMenuOpen(false); }}
      className={`block w-full text-left px-4 py-2 rounded transition font-medium ${
        activeTab === tab
          ? 'bg-purple-600 text-white'
          : isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <nav className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} fixed w-full top-0 z-50 transition-all duration-300 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between min-h-16 sm:h-16">

          {/* ── Logo ── */}
          <div className="flex-shrink-0 flex items-center">
            <StarfieldLogo onClick={() => setActiveTab('home')} />
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded transition ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* ── Desktop nav links ── */}
          <div className="hidden md:flex space-x-2 lg:space-x-4 flex-1 ml-4 lg:ml-8">
            {navBtn('home',       'Home')}
            {navBtn('components', 'Components')}
            {navBtn('fullweb',    'Full Web')}
            {navBtn('about',      'About')}
            {navBtn('template',   'Template')}
            <Link
              to="/blog"
              onClick={() => setActiveTab('blog')}
              className={`px-4 py-2 rounded transition font-medium ${
                activeTab === 'blog'
                  ? 'bg-purple-600 text-white'
                  : isDarkMode ? 'text-white hover:text-purple-400' : 'text-gray-900 hover:text-purple-600'
              }`}
            >
              Blog
            </Link>
          </div>

          {/* ── Desktop auth + theme ── */}
          <div className="hidden sm:flex items-center space-x-2 sm:space-x-4">
            {/* Theme toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.12-2.12a4 4 0 00-5.656 0l1.414-1.414a2 2 0 012.828 0l2.828 2.828a2 2 0 01-2.828 2.828l-1.414-1.414a4 4 0 000 5.656l2.12 2.12a1 1 0 001.414-1.414l-2.12-2.12a2 2 0 010-2.828l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414a2 2 0 010-2.828z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => setIsProfileOpen(true)}
                  className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:opacity-80 transition"
                  title="View Profile"
                >
                  {(userInfo?.name ?? userInfo?.email ?? 'U').charAt(0).toUpperCase()}
                </button>
                <button
                  onClick={onLogout}
                  className="w-10 h-10 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition flex items-center justify-center"
                  title="Logout"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className={`px-2 sm:px-4 py-2 transition font-medium text-sm sm:text-base ${isDarkMode ? 'text-white hover:text-purple-400' : 'text-gray-900 hover:text-purple-600'}`}
                >
                  Login
                </button>
                <button
                  onClick={onSignupClick}
                  className="px-2 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium text-sm sm:text-base"
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {isMobileMenuOpen && (
          <div className={`md:hidden mt-2 pb-4 pt-2 space-y-2 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
            {mobileBtn('home',       'Home')}
            {mobileBtn('components', 'Components')}
            {mobileBtn('fullweb',    'Full Web')}
            {mobileBtn('about',      'About')}
            {mobileBtn('template',   'Template')}

            {!isLoggedIn && (
              <>
                <button onClick={onLoginClick} className={`block w-full text-left px-4 py-2 transition font-medium ${isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'}`}>Login</button>
                <button onClick={onSignupClick} className="block w-full text-left px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition font-medium">Signup</button>
              </>
            )}

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`block w-full text-left px-4 py-2 rounded transition font-medium flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        )}
      </div>

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userInfo={userInfo}
        onUpdateProfile={onUpdateProfile}
      />
    </nav>
  );
}

export default Navbar;