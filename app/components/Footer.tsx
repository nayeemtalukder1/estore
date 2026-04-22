"use client";

import { FC } from 'react';
import {
  ShoppingBag,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from 'lucide-react';

// ──────────────────────────────────────────────────────────────
// FOOTER COMPONENT
// ──────────────────────────────────────────────────────────────

const Footer: FC = () => {
  const departments = [
    'Who Are We',
    'Our Mission',
    'Awards',
    'Experience',
    'Success Story',
  ];

  const quickLinks = [
    'Who Are We',
    'Our Mission',
    'Awards',
    'Experience',
    'Success Story',
  ];

  const socialIcons = [Facebook, Twitter, Instagram, Youtube];

  return (
    <footer className="bg-white pt-12 md:pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Contact */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
                <ShoppingBag className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-gray-900">E-store</span>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed">
              Our clothing website is a modern and fully responsive e-commerce platform designed to offer a smooth and enjoyable shopping experience.
            </p>

            <div className="space-y-3 text-sm text-gray-600">
              <p className="flex items-center gap-2 font-medium">+8801969148410</p>
              <p className="flex items-center gap-2 font-medium">estore@info.com</p>
              <p className="flex items-center gap-2 font-medium">Mymensingh, Bangladesh</p>
            </div>
          </div>

          {/* Departments */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Departments</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              {departments.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-indigo-600 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-indigo-600 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-6">
            <h4 className="font-bold text-gray-900">Let's keep in touch</h4>
            <p className="text-sm text-gray-500">
              Get recommendations, tips, updates and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="info@mail.com"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all"
              />
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-95">
                Subscribe
              </button>
            </div>

            <div className="flex gap-4 pt-4">
              {socialIcons.map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                  aria-label={`Follow us on ${Icon.name}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-400">
            Copyright © 2025 E-Store, All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;