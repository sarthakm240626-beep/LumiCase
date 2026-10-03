import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Sparkles, ArrowRight, Heart, ShoppingBag, Star } from 'lucide-react';

export const NewArrivals: React.FC = () => {
  const {
    selectedGlobalModel,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct,
    setActiveCategory
  } = useShop();

  const newDrops = PRODUCTS.filter(p => p.isNewArrival || p.badge === 'NEW');

  const handleViewAll = () => {
    setActiveCategory('All');
    const el = document.getElementById('shop-section');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="new-arrivals" className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-purple-700 bg-purple-100/70 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Just Unveiled</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
              Fresh Drops ✨
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2">
              Our newest weekly capsule releases, fresh from the design studio.
            </p>
          </div>

          <button
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 text-xs font-semibold text-purple-900 hover:text-purple-700 bg-white border border-purple-200 hover:border-purple-300 px-5 py-2.5 rounded-full shadow-2xs hover:shadow-xs transition-all cursor-pointer self-start sm:self-auto"
          >
            <span>View All Cases</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {newDrops.map((product) => {
            const isFav = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-3xl p-3.5 border border-purple-100/80 shadow-xs hover:shadow-xl hover:border-purple-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-50">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    onClick={() => setSelectedProduct(product)}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 cursor-pointer"
                  />

                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-700 text-white shadow-xs">
                      NEW DROP
                    </span>
                  </div>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                      isFav 
                        ? 'bg-pink-500 text-white' 
                        : 'bg-white/90 text-stone-600 hover:text-pink-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="pt-3.5 pb-1 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-amber-500 mb-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="font-semibold text-stone-900 text-[11px]">{product.rating}</span>
                      <span className="text-[11px] text-stone-400">({product.reviewCount})</span>
                    </div>

                    <h3
                      onClick={() => setSelectedProduct(product)}
                      className="font-serif text-base font-semibold text-stone-900 hover:text-purple-900 cursor-pointer transition-colors line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                      {product.tagline}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-purple-50">
                    <div className="flex items-baseline justify-between mb-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-semibold text-stone-900 text-base tabular-nums">
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-stone-400 line-through tabular-nums">
                          ₹{product.originalPrice}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-pink-600 bg-pink-50 px-1.5 py-0.2 rounded">
                        {product.discountPercent}% OFF
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product, selectedGlobalModel, 1)}
                      className="w-full py-2 px-3 rounded-xl bg-purple-900 hover:bg-stone-900 text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
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
