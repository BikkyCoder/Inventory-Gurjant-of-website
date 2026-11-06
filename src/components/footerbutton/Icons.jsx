import React, { useState } from 'react';

export default function Icons() {
	const [copiedIcon, setCopiedIcon] = useState(null);

	// Comprehensive icon collection
	const iconCategories = {
		'Social': [
			{ icon: '📱', name: 'Mobile', emoji: '📱' },
			{ icon: '💼', name: 'LinkedIn', emoji: '💼' },
			{ icon: '🐙', name: 'GitHub', emoji: '🐙' },
			{ icon: '💬', name: 'Discord', emoji: '💬' },
			{ icon: '🐦', name: 'Twitter', emoji: '🐦' },
			{ icon: '📘', name: 'Facebook', emoji: '📘' },
			{ icon: '📷', name: 'Instagram', emoji: '📷' },
			{ icon: '▶️', name: 'YouTube', emoji: '▶️' },
		],
		'UI Elements': [
			{ icon: '⭐', name: 'Star', emoji: '⭐' },
			{ icon: '❤️', name: 'Heart', emoji: '❤️' },
			{ icon: '👍', name: 'Like', emoji: '👍' },
			{ icon: '✅', name: 'Check', emoji: '✅' },
			{ icon: '❌', name: 'Close', emoji: '❌' },
			{ icon: '⚙️', name: 'Settings', emoji: '⚙️' },
			{ icon: '🔔', name: 'Bell', emoji: '🔔' },
			{ icon: '🔒', name: 'Lock', emoji: '🔒' },
		],
		'Navigation': [
			{ icon: '➡️', name: 'Right', emoji: '➡️' },
			{ icon: '⬅️', name: 'Left', emoji: '⬅️' },
			{ icon: '⬆️', name: 'Up', emoji: '⬆️' },
			{ icon: '⬇️', name: 'Down', emoji: '⬇️' },
			{ icon: '🏠', name: 'Home', emoji: '🏠' },
			{ icon: '📍', name: 'Location', emoji: '📍' },
			{ icon: '🔍', name: 'Search', emoji: '🔍' },
			{ icon: '🔗', name: 'Link', emoji: '🔗' },
		],
		'Business': [
			{ icon: '💰', name: 'Money', emoji: '💰' },
			{ icon: '💳', name: 'Card', emoji: '💳' },
			{ icon: '📊', name: 'Chart', emoji: '📊' },
			{ icon: '📈', name: 'Graph', emoji: '📈' },
			{ icon: '🏆', name: 'Trophy', emoji: '🏆' },
			{ icon: '📅', name: 'Calendar', emoji: '📅' },
			{ icon: '⏰', name: 'Clock', emoji: '⏰' },
			{ icon: '📧', name: 'Email', emoji: '📧' },
		],
		'Media': [
			{ icon: '🎬', name: 'Video', emoji: '🎬' },
			{ icon: '🎵', name: 'Music', emoji: '🎵' },
			{ icon: '🎨', name: 'Art', emoji: '🎨' },
			{ icon: '🖼️', name: 'Gallery', emoji: '🖼️' },
			{ icon: '📹', name: 'Camera', emoji: '📹' },
			{ icon: '🎙️', name: 'Microphone', emoji: '🎙️' },
			{ icon: '📻', name: 'Radio', emoji: '📻' },
			{ icon: '🎧', name: 'Headphones', emoji: '🎧' },
		],
		'Communication': [
			{ icon: '✉️', name: 'Envelope', emoji: '✉️' },
			{ icon: '📞', name: 'Phone', emoji: '📞' },
			{ icon: '📱', name: 'Mobile Phone', emoji: '📱' },
			{ icon: '💻', name: 'Laptop', emoji: '💻' },
			{ icon: '⌨️', name: 'Keyboard', emoji: '⌨️' },
			{ icon: '🖱️', name: 'Mouse', emoji: '🖱️' },
			{ icon: '📡', name: 'Signal', emoji: '📡' },
			{ icon: '📶', name: 'Wifi', emoji: '📶' },
		]
	};

	const handleCopy = (icon, name) => {
		navigator.clipboard.writeText(icon);
		setCopiedIcon(name);
		setTimeout(() => setCopiedIcon(null), 2000);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-12 px-4">
			{/* Header */}
			<div className="max-w-6xl mx-auto mb-12">
				<div className="text-center mb-8">
					<h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
						UI Inventory Icons
					</h1>
					<p className="text-slate-400 text-lg max-w-2xl mx-auto">
						Browse and copy our comprehensive collection of beautiful, clean icons. Perfect for any design system or UI project.
					</p>
				</div>

				{/* Features */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
					<div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 text-center">
						<div className="text-3xl mb-2">⚡</div>
						<p className="text-sm text-slate-400">Ready to use</p>
					</div>
					<div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 text-center">
						<div className="text-3xl mb-2">🎨</div>
						<p className="text-sm text-slate-400">Customizable</p>
					</div>
					<div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 text-center">
						<div className="text-3xl mb-2">📋</div>
						<p className="text-sm text-slate-400">Easy to copy</p>
					</div>
				</div>
			</div>

			{/* Icon Categories */}
			<div className="max-w-6xl mx-auto">
				{Object.entries(iconCategories).map(([ category, icons ]) => (
					<div key={category} className="mb-12">
						{/* Category Title */}
						<div className="mb-6">
							<h2 className="text-2xl font-bold text-purple-300">{category}</h2>
							<div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2"></div>
						</div>

						{/* Icon Grid */}
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
							{icons.map((item) => (
								<div
									key={item.name}
									onClick={() => handleCopy(item.emoji, item.name)}
									className="group cursor-pointer"
								>
									<div className="bg-slate-800/50 backdrop-blur border border-slate-700 hover:border-purple-500 rounded-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20">
										<div className="text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">
											{item.emoji}
										</div>
										<p className="text-sm text-slate-400 group-hover:text-white transition-colors">
											{item.name}
										</p>
										{copiedIcon === item.name && (
											<p className="text-xs text-green-400 mt-2">✓ Copied!</p>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			{/* Footer Info */}
			<div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-slate-700">
				<div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-lg p-6 text-center">
					<p className="text-slate-400 mb-3">
						💡 <strong>Tip:</strong> Click any icon above to copy it to your clipboard
					</p>
					<p className="text-sm text-slate-500">
						These icons are perfect for buttons, navigation, and user interface elements across your projects.
					</p>
				</div>
			</div>
		</div>
	);
}

