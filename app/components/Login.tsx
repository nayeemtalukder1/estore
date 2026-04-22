"use client";

import { FC } from 'react';

// ──────────────────────────────────────────────────────────────
// LOGIN COMPONENT
// ──────────────────────────────────────────────────────────────

interface LoginProps {
  onRegisterClick: () => void;
}

const Login: FC<LoginProps> = ({ onRegisterClick }) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <div className="flex justify-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
      </div>

      <div className="space-y-8">
        {/* Username or Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Username or Email
          </label>
          <input
            type="text"
            placeholder="Enter your username or email"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all text-sm"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all text-sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button className="flex-1 bg-[#3498db] hover:bg-[#2980b9] text-white py-4 rounded-lg font-medium transition-all active:scale-95">
            Login
          </button>

          <button
            onClick={onRegisterClick}
            className="flex-1 bg-[#eeeeee] hover:bg-gray-200 text-gray-700 py-4 rounded-lg font-medium transition-all active:scale-95"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;