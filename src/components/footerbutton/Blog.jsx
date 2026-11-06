import React, { useState } from 'react';
import { Search, Clock, User, ArrowRight, Zap, BookOpen, Lightbulb, Code, CheckCircle } from 'lucide-react';

export default function Blog() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All');

	const blogPosts = [
		{
			id: 1,
			title: 'Building Scalable React Components',
			excerpt: 'Learn the best practices for creating reusable, maintainable React components that scale with your application.',
			category: 'React',
			author: 'Sarah Dev',
			date: 'March 5, 2026',
			readTime: '8 min read',
			image: '🧩',
			featured: true
		},
		{
			id: 2,
			title: 'Modern CSS with Tailwind: A Complete Guide',
			excerpt: 'Master Tailwind CSS and build stunning UIs faster than ever before with utility-first CSS.',
			category: 'CSS',
			author: 'John Designer',
			date: 'March 2, 2026',
			readTime: '10 min read',
			image: '🎨',
			featured: true
		},
		{
			id: 3,
			title: 'UI/UX Best Practices for 2026',
			excerpt: 'Discover the latest trends and best practices in user interface and experience design.',
			category: 'Design',
			author: 'Emma UI',
			date: 'February 28, 2026',
			readTime: '7 min read',
			image: '✨',
			featured: true
		},
		{
			id: 4,
			title: 'JavaScript Performance Optimization Tips',
			excerpt: 'Improve your app performance with these essential JavaScript optimization techniques.',
			category: 'JavaScript',
			author: 'Alex Code',
			date: 'February 25, 2026',
			readTime: '9 min read',
			image: '⚡',
			featured: false
		},
		{
			id: 5,
			title: 'Responsive Design Patterns You Need to Know',
			excerpt: 'Create responsive layouts that work perfectly on all devices with these proven patterns.',
			category: 'Design',
			author: 'Maya Responsive',
			date: 'February 22, 2026',
			readTime: '6 min read',
			image: '📱',
			featured: false
		},
		{
			id: 6,
			title: 'State Management with React Hooks',
			excerpt: 'Deep dive into React Hooks and master state management in modern React applications.',
			category: 'React',
			author: 'Chris Dev',
			date: 'February 18, 2026',
			readTime: '11 min read',
			image: '🪝',
			featured: false
		},
		{
			id: 7,
			title: 'Advanced Web Performance Metrics',
			excerpt: 'Understand Core Web Vitals and optimize your website for better user experience and SEO rankings.',
			category: 'Performance',
			author: 'David Performance',
			date: 'February 15, 2026',
			readTime: '12 min read',
			image: '⚙️',
			featured: false
		},
		{
			id: 8,
			title: 'Image Optimization for Fast Loading',
			excerpt: 'Master image formats, compression techniques, and lazy loading strategies for optimal performance.',
			category: 'Performance',
			author: 'Lisa Code',
			date: 'February 12, 2026',
			readTime: '8 min read',
			image: '🖼️',
			featured: false
		},
		{
			id: 9,
			title: 'React Hooks Deep Dive',
			excerpt: 'Master useEffect, useState, useContext and custom hooks for professional React applications.',
			category: 'React',
			author: 'Sarah Dev',
			date: 'February 10, 2026',
			readTime: '15 min read',
			image: '⚛️',
			featured: false
		},
		{
			id: 10,
			title: 'Advanced CSS Grid Layouts',
			excerpt: 'Create complex, responsive layouts using CSS Grid with real-world examples and best practices.',
			category: 'CSS',
			author: 'John Designer',
			date: 'February 8, 2026',
			readTime: '9 min read',
			image: '📐',
			featured: false
		},
		{
			id: 11,
			title: 'Dark Mode Design Implementation',
			excerpt: 'Build beautiful dark mode themes with CSS variables and JavaScript for seamless switching.',
			category: 'Design',
			author: 'Emma UI',
			date: 'February 5, 2026',
			readTime: '7 min read',
			image: '🌙',
			featured: false
		},
		{
			id: 12,
			title: 'Async/Await vs Promises',
			excerpt: 'Master async programming patterns in JavaScript and write cleaner, more readable code.',
			category: 'JavaScript',
			author: 'Alex Code',
			date: 'February 1, 2026',
			readTime: '10 min read',
			image: '📝',
			featured: false
		},
		{
			id: 13,
			title: 'Caching Strategies for Performance',
			excerpt: 'Learn browser caching, service workers, and CDN strategies to dramatically improve load times.',
			category: 'Performance',
			author: 'David Performance',
			date: 'January 28, 2026',
			readTime: '11 min read',
			image: '💾',
			featured: false
		},
		{
			id: 14,
			title: 'Flexbox vs Grid: When to Use What',
			excerpt: 'Understand the differences between Flexbox and CSS Grid, and when to use each for layouts.',
			category: 'CSS',
			author: 'John Designer',
			date: 'January 25, 2026',
			readTime: '8 min read',
			image: '🎯',
			featured: false
		},
		{
			id: 15,
			title: 'Accessibility in Modern Web Design',
			excerpt: 'Build inclusive websites with ARIA, semantic HTML, and keyboard navigation best practices.',
			category: 'Design',
			author: 'Emma UI',
			date: 'January 22, 2026',
			readTime: '9 min read',
			image: '♿',
			featured: false
		},
		{
			id: 16,
			title: 'The Evolution of UI Components: From Simple Interfaces to Modern Design Systems',
			excerpt: 'Explore how UI components started from simple HTML elements to advanced reusable systems that power modern applications. Discover the evolution, frameworks, and future of UI development.',
			category: 'Design',
			author: 'UI Inventory Team',
			date: 'March 21, 2026',
			readTime: '18 min read',
			image: '🌐',
			featured: true,
			fullContent: `
# The Evolution of UI Components: From Simple Interfaces to Modern Design Systems

## Introduction

User Interface (UI) components are the building blocks of modern web and application design. From simple buttons and forms to complex interactive dashboards, UI components have transformed the way developers build digital products.

In this article, we explore how UI components started, how they evolved over time, and what modern updates have shaped the UI development world today.

---

## The Beginning of UI Components

In the early days of the web, websites were built using basic HTML with very limited styling. Developers relied on simple elements like:

* Plain text
* Basic buttons
* Simple forms
* Static layouts

There was no concept of reusable UI components. Every element had to be created from scratch for each page.

With the introduction of CSS, developers started adding styles to improve the visual appearance. However, design consistency was still a challenge.

---

## The Rise of Reusable UI Components

As web applications became more complex, developers realized the need for reusable components. This led to the concept of component-based development.

Technologies like **modular CSS** and early JavaScript frameworks helped developers create reusable UI elements such as:

* Navigation bars
* Cards
* Modals
* Dropdown menus

This approach improved development speed and made it easier to maintain large projects.

---

## The Game Changer: Component-Based Frameworks

The real transformation came with modern JavaScript frameworks like React, Angular, and Vue.

React, in particular, introduced a powerful concept:
👉 **Build UI as reusable components**

This allowed developers to:

* Break UI into small, manageable pieces
* Reuse components across multiple pages
* Maintain consistent design systems

Component-based architecture became the standard for modern web development.

---

## The Rise of UI Libraries and Design Systems

As the demand for faster development increased, UI libraries and design systems became popular.

Developers no longer needed to build everything from scratch. Instead, they could use ready-made components from libraries such as:

* Material Design systems
* Bootstrap
* Tailwind UI

These libraries provided:

* Pre-designed components
* Consistent styling
* Faster development workflows

Design systems also helped companies maintain brand consistency across products.

---

## Modern UI Components: What Has Changed?

Today, UI components are more powerful and advanced than ever. Here are the key updates in modern UI development:

### 1. Fully Responsive Design

Modern UI components are designed to work seamlessly across:

* Mobile devices
* Tablets
* Desktops

### 2. Animation and Micro-Interactions

Smooth animations and micro-interactions enhance user experience, making interfaces feel more interactive and engaging.

### 3. Accessibility (A11Y)

Developers now focus on making UI accessible to all users, including those with disabilities.

### 4. Performance Optimization

Modern components are lightweight and optimized for faster loading and better performance.

### 5. Dark Mode Support

Dark mode has become a standard feature in modern UI design.

### 6. Customization and Flexibility

Developers can easily customize components using frameworks like Tailwind CSS and CSS variables.

---

## The Role of UI Inventory in Modern Development

Platforms like UI Inventory aim to simplify UI development by providing:

* Ready-to-use components
* Clean and modern designs
* Easy customization options
* Developer-friendly code

Instead of building everything from scratch, developers can focus on creativity and functionality.

---

## The Future of UI Components

The future of UI components is exciting and continuously evolving. Some upcoming trends include:

* AI-powered UI generation
* 3D and immersive interfaces
* Voice-based UI interactions
* Advanced animation systems
* Component automation tools

UI development will continue to become faster, smarter, and more user-focused.

---

## Conclusion

UI components have come a long way from simple HTML elements to advanced, reusable systems that power modern applications.

Today, they are an essential part of web development, helping developers build faster, maintain consistency, and deliver better user experiences.

As technology evolves, UI components will continue to improve — making development more efficient and design more innovative.

---

👉 Stay connected with UI Inventory to explore modern UI components and keep up with the latest design trends.
			`
		}
	];

	const categories = ['All', 'React', 'CSS', 'Design', 'JavaScript', 'Performance'];

	const filteredPosts = blogPosts.filter(post => {
		const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
		const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	const featuredPosts = blogPosts.filter(post => post.featured);

	return (
		<div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
			{/* Hero Section */}
			<div className="w-full px-4 py-16 relative overflow-hidden border-b border-gray-200 dark:border-gray-700/50">
				<div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent dark:from-purple-500/5 pointer-events-none"></div>
				<div className="max-w-6xl mx-auto relative">
					<div className="text-center mb-8">
						<div className="flex items-center justify-center gap-3 mb-4">
							<BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
							<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
								UI Inventory Blog
							</h1>
						</div>
						<p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
							Your go-to resource for modern UI components, web design inspiration, and front-end development tips.
						</p>
						<p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
							Whether you're a beginner or an experienced developer, discover high-quality content focused on UI components, front-end development, design inspiration, and code examples.
						</p>
					</div>

					{/* Search Bar */}
					<div className="mt-10 max-w-2xl mx-auto">
						<div className="relative">
							<Search className="absolute left-4 top-4 text-gray-400" size={20} />
							<input
								type="text"
								placeholder="Search articles..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* About Section - What You'll Find Here */}
			<div className="w-full px-4 py-16 border-b border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">🚀 What You'll Find Here</h2>
					<p className="text-gray-600 dark:text-gray-400 mb-12 text-lg">At UI Inventory, we share high-quality content focused on:</p>
					
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
						<div className="flex gap-4">
							<Code className="w-8 h-8 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
							<div>
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🔹 UI Component Guides</h3>
								<p className="text-gray-600 dark:text-gray-400">Learn how to use and customize ready-made UI components built with technologies like React, HTML, CSS, and JavaScript. From buttons and cards to complex dashboards — everything is designed to save your development time.</p>
							</div>
						</div>
						<div className="flex gap-4">
							<Lightbulb className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
							<div>
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🔹 Front-End Development Tips</h3>
								<p className="text-gray-600 dark:text-gray-400">Stay updated with practical coding tips, performance optimization techniques, and best practices that improve your workflow and code quality.</p>
							</div>
						</div>
						<div className="flex gap-4">
							<Zap className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
							<div>
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🔹 Design Inspiration</h3>
								<p className="text-gray-600 dark:text-gray-400">Explore modern UI trends, animations, layouts, and creative ideas to make your websites visually stunning and user-friendly.</p>
							</div>
						</div>
						<div className="flex gap-4">
							<Code className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
							<div>
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🔹 Code Examples & Snippets</h3>
								<p className="text-gray-600 dark:text-gray-400">We provide clean, reusable, and copy-paste-ready code snippets that you can directly use in your projects.</p>
							</div>
						</div>
					</div>

					<div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 dark:from-purple-500/5 dark:to-pink-500/5 border border-purple-200 dark:border-purple-700/30 rounded-lg p-8">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">💡 Why Choose UI Inventory?</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-400">
							<div className="flex gap-3">
								<CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
								<span>Clean and modern UI components</span>
							</div>
							<div className="flex gap-3">
								<CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
								<span>Developer-friendly code structure</span>
							</div>
							<div className="flex gap-3">
								<CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
								<span>Fully responsive designs</span>
							</div>
							<div className="flex gap-3">
								<CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
								<span>Easy to customize and integrate</span>
							</div>
							<div className="flex gap-3">
								<CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
								<span>Regular updates with new components</span>
							</div>
							<div className="flex gap-3">
								<CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
								<span>Performance & SEO optimized</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* UI Inventory Overview */}
			<div className="w-full px-4 py-16 border-b border-gray-200 dark:border-gray-700/50">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">🌐 Build Faster with Ready-to-Use UI Components</h2>
						<p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">Stop wasting time building UI from scratch. With UI Inventory, you get access to a growing collection of pre-designed components.</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
						<div>
							<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What Can You Build?</h3>
							<ul className="space-y-3 text-gray-600 dark:text-gray-400">
								<li className="flex gap-3">
									<CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
									<span>Landing pages</span>
								</li>
								<li className="flex gap-3">
									<CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
									<span>Admin dashboards</span>
								</li>
								<li className="flex gap-3">
									<CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
									<span>Portfolio websites</span>
								</li>
								<li className="flex gap-3">
									<CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
									<span>E-commerce platforms</span>
								</li>
								<li className="flex gap-3">
									<CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
									<span>SaaS applications</span>
								</li>
								<li className="flex gap-3">
									<CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
									<span>Blogs and content platforms</span>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🎨 Modern Design Meets Functionality</h3>
							<p className="text-gray-600 dark:text-gray-400 mb-4">Every component in UI Inventory is built with:</p>
							<ul className="space-y-3 text-gray-600 dark:text-gray-400">
								<li className="flex gap-3">
									<CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
									<span>Minimalist and modern design</span>
								</li>
								<li className="flex gap-3">
									<CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
									<span>Smooth animations and transitions</span>
								</li>
								<li className="flex gap-3">
									<CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
									<span>Consistent spacing and typography</span>
								</li>
								<li className="flex gap-3">
									<CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
									<span>Mobile-first responsiveness</span>
								</li>
								<li className="flex gap-3">
									<CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
									<span>Fast loading speed</span>
								</li>
								<li className="flex gap-3">
									<CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
									<span>SEO-friendly markup</span>
								</li>
							</ul>
						</div>
					</div>

					<div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 dark:from-purple-500/5 dark:to-pink-500/5 border border-purple-200 dark:border-purple-700/30 rounded-lg p-8">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">💻 Technologies We Support</h3>
						<p className="text-gray-600 dark:text-gray-400 mb-4">UI Inventory provides components built using:</p>
						<ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600 dark:text-gray-400">
							<li>✓ React (Modern UI Components)</li>
							<li>✓ HTML5 & CSS3</li>
							<li>✓ JavaScript (Vanilla JS)</li>
							<li>✓ Tailwind CSS (Utility-first styling)</li>
						</ul>
					</div>
				</div>
			</div>

			{/* About Section */}
			<div className="w-full px-4 py-16 border-b border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						<div>
							<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About UI Inventory</h3>
							<p className="text-gray-600 dark:text-gray-400 mb-4">UI Inventory is a dedicated platform for developers who want to create beautiful and functional user interfaces without wasting time. We focus on simplicity, performance, and scalability.</p>
							<p className="text-gray-600 dark:text-gray-400">We believe that great UI should be accessible to everyone — not just expert designers.</p>
						</div>

						<div>
							<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission & Vision</h3>
							<div className="mb-6">
								<h4 className="font-bold text-gray-900 dark:text-white mb-2">🎯 Mission</h4>
								<p className="text-gray-600 dark:text-gray-400">To empower developers with high-quality UI components that make development faster and more efficient.</p>
							</div>
							<div>
								<h4 className="font-bold text-gray-900 dark:text-white mb-2">🌟 Vision</h4>
								<p className="text-gray-600 dark:text-gray-400">To become a global platform where developers can find everything related to UI design and development in one place.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			{filteredPosts.length > 0 && selectedCategory === 'All' && searchTerm === '' && (
				<div className="w-full px-4 py-16 border-b border-gray-200 dark:border-gray-700/50">
					<div className="max-w-6xl mx-auto">
						<div className="flex items-center gap-2 mb-10">
							<Zap className="text-yellow-500 dark:text-yellow-400" size={24} />
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Articles</h2>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{featuredPosts.map((post) => (
								<div
									key={post.id}
									className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer"
								>
									<div className="h-40 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center text-6xl border-b border-gray-200 dark:border-gray-700">
										{post.image}
									</div>
									<div className="p-6">
										<span className="inline-block px-3 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
											{post.category}
										</span>
										<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
											{post.title}
										</h3>
										<p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
											{post.excerpt}
										</p>
										<div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
											<div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
												<Clock size={14} />
												{post.readTime}
											</div>
											<ArrowRight size={16} className="text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition" />
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			{/* Category Filter */}
			<div className="w-full px-4 py-10 border-b border-gray-200 dark:border-gray-700/50">
				<div className="max-w-6xl mx-auto">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">Categories</h3>
					<div className="flex flex-wrap gap-3">
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => setSelectedCategory(category)}
								className={`px-4 py-2 rounded-lg font-medium transition ${
									selectedCategory === category
										? 'bg-purple-600 text-white dark:bg-purple-600'
										: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
								}`}
							>
								{category}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* All Posts Section */}
			<div className="w-full px-4 py-16">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">
						{selectedCategory !== 'All' ? `${selectedCategory} Articles` : 'All Articles'}
					</h2>

					{filteredPosts.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{filteredPosts.map((post) => (
								<article
									key={post.id}
									className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer"
								>
									<div className="flex items-start justify-between mb-4">
										<span className="text-3xl">{post.image}</span>
										<span className="px-3 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 rounded-full">
											{post.category}
										</span>
									</div>

									<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
										{post.title}
									</h3>

									<p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2">
										{post.excerpt}
									</p>

									<div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
										<div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
											<div className="flex items-center gap-1">
												<User size={14} />
												{post.author}
											</div>
											<div className="flex items-center gap-1">
												<Clock size={14} />
												{post.readTime}
											</div>
										</div>
										<div className="text-xs text-gray-500 dark:text-gray-500">
											{post.date}
										</div>
									</div>

									<button className="mt-4 w-full py-2 px-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg font-medium transition flex items-center justify-center gap-2">
										Read Article
										<ArrowRight size={16} />
									</button>
								</article>
							))}
						</div>
					) : (
						<div className="text-center py-12">
							<p className="text-gray-500 dark:text-gray-400 text-lg">No articles found matching your search.</p>
						</div>
					)}
				</div>
			</div>

			{/* Newsletter Section */}
			<div className="w-full px-4 py-16 border-t border-gray-200 dark:border-gray-700/50 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700">
				<div className="max-w-6xl mx-auto text-center text-white">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Level Up Your UI Skills?</h2>
					<p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">Start building faster, design better, and create amazing user experiences with UI Inventory.</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<button className="px-8 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-opacity-90 transition">
							Explore Components
						</button>
						<button className="px-8 py-3 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-lg transition">
							Browse All Articles
						</button>
					</div>
				</div>
			</div>

			{/* Resources & CTA Footer */}
			<div className="w-full px-4 py-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
						<div>
							<h4 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">Featured Topics</h4>
							<ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
								<li>✓ UI Component Guides</li>
								<li>✓ Front-End Development Tips</li>
								<li>✓ Design Inspiration</li>
								<li>✓ Code Examples & Snippets</li>
								<li>✓ Performance Optimization</li>
								<li>✓ UI/UX Best Practices</li>
							</ul>
						</div>
						<div>
							<h4 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">Technologies</h4>
							<ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
								<li>✓ React</li>
								<li>✓ HTML5 & CSS3</li>
								<li>✓ JavaScript (Vanilla)</li>
								<li>✓ Tailwind CSS</li>
								<li>✓ Modern Web Standards</li>
								<li>✓ And more...</li>
							</ul>
						</div>
						<div>
							<h4 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">Why Choose Us?</h4>
							<ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
								<li>✓ Save development time</li>
								<li>✓ Improve design quality</li>
								<li>✓ Boost productivity</li>
								<li>✓ Easy to integrate</li>
								<li>✓ Beginner-friendly</li>
								<li>✓ Regular updates</li>
							</ul>
						</div>
					</div>

					<div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-gray-600 dark:text-gray-400">
						<p className="text-lg mb-2">🚀 UI Inventory is your ultimate destination for modern UI components, helping developers build fast, responsive, and beautiful websites with ease.</p>
						<p className="text-sm">© {new Date().getFullYear()} UI Inventory. All rights reserved. | Your go-to platform for UI design & development excellence</p>
					</div>
				</div>
			</div>

			{/* Newsletter Signup */}
			<div className="w-full px-4 py-12 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900">
				<div className="max-w-4xl mx-auto">
					<div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-700/30 rounded-lg p-8 md:p-12 text-center">
						<h2 className="text-3xl font-bold text-white mb-3">Subscribe to Stay Updated</h2>
						<p className="text-gray-300 mb-6">Get the latest articles, tips, and tutorials delivered to your inbox weekly.</p>
						<div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
							/>
							<button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition">
								Subscribe
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

