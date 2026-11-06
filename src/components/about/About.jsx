import React from 'react';

export default function About() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-slate-900">
      {/* Header Section */}
      <div className="w-full px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About UI Inventory
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Welcome to UI Inventory, a platform built for developers who want to move faster, build cleaner, and ship better React applications.
            </p>
          </div>

          {/* Mission */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-6 text-purple-400">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our mission is simple — to provide high-quality, production-ready React components that anyone can copy, customize, and use instantly. We believe developers should focus on logic and creativity, not repetitive UI work.
            </p>
          </div>

          {/* Who We Are */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-6 text-purple-400">Who We Are</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              We are a team of passionate developers dedicated to simplifying the front-end development experience. We know how time-consuming UI building can be — repeating the same button, navbar, card, modal, or form structures again and again.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              So we built this platform to help developers skip the repetitive work and focus on what truly matters: logic, creativity, and growth.
            </p>
          </div>

          {/* What We Offer */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-purple-400">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 transition">
              <div className="text-4xl mb-4">🧩</div>
              <h3 className="text-xl font-bold mb-3">Fully Optimized React Components</h3>
              <p className="text-gray-300">All components are clean, modern, responsive, and follow best practices.</p>
            </div>

            <div className="bg-gray-800/50 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 transition">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">Copy-paste Ready Code</h3>
              <p className="text-gray-300">Just pick a component → copy → use it instantly in your React project.</p>
            </div>

            <div className="bg-gray-800/50 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 transition">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-3">Beautifully Styled with Tailwind CSS</h3>
              <p className="text-gray-300">Every component is designed with modern UI patterns and smooth interactions.</p>
            </div>

            <div className="bg-gray-800/50 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 transition">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-3">Beginner-Friendly + Professional-Grade</h3>
              <p className="text-gray-300">Whether you're learning or building production apps, our components save time.</p>
            </div>

            <div className="bg-gray-800/50 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 transition">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-bold mb-3">Constantly Growing Collection</h3>
              <p className="text-gray-300">We continuously add new components like buttons, cards, navbars, modals, forms, and more.</p>
            </div>

            <div className="bg-gray-800/50 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500 transition">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">Zero-Hassle Setup</h3>
              <p className="text-gray-300">No complex installation or configuration needed. Just copy and use.</p>
            </div>
          </div>
        </div>

        {/* Why We Built This */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-purple-400">Why We Built This</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            Developers waste a lot of time looking for good UI components, fixing bugs, adjusting styles, and trying different libraries. We wanted to solve that problem by offering:
          </p>
          <ul className="text-lg text-gray-300 space-y-3">
            <li className="flex items-start">
              <span className="text-purple-400 mr-3">✓</span>
              <span>Clean and reusable code</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-3">✓</span>
              <span>Practical UI ideas and patterns</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-3">✓</span>
              <span>Zero-hassle setup and integration</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-3">✓</span>
              <span>Components that fit any project</span>
            </li>
          </ul>
        </div>

        {/* Our Vision */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-purple-400">Our Vision</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            We aim to become one of the most reliable sources of free React components on the web. A place where developers come not just to copy code, but to learn, build, and create amazing projects easily.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Our goal is to help every developer — from beginners to experts — build better UIs in less time.
          </p>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Better UIs?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Explore our React component library, copy what you need, experiment freely, and build something great.
          </p>
          <p className="text-gray-400">
            Thank you for choosing UI Components — where building better UI starts with the right components.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
