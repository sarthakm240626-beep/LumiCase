import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { PHONE_MODELS, PRODUCTS } from '../data/products';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Smartphone,
  Plus,
  Minus,
  Zap
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    selectedGlobalModel,
    setIsCheckoutOpen
  } = useShop();

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [chosenModel, setChosenModel] = useState(selectedGlobalModel);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'shipping'>('details');

  useEffect(() => {
    if (selectedProduct) {
      setActiveImgIdx(0);
      setQuantity(1);
      setChosenModel(selectedGlobalModel);
    }
  }, [selectedProduct, selectedGlobalModel]);

  if (!selectedProduct) return null;

  const isFavorited = isInWishlist(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, chosenModel, quantity);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, chosenModel, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const relatedProducts = PRODUCTS.filter(p => p.id !== selectedProduct.id).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          
          {/* Left Media Column (Gallery) */}
          <div className="md:col-span-6 p-5 sm:p-8 bg-[#FAF8F5] flex flex-col justify-between border-b md:border-b-0 md:border-r border-purple-100">
            <div>
              {/* Main Active Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-sm border border-purple-100">
                <img
                  src={selectedProduct.images[activeImgIdx] || selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />

                {/* Badge */}
                {selectedProduct.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-purple-900 text-white shadow-xs">
                    {selectedProduct.badge}
                  </span>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(selectedProduct)}
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                    isFavorited ? 'bg-pink-500 text-white' : 'bg-white/90 text-stone-700 hover:text-pink-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Gallery Thumbnails */}
              {selectedProduct.images.length > 1 && (
                <div className="flex gap-2.5 mt-3">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIdx(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImgIdx === idx 
                          ? 'border-purple-600 ring-2 ring-purple-300' 
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quality Seals */}
            <div className="mt-6 pt-5 border-t border-purple-100/70 grid grid-cols-3 gap-2 text-center text-[11px] text-stone-600">
              <div className="p-2 rounded-xl bg-white border border-purple-50">
                <ShieldCheck className="w-4 h-4 text-purple-700 mx-auto mb-1" />
                <span className="font-semibold text-stone-800 block">10ft Certified</span>
                <span>Drop Proof</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-purple-50">
                <Truck className="w-4 h-4 text-purple-700 mx-auto mb-1" />
                <span className="font-semibold text-stone-800 block">Express Delivery</span>
                <span>Pan-India</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-purple-50">
                <RotateCcw className="w-4 h-4 text-purple-700 mx-auto mb-1" />
                <span className="font-semibold text-stone-800 block">7-Day Return</span>
                <span>Zero Hassle</span>
              </div>
            </div>
          </div>

          {/* Right Product Purchase Form & Info */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {selectedProduct.category}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-stone-800">{selectedProduct.rating}</span>
                  <span>({selectedProduct.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {selectedProduct.name}
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  {selectedProduct.tagline}
                </p>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                  ₹{selectedProduct.price}
                </span>
                <span className="text-sm text-stone-400 line-through tabular-nums">
                  ₹{selectedProduct.originalPrice}
                </span>
                <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md">
                  SAVE {selectedProduct.discountPercent}%
                </span>
              </div>

              <div className="text-[11px] text-stone-500">
                Inclusive of all taxes • <span className="text-emerald-700 font-medium">In Stock & Ready to Ship</span>
              </div>

              {/* Phone Model Selector */}
              <div className="pt-2">
                <label className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-purple-700" />
                    Select Phone Model:
                  </span>
                  <span className="text-purple-600 font-normal">Compatible with 16+ models</span>
                </label>
                <select
                  value={chosenModel}
                  onChange={(e) => setChosenModel(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-purple-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  {PHONE_MODELS.map((p) => (
                    <option key={p.model} value={p.model}>
                      {p.model}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-1.5">
                  Quantity:
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-stone-600 hover:text-stone-900 shadow-2xs"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-10 text-center text-xs font-bold text-stone-800 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-stone-600 hover:text-stone-900 shadow-2xs"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-xs text-stone-400">
                    Total: <strong className="text-stone-800">₹{selectedProduct.price * quantity}</strong>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-5 rounded-2xl bg-purple-950 hover:bg-stone-900 text-white text-xs font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white text-xs font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Expandable Tabs */}
              <div className="pt-4 border-t border-purple-100">
                <div className="flex items-center gap-4 text-xs font-semibold border-b border-stone-100 pb-2">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-1 transition-colors cursor-pointer ${
                      activeTab === 'details' ? 'text-purple-900 border-b-2 border-purple-900' : 'text-stone-400'
                    }`}
                  >
                    Features
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-1 transition-colors cursor-pointer ${
                      activeTab === 'specs' ? 'text-purple-900 border-b-2 border-purple-900' : 'text-stone-400'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-1 transition-colors cursor-pointer ${
                      activeTab === 'shipping' ? 'text-purple-900 border-b-2 border-purple-900' : 'text-stone-400'
                    }`}
                  >
                    Shipping & Returns
                  </button>
                </div>

                <div className="pt-3 text-xs text-stone-600">
                  {activeTab === 'details' && (
                    <ul className="space-y-1.5">
                      {selectedProduct.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'specs' && (
                    <div className="space-y-2">
                      <p><strong>Materials:</strong> {selectedProduct.materials}</p>
                      <p><strong>Drop Protection:</strong> Certified up to 10ft military spec standard</p>
                      <p><strong>Wireless Charging:</strong> Fully compatible with Qi & MagSafe chargers</p>
                    </div>
                  )}

                  {activeTab === 'shipping' && (
                    <div className="space-y-2">
                      <p>🚀 <strong>Fast Pan-India Delivery:</strong> Dispatches within 24 hours. Metros arrive in 2-3 business days.</p>
                      <p>📦 <strong>Free Shipping:</strong> On all orders above ₹499.</p>
                      <p>🔄 <strong>7-Day Returns:</strong> Wrong size or changed your mind? Enjoy easy doorstep pickup and refund.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* You May Also Like */}
            <div className="pt-6 mt-6 border-t border-purple-100">
              <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-3">
                You May Also Like
              </h4>
              <div className="grid grid-cols-3 gap-2.5">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => setSelectedProduct(rel)}
                    className="p-1.5 rounded-xl border border-purple-100 bg-[#FAF8F5] hover:bg-white transition-colors cursor-pointer text-left"
                  >
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-white mb-1">
                      <img
                        src={rel.images[0]}
                        alt={rel.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-[10px] font-semibold text-stone-800 truncate">{rel.name}</p>
                    <p className="text-[10px] font-bold text-purple-900">₹{rel.price}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
