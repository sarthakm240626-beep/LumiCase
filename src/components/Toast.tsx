import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useShop();

  if (!toast || !toast.visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300 pointer-events-none">
      <div className="glass-panel px-5 py-3.5 rounded-2xl shadow-xl shadow-purple-900/10 border border-purple-100/80 flex items-center gap-3.5 max-w-sm pointer-events-auto bg-white/95">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#EBDFF8] to-[#FCE7F3] flex items-center justify-center text-[#7C3AED] shrink-0 shadow-inner">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
            {toast.message}
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 inline" />
          </p>
          {toast.subtext && (
            <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">
              {toast.subtext}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
