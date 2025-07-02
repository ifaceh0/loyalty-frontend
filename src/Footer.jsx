import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-fuchsia-500">Loyalty Rewards</h3>
          <p className="text-sm text-gray-300">
            Earn points every time you shop. Redeem rewards, refer friends, and track your progress with our nationwide loyalty program built for smart shoppers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-fuchsia-500">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:text-fuchsia-400">Home</a></li>
            <li><a href="/signup-user" className="hover:text-fuchsia-400">Join Now</a></li>
            {/* <li><a href="/" className="hover:text-fuchsia-400">Shopkeeper Dashboard</a></li> */}
            <li><a href="/" className="hover:text-fuchsia-400">FAQ</a></li>
            <li><a href="/contact" className="hover:text-fuchsia-400">Contact Us</a></li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-fuchsia-500">Stay Connected</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-fuchsia-400"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-fuchsia-400"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-fuchsia-400"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-fuchsia-400"><FaLinkedin size={20} /></a>
          </div>
          <p className="text-sm mt-4 text-gray-400">Follow us for updates and special offers.</p>
        </div>

        {/* Newsletter Signup (optional) */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-fuchsia-500">Join Our Newsletter</h3>
          <p className="text-sm text-gray-300 mb-2">Get exclusive rewards and deals in your inbox.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-lg text-black text-sm"
              required
            />
            <button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded-lg text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Loyalty Rewards. All rights reserved.</p>
        <p className="mt-1">Proudly built for the shopping community</p>
      </div>
    </footer>
  );
}

export default Footer;
