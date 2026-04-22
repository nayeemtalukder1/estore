"use client";

import { FC } from 'react';

const MidBanner: FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Background changed to the vibrant Gold/Ochre from your image */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-[#E69F3B] h-[300px] md:h-[500px] flex items-center shadow-2xl">

        {/* Background Image - Positioned right for the model layout */}
        <img
          src="/images/banner.jpg"
          alt="Fashion Boutique"
          className="absolute inset-0 w-full h-full object-cover object-right md:object-center"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Content Overlay */}
        <div className="relative z-10 px-6 md:px-12 lg:px-24 space-y-4 md:space-y-8 max-w-2xl text-left">
          {/* Main Heading with the deep navy/black color */}
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-[#0F172A] leading-[1.1] tracking-tight">
            Fashion <br className="hidden md:block" /> Boutique
          </h2>

          <div className="space-y-1">
            {/* The Electric Purple/Indigo accent */}
            <p className="text-2xl md:text-4xl font-black text-[#0F172A]">
              50% OFF
            </p>
            <p className="text-[10px] md:text-sm text-[#0F172A]/60 font-bold tracking-[0.2em] uppercase">
              LIMITED OFFER
            </p>
          </div>

          {/* Button using the Deep Navy and hover state */}
          <button className="bg-red-600 text-white px-10 md:px-14 py-4 md:py-5 rounded-full font-black shadow-2xl hover:bg-[#0F172A] transition-all active:scale-95 text-xs md:text-sm tracking-widest">
            SHOP NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export default MidBanner;