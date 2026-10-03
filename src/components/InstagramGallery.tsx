import React from 'react';
import { INSTAGRAM_POSTS } from '../data/products';
import { Instagram, Heart, Sparkles, ExternalLink } from 'lucide-react';

export const InstagramGallery: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-purple-700 bg-purple-100/80 px-3 py-1 rounded-full mb-2">
            <Instagram className="w-3.5 h-3.5 text-purple-600" />
            <span>Join Our Feed</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 mt-2 text-balance">
            Your Phone. Your Style. #LumiCase
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2.5">
            Tag us in your mirror selfies and flatlays for a chance to be featured in our weekly capsule lookbook.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-900 hover:text-purple-700 mt-3 border-b border-purple-300 pb-0.5 transition-colors"
          >
            <span>Follow @lumicase</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* 6 Images Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-stone-200 border border-purple-100 shadow-2xs hover:shadow-lg transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Instagram Hover Overlay */}
              <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-3 text-white text-center">
                <Instagram className="w-5 h-5 mb-1.5 text-pink-300" />
                <div className="flex items-center gap-1 text-xs font-bold text-white mb-1">
                  <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                  <span>{item.likes}</span>
                </div>
                <p className="text-[10px] text-stone-200 line-clamp-2 leading-tight">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
