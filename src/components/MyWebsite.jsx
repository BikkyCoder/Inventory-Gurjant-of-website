import React from "react";

function MyWebsite() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide hover:scale-105 transition-transform">
            MyWebsite
          </h1>
          <ul className="hidden md:flex gap-8 text-lg">
            <li className="hover:text-yellow-300 cursor-pointer transition">Home</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">About</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">Services</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">Contact</li>
          </ul>
          <button className="md:hidden p-2 border border-white rounded">
            ☰
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">
            Welcome to My Stylish Website
          </h1>
          <p className="text-gray-600 text-xl">
            This is a one-page website template built with React and Tailwind CSS.
          </p>
        </div>

        {/* About Section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-semibold text-gray-800 mb-6">
              About Us
            </h2>
            <p className="text-lg text-gray-600">
              We are a passionate team of developers and designers dedicated to creating amazing websites with modern technologies like React and Tailwind CSS.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-gray-200 py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-semibold text-gray-800 mb-6">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              We offer a wide range of services to help you build your dream website or web application.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Web Development</h3>
                <p className="text-gray-600">Build modern and responsive websites using the latest web technologies.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">UI/UX Design</h3>
                <p className="text-gray-600">Create user-friendly designs that provide a seamless experience for your audience.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">SEO Optimization</h3>
                <p className="text-gray-600">Improve your website's visibility on search engines and drive more traffic.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-semibold text-gray-800 mb-6">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Have any questions? Feel free to reach out to us!
            </p>
            <form className="max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <textarea
                placeholder="Your Message"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                rows="4"
              ></textarea>
              <button className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 mt-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-3 text-white">MyWebsite</h2>
            <p>Your modern website built with React & Tailwind CSS.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-white">Quick Links</h2>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Services</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-white">Follow Us</h2>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Facebook</li>
              <li className="hover:text-white cursor-pointer">Instagram</li>
              <li className="hover:text-white cursor-pointer">Twitter</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-6">
          © {new Date().getFullYear()} MyWebsite — All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default MyWebsite;
