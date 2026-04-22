"use client";

import { FC } from 'react';
import { Truck, ShieldCheck, RotateCcw } from 'lucide-react';

// ──────────────────────────────────────────────────────────────
// SERVICE HIGHLIGHTS COMPONENT
// ──────────────────────────────────────────────────────────────

const ServiceHighlights: FC = () => {
  const services = [
    {
      icon: Truck,
      title: "Fast, Free Shipping",
      desc: "On order over ৳5000",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      desc: "100% secure payment methods",
    },
    {
      icon: RotateCcw,
      title: "60-day Return Policy",
      desc: "Easy returns within 60 days",
    },
  ] as const;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-y border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-4 justify-center md:justify-start group"
            >
              <div className="p-4 bg-indigo-50 rounded-2xl transition-colors group-hover:bg-indigo-100">
                <Icon className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{service.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{service.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServiceHighlights;