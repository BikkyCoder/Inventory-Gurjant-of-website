import React from 'react';

const Changelog = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4">
			<section className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="mb-12 text-center">
					<h1 className="text-5xl font-bold text-gray-900 mb-4">Changelog</h1>
					<p className="text-xl text-gray-700 leading-relaxed">
						Stay up to date with the latest improvements, features, and updates to <span className="font-semibold">UI Inventory</span>. We continuously work to enhance your experience by adding new components, improving performance, and expanding developer-friendly tools.
					</p>
				</div>

				{/* Content */}
				<div className="bg-white rounded-lg shadow-lg p-8 md:p-12 space-y-12">
					{/* Version 1.3.0 */}
					<div>
						<h2 className="text-3xl font-bold text-gray-900 mb-2">🚀 Version 1.3.0 — April 2026</h2>
						<hr className="mb-6 border-gray-200" />

						<div className="space-y-6">
							<div>
								<h3 className="text-2xl font-bold text-indigo-600 mb-4">✨ New Features</h3>
								<div className="space-y-4 ml-4">
									<div>
										<h4 className="text-lg font-semibold text-gray-900 mb-2">Live Editor Added</h4>
										<p className="text-gray-700 leading-relaxed">
											You can now edit UI components in real-time directly on the website. Instantly preview changes and customize components without leaving the page.
										</p>
									</div>
									<div>
										<h4 className="text-lg font-semibold text-gray-900 mb-2">Custom Icons Collection</h4>
										<p className="text-gray-700 leading-relaxed">
											A brand-new set of stylish and unique icons has been introduced. These icons are designed specifically for modern UI projects and are easy to integrate into your designs.
										</p>
									</div>
								</div>
							</div>

							<div>
								<h3 className="text-2xl font-bold text-orange-500 mb-4">⚙️ Upcoming Feature (In Progress)</h3>
								<div className="space-y-4 ml-4">
									<div>
										<h4 className="text-lg font-semibold text-gray-900 mb-2">NPM Installable Components (Coming Soon)</h4>
										<p className="text-gray-700 leading-relaxed mb-3">
											We are working on making UI Inventory components available via NPM. This will allow developers to:
										</p>
										<ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
											<li>Install components directly into their projects</li>
											<li>Save development time</li>
											<li>Easily manage updates and versions</li>
											<li>Integrate seamlessly with modern frameworks like React</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Version 1.2.0 */}
					<div className="pt-8">
						<h2 className="text-3xl font-bold text-gray-900 mb-2">🚀 Version 1.2.0 — March 2026</h2>
						<hr className="mb-6 border-gray-200" />

						<div className="space-y-6">
							<div>
								<h3 className="text-2xl font-bold text-indigo-600 mb-4">✨ Improvements</h3>
								<ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
									<li>Added multiple new UI components (Buttons, Cards, Modals)</li>
									<li>Improved overall website performance and loading speed</li>
									<li>Enhanced mobile responsiveness</li>
								</ul>
							</div>

							<div>
								<h3 className="text-2xl font-bold text-red-500 mb-4">🐛 Bug Fixes</h3>
								<ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
									<li>Fixed layout issues on smaller devices</li>
									<li>Resolved minor styling inconsistencies</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Version 1.1.0 */}
					<div className="pt-8">
						<h2 className="text-3xl font-bold text-gray-900 mb-2">🚀 Version 1.1.0 — February 2026</h2>
						<hr className="mb-6 border-gray-200" />

						<div>
							<h3 className="text-2xl font-bold text-indigo-600 mb-4">✨ Features</h3>
							<ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
								<li>Introduced Dark Mode support</li>
								<li>Improved documentation structure for better understanding</li>
								<li>Enhanced component usability</li>
							</ul>
						</div>
					</div>

					{/* Version 1.0.0 */}
					<div className="pt-8">
						<h2 className="text-3xl font-bold text-gray-900 mb-2">🚀 Version 1.0.0 — Initial Release</h2>
						<hr className="mb-6 border-gray-200" />

						<ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
							<li>Launched <span className="font-semibold">UI Inventory</span></li>
							<li>Provided a collection of essential UI components</li>
							<li>Basic documentation and usage examples included</li>
						</ul>
					</div>

					{/* What's Next */}
					<div className="pt-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">💡 What's Next?</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							We are constantly improving UI Inventory. Upcoming updates will focus on:
						</p>
						<ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
							<li>Expanding the component library</li>
							<li>Advanced customization options</li>
							<li>Full NPM ecosystem support</li>
							<li>Better developer experience</li>
						</ul>
						<p className="text-lg font-semibold text-gray-900 mt-6">
							Stay tuned for more updates and keep building amazing interfaces 🚀
						</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Changelog;
