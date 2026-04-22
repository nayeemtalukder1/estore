"use client";

import { motion } from 'motion/react';
import { FC } from 'react';

// ──────────────────────────────────────────────────────────────
// HERO COMPONENT
// ──────────────────────────────────────────────────────────────

const Hero: FC = () => {
  return (
    <section className="relative bg-[#F8F8F8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 flex flex-col lg:flex-row items-center gap-12">

        {/* Left Content */}
        <div className="flex-1 space-y-8 text-center lg:text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-indigo-600 font-semibold tracking-widest uppercase text-sm">
              Liceria & co.
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-gray-900 leading-tight tracking-tighter">
              FASHION <br /> FORWARD
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-md mx-auto lg:mx-0 mt-4">
              UNBEATABLE DEALS ON FASHION FAVORITES — DISCOUNT UP TO 50% OFF
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-900 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg shadow-xl hover:bg-indigo-600 transition-all active:scale-95"
          >
            SHOP NOW
          </motion.button>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 pt-8 border-t border-gray-200">
            <div className="text-xs md:text-sm text-gray-400">
              Call us: <span className="font-bold text-gray-900">+123-456-7890</span>
            </div>
            <div className="text-xs md:text-sm text-gray-400">
              Visit: <span className="font-bold text-gray-900">www.developergoswami.com</span>
            </div>
          </div>
        </div>

        {/* Right Images Grid */}
        <div className="flex-1 relative grid grid-cols-2 gap-4 w-full">
          {/* Main Large Image */}
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            src="images/hero-3.jpg"
            alt="Fashion Model"
            className="rounded-3xl shadow-2xl object-cover h-[300px] md:h-[500px] w-full"
            referrerPolicy="no-referrer"
            loading="eager"
          />

          {/* Two Smaller Images */}
          <div className="space-y-4">
            <motion.img
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              src="images/hero-1.jpg"
              alt="Fashion Item"
              className="rounded-3xl shadow-xl object-cover h-[140px] md:h-[240px] w-full"
              referrerPolicy="no-referrer"
              loading="lazy"
            />

            <motion.img
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              src="images/hero-2.jpg"
              alt="Fashion Item"
              className="rounded-3xl shadow-xl object-cover h-[140px] md:h-[240px] w-full"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;