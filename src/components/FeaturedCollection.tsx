import React, { useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, PHONE_MODELS } from '../data/products';
import { Product } from '../types';
import { Star, Heart, Eye, ShoppingBag, Sparkles, Filter, Check } from 'lucide-react';

export const FeaturedCollection: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    selectedGlobalModel,
    setSelectedGlobalModel,
    sortBy,
    setSortBy,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct,
    setQuickViewProduct
  } = useShop();

  const categories = ['All', 'Butterfly', 'Floral', 'Glitter & Sparkle', 'Cute & Bow', 'Luxury', 'Minimal'];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, sortBy]);

  return (
    <section id="shop-section" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3 h-3 text-purple-600" />
              <span>Signature Catalog</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
              Made to Match Your Vibe
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl">
              Protective cases that turn your everyday phone into a fashion statement. Certified 10ft drop protection meets soft pastel glamour.
            </p>
          </div>

          {/* Device Model Selector Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-[#FAF8F5] border border-purple-200/80 rounded-2xl p-2.5 flex items-center gap-2">
              <span className="text-xs text-stone-500 font-medium">Device:</span>
              <select
                value={selectedGlobalModel}
                onChange={(e) => setSelectedGlobalModel(e.target.value)}
                className="bg-white border border-stone-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer"
              >
                {PHONE_MODELS.map((p) => (
                  <option key={p.model} value={p.model}>
                    {p.model}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Selector */}
            <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-2.5 flex items-center gap-2">
              <span className="text-xs text-stone-500 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-stone-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer"
              >
                <option value="featured">Featured Picks</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-5 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-purple-900 text-white shadow-xs'
                    : 'bg-stone-50 hover:bg-purple-50 text-stone-700 border border-stone-200/80 hover:border-purple-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selectedModel={selectedGlobalModel}
              isFavorited={isInWishlist(product.id)}
              onToggleWishlist={() => toggleWishlist(product)}
              onAddToCart={() => addToCart(product, selectedGlobalModel, 1)}
              onOpenDetails={() => setSelectedProduct(product)}
              onQuickView={() => setQuickViewProduct(product)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-stone-500 text-sm">No phone cases found in this category.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-3 px-4 py-2 bg-purple-100 text-purple-900 rounded-lg text-xs font-semibold"
            >
              Reset Category
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  selectedModel: string;
  isFavorited: boolean;
  onToggleWishlist: () => void;
  onAddToCart: () => void;
  onOpenDetails: () => void;
  onQuickView: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  selectedModel,
  isFavorited,
  onToggleWishlist,
  onAddToCart,
  onOpenDetails,
  onQuickView
}) => {
  return (
    <div className="group relative bg-[#FAF8F5]/60 hover:bg-white rounded-3xl p-3 sm:p-3.5 border border-purple-100/70 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-950/5 transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Media Frame */}
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-stone-100">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          onClick={onOpenDetails}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 cursor-pointer"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-2xs ${
              product.badge === 'BEST SELLER' 
                ? 'bg-purple-900 text-white' 
                : product.badge === 'LIMITED EDITION'
                ? 'bg-pink-600 text-white'
                : product.badge === 'TRENDING'
                ? 'bg-amber-500 text-white'
                : 'bg-indigo-600 text-white'
            }`}>
              {product.badge}
            </span>
          )}
          {product.charmIncluded && (
            <span className="bg-white/95 text-purple-900 border border-purple-200 px-2 py-0.5 rounded-full text-[10px] font-semibold shadow-2xs backdrop-blur-xs">
              + Free Wristlet Charm
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs z-10 ${
            isFavorited 
              ? 'bg-pink-500 text-white scale-105' 
              : 'bg-white/90 text-stone-600 hover:text-pink-600 hover:bg-white'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Floating Action Bar on Hover */}
        <div className="absolute inset-x-2.5 bottom-2.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView();
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-white/95 backdrop-blur-md hover:bg-white text-stone-800 text-[11px] font-semibold shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-purple-700" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="pt-3.5 pb-1 flex-1 flex flex-col">
        {/* Rating & Review Count */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
          <div className="flex items-center gap-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'}`}
                />
              ))}
            </div>
            <span className="font-semibold text-stone-800 text-[11px]">{product.rating}</span>
            <span className="text-[11px] text-stone-400">({product.reviewCount})</span>
          </div>

          <span className="text-[10px] text-purple-700 font-medium bg-purple-50 px-1.5 py-0.5 rounded">
            {product.category}
          </span>
        </div>

        {/* Product Title */}
        <h3
          onClick={onOpenDetails}
          className="font-serif text-base font-semibold text-stone-900 hover:text-purple-900 transition-colors cursor-pointer line-clamp-1 mt-0.5"
        >
          {product.name}
        </h3>

        {/* Short description */}
        <p className="text-xs text-stone-500 line-clamp-1 mt-1 mb-3">
          {product.tagline}
        </p>

        {/* Pricing Row & Compatibility Tag */}
        <div className="mt-auto pt-2 border-t border-purple-100/60">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="font-semibold text-stone-900 text-lg tabular-nums">
                ₹{product.price}
              </span>
              <span className="text-xs text-stone-400 line-through tabular-nums">
                ₹{product.originalPrice}
              </span>
              <span className="text-[11px] font-bold text-pink-600 bg-pink-50 px-1.5 py-0.2 rounded">
                -{product.discountPercent}%
              </span>
            </div>
          </div>

          {/* Model Fit Indicator */}
          <div className="mt-1 text-[11px] text-stone-400 truncate">
            Fits: <span className="font-medium text-stone-700">{selectedModel}</span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={onAddToCart}
            className="w-full mt-3 py-2.5 px-4 rounded-xl bg-purple-950 hover:bg-stone-900 text-white text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-2xs hover:shadow-md cursor-pointer group-hover:bg-purple-900"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>

      </div>

    </div>
  );
};
