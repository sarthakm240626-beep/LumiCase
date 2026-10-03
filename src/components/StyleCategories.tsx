import React from 'react';
import { CATEGORIES } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ArrowUpRight } from 'lucide-react';

export const StyleCategories: React.FC = () => {
  const { setActiveCategory, activeCategory } = useShop();

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const el = document.getElementById('shop-section');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="styles-section" className="py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold text-purple-700 bg-purple-100/60 px-3 py-1 rounded-full">
            Curated Aesthetics
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 mt-3 text-balance">
            Find Your Perfect Style
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2.5">
            Every case is an extension of your daily wardrobe. Explore our most coveted design themes.
          </p>
        </div>

        {/* 6 Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`group relative overflow-hidden rounded-2xl bg-white border cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${
                  isSelected
                    ? 'border-purple-600 ring-2 ring-purple-400/40 shadow-md'
                    : 'border-purple-100/70 hover:border-purple-300 shadow-2xs'
                }`}
              >
                {/* Image Container with 4:3 Aspect */}
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/20 to-transparent" />
                  
                  {/* Category Glyph Icon */}
                  <div className="absolute top-2.5 left-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-sm shadow-xs">
                    {cat.icon}
                  </div>

                  {/* Corner Arrow Indicator */}
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-stone-900/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-purple-900 transition-all duration-200">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>

                  {/* Category Name Overlay */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <h3 className="font-semibold text-sm sm:text-base tracking-tight leading-snug drop-shadow-xs">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-purple-200/90 font-medium">
                      {cat.count}
                    </p>
                  </div>
                </div>

                {/* Subtitle bottom bar */}
                <div className="p-2.5 text-center bg-white">
                  <span className="text-[11px] text-stone-500 font-medium block truncate group-hover:text-purple-800 transition-colors">
                    {cat.tagline}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
