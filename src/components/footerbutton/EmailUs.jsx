import React from 'react'

const EmailUs = () => {
	return (
		<section className="email-us-section p-6 max-w-3xl mx-auto">
			<h2 className="text-2xl font-semibold mb-4">Email Us</h2>

			<p className="mb-4">
				Have questions, feedback, or suggestions about UI Inventory? We’d love to hear from you. Our team is always happy to help
				you with anything related to our UI components, documentation, or platform features.
			</p>

			<p className="mb-4">
				Whether you need support, want to report an issue, or have ideas to improve UI Inventory, feel free to reach out to us anytime.
				We aim to respond as quickly as possible and provide clear, helpful solutions.
			</p>

			<h3 className="font-medium mt-4">📧 Email us for:</h3>
			<ul className="list-disc list-inside mt-2 space-y-2">
				<li>Technical support and usage questions</li>
				<li>Feedback and feature requests</li>
				<li>Bug reports and improvements</li>
				<li>Collaboration and partnership inquiries</li>
			</ul>

			<p className="mt-4">
				Your input helps us improve UI Inventory and build better tools for the developer community. Send us a message and we'll get
				back to you as soon as we can.
			</p>
		</section>
	)
}

export default EmailUs

