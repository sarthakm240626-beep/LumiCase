import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, User, Package, Award, MapPin, Headphones, Sparkles, CheckCircle2 } from 'lucide-react';

export const AccountModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen } = useShop();

  if (!isAccountOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-purple-100 p-6 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-200 to-pink-200 flex items-center justify-center text-purple-900 font-bold text-sm shadow-xs">
              AS
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Ananya Sharma
              </h3>
              <p className="text-xs text-purple-700 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-600" />
                <span>LumiCase VIP Member</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* VIP Points Card */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-950 to-purple-900 text-white flex items-center justify-between shadow-md">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300">
              LumiRewards Balance
            </span>
            <div className="font-display text-2xl font-bold mt-0.5">
              450 Points
            </div>
            <p className="text-[11px] text-purple-200 mt-0.5">
              ₹45 credit available on next order
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">
            💎
          </div>
        </div>

        {/* Recent Orders Tracking Mockup */}
        <div className="mt-5 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
            <Package className="w-4 h-4 text-purple-700" />
            <span>Active Order Tracking</span>
          </h4>

          <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-purple-100 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-800">Order #LUMI-8104</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold text-[10px]">
                Out for Delivery Today
              </span>
            </div>
            <p className="text-stone-500 text-[11px]">
              Item: Butterfly Dreams Clear Case (Samsung Galaxy A37 5G)
            </p>

            {/* Tracking Steps */}
            <div className="pt-2 flex items-center justify-between text-[10px] text-stone-600 font-medium">
              <div className="flex items-center gap-1 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Packed</span>
              </div>
              <span className="text-stone-300">———</span>
              <div className="flex items-center gap-1 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Shipped</span>
              </div>
              <span className="text-stone-300">———</span>
              <div className="flex items-center gap-1 text-purple-900 font-bold">
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping mr-1"></span>
                <span>Out for Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-5 pt-4 border-t border-purple-100 grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-2.5 rounded-xl bg-stone-50 hover:bg-purple-50 text-stone-700 font-medium flex items-center gap-2 transition-colors text-left"
          >
            <MapPin className="w-4 h-4 text-purple-700" />
            <span>Saved Addresses</span>
          </button>
          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-2.5 rounded-xl bg-stone-50 hover:bg-purple-50 text-stone-700 font-medium flex items-center gap-2 transition-colors text-left"
          >
            <Headphones className="w-4 h-4 text-purple-700" />
            <span>24/7 Concierge</span>
          </button>
        </div>

      </div>
    </div>
  );
};
