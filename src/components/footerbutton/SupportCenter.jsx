import React from 'react'

const SupportCenter = () => {
	return (
		<section className="support-center p-6 max-w-3xl mx-auto">
			<h2 className="text-2xl font-semibold mb-4">Support Center</h2>

			<p className="mb-4">
				Welcome to the UI Inventory Support Center, your dedicated place for help, guidance, and solutions related to our UI component
				library. The Support Center is designed to ensure you have a smooth, fast, and hassle-free experience while using UI Inventory.
			</p>

			<h3 className="font-medium mt-4">Here you can find:</h3>
			<ul className="list-disc list-inside mt-2 space-y-2">
				<li>🛠 Step-by-step guides to resolve common issues</li>
				<li>❓ Frequently Asked Questions (FAQs) for quick answers</li>
				<li>📘 Documentation links for deeper understanding</li>
				<li>🚀 Best practices for using UI components efficiently</li>
			</ul>

			<p className="mt-4">
				Our Support Center focuses on providing clear, practical, and easy-to-understand solutions so developers of all skill levels can
				quickly overcome challenges and continue building modern, responsive interfaces.
			</p>

			<p className="mt-4">
				If you don’t find what you’re looking for, you can always reach out to our team for personalized support. We’re committed to
				helping you succeed with clean code, consistent design, and faster development.
			</p>
		</section>
	)
}

export default SupportCenter

