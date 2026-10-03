import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Smartphone, 
  Sparkles, 
  ArrowRight,
  PackageCheck
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    cartSubtotal,
    cartTotal,
    appliedCoupon,
    freeShippingThreshold,
  } = useShop();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Ananya Sharma',
    phone: '9876543210',
    email: 'ananya.sharma@example.com',
    address: 'Flat 402, Lotus Orchid, Palm Beach Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400705',
    upiId: 'ananya@okhdfcbank'
  });

  const [orderId, setOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingFee = isFreeShipping ? 0 : 49;
  const finalPayable = cartTotal + shippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `LUMI-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('success');
    clearCart();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('form');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-purple-100 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-900 font-bold">
              <Sparkles className="w-4 h-4 text-purple-700" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {step === 'form' ? 'Express Checkout' : 'Order Confirmed'}
              </h3>
              <p className="text-xs text-stone-500">
                {step === 'form' ? 'Fast & Secure Delivery Across India' : `Receipt: #${orderId}`}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 text-stone-600 flex items-center justify-center transition-colors border border-purple-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handlePlaceOrder} className="p-6 space-y-6 max-h-[82vh] overflow-y-auto">
            
            {/* Delivery Information */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-3 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-purple-600" />
                <span>1. Shipping Details</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-stone-600 block mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 text-stone-800"
                  />
                </div>

                <div>
                  <label className="text-stone-600 block mb-1 font-medium">Mobile Number (for tracking updates)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 text-stone-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-stone-600 block mb-1 font-medium">Delivery Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House/Flat No., Apartment, Street"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 text-stone-800"
                  />
                </div>

                <div>
                  <label className="text-stone-600 block mb-1 font-medium">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 text-stone-800"
                  />
                </div>

                <div>
                  <label className="text-stone-600 block mb-1 font-medium">State & Pincode</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 text-stone-800"
                    />
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 text-stone-800"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="pt-2 border-t border-purple-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-3 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-purple-600" />
                <span>2. Payment Option</span>
              </h4>

              <div className="grid grid-cols-3 gap-2.5 text-xs">
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-purple-600 bg-purple-50/70 text-purple-950 font-semibold shadow-xs'
                      : 'border-stone-200 bg-stone-50 hover:bg-white text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Smartphone className="w-4 h-4 text-purple-700" />
                    <span className="font-bold">UPI / GPay</span>
                  </div>
                  <span className="text-[10px] text-stone-500 block">Instant 0% Fee</span>
                </div>

                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-purple-600 bg-purple-50/70 text-purple-950 font-semibold shadow-xs'
                      : 'border-stone-200 bg-stone-50 hover:bg-white text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <CreditCard className="w-4 h-4 text-purple-700" />
                    <span className="font-bold">Cards</span>
                  </div>
                  <span className="text-[10px] text-stone-500 block">Visa, MC, RuPay</span>
                </div>

                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-purple-600 bg-purple-50/70 text-purple-950 font-semibold shadow-xs'
                      : 'border-stone-200 bg-stone-50 hover:bg-white text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Truck className="w-4 h-4 text-purple-700" />
                    <span className="font-bold">Cash on Delivery</span>
                  </div>
                  <span className="text-[10px] text-stone-500 block">Pay at Doorstep</span>
                </div>
              </div>

              {paymentMethod === 'upi' && (
                <div className="mt-3 p-3 rounded-xl bg-purple-50/80 border border-purple-200 text-xs">
                  <label className="text-[11px] text-stone-600 font-medium block mb-1">
                    Enter UPI ID (Google Pay, PhonePe, BHIM):
                  </label>
                  <input
                    type="text"
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                    placeholder="yourname@okhdfcbank"
                    className="w-full px-3 py-1.5 bg-white border border-purple-200 rounded-lg text-xs text-stone-800"
                  />
                </div>
              )}
            </div>

            {/* Order Summary & Final Total */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-purple-100 text-xs space-y-2">
              <div className="flex justify-between text-stone-600">
                <span>Items ({cart.reduce((a, b) => a + b.quantity, 0)}):</span>
                <span className="font-semibold text-stone-900 tabular-nums">₹{cartSubtotal}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-pink-600 font-medium">
                  <span>Coupon {appliedCoupon.code} ({appliedCoupon.discountPercent}% Off):</span>
                  <span className="tabular-nums">-₹{Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span>Delivery:</span>
                <span className={isFreeShipping ? 'text-emerald-700 font-semibold' : 'text-stone-900 font-semibold'}>
                  {isFreeShipping ? 'FREE' : '₹49'}
                </span>
              </div>

              <div className="pt-2 border-t border-purple-200/80 flex justify-between text-sm font-bold text-stone-900">
                <span>Total Amount Payable:</span>
                <span className="text-base text-purple-950 tabular-nums">₹{finalPayable}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-purple-950 hover:bg-stone-900 text-white text-xs font-semibold tracking-wide transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <PackageCheck className="w-4 h-4" />
              <span>Confirm & Place Order (₹{finalPayable})</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Includes 7-Day Easy Replacement Guarantee</span>
            </div>

          </form>
        ) : (
          <div className="p-8 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-display text-3xl font-bold text-stone-900">
                Thank You, {formData.fullName}!
              </h3>
              <p className="font-serif italic text-purple-800 text-base mt-1">
                Your phone is about to become unforgettable ✨
              </p>
              <p className="text-xs text-stone-500 mt-2 max-w-sm mx-auto">
                We’ve received your order <strong>#{orderId}</strong>. A confirmation SMS and WhatsApp message has been dispatched to +91 {formData.phone}.
              </p>
            </div>

            {/* Order Details Card */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-purple-100 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-purple-100 pb-2">
                <span className="text-stone-500">Estimated Delivery:</span>
                <span className="font-bold text-purple-900">Saturday, October 3 (2-3 Days)</span>
              </div>
              <div className="flex justify-between border-b border-purple-100 pb-2">
                <span className="text-stone-500">Delivery Address:</span>
                <span className="font-medium text-stone-800 text-right truncate max-w-[200px]">
                  {formData.address}, {formData.city} - {formData.pincode}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-stone-500">Payment Status:</span>
                <span className="font-bold text-emerald-700 uppercase">
                  {paymentMethod === 'cod' ? 'Cash on Delivery Verified' : 'Paid via UPI'}
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-full bg-purple-900 hover:bg-stone-900 text-white text-xs font-semibold tracking-wide transition-colors shadow-md cursor-pointer"
            >
              Continue Exploring LumiCase
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
