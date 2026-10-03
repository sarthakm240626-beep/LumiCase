import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  Menu, 
  X,
  Smartphone
} from 'lucide-react';
import { PHONE_MODELS } from '../data/products';

export const Navbar: React.FC = () => {
  const { 
    cartCount, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsSearchOpen, 
    setIsAccountOpen,
    selectedGlobalModel,
    setSelectedGlobalModel,
    setActiveCategory
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, categoryFilter?: string) => {
    if (categoryFilter) {
      setActiveCategory(categoryFilter);
    }
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-[#FCE7F3] via-[#F3E8FF] to-[#E0E7FF] text-[#581C87] text-xs py-2 px-4 text-center font-medium tracking-wide border-b border-purple-100/60 shadow-xs flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#9333EA] animate-pulse" />
        <span>Free Shipping on Orders Above ₹499 | 7-Day Easy Returns</span>
        <Sparkles className="w-3.5 h-3.5 text-[#9333EA] animate-pulse hidden sm:inline" />
      </div>

      {/* Main Navigation Bar */}
      <nav className={`transition-all duration-200 ${
        isScrolled 
          ? 'glass-nav shadow-sm border-b border-purple-100/70 py-3' 
          : 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/50 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Logo & Brand */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 -ml-2 text-stone-700 hover:text-stone-900 rounded-lg"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <a 
                href="#top" 
                onClick={(e) => { e.preventDefault(); scrollToSection('top'); }}
                className="group flex items-center gap-2 text-decoration-none"
              >
                {/* Brand Logo with butterfly/star glyph */}
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E9D5FF] to-[#FCE7F3] flex items-center justify-center text-[#7E22CE] shadow-xs group-hover:scale-105 transition-transform duration-200">
                  <span className="text-base select-none">🦋</span>
                </div>
                <div className="flex items-baseline">
                  <span className="font-display text-2xl font-bold tracking-tight text-stone-900 group-hover:text-purple-900 transition-colors">
                    LumiCase
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 ml-1 mb-1"></span>
                </div>
              </a>
            </div>

            {/* Zone 2: Navigation Links (Desktop) */}
            <div className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
              <button 
                onClick={() => scrollToSection('top')}
                className="hover:text-purple-900 transition-colors py-1 cursor-pointer"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('shop-section')}
                className="hover:text-purple-900 transition-colors py-1 cursor-pointer"
              >
                Shop
              </button>
              <button 
                onClick={() => scrollToSection('styles-section')}
                className="hover:text-purple-900 transition-colors py-1 cursor-pointer"
              >
                Collections
              </button>
              <button 
                onClick={() => scrollToSection('new-arrivals')}
                className="hover:text-purple-900 transition-colors py-1 cursor-pointer flex items-center gap-1"
              >
                <span>New Arrivals</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
              </button>
              <button 
                onClick={() => scrollToSection('best-sellers')}
                className="hover:text-purple-900 transition-colors py-1 cursor-pointer"
              >
                Best Sellers
              </button>
              <button 
                onClick={() => scrollToSection('why-lumicase')}
                className="hover:text-purple-900 transition-colors py-1 cursor-pointer"
              >
                About Us
              </button>
            </div>

            {/* Zone 3: Actions & Phone Selector */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Phone Model Quick Selector Dropdown (Desktop) */}
              <div className="hidden lg:flex items-center bg-white/80 border border-purple-200/80 rounded-full px-3 py-1.5 text-xs text-stone-700 shadow-2xs hover:border-purple-300 transition-colors">
                <Smartphone className="w-3.5 h-3.5 text-purple-600 mr-1.5 shrink-0" />
                <span className="text-stone-400 mr-1.5 font-normal">Model:</span>
                <select
                  value={selectedGlobalModel}
                  onChange={(e) => setSelectedGlobalModel(e.target.value)}
                  className="bg-transparent font-medium text-stone-800 focus:outline-none cursor-pointer text-xs"
                >
                  {PHONE_MODELS.map((p) => (
                    <option key={p.model} value={p.model}>
                      {p.model}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-stone-700 hover:text-purple-800 hover:bg-purple-50/80 rounded-full transition-colors relative"
                aria-label="Search cases"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Account Icon */}
              <button
                onClick={() => setIsAccountOpen(true)}
                className="p-2 text-stone-700 hover:text-purple-800 hover:bg-purple-50/80 rounded-full transition-colors hidden sm:flex"
                aria-label="My Account"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Wishlist Heart Icon */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="p-2 text-stone-700 hover:text-pink-600 hover:bg-pink-50/80 rounded-full transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-pink-500 text-[10px] text-white font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag / Cart Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-1.5 bg-gradient-to-r from-purple-900 to-indigo-900 hover:from-purple-950 hover:to-indigo-950 text-white px-3.5 py-2 rounded-full text-xs font-semibold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer ml-1"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Bag</span>
                <span className="bg-white/20 text-white rounded-full px-1.5 py-0.2 text-[11px] font-bold">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-purple-100 bg-white/95 backdrop-blur-xl px-5 py-4 space-y-3 animate-fadeIn">
            {/* Mobile Model Selector */}
            <div className="pb-3 border-b border-stone-100">
              <label className="text-xs text-stone-500 font-medium block mb-1">
                Your Phone Device:
              </label>
              <select
                value={selectedGlobalModel}
                onChange={(e) => setSelectedGlobalModel(e.target.value)}
                className="w-full bg-stone-50 border border-purple-200 rounded-lg px-3 py-2 text-xs font-medium text-stone-800"
              >
                {PHONE_MODELS.map((p) => (
                  <option key={p.model} value={p.model}>
                    {p.model}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm font-medium text-stone-700">
              <button 
                onClick={() => scrollToSection('top')}
                className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('shop-section')}
                className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Shop All Cases
              </button>
              <button 
                onClick={() => scrollToSection('styles-section')}
                className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Collections
              </button>
              <button 
                onClick={() => scrollToSection('new-arrivals')}
                className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 transition-colors"
              >
                New Arrivals ✨
              </button>
              <button 
                onClick={() => scrollToSection('best-sellers')}
                className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Best Sellers
              </button>
              <button 
                onClick={() => scrollToSection('why-lumicase')}
                className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 transition-colors"
              >
                About LumiCase
              </button>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <button 
                onClick={() => { setMobileMenuOpen(false); setIsAccountOpen(true); }}
                className="flex items-center gap-1.5 py-1 text-purple-900 font-semibold"
              >
                <User className="w-4 h-4" /> My Account
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); setIsWishlistOpen(true); }}
                className="flex items-center gap-1.5 py-1 text-pink-700 font-semibold"
              >
                <Heart className="w-4 h-4" /> Wishlist ({wishlist.length})
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
