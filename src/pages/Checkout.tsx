import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, Smartphone, Banknote, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCartStore } from '../store/cartStore';
import type { Order } from '../types';

type PaymentMethod = 'upi' | 'card' | 'cod';

export default function Checkout() {
  const { items, total, clearCart, addOrder } = useCartStore();
  const cartTotal = useCartStore((s) => s.total());
  const navigate = useNavigate();
  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [payment, setPayment] = useState<PaymentMethod>('upi');
  const [orderNum, setOrderNum] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    time: '',
  });

  const handlePlaceOrder = () => {
    if (!form.name || !form.email || !form.phone) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (deliveryType === 'delivery' && !form.address) {
      toast.error('Please enter your delivery address.');
      return;
    }

    const num = `SP${Date.now().toString().slice(-6)}`;
    setOrderNum(num);

    const order: Order = {
      id: num,
      items: [...items],
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
      },
      deliveryType,
      scheduledDate: form.date,
      paymentMethod: payment,
      status: 'confirmed',
      total: cartTotal,
      createdAt: new Date().toISOString(),
    };

    addOrder(order);
    clearCart();
    setStep('confirmed');
  };

  if (items.length === 0 && step !== 'confirmed') {
    return (
      <div className="pt-16 md:pt-20 min-h-screen bg-cream-100 dark:bg-dark-900 flex items-center justify-center">
        <div className="text-center px-4">
          <p className="font-playfair text-3xl text-dark-900 dark:text-cream-100 mb-4">
            Your cart is empty
          </p>
          <Link
            to="/products"
            className="bg-gold-500 hover:bg-gold-600 text-dark-900 font-semibold px-6 py-3 rounded-xl inline-block transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  if (step === 'confirmed') {
    return (
      <div className="pt-16 md:pt-20 min-h-screen bg-cream-100 dark:bg-dark-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full mx-4 bg-white dark:bg-dark-800 rounded-2xl p-8 text-center shadow-xl"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="font-playfair text-2xl font-bold text-dark-900 dark:text-cream-100 mb-2">
            Order Confirmed!
          </h2>
          <p className="text-cream-500 mb-2">Thank you for your order.</p>
          <p className="text-sm text-gold-600 font-bold mb-6">
            Order #{orderNum}
          </p>
          <p className="text-sm text-dark-600 dark:text-cream-400 mb-8 leading-relaxed">
            We'll prepare your order with love and send you updates on WhatsApp. Expect a
            confirmation call within 2 hours.
          </p>
          <a
            href={`https://wa.me/919999999999?text=Hi%2C+I+just+placed+order+%23${orderNum}+at+Sugar+Plum.+Please+confirm!`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl mb-3 transition-colors"
          >
            Notify via WhatsApp
          </a>
          <Link
            to="/"
            className="w-full block border-2 border-gold-500 text-gold-600 font-semibold py-3 rounded-xl hover:bg-gold-500 hover:text-dark-900 transition-all"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-cream-100 dark:bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-playfair text-3xl font-bold text-dark-900 dark:text-cream-100 mb-8"
        >
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left - Form */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Customer Details */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-md">
              <h2 className="font-playfair text-lg font-semibold text-dark-900 dark:text-cream-100 mb-5">
                Customer Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'name', label: 'Full Name *', placeholder: 'Your name', type: 'text' },
                  { key: 'email', label: 'Email *', placeholder: 'your@email.com', type: 'email' },
                  { key: 'phone', label: 'Phone *', placeholder: '+91 98765 43210', type: 'tel' },
                ].map((field) => (
                  <div key={field.key} className={field.key === 'email' ? 'sm:col-span-2' : ''}>
                    <label className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, [field.key]: e.target.value }))
                      }
                      className="w-full bg-cream-50 dark:bg-dark-700 border border-cream-300 dark:border-dark-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery / Pickup */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-md">
              <h2 className="font-playfair text-lg font-semibold text-dark-900 dark:text-cream-100 mb-5">
                Delivery Method
              </h2>
              <div className="flex gap-3 mb-5">
                {(['delivery', 'pickup'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setDeliveryType(type)}
                    className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold capitalize transition-all ${
                      deliveryType === type
                        ? 'border-gold-500 bg-gold-500/10 text-gold-600'
                        : 'border-cream-300 dark:border-dark-600 text-dark-700 dark:text-cream-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    min={new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0]}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    className="w-full bg-cream-50 dark:bg-dark-700 border border-cream-300 dark:border-dark-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-2">
                    Time Slot
                  </label>
                  <select
                    value={form.time}
                    onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                    className="w-full bg-cream-50 dark:bg-dark-700 border border-cream-300 dark:border-dark-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                  >
                    <option value="">Select time</option>
                    {['10 AM – 12 PM', '12 PM – 2 PM', '2 PM – 4 PM', '4 PM – 6 PM', '6 PM – 8 PM'].map(
                      (t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {deliveryType === 'delivery' && (
                <div className="mt-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter your full delivery address..."
                    value={form.address}
                    onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    className="w-full bg-cream-50 dark:bg-dark-700 border border-cream-300 dark:border-dark-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
                  />
                </div>
              )}
            </div>

            {/* Payment */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-md">
              <h2 className="font-playfair text-lg font-semibold text-dark-900 dark:text-cream-100 mb-5">
                Payment Method
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  { value: 'upi', label: 'UPI / QR Code', icon: Smartphone },
                  { value: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                  { value: 'cod', label: 'Cash on Delivery', icon: Banknote },
                ].map((method) => (
                  <button
                    key={method.value}
                    onClick={() => setPayment(method.value as PaymentMethod)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 text-sm font-semibold transition-all text-left ${
                      payment === method.value
                        ? 'border-gold-500 bg-gold-500/10 text-gold-600'
                        : 'border-cream-300 dark:border-dark-600 text-dark-700 dark:text-cream-300'
                    }`}
                  >
                    <method.icon size={18} />
                    {method.label}
                    {payment === method.value && (
                      <Check size={16} className="ml-auto text-gold-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-md sticky top-24">
              <h2 className="font-playfair text-lg font-semibold text-dark-900 dark:text-cream-100 mb-5">
                Order Summary
              </h2>
              <div className="flex flex-col gap-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-dark-900 dark:text-cream-100 line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-cream-500">
                        {item.selectedFlavor} · {item.selectedSize} × {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-gold-600 flex-shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-cream-200 dark:border-dark-600 pt-4 flex flex-col gap-2 mb-5">
                <div className="flex justify-between text-sm text-dark-600 dark:text-cream-400">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-dark-600 dark:text-cream-400">
                  <span>Delivery</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between font-bold text-dark-900 dark:text-cream-100 text-lg border-t border-cream-200 dark:border-dark-600 pt-2 mt-1">
                  <span>Total</span>
                  <span className="text-gold-600">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-dark-900 font-semibold py-4 rounded-xl transition-all duration-200 active:scale-95 text-sm"
              >
                Place Order
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
