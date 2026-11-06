import React from 'react';

export default function Testimonials() {
	return (
		<section className="max-w-3xl mx-auto p-6 text-gray-800 bg-white rounded-lg shadow-sm">
			<h2 className="text-2xl font-bold mb-4">What Our Users Say</h2>

			<p className="mb-4">
				We take pride in delivering high-quality UI components that help developers build faster and smarter. Here’s what our users have to say about their experience:
			</p>

			<div className="space-y-6 mb-6">
				<blockquote className="pl-4 border-l-4 border-yellow-400 italic">
					“Honestly, this UI library saved me hours of work. The components are clean, modern, and super easy to integrate. Highly recommended!”
					<footer className="mt-2 font-semibold">— ⭐ Rahul Sharma</footer>
				</blockquote>

				<hr className="border-slate-200" />

				<blockquote className="pl-4 border-l-4 border-pink-400 italic">
					“I love the design quality! Everything looks professional and works perfectly on my projects. This has become my go-to UI resource.”
					<footer className="mt-2 font-semibold">— ⭐ Priya Verma</footer>
				</blockquote>

				<hr className="border-slate-200" />

				<blockquote className="pl-4 border-l-4 border-blue-400 italic">
					“As a beginner developer, I found this library extremely helpful. The components are simple to use and well-structured.”
					<footer className="mt-2 font-semibold">— ⭐ Amit Singh</footer>
				</blockquote>

				<hr className="border-slate-200" />

				<blockquote className="pl-4 border-l-4 border-slate-700 italic">
					“The dark-themed components are just amazing! It made my website look premium without much effort.”
					<footer className="mt-2 font-semibold">— ⭐ Neha Gupta</footer>
				</blockquote>

				<hr className="border-slate-200" />

				<blockquote className="pl-4 border-l-4 border-green-400 italic">
					“Fast, reliable, and beautifully designed components. This library really improved my workflow.”
					<footer className="mt-2 font-semibold">— ⭐ Arjun Mehta</footer>
				</blockquote>
			</div>

			<p className="text-sm text-gray-600 font-medium">Join Our Happy Users 🚀</p>
			<p className="text-sm text-gray-500 mt-2">Start building stunning websites with ease using our UI components today!</p>
		</section>
	);
}

