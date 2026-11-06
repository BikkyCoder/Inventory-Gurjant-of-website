import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Documentation() {
	const [expandedSection, setExpandedSection] = useState(null);

	const toggleSection = (section) => {
		setExpandedSection(expandedSection === section ? null : section);
	};

	const sections = [
		{
			id: 'getting-started',
			title: '🚀 Getting Started',
			content: `UI Inventory is a collection of high-quality, reusable UI components and pre-built sections designed to speed up your development workflow. Whether you're building a simple website or a complex application, UI Inventory helps you create beautiful interfaces with ease.`
		},
		{
			id: 'installation',
			title: '📦 Installation',
			content: `You can start using UI Inventory in multiple ways depending on your workflow.

Using npm:
npm install ui-inventory

Using CDN:
Include our styles and scripts directly into your project using CDN links.

Manual Setup:
Download the components and integrate them into your project manually.`
		},
		{
			id: 'usage',
			title: '🛠 Usage',
			content: `Using UI Inventory is simple. Import the components you need and start building your UI instantly.

<Button variant="primary">Click Me</Button>

Each component is designed to be flexible and easy to customize.`
		},
		{
			id: 'components',
			title: '🧩 Components',
			content: `UI Inventory offers a wide range of components to help you build your interface:

• Buttons
• Cards
• Modals
• Forms
• Navigation Bars
• Alerts & Notifications

Every component includes:
✓ Live Preview
✓ Copy Code Option
✓ Customization Options
✓ Multiple Variants`
		},
		{
			id: 'customization',
			title: '🎨 Customization',
			content: `UI Inventory is fully customizable to match your design needs:

✓ Change colors easily
✓ Modify typography
✓ Adjust spacing and layout
✓ Support for Light & Dark themes`
		},
		{
			id: 'ui-kits',
			title: '🧱 UI Kits & Sections',
			content: `Build faster with pre-designed UI blocks and sections:

• Hero Sections
• Pricing Tables
• Testimonials
• Contact Forms
• Dashboard Layouts

Simply copy, paste, and customize according to your project.`
		},
		{
			id: 'examples',
			title: '📄 Examples',
			content: `Explore real-world examples and ready-made templates to kickstart your project:

• Landing Pages
• Admin Dashboards
• Portfolio Layouts`
		},
		{
			id: 'faq',
			title: '❓ FAQ',
			content: `Common questions and answers:

Q: How to install UI Inventory?
A: Install via npm, CDN, or manual setup as described above.

Q: How to customize components?
A: Each component is fully customizable through props and CSS classes.

Q: Why is a component not working?
A: Check the documentation, ensure all dependencies are installed, and verify your setup.`
		},
		{
			id: 'updates',
			title: '🔄 Updates & Changelog',
			content: `Stay updated with the latest improvements and new components:

✓ New features
✓ Bug fixes
✓ Performance improvements`
		}
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4">
			<section className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="mb-12 text-center">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">📘 Documentation</h1>
					<p className="text-xl text-gray-700 leading-relaxed">
						Welcome to UI Inventory documentation. Here you'll find everything you need to get started, customize components, and build modern user interfaces faster and more efficiently.
					</p>
				</div>

				{/* Sections */}
				<div className="space-y-4">
					{sections.map((section) => (
						<div
							key={section.id}
							className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
						>
							<button
								onClick={() => toggleSection(section.id)}
								className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
							>
								<h2 className="text-xl font-bold text-gray-900 text-left">{section.title}</h2>
								<ChevronDown
									size={24}
									className={`text-indigo-600 transition-transform ${
										expandedSection === section.id ? 'rotate-180' : ''
									}`}
								/>
							</button>

							{expandedSection === section.id && (
								<div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
									<p className="text-gray-700 whitespace-pre-line leading-relaxed">
										{section.content}
									</p>
								</div>
							)}
						</div>
					))}
				</div>

				{/* Bottom CTA */}
				<div className="mt-12 text-center">
					<p className="text-lg font-semibold text-gray-900">
						Ready to get started? Explore the docs to learn, integrate, and ship beautiful UIs faster.
					</p>	
				</div>
			</section>
		</div>
	);
}

