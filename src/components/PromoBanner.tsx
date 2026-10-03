import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';
import mirrorImg from '../assets/images/case_mirror_glam_1790836164355.jpg';
import blossomImg from '../assets/images/case_pink_blossom_1790836140050.jpg';

export const PromoBanner: React.FC = () => {
  const { setActiveCategory } = useShop();

  const handleShopNow = () => {
    setActiveCategory('All');
    const el = document.getElementById('shop-section');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Container */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#F3E8FF] via-[#FCE7F3] to-[#EDE9FE] border border-purple-200/80 p-8 sm:p-12 lg:p-16 shadow-xl shadow-purple-900/5">
          
          {/* Subtle Ambient Decorative Sparkles and Butterflies */}
          <div className="absolute top-6 left-12 text-3xl opacity-60 select-none animate-float-slow">🦋</div>
          <div className="absolute bottom-8 left-1/3 text-2xl opacity-50 select-none animate-float-delayed">🌸</div>
          <div className="absolute top-10 right-1/4 text-2xl opacity-60 select-none animate-pulse-soft">✨</div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-pink-300/30 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Promotion Copy */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-xs text-xs font-semibold text-purple-900 border border-purple-200">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>LIMITED TIME OFFER • FLAT DISCOUNTS</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 leading-tight">
                Upgrade Your Phone’s Look
              </h2>

              <p className="text-base sm:text-xl font-medium text-purple-950">
                Stylish protection starting from{' '}
                <span className="font-bold underline decoration-pink-400 decoration-2 underline-offset-4">
                  ₹299
                </span>
              </p>

              <p className="text-sm text-stone-600 max-w-lg mx-auto lg:mx-0">
                Crafted with shock-resistant Bayer TPU, raised camera bezels, and dazzling 3D embellishments. Elevate every mirror selfie with luxury phone aesthetics.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={handleShopNow}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-stone-900 hover:bg-purple-950 text-white text-sm font-semibold tracking-wide shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-4 text-xs text-purple-900 font-medium">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-purple-700" />
                    <span>10ft Drop Proof</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-pink-700" />
                    <span>2-3 Day Metro Delivery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Pair Mockup */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                {/* Image 1 */}
                <div className="w-44 sm:w-52 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white -rotate-6 transform hover:rotate-0 transition-transform duration-300">
                  <img
                    src={blossomImg}
                    alt="Blossom Case Promo"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Image 2 */}
                <div className="w-44 sm:w-52 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white rotate-6 -ml-12 transform hover:rotate-0 transition-transform duration-300">
                  <img
                    src={mirrorImg}
                    alt="Mirror Glam Case Promo"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
