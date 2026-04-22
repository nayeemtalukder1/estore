"use client";

import { FC } from 'react';

// ──────────────────────────────────────────────────────────────
// REGISTER COMPONENT
// ──────────────────────────────────────────────────────────────

interface RegisterProps {
  onLoginClick: () => void;
}

const Register: FC<RegisterProps> = ({ onLoginClick }) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <div className="flex justify-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
      </div>

      <div className="space-y-8">
        {/* Username */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all text-sm"
          />
        </div>

        {/* First Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            placeholder="Enter your first name"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all text-sm"
          />
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            placeholder="Enter your last name"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all text-sm"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">E-mail Address</label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all text-sm"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Create a strong password"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all text-sm"
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all text-sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button className="flex-1 bg-[#3498db] hover:bg-[#2980b9] text-white py-4 rounded-lg font-medium transition-all active:scale-95">
            Register
          </button>

          <button
            onClick={onLoginClick}
            className="flex-1 bg-[#eeeeee] hover:bg-gray-200 text-gray-700 py-4 rounded-lg font-medium transition-all active:scale-95"
          >
            Login Instead
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;