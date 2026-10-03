import React from 'react';
import { REVIEWS } from '../data/products';
import { Star, CheckCircle, Quote, Sparkles } from 'lucide-react';

export const SocialProof: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-purple-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-pink-700 bg-pink-50 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>Real Verified Buyers</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 mt-2 text-balance">
            Loved by the LumiCase Community 💕
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2.5">
            Read unvarnished feedback from over 10,000 satisfied phone case lovers across India.
          </p>
        </div>

        {/* 4 Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FAF8F5]/80 rounded-3xl p-6 border border-purple-100/80 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-stone-700 text-sm italic font-normal leading-relaxed mb-4">
                  “{rev.comment}”
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-4 border-t border-purple-100/60 flex items-center gap-3">
                {/* Fallback-styled circular avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-tr from-purple-200 to-pink-200 border-2 border-white shadow-xs shrink-0 flex items-center justify-center text-xs font-bold text-purple-900">
                  {rev.author.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-bold text-stone-900 truncate">
                      {rev.author}
                    </p>
                    {rev.verifiedPurchase && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] text-stone-400 truncate">
                    {rev.location}
                  </p>
                  <p className="text-[10px] font-medium text-purple-800 truncate mt-0.5">
                    Purchased: {rev.productName}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Aggregate Trust Bar */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 rounded-2xl p-6 border border-purple-100 flex flex-wrap items-center justify-around gap-6 text-center text-xs sm:text-sm text-stone-700">
          <div>
            <span className="font-display text-2xl font-bold text-purple-950 block">4.9 / 5.0</span>
            <span className="text-stone-500 text-xs">Average Product Rating</span>
          </div>
          <div className="h-8 w-px bg-purple-200/80 hidden sm:block" />
          <div>
            <span className="font-display text-2xl font-bold text-purple-950 block">10,000+</span>
            <span className="text-stone-500 text-xs">Happy Phone Stylers</span>
          </div>
          <div className="h-8 w-px bg-purple-200/80 hidden sm:block" />
          <div>
            <span className="font-display text-2xl font-bold text-purple-950 block">99.4%</span>
            <span className="text-stone-500 text-xs">Zero-Damage Drop Rate</span>
          </div>
        </div>

      </div>
    </section>
  );
};
