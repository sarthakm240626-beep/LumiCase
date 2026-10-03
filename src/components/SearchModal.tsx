import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Search, X, Star, ArrowRight, Sparkles } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setSelectedProduct, addToCart, selectedGlobalModel } = useShop();
  const [searchTerm, setSearchTerm] = useState('');

  const quickTags = ['Butterfly', 'Floral', 'Galaxy A37', 'Glitter', 'Bow', 'Mirror', 'Pink', 'Lavender'];

  const results = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.tagline.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-start justify-center pt-16 px-4 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-purple-100 flex items-center gap-3 bg-[#FAF8F5]">
          <Search className="w-5 h-5 text-purple-700 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search cases, aesthetics, or designs (e.g. Butterfly, Floral, Mirror)..."
            className="flex-1 bg-transparent text-sm sm:text-base text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-stone-400 hover:text-stone-600 text-xs px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 text-stone-600 flex items-center justify-center transition-colors border border-purple-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-5 py-3 bg-white border-b border-stone-100 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-stone-400 shrink-0 font-medium">Trending:</span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="px-2.5 py-1 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-900 font-medium text-[11px] whitespace-nowrap transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-3">
          {searchTerm.trim() === '' ? (
            <div className="py-12 text-center text-xs text-stone-400">
              <Sparkles className="w-6 h-6 text-purple-300 mx-auto mb-2 animate-pulse" />
              <span>Type anything above to search our curated phone cases</span>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-stone-700 font-semibold text-sm">No cases found for "{searchTerm}"</p>
              <p className="text-stone-400 text-xs mt-1">Try searching for "Butterfly", "Floral", or "Mirror"</p>
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setIsSearchOpen(false);
                }}
                className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-[#FAF8F5] hover:bg-purple-50/60 border border-purple-100/60 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-purple-100 shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-stone-900 group-hover:text-purple-900 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 line-clamp-1">
                      {product.tagline}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[11px]">
                      <span className="font-bold text-stone-900">₹{product.price}</span>
                      <span className="text-stone-400 line-through">₹{product.originalPrice}</span>
                      <span className="text-purple-700 font-semibold">{product.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, selectedGlobalModel, 1);
                      setIsSearchOpen(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-purple-900 hover:bg-stone-900 text-white text-xs font-semibold"
                  >
                    Add
                  </button>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-purple-900 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
