import React from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, Instagram, Sparkles, Shield, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveCategory, setIsAccountOpen } = useShop();

  const scrollTo = (id: string, cat?: string) => {
    if (cat) setActiveCategory(cat);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Info (takes 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E9D5FF] to-[#FCE7F3] flex items-center justify-center text-[#7E22CE] shadow-xs">
                <span className="text-base select-none">🦋</span>
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                LumiCase
              </span>
            </div>

            <p className="font-serif italic text-purple-300 text-lg">
              “Make Your Phone Unforgettable.”
            </p>

            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              India’s premier aesthetic tech brand. Designed for style dreamers who want certified drop protection wrapped in butterflies, flowers, glitter and luxury charms.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-purple-900 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                aria-label="LumiCase Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-pink-900 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                aria-label="LumiCase Pinterest"
              >
                <span className="text-sm font-bold">P</span>
              </a>
            </div>
          </div>

          {/* Col 1: Shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              SHOP
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollTo('shop-section', 'All')}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  All Cases
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('new-arrivals')}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('best-sellers')}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('styles-section')}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('shop-section', 'Butterfly')}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Butterfly Edition
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Help */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              HELP
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setIsAccountOpen(true)}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('faqs')}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('faqs')}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  7-Day Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('faqs')}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAccountOpen(true)}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: About */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              ABOUT
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollTo('why-lumicase')}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('why-lumicase')}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Why LumiCase
                </button>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-300 transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-300 transition-colors"
                >
                  Pinterest
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Payment Badges & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            <p>© 2026 LumiCase. All Rights Reserved.</p>
          </div>

          {/* Clean Payment Icons / Trust Badges */}
          <div className="flex items-center gap-3">
            <span className="bg-stone-800 text-stone-300 font-mono text-[10px] px-2 py-1 rounded">UPI</span>
            <span className="bg-stone-800 text-stone-300 font-mono text-[10px] px-2 py-1 rounded">GPay</span>
            <span className="bg-stone-800 text-stone-300 font-mono text-[10px] px-2 py-1 rounded">PhonePe</span>
            <span className="bg-stone-800 text-stone-300 font-mono text-[10px] px-2 py-1 rounded">Paytm</span>
            <span className="bg-stone-800 text-stone-300 font-mono text-[10px] px-2 py-1 rounded">Visa</span>
            <span className="bg-stone-800 text-stone-300 font-mono text-[10px] px-2 py-1 rounded">Mastercard</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            aria-label="Back to Top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
