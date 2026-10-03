import React from 'react';
import { ShieldCheck, Sparkles, HeartHandshake, Truck } from 'lucide-react';

export const WhyLumiCase: React.FC = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      emoji: '🛡️',
      title: 'Everyday Protection',
      description: 'Shock-resistant German Bayer TPU materials and 1.5mm raised bezels engineered for real-life drops up to 10 feet.',
      color: 'from-purple-100 to-indigo-100 text-purple-700',
    },
    {
      icon: Sparkles,
      emoji: '✨',
      title: 'Designed to Stand Out',
      description: 'Unique aesthetic 3D resin butterflies, genuine pavé rhinestone bows, and vanity mirrors made for your personality.',
      color: 'from-pink-100 to-rose-100 text-pink-700',
    },
    {
      icon: HeartHandshake,
      emoji: '💖',
      title: 'Made for You',
      description: 'Trendy styles crafted for every mood, season and aesthetic. Includes detachable pearl charms for effortless handling.',
      color: 'from-fuchsia-100 to-purple-100 text-fuchsia-700',
    },
    {
      icon: Truck,
      emoji: '🚚',
      title: 'Fast & Easy Delivery',
      description: 'Priority express dispatch across all pin codes in India with free shipping over ₹499 and 7-day hassle-free returns.',
      color: 'from-violet-100 to-sky-100 text-violet-700',
    },
  ];

  return (
    <section id="why-lumicase" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
            The LumiCase Difference
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 mt-3 text-balance">
            Why Style Lovers Choose Us
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2.5">
            We believe your phone case should protect your precious device without sacrificing an ounce of glamour.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={idx}
                className="group relative bg-[#FAF8F5]/70 hover:bg-white rounded-3xl p-6 sm:p-7 border border-purple-100/70 hover:border-purple-200 shadow-2xs hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-300"
              >
                {/* Icon Circle */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-xl shadow-xs group-hover:scale-110 transition-transform duration-300 mb-5`}>
                  <span>{item.emoji}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-semibold text-stone-900 group-hover:text-purple-900 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
