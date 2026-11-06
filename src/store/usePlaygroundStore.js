import { create } from 'zustand';

export const usePlaygroundStore = create((set) => ({
  // Global theme mode
  isDarkMode: true,

  // Theme settings
  primaryColor: '#8b5cf6', // purple
  secondaryColor: '#06b6d4', // cyan
  bgColor: '#1a1a2e',
  textColor: '#ffffff',
  
  // Layout settings
  layoutMode: 'grid', // grid, flex, sidebar
  spacing: 'md', // sm, md, lg
  borderRadius: 'md', // sm, md, lg, full
  
  // Navbar settings
  navbarBgColor: '#111827',
  navbarTextColor: '#ffffff',
  navbarLogoText: 'My Website',
  navbarItems: [
    { id: 1, name: 'Home', active: true },
    { id: 2, name: 'About', active: false },
    { id: 3, name: 'Services', active: false },
    { id: 4, name: 'Contact', active: false },
  ],
  
  // Footer settings
  footerBgColor: '#0f172a',
  footerTextColor: '#e5e7eb',
  footerHeadingColor: '#f3f4f6',
  footerColumns: [
    {
      id: 1,
      heading: 'Product',
      links: ['Features', 'Pricing', 'Security', 'Team'],
    },
    {
      id: 2,
      heading: 'Company',
      links: ['About', 'Blog', 'Careers', 'Press'],
    },
    {
      id: 3,
      heading: 'Resources',
      links: ['Docs', 'API', 'Community', 'Support'],
    },
  ],
  footerCopyright: '© 2024 My Website. All rights reserved.',
  showFooterSocial: true,

  // Hero Section settings
  showHeroSection: true,
  heroSection: {
    heading: 'Welcome to Our Website',
    subheading: 'Build amazing digital experiences with our platform',
    buttonText: 'Get Started Now',
    buttonColor: '#8b5cf6',
    bgColor: '#1a1a2e',
    textColor: '#ffffff',
    accentColor: '#06b6d4',
    backgroundImage: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    height: 'full', // full, half, auto
    showSecondaryButton: true,
  },

  // Sections settings
  sections: [
    {
      id: 1,
      title: 'Hero Section',
      bgColor: '#1a1a2e',
      textColor: '#ffffff',
      content: {
        heading: 'Welcome to Our Website',
        subheading: 'Build amazing things with us',
        buttonText: 'Get Started',
        buttonColor: '#8b5cf6',
      },
      layout: 'centered', // centered, twoColumn, threeColumn
      height: 'full', // full, auto
      useCustomComponent: false,
      customComponentCode: '',
    },
  ],

  componentCode: `export default function CustomComponent() {
  return (
    <div className="p-8 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-lg">
      <h1 className="text-3xl font-bold text-white mb-4">
        Welcome to CustomizeWeb
      </h1>
      <p className="text-white/80 mb-6">
        Edit the code and see changes in real-time!
      </p>
      <button className="px-6 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-all">
        Get Started
      </button>
    </div>
  );
}`,

  // Projects
  projects: [],
  currentProjectId: null,

  // Actions
  setPrimaryColor: (color) => set({ primaryColor: color }),
  setSecondaryColor: (color) => set({ secondaryColor: color }),
  setBgColor: (color) => set({ bgColor: color }),
  setTextColor: (color) => set({ textColor: color }),
  
  setTheme: (isDark) => set({ isDarkMode: isDark }),
  
  setLayoutMode: (mode) => set({ layoutMode: mode }),
  setSpacing: (spacing) => set({ spacing: spacing }),
  setBorderRadius: (radius) => set({ borderRadius: radius }),
  
  setComponentCode: (code) => set({ componentCode: code }),
  
  saveProject: (name) => set((state) => {
    const newProject = {
      id: Date.now().toString(),
      name,
      code: state.componentCode,
      theme: {
        primaryColor: state.primaryColor,
        secondaryColor: state.secondaryColor,
        bgColor: state.bgColor,
        textColor: state.textColor,
      },
      layout: {
        mode: state.layoutMode,
        spacing: state.spacing,
        borderRadius: state.borderRadius,
      },
      createdAt: new Date(),
    };
    
    return {
      projects: [...state.projects, newProject],
      currentProjectId: newProject.id,
    };
  }),

  loadProject: (id) => set((state) => {
    const project = state.projects.find(p => p.id === id);
    if (project) {
      return {
        componentCode: project.code,
        primaryColor: project.theme.primaryColor,
        secondaryColor: project.theme.secondaryColor,
        bgColor: project.theme.bgColor,
        textColor: project.theme.textColor,
        layoutMode: project.layout.mode,
        spacing: project.layout.spacing,
        borderRadius: project.layout.borderRadius,
        currentProjectId: id,
      };
    }
    return state;
  }),

  deleteProject: (id) => set((state) => ({
    projects: state.projects.filter(p => p.id !== id),
    currentProjectId: state.currentProjectId === id ? null : state.currentProjectId,
  })),

  // Navbar actions
  setNavbarBgColor: (color) => set({ navbarBgColor: color }),
  setNavbarTextColor: (color) => set({ navbarTextColor: color }),
  setNavbarLogoText: (text) => set({ navbarLogoText: text }),
  setNavbarItems: (items) => set({ navbarItems: items }),
  addNavbarItem: (name) => set((state) => ({
    navbarItems: [...state.navbarItems, { id: Date.now(), name, active: false }],
  })),
  removeNavbarItem: (id) => set((state) => ({
    navbarItems: state.navbarItems.filter(item => item.id !== id),
  })),

  // Footer actions
  setFooterBgColor: (color) => set({ footerBgColor: color }),
  setFooterTextColor: (color) => set({ footerTextColor: color }),
  setFooterHeadingColor: (color) => set({ footerHeadingColor: color }),
  setFooterColumns: (columns) => set({ footerColumns: columns }),
  setCopyright: (text) => set({ footerCopyright: text }),
  setShowFooterSocial: (show) => set({ showFooterSocial: show }),

  // Sections actions
  addSection: (title) => set((state) => ({
    sections: [
      ...state.sections,
      {
        id: Date.now(),
        title,
        bgColor: '#ffffff',
        textColor: '#000000',
        content: {
          heading: 'New Section',
          subheading: 'Add your content here',
          buttonText: 'Learn More',
          buttonColor: '#8b5cf6',
        },
        layout: 'centered',
        height: 'auto',
      },
    ],
  })),

  updateSection: (id, updates) => set((state) => ({
    sections: state.sections.map((section) =>
      section.id === id ? { ...section, ...updates } : section
    ),
  })),

  deleteSection: (id) => set((state) => ({
    sections: state.sections.filter((section) => section.id !== id),
  })),

  updateSectionContent: (id, content) => set((state) => ({
    sections: state.sections.map((section) =>
      section.id === id ? { ...section, content: { ...section.content, ...content } } : section
    ),
  })),

  // Hero Section actions
  setShowHeroSection: (show) => set({ showHeroSection: show }),
  updateHeroSection: (updates) => set((state) => ({
    heroSection: { ...state.heroSection, ...updates },
  })),

  resetToDefault: () => set({
    primaryColor: '#8b5cf6',
    secondaryColor: '#06b6d4',
    bgColor: '#1a1a2e',
    textColor: '#ffffff',
    layoutMode: 'grid',
    spacing: 'md',
    borderRadius: 'md',
    componentCode: `export default function CustomComponent() {
  return (
    <div className="p-8 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-lg">
      <h1 className="text-3xl font-bold text-white mb-4">
        Welcome to CustomizeWeb
      </h1>
      <p className="text-white/80 mb-6">
        Edit the code and see changes in real-time!
      </p>
      <button className="px-6 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-all">
        Get Started
      </button>
    </div>
  );
}`,
  }),

  // Generate full website code
  generateFullWebsiteCode: () => (state) => {
    const navbarCode = `
// Navbar Component
function Navbar() {
  return (
    <nav style={{ backgroundColor: '${state.navbarBgColor}', color: '${state.navbarTextColor}' }} className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-bold">${state.navbarLogoText}</div>
      <div className="flex gap-6 flex-1 ml-8">
        ${state.navbarItems.map((item) => `<a href="#" className="px-3 py-2 rounded transition font-medium hover:opacity-80">${item.name}</a>`).join('\n        ')}
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 rounded-lg transition font-medium" style={{ backgroundColor: 'transparent', color: '${state.navbarTextColor}', border: '1px solid ${state.navbarTextColor}' }}>Login</button>
        <button className="px-4 py-2 rounded-lg transition font-medium" style={{ backgroundColor: '${state.navbarTextColor}', color: '${state.navbarBgColor}' }}>Signup</button>
      </div>
    </nav>
  );
}`;

    const sectionsCode = `
// Custom Components
${state.sections.filter(s => s.useCustomComponent && s.customComponentCode).map(s => s.customComponentCode.trim()).join('\n\n')}

// Sections Component
function Sections() {
  return (
    <>
      ${state.sections.map((section) => {
        if (section.useCustomComponent && section.customComponentCode) {
          // Extract component name from code
          const componentNameMatch = section.customComponentCode.match(/(?:function|const)\s+(\w+)/);
          const componentName = componentNameMatch ? componentNameMatch[1] : 'CustomComponent';
          return `
      <section style={{ backgroundColor: '${section.bgColor}', color: '${section.textColor}', minHeight: '${section.height === 'full' ? '100vh' : section.height === 'half' ? '50vh' : 'auto'}' }} className="px-8 py-12 flex items-center justify-center">
        <${componentName} />
      </section>`;
        }
        return `
      <section style={{ backgroundColor: '${section.bgColor}', color: '${section.textColor}', minHeight: '${section.height === 'full' ? '100vh' : section.height === 'half' ? '50vh' : 'auto'}' }} className="px-8 py-12 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl font-bold mb-4">${section.content.heading}</h2>
          <p className="text-lg mb-8 opacity-90">${section.content.subheading}</p>
          <button style={{ backgroundColor: '${section.content.buttonColor}', color: '${section.bgColor}' }} className="px-8 py-3 rounded-lg transition-all font-medium hover:opacity-90">${section.content.buttonText}</button>
        </div>
      </section>`;
      }).join('\n      ')}
    </>
  );
}`.trim();

    const footerCode = `
// Footer Component
function Footer() {
  return (
    <footer style={{ backgroundColor: '${state.footerBgColor}', color: '${state.footerTextColor}' }} className="px-8 py-12">
      <div className="grid grid-cols-3 gap-8 mb-8">
        ${state.footerColumns.map((column) => `
        <div>
          <h4 style={{ color: '${state.footerHeadingColor}' }} className="text-lg font-bold mb-4">${column.heading}</h4>
          <ul className="space-y-2">
            ${column.links.map((link) => `<li><a href="#" className="hover:opacity-80 transition-opacity">${link}</a></li>`).join('\n            ')}
          </ul>
        </div>`).join('\n        ')}
      </div>
      ${state.showFooterSocial ? `
      <div className="mb-8 pb-8 border-t border-gray-700 pt-8">
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80" style={{ backgroundColor: '${state.footerHeadingColor}', color: '${state.footerBgColor}' }}>F</a>
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80" style={{ backgroundColor: '${state.footerHeadingColor}', color: '${state.footerBgColor}' }}>T</a>
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80" style={{ backgroundColor: '${state.footerHeadingColor}', color: '${state.footerBgColor}' }}>L</a>
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80" style={{ backgroundColor: '${state.footerHeadingColor}', color: '${state.footerBgColor}' }}>I</a>
        </div>
      </div>` : ''}
      <div className="border-t border-gray-700 pt-8 text-center text-sm opacity-75">${state.footerCopyright}</div>
    </footer>
  );
}`.trim();

    const appCode = `import React from 'react';
import './App.css';

${navbarCode}

${sectionsCode.length > 0 ? sectionsCode : ''}

${footerCode}

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      ${state.sections.length > 0 ? '<Sections />' : ''}
      <Footer />
    </div>
  );
}`;

    return appCode;
  },
}));
