import React, { useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Sparkles, ChevronLeft, ChevronRight, Star, Heart, ShoppingBag } from 'lucide-react';

export const BestSellers: React.FC = () => {
  const { 
    selectedGlobalModel, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setSelectedProduct 
  } = useShop();

  const scrollRef = useRef<HTMLDivElement>(null);

  // Take the 4 best seller / highest trending products
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller || p.badge === 'LIMITED EDITION').slice(0, 4);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="best-sellers" className="py-16 bg-gradient-to-b from-[#FAF8F5] via-[#FBF7FC] to-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Carousel Controls */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-purple-700 bg-purple-100/70 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Trending All Over India</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
              ✨ Our Best Sellers
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2">
              The aesthetic cases that sell out in hours. Loved for their 3D textures, pavé crystals and mirror shine.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-purple-200 bg-white hover:bg-purple-50 text-stone-700 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
              aria-label="Previous best sellers"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-purple-200 bg-white hover:bg-purple-50 text-stone-700 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
              aria-label="Next best sellers"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
        >
          {bestSellers.map((product) => {
            const isFav = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                className="flex-none w-72 sm:w-80 group bg-white rounded-3xl p-4 border border-purple-100/80 shadow-xs hover:shadow-xl hover:border-purple-200 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Frame */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-50">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    onClick={() => setSelectedProduct(product)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white shadow-xs ${
                        product.badge === 'BEST SELLER' 
                          ? 'bg-purple-900' 
                          : product.badge === 'LIMITED EDITION'
                          ? 'bg-pink-600'
                          : 'bg-amber-500'
                      }`}>
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Wishlist Heart */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                      isFav 
                        ? 'bg-pink-500 text-white' 
                        : 'bg-white/90 text-stone-600 hover:text-pink-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Details */}
                <div className="pt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-amber-500 mb-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-semibold text-stone-900">{product.rating}</span>
                      <span className="text-stone-400">({product.reviewCount} reviews)</span>
                    </div>

                    <h3
                      onClick={() => setSelectedProduct(product)}
                      className="font-serif text-lg font-semibold text-stone-900 hover:text-purple-900 cursor-pointer transition-colors"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                      {product.tagline}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-purple-50">
                    <div className="flex items-baseline justify-between mb-3">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-bold text-stone-900 tabular-nums">
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-stone-400 line-through tabular-nums">
                          ₹{product.originalPrice}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full">
                        {product.discountPercent}% OFF
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product, selectedGlobalModel, 1)}
                      className="w-full py-2.5 px-4 rounded-xl bg-purple-900 hover:bg-purple-950 text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
