import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Sparkles, 
  ArrowRight, 
  Tag, 
  ShieldCheck,
  Check
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    setIsCheckoutOpen,
    showToast
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-purple-100 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-900">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Your Shopping Bag
              </h3>
              <p className="text-xs text-stone-500">
                {cart.length} {cart.length === 1 ? 'case design' : 'case designs'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 text-stone-600 flex items-center justify-center transition-colors border border-purple-100"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 p-4 border-b border-purple-100 text-xs">
          <div className="flex items-center justify-between mb-1.5 font-medium">
            {isFreeShipping ? (
              <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Congratulations! You’ve unlocked FREE Shipping!
              </span>
            ) : (
              <span className="text-purple-900">
                Add <strong className="text-pink-600">₹{amountNeededForFreeShipping}</strong> more for FREE Express Shipping
              </span>
            )}
            <span className="text-stone-500 font-semibold">{Math.round(freeShippingProgress)}%</span>
          </div>

          <div className="w-full h-2 bg-purple-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center text-purple-400 mx-auto text-2xl">
                🦋
              </div>
              <p className="font-serif text-lg text-stone-800 font-semibold">
                Your bag is empty
              </p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our aesthetic cases to give your phone the stylish protection it deserves.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-6 py-2.5 bg-purple-900 text-white rounded-full text-xs font-semibold hover:bg-stone-900 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedModel}`}
                className="flex gap-3.5 p-3 rounded-2xl bg-[#FAF8F5] border border-purple-100/70"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-purple-100 shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-stone-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-purple-700 font-medium truncate mt-0.5">
                        Model: {item.selectedModel}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedModel)}
                      className="text-stone-400 hover:text-red-500 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-purple-50">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-purple-200 rounded-lg bg-white">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedModel, item.quantity - 1)}
                        className="p-1 text-stone-600 hover:text-stone-900"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-stone-800 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedModel, item.quantity + 1)}
                        className="p-1 text-stone-600 hover:text-stone-900"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-stone-900 text-sm tabular-nums">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-purple-100 bg-white space-y-4">
            
            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-xs">
                  <div className="flex items-center gap-1.5 text-purple-900 font-semibold">
                    <Tag className="w-3.5 h-3.5 text-purple-700" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> Applied ({appliedCoupon.discountPercent}% Off)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-500 hover:text-red-500 text-[11px] underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter coupon code (try LUMI10)"
                    className="flex-1 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 hover:bg-purple-950 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponMessage && (
                <p className={`text-[11px] mt-1.5 ${couponMessage.isError ? 'text-red-500' : 'text-emerald-600'}`}>
                  {couponMessage.text}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-stone-900 tabular-nums">₹{cartSubtotal}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-pink-600 font-medium">
                  <span>Discount ({appliedCoupon.discountPercent}%):</span>
                  <span className="tabular-nums">-₹{Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping:</span>
                {isFreeShipping ? (
                  <span className="text-emerald-700 font-semibold">FREE</span>
                ) : (
                  <span className="font-semibold text-stone-900 tabular-nums">₹49</span>
                )}
              </div>

              <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-purple-100">
                <span>Grand Total:</span>
                <span className="tabular-nums text-purple-950">
                  ₹{cartTotal + (isFreeShipping ? 0 : 49)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-6 rounded-2xl bg-purple-950 hover:bg-stone-900 text-white text-xs font-semibold tracking-wide transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe 256-Bit Encrypted Indian Checkout</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
