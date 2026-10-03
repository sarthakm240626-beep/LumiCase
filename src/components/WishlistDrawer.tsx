import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    selectedGlobalModel,
    setSelectedProduct
  } = useShop();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-purple-100 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                My Wishlist
              </h3>
              <p className="text-xs text-stone-500">
                {wishlist.length} saved {wishlist.length === 1 ? 'case' : 'cases'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 text-stone-600 flex items-center justify-center transition-colors border border-purple-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-pink-400 mx-auto text-2xl">
                💖
              </div>
              <p className="font-serif text-lg text-stone-800 font-semibold">
                Your wishlist is empty
              </p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Tap the heart on any phone case design to keep track of your favorites.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="mt-2 px-6 py-2.5 bg-purple-900 text-white rounded-full text-xs font-semibold hover:bg-stone-900 transition-colors"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="flex gap-3.5 p-3 rounded-2xl bg-[#FAF8F5] border border-purple-100/70"
              >
                <div
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsWishlistOpen(false);
                  }}
                  className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-purple-100 shrink-0 cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsWishlistOpen(false);
                        }}
                        className="font-serif text-sm font-bold text-stone-900 truncate cursor-pointer hover:text-purple-900"
                      >
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 truncate mt-0.5">
                        {product.category} • Fits {selectedGlobalModel.split(' ')[0]}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleWishlist(product)}
                      className="text-stone-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-purple-50">
                    <span className="font-bold text-stone-900 text-sm tabular-nums">
                      ₹{product.price}
                    </span>

                    <button
                      onClick={() => {
                        addToCart(product, selectedGlobalModel, 1);
                        toggleWishlist(product);
                      }}
                      className="py-1.5 px-3 rounded-xl bg-purple-900 hover:bg-stone-900 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlist.length > 0 && (
          <div className="p-5 border-t border-purple-100 bg-white">
            <button
              onClick={() => {
                wishlist.forEach((p) => addToCart(p, selectedGlobalModel, 1));
                setIsWishlistOpen(false);
              }}
              className="w-full py-3 px-4 rounded-2xl bg-purple-900 hover:bg-purple-950 text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add All to Bag</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
