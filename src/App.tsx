import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StyleCategories } from './components/StyleCategories';
import { FeaturedCollection } from './components/FeaturedCollection';
import { BestSellers } from './components/BestSellers';
import { PromoBanner } from './components/PromoBanner';
import { WhyLumiCase } from './components/WhyLumiCase';
import { NewArrivals } from './components/NewArrivals';
import { SocialProof } from './components/SocialProof';
import { InstagramGallery } from './components/InstagramGallery';
import { Newsletter } from './components/Newsletter';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

// Modals & Overlays
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';
import { Toast } from './components/Toast';

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans selection:bg-[#EBDFF8] selection:text-[#5B3E84] flex flex-col relative">
        
        {/* Sticky Top Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <Hero />

          {/* 2. Shop By Style */}
          <StyleCategories />

          {/* 3. Featured Collection Grid */}
          <FeaturedCollection />

          {/* 4. Best Sellers Carousel */}
          <BestSellers />

          {/* 5. Product Promotion Banner */}
          <PromoBanner />

          {/* 6. Why LumiCase? Benefits */}
          <WhyLumiCase />

          {/* 7. New Arrivals / Fresh Drops */}
          <NewArrivals />

          {/* 8. Social Proof & Customer Reviews */}
          <SocialProof />

          {/* 9. Instagram Lifestyle Gallery */}
          <InstagramGallery />

          {/* 10. Email / Discount VIP Offer */}
          <Newsletter />

          {/* 11. FAQ Accordion */}
          <FaqSection />
        </main>

        {/* 12. Premium Footer */}
        <Footer />

        {/* Global Modals & Drawers */}
        <ProductDetailModal />
        <QuickViewModal />
        <CartDrawer />
        <WishlistDrawer />
        <CheckoutModal />
        <SearchModal />
        <AccountModal />
        <Toast />

      </div>
    </ShopProvider>
  );
}
