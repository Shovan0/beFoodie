import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
  <footer className="bg-white border-t border-gray-200 py-10 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm text-gray-600">
      
      {/* Logo + Copyright */}
      <div>
        <Link to="/" className="text-2xl font-semibold text-emerald-600">
          beFoodie
        </Link>
        <p className="mt-2 text-gray-500">© 2025 beFoodie. All rights reserved.</p>
      </div>

      {/* Explore */}
      <div>
        <h5 className="text-base font-semibold text-gray-800 mb-3">Explore</h5>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-emerald-600">Home</a></li>
          <li><a href="#" className="hover:text-emerald-600">Features</a></li>
          <li><a href="#" className="hover:text-emerald-600">Pricing</a></li>
          <li><a href="#" className="hover:text-emerald-600">FAQs</a></li>
          <li><a href="#" className="hover:text-emerald-600">About</a></li>
        </ul>
      </div>

      {/* Company */}
      <div>
        <h5 className="text-base font-semibold text-gray-800 mb-3">Company</h5>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-emerald-600">Careers</a></li>
          <li><a href="#" className="hover:text-emerald-600">Partners</a></li>
          <li><a href="#" className="hover:text-emerald-600">Investors</a></li>
          <li><a href="#" className="hover:text-emerald-600">Press</a></li>
          <li><a href="#" className="hover:text-emerald-600">Blog</a></li>
        </ul>
      </div>

      {/* Help */}
      <div>
        <h5 className="text-base font-semibold text-gray-800 mb-3">Help</h5>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-emerald-600">Support</a></li>
          <li><a href="#" className="hover:text-emerald-600">Terms</a></li>
          <li><a href="#" className="hover:text-emerald-600">Privacy</a></li>
          <li><a href="#" className="hover:text-emerald-600">Accessibility</a></li>
          <li><a href="#" className="hover:text-emerald-600">Contact</a></li>
        </ul>
      </div>

    </div>
  </footer>
</>

    );
}

export default Footer;
