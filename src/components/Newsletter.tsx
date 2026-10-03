import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Check, ArrowRight, Copy } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { applyCoupon, showToast, setIsCartOpen } = useShop();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitted(true);
    showToast('Welcome to the LumiCase Family! ✨', 'Use code LUMI10 for 10% off');
  };

  const handleApplyCoupon = () => {
    applyCoupon('LUMI10');
    setIsCopied(true);
    showToast('Code LUMI10 Applied!', '10% discount added to your cart');
    setTimeout(() => {
      setIsCartOpen(true);
    }, 400);
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-[#FAF5FF] via-[#FDF2F8] to-[#EEF2FF] border border-purple-200/80 p-8 sm:p-12 text-center shadow-lg shadow-purple-900/5">
          
          {/* Subtle Decorative Elements */}
          <div className="absolute top-4 left-6 text-2xl select-none opacity-40 animate-float-slow">🦋</div>
          <div className="absolute bottom-4 right-6 text-2xl select-none opacity-40 animate-float-delayed">✨</div>

          {/* Icon Badge */}
          <div className="w-12 h-12 rounded-2xl bg-white border border-purple-200 flex items-center justify-center mx-auto mb-4 text-purple-700 shadow-2xs">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
            Get 10% Off Your First Case ✨
          </h2>

          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto mt-3 leading-relaxed">
            Join the LumiCase family and be the first to know about new drops, exclusive offers and limited collections.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3.5 rounded-full bg-white border border-purple-200 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-2xs"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-full bg-stone-900 hover:bg-purple-950 text-white text-xs font-semibold tracking-wide shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                Get My 10% Off
              </button>
            </form>
          ) : (
            <div className="mt-6 p-4 rounded-2xl bg-white/90 border border-purple-200 max-w-md mx-auto animate-fadeIn">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700 mb-1">
                <Check className="w-4 h-4" />
                <span>You’re on the VIP list!</span>
              </div>
              <p className="text-xs text-stone-600 mb-3">
                Your 10% welcome promo code is ready:
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-base font-bold bg-purple-100 text-purple-950 px-3 py-1.5 rounded-xl border border-purple-200 tracking-wider">
                  LUMI10
                </span>
                <button
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 rounded-xl bg-purple-900 hover:bg-purple-950 text-white text-xs font-semibold flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{isCopied ? 'Applied!' : 'Apply to Bag'}</span>
                </button>
              </div>
            </div>
          )}

          <p className="text-[11px] text-stone-400 mt-4">
            No spam ever. Unsubscribe with a single click anytime.
          </p>

        </div>

      </div>
    </section>
  );
};
