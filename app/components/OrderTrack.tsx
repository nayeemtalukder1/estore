"use client";

import { useState, FC } from 'react';
import {
  LayoutDashboard,
  ShoppingBasket,
  Download,
  MapPin,
  Settings,
  LogOut,
  Eye,
  FileText,
} from 'lucide-react';

// ──────────────────────────────────────────────────────────────
// TYPES
// ──────────────────────────────────────────────────────────────

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  itemCount: number;
}

// ──────────────────────────────────────────────────────────────
// ORDER TRACKING COMPONENT
// ──────────────────────────────────────────────────────────────

const OrderTrack: FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-4xl">
        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10">
          To track your order please enter your Order ID in the box below and press the "Track" button.
          This was given to you on your receipt and in the confirmation email you should have received.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-900">Order ID</label>
            <input
              type="text"
              placeholder="Found in your order confirmation email."
              className="w-full px-6 py-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all text-sm"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-900">Billing email</label>
            <input
              type="email"
              placeholder="Email you used during checkout."
              className="w-full px-6 py-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all text-sm"
            />
          </div>
        </div>

        <button className="bg-indigo-700 text-white px-10 py-4 rounded-full font-bold text-sm shadow-xl shadow-indigo-700/20 hover:bg-indigo-800 transition-all active:scale-95">
          Track Order
        </button>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────
// USER DASHBOARD COMPONENT
// ──────────────────────────────────────────────────────────────

const UserDashboard: FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Orders');

  const menuItems = [
    { id: 'Dashboard', icon: LayoutDashboard },
    { id: 'Orders', icon: ShoppingBasket },
    { id: 'Downloads', icon: Download },
    { id: 'Addresses', icon: MapPin },
    { id: 'Account details', icon: Settings },
    { id: 'Log out', icon: LogOut },
  ] as const;

  const sampleOrder: Order = {
    id: '#180',
    date: 'March 2, 2026',
    status: 'Processing',
    total: 7747,
    itemCount: 6,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-64 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-bold text-sm transition-all ${activeTab === item.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-indigo-600'
                  }`}
              >
                <Icon className="w-5 h-5" />
                {item.id}
              </button>
            );
          })}
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm">
          {activeTab === 'Orders' ? (
            <div className="space-y-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="py-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Order</th>
                      <th className="py-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="py-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="py-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Total</th>
                      <th className="py-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-50 group hover:bg-gray-50/50 transition-colors">
                      <td className="py-8 font-bold text-gray-900">{sampleOrder.id}</td>
                      <td className="py-8 text-gray-500">{sampleOrder.date}</td>
                      <td className="py-8">
                        <span className="px-4 py-1.5 bg-yellow-50 text-yellow-600 rounded-full text-xs font-bold uppercase tracking-wider">
                          {sampleOrder.status}
                        </span>
                      </td>
                      <td className="py-8 text-gray-500">
                        <span className="font-bold text-gray-900">
                          ৳{sampleOrder.total.toLocaleString()}
                        </span>{' '}
                        for {sampleOrder.itemCount} items
                      </td>
                      <td className="py-8">
                        <div className="flex gap-3">
                          <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">
                            View
                          </button>
                          <button className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-lg hover:bg-indigo-600 transition-all">
                            Invoice
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
              <div className="p-6 bg-gray-50 rounded-full">
                <Settings className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{activeTab} Section</h3>
              <p className="text-gray-500 max-w-xs">
                This section is currently under development. Please check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { OrderTrack, UserDashboard };