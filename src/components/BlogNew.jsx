import React, { useState } from 'react';
import { Search, Clock, User, ArrowRight, Zap, BookOpen, Lightbulb, Rocket, Code } from 'lucide-react';
import { exampleComponents } from '../data/exampleComponents';
import { usePlaygroundStore } from '../store/usePlaygroundStore';

export default function Blog() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [activeTab, setActiveTab] = useState('featured'); // featured or guides

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

	// Playground store hooks to expose site data/actions
	const setComponentCode = usePlaygroundStore(state => state.setComponentCode);
	const projects = usePlaygroundStore(state => state.projects);

	return (
		<div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
			{/* Hero Section */}
			<div className="w-full px-4 py-24 relative overflow-hidden">
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

			{/* About Section */}
			<div className="w-full px-4 py-16 border-b border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">🚀 What You'll Find Here</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
						<div className="flex gap-4">
							<Code className="w-8 h-8 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
							<div>
								<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">UI Component Guides</h3>
								<p className="text-gray-600 dark:text-gray-400">Learn how to use and customize ready-made UI components built with React, HTML, CSS, and JavaScript. From buttons and cards to complex dashboards.</p>
							</div>
						</div>
						<div className="flex gap-4">
							<Lightbulb className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
							<div>
								<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Front-End Development Tips</h3>
								<p className="text-gray-600 dark:text-gray-400">Practical coding tips, performance optimization techniques, and best practices that improve your workflow and code quality.</p>
							</div>
						</div>
						<div className="flex gap-4">
							<Zap className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
							<div>
								<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Design Inspiration</h3>
								<p className="text-gray-600 dark:text-gray-400">Explore modern UI trends, animations, layouts, and creative ideas to make your websites visually stunning.</p>
							</div>
						</div>
						<div className="flex gap-4">
							<Code className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
							<div>
								<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Code Examples & Snippets</h3>
								<p className="text-gray-600 dark:text-gray-400">Clean, reusable, and copy-paste-ready code snippets you can directly use in your projects.</p>
							</div>
						</div>
					</div>

					<div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 dark:from-purple-500/5 dark:to-pink-500/5 border border-purple-200 dark:border-purple-700/30 rounded-lg p-6">
						<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">💡 Why Choose UI Inventory?</h3>
						<ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600 dark:text-gray-400">
							<li>✓ Clean and modern UI components</li>
							<li>✓ Developer-friendly code structure</li>
							<li>✓ Fully responsive designs</li>
							<li>✓ Easy to customize and integrate</li>
							<li>✓ Performance & SEO optimized</li>
							<li>✓ Regular updates with new content</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Featured Posts Section */}
			{filteredPosts.length > 0 && selectedCategory === 'All' && searchTerm === '' && (
				<div className="w-full px-4 py-16 border-b border-gray-200 dark:border-gray-700/50">
					<div className="max-w-6xl mx-auto">
						<div className="flex items-center gap-3 mb-10">
							<Zap className="text-yellow-500 dark:text-yellow-400" size={28} />
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Articles</h2>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{featuredPosts.map((post) => (
								<div
									key={post.id}
									className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer hover:-translate-y-1"
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
			<div className="w-full px-4 py-10 border-b border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50">
				<div className="max-w-6xl mx-auto">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">Filter by Category</h3>
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
									className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer hover:-translate-y-1"
								>
									<div className="flex items-start justify-between mb-4">
										<span className="text-4xl">{post.image}</span>
										<span className="px-3 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 rounded-full">
											{post.category}
										</span>
									</div>
									<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition line-clamp-2">
										{post.title}
									</h3>
									<p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
										{post.excerpt}
									</p>
									<div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
										<div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
											<div className="flex items-center gap-1">
												<User size={14} />
												{post.author}
											</div>
											<div className="flex items-center gap-1">
												<Clock size={14} />
												{post.readTime}
											</div>
										</div>
										<ArrowRight size={16} className="text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition" />
									</div>
								</article>
							))}
						</div>
					) : (
						<div className="text-center py-12">
							<BookOpen className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
							<p className="text-gray-600 dark:text-gray-400">No articles found matching your search.</p>
						</div>
					)}
				</div>
			</div>

			{/* CTA Section */}

			{/* From The Site: show example components and saved playground projects */}
			<div className="w-full px-4 py-16 border-b border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">From the Site — Try These</h2>
					<p className="text-gray-600 dark:text-gray-400 mb-6">Quick examples and your saved playground projects. Copy code or load it directly into the playground.</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{exampleComponents && exampleComponents.map((c, i) => (
							<div key={`example-${i}`} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
								<h4 className="font-bold mb-2 text-gray-900 dark:text-white">{c.name}</h4>
								<pre className="text-xs text-gray-700 dark:text-gray-300 max-h-40 overflow-auto bg-gray-50 dark:bg-gray-900 p-3 rounded mb-3">{c.code.slice(0, 400)}</pre>
								<div className="flex gap-2">
									<button
										onClick={() => navigator.clipboard.writeText(c.code)}
										className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:opacity-90"
									>
										Copy
									</button>
									<button
										onClick={() => setComponentCode(c.code)}
										className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500"
									>
										Load in Playground
									</button>
								</div>
							</div>
						))}

						{projects && projects.length > 0 && (
							<>
								{projects.map((p) => (
									<div key={p.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
										<h4 className="font-bold mb-2 text-gray-900 dark:text-white">{p.name}</h4>
										<p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Saved: {new Date(p.createdAt).toLocaleString()}</p>
										<div className="flex gap-2">
											<button onClick={() => navigator.clipboard.writeText(p.code)} className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md">Copy Code</button>
											<button onClick={() => setComponentCode(p.code)} className="px-3 py-2 bg-purple-600 text-white rounded-md">Load in Playground</button>
										</div>
									</div>
								))}
							</>
						)}
					</div>
				</div>
			</div>
			<div className="w-full px-4 py-16 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700">
				<div className="max-w-6xl mx-auto text-center text-white">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Level Up Your UI Skills?</h2>
					<p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
						Start building faster, design better, and create amazing user experiences with UI Inventory.
					</p>
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

			{/* Footer Content */}
			<div className="w-full px-4 py-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
						<div>
							<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About UI Inventory</h3>
							<p className="text-gray-600 dark:text-gray-400 mb-4">
								UI Inventory is a dedicated platform for developers who want to create beautiful and functional user interfaces without wasting time. We focus on simplicity, performance, and scalability.
							</p>
							<p className="text-gray-600 dark:text-gray-400">
								We believe that great UI should be accessible to everyone — not just expert designers.
							</p>
						</div>
						<div>
							<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission & Vision</h3>
							<p className="text-gray-600 dark:text-gray-400 mb-4">
								<strong>Mission:</strong> To empower developers with high-quality UI components that make development faster and more efficient.
							</p>
							<p className="text-gray-600 dark:text-gray-400">
								<strong>Vision:</strong> To become a global platform where developers can find everything related to UI design and development in one place.
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-200 dark:border-gray-700">
						<div>
							<h4 className="font-bold text-gray-900 dark:text-white mb-3">What You Can Build</h4>
							<ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
								<li>✓ Landing pages</li>
								<li>✓ Admin dashboards</li>
								<li>✓ Portfolio websites</li>
								<li>✓ E-commerce platforms</li>
								<li>✓ SaaS applications</li>
								<li>✓ Blogs and content platforms</li>
							</ul>
						</div>
						<div>
							<h4 className="font-bold text-gray-900 dark:text-white mb-3">Technologies We Support</h4>
							<ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
								<li>✓ React</li>
								<li>✓ HTML5 & CSS3</li>
								<li>✓ JavaScript (Vanilla)</li>
								<li>✓ Tailwind CSS</li>
								<li>✓ And more...</li>
							</ul>
						</div>
						<div>
							<h4 className="font-bold text-gray-900 dark:text-white mb-3">Blog Topics</h4>
							<ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
								<li>✓ UI/UX trends</li>
								<li>✓ Coding tutorials</li>
								<li>✓ Performance optimization</li>
								<li>✓ Design inspiration</li>
								<li>✓ Real-world project ideas</li>
							</ul>
						</div>
					</div>

					<div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
						<p>UI Inventory is your ultimate destination for modern UI components, helping developers build fast, responsive, and beautiful websites with ease.</p>
						<p className="mt-4 text-sm">© {new Date().getFullYear()} UI Inventory. All rights reserved.</p>
					</div>
				</div>
			</div>
		</div>
	);
}
