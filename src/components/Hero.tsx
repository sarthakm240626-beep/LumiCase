import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Star } from 'lucide-react';
import heroImg from '../assets/images/hero_butterfly_case_1790836123777.jpg';
import { PRODUCTS } from '../data/products';

export const Hero: React.FC = () => {
  const { setSelectedProduct, addToCart, selectedGlobalModel, setActiveCategory } = useShop();
  const heroProduct = PRODUCTS[0]; // Butterfly Dreams Case

  const scrollToShop = () => {
    const el = document.getElementById('shop-section');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToNewArrivals = () => {
    setActiveCategory('All');
    const el = document.getElementById('new-arrivals');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="top" className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-[#FDFBF9] via-[#F9F5FD] to-[#FAF8F5]">
      {/* Delicate background ambient gradient spheres */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-indigo-100/40 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 lg:pr-6 text-center lg:text-left">
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-purple-200/80 shadow-2xs text-xs font-semibold text-purple-900 tracking-wide">
              <span className="text-purple-600">✨</span>
              <span>MAKE YOUR PHONE UNFORGETTABLE</span>
              <span className="text-purple-300">|</span>
              <span className="text-stone-500 font-normal">Aesthetic Tech Couture</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-stone-900 leading-[1.12] text-balance">
              Your Phone Deserves a{' '}
              <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-pink-600 to-purple-900">
                Little More Magic.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover aesthetic phone cases designed to protect your phone and express your personality. Featuring 3D butterflies, pressed florals, holographic glitter, and luxury mirror accents.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={scrollToShop}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-stone-900 hover:bg-purple-950 text-white text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToNewArrivals}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/90 hover:bg-purple-50/80 text-purple-950 border border-purple-200 text-sm font-semibold tracking-wide shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer"
              >
                Explore New Arrivals
              </button>
            </div>

            {/* Trust and Social Proof strip */}
            <div className="pt-4 border-t border-purple-100/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  <span className="w-6 h-6 rounded-full bg-pink-100 border border-white flex items-center justify-center text-[10px]">🌸</span>
                  <span className="w-6 h-6 rounded-full bg-purple-100 border border-white flex items-center justify-center text-[10px]">🦋</span>
                  <span className="w-6 h-6 rounded-full bg-indigo-100 border border-white flex items-center justify-center text-[10px]">✨</span>
                </div>
                <span className="font-medium text-stone-800">Loved by 10,000+ style lovers</span>
              </div>

              <div className="flex items-center gap-1.5 text-stone-500">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-stone-800">4.9/5</span>
                <span>(3,200+ reviews)</span>
              </div>

              <div className="flex items-center gap-1 text-emerald-700 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>10ft Drop Certified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Phone Case & Floating Elements */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/50 via-pink-200/40 to-transparent rounded-3xl -rotate-2 transform scale-105 filter blur-lg -z-10" />

            {/* Main Showcase Card */}
            <div className="relative w-full max-w-md bg-white rounded-3xl p-4 sm:p-5 shadow-2xl shadow-purple-900/10 border border-purple-100/90 group transition-all duration-300">
              
              {/* Product Image Frame */}
              <div 
                onClick={() => setSelectedProduct(heroProduct)}
                className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-stone-100 cursor-pointer"
              >
                <img
                  src={heroImg}
                  alt="LumiCase Butterfly Dreams Aesthetic Case"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-semibold px-3 py-1.5 rounded-full bg-white/25 backdrop-blur-md">
                    Click to View Details ✨
                  </span>
                </div>

                {/* Badge Tag */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider text-purple-900 border border-purple-100 shadow-2xs">
                  FEATURED DROP
                </div>

                {/* Compatibility marker */}
                <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-medium text-white shadow-2xs">
                  {selectedGlobalModel}
                </div>
              </div>

              {/* Product Info below preview */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 
                    onClick={() => setSelectedProduct(heroProduct)}
                    className="font-serif text-lg font-semibold text-stone-900 hover:text-purple-900 cursor-pointer transition-colors"
                  >
                    Butterfly Dreams Clear Case
                  </h3>
                  <p className="text-xs text-stone-500">
                    Iridescent wings & starlight shimmer
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-1.5 justify-end">
                    <span className="font-semibold text-stone-900 text-base">₹349</span>
                    <span className="text-xs text-stone-400 line-through">₹1,299</span>
                  </div>
                  <span className="text-[11px] font-bold text-pink-600">73% OFF</span>
                </div>
              </div>

              {/* Quick Add CTA */}
              <div className="mt-3.5 pt-3 border-t border-purple-50 flex items-center gap-2">
                <button
                  onClick={() => addToCart(heroProduct)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-purple-900 hover:bg-purple-950 text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                  <span>Quick Add for {selectedGlobalModel.split(' ')[0]}</span>
                </button>
                <button
                  onClick={() => setSelectedProduct(heroProduct)}
                  className="py-2.5 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-semibold transition-colors"
                >
                  Details
                </button>
              </div>

              {/* Floating Decorative Elements */}
              {/* Element 1: Butterfly top-right */}
              <div className="absolute -top-5 -right-5 glass-panel px-3 py-2 rounded-2xl shadow-lg border border-purple-100 flex items-center gap-2 animate-float-slow hidden sm:flex">
                <span className="text-xl">🦋</span>
                <div className="text-[11px]">
                  <p className="font-bold text-stone-800">3D Resin Wings</p>
                  <p className="text-purple-600 text-[10px]">Handcrafted</p>
                </div>
              </div>

              {/* Element 2: Sparkle & Protection bottom-left */}
              <div className="absolute -bottom-4 -left-6 glass-panel px-3 py-2 rounded-2xl shadow-lg border border-purple-100 flex items-center gap-2 animate-float-delayed hidden sm:flex">
                <span className="text-xl">✨</span>
                <div className="text-[11px]">
                  <p className="font-bold text-stone-800">Zero Yellowing</p>
                  <p className="text-pink-600 text-[10px]">12-Month Clarity</p>
                </div>
              </div>

              {/* Element 3: Flower subtle accent */}
              <div className="absolute top-1/2 -left-4 w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm shadow-md animate-pulse-soft hidden sm:flex">
                🌸
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
