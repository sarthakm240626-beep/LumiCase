import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PHONE_MODELS } from '../data/products';
import { X, Star, Heart, ShoppingBag, Eye, Smartphone } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    selectedGlobalModel,
    setSelectedProduct
  } = useShop();

  const [model, setModel] = useState(selectedGlobalModel);

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleFullDetails = () => {
    const prod = quickViewProduct;
    setQuickViewProduct(null);
    setSelectedProduct(prod);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-purple-100 p-6 overflow-hidden">
        
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col sm:flex-row gap-5 items-center">
          <div className="w-full sm:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-purple-100 shrink-0">
            <img
              src={quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full sm:w-1/2 space-y-2.5 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                {quickViewProduct.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-500">
                <Star className="w-3 h-3 fill-current" />
                <span className="font-semibold text-stone-800">{quickViewProduct.rating}</span>
              </div>
            </div>

            <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
              {quickViewProduct.name}
            </h3>

            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-stone-900 tabular-nums">
                ₹{quickViewProduct.price}
              </span>
              <span className="text-xs text-stone-400 line-through tabular-nums">
                ₹{quickViewProduct.originalPrice}
              </span>
              <span className="text-[10px] font-bold text-pink-600">
                {quickViewProduct.discountPercent}% OFF
              </span>
            </div>

            <div className="pt-1">
              <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                Choose Device:
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-purple-200 rounded-lg px-2 py-1.5 text-xs text-stone-800"
              >
                {PHONE_MODELS.map((p) => (
                  <option key={p.model} value={p.model}>
                    {p.model}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  addToCart(quickViewProduct, model, 1);
                  setQuickViewProduct(null);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-purple-900 hover:bg-purple-950 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors ${
                  isFavorited
                    ? 'bg-pink-500 text-white border-pink-500'
                    : 'border-stone-200 text-stone-600 hover:text-pink-600 bg-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleFullDetails}
              className="w-full text-center text-xs text-purple-700 hover:text-purple-900 font-medium pt-1 cursor-pointer"
            >
              View Full Product Details →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
