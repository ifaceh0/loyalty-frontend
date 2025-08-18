import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-indigo-950 text-white pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent drop-shadow-sm">
            LoyaltyHub
          </h3>
          <p className="text-sm text-gray-300">
            Earn points every time you shop. Redeem rewards, refer friends, and track your progress with our nationwide loyalty program built for smart shoppers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent drop-shadow-sm">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:text-cyan-300">Home</a></li>
            <li><a href="/signup-user" className="hover:text-cyan-300">Join Now</a></li>
            <li><a href="/" className="hover:text-cyan-300">FAQ</a></li>
            <li><a href="/contact" className="hover:text-cyan-300">Contact Us</a></li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent drop-shadow-sm">
            Stay Connected
          </h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-cyan-300"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-cyan-300"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-cyan-300"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-cyan-300"><FaLinkedin size={20} /></a>
          </div>
          <p className="text-sm mt-4 text-gray-400">Follow us for updates and special offers.</p>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent drop-shadow-sm">
            Join Our Newsletter
          </h3>
          <p className="text-sm text-gray-300 mb-2">Get exclusive rewards and deals in your inbox.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-lg text-black text-sm"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-green-400 via-cyan-300 to-sky-400 hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-indigo-800 pt-4 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} LoyaltyHub. All rights reserved.</p>
        <p className="mt-1">Proudly built for the shopping community</p>
      </div>
    </footer>
  );
}

export default Footer;
