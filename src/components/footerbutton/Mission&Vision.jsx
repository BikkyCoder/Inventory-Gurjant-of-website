import React from 'react';

export default function MissionAndVision() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4">
			<section className="max-w-4xl mx-auto">
				{/* Mission Section */}
				<div className="mb-16 bg-white rounded-lg shadow-lg p-8 md:p-12">
					<div className="flex items-center gap-3 mb-6">
						<span className="text-4xl">🌐</span>
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900">Mission</h2>
					</div>

					<p className="text-lg text-gray-700 leading-relaxed mb-4">
						At UI Inventory, our mission is to empower developers and designers by providing a powerful collection of high-quality, ready-to-use UI components.
					</p>

					<p className="text-lg text-gray-700 leading-relaxed">
						We aim to simplify the development process by offering customizable, modern, and efficient design solutions that save time and boost productivity.
					</p>
				</div>

				{/* Vision Section */}
				<div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
					<div className="flex items-center gap-3 mb-6">
						<span className="text-4xl">🚀</span>
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900">Vision</h2>
					</div>

					<p className="text-lg text-gray-700 leading-relaxed mb-4">
						Our vision is to become a leading global platform for UI resources, where creators can discover, customize, and share innovative interface components.
					</p>

					<p className="text-lg text-gray-700 leading-relaxed">
						We strive to build a community-driven ecosystem that inspires creativity and sets new standards in modern web design.
					</p>
				</div>
			</section>
		</div>
	);
}

