"use client";

import { FC } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

// ──────────────────────────────────────────────────────────────
// TYPES
// ──────────────────────────────────────────────────────────────

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

// ──────────────────────────────────────────────────────────────
// REVIEWS COMPONENT
// ──────────────────────────────────────────────────────────────

const Reviews: FC = () => {
  // Mock data (you can move this to a shared data file later)
  const REVIEWS: Review[] = [
    {
      id: 1,
      name: "Rahul Sharma",
      rating: 5,
      text: "I absolutely love the women's collection! The fabric quality is amazing and the designs are so elegant. Will definitely shop again.",
      date: "7 Day Ago",
      avatar: "https://i.pravatar.cc/150?u=rahul",
    },
    {
      id: 2,
      name: "Priya Verma",
      rating: 5,
      text: "The men's shirts fit perfectly and the material feels premium. Fast delivery and great packaging too!",
      date: "10.04.2018",
      avatar: "https://i.pravatar.cc/150?u=priya",
    },
  ];

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">
            Customer Review
          </h2>
          <div className="h-1.5 w-20 bg-indigo-600 mx-auto mt-2 rounded-full" />
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white p-10 rounded-3xl shadow-sm space-y-6 relative"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-200'
                      }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-lg leading-relaxed italic">
                "{review.text}"
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows (Decorative - visible only on large screens) */}
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 hidden lg:block">
            <button className="p-3 bg-white rounded-full shadow-lg text-gray-400 hover:text-indigo-600 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute top-1/2 -right-4 -translate-y-1/2 hidden lg:block">
            <button className="p-3 bg-white rounded-full shadow-lg text-gray-400 hover:text-indigo-600 transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-12">
          <div className="w-2 h-2 rounded-full bg-indigo-600" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
        </div>
      </div>
    </section>
  );
};

export default Reviews;