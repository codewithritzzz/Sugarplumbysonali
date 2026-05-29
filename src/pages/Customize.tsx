import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Upload, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '../store/cartStore';
import { products } from '../data/products';

const steps = [
  { id: 1, label: 'Base' },
  { id: 2, label: 'Size' },
  { id: 3, label: 'Frosting' },
  { id: 4, label: 'Message' },
  { id: 5, label: 'Reference' },
  { id: 6, label: 'Theme' },
  { id: 7, label: 'Extras' },
  { id: 8, label: 'Review' },
  { id: 9, label: 'Delivery' },
];

const bases = ['Vanilla', 'Chocolate', 'Red Velvet', 'Lemon', 'Strawberry'];
const sizes = [
  { label: '0.5 kg', price: 699 },
  { label: '1 kg', price: 1299 },
  { label: '1.5 kg', price: 1799 },
  { label: '2 kg', price: 2299 },
  { label: 'Custom', price: 0 },
];
const frostings = ['Buttercream', 'Whipped Cream', 'Fondant', 'Ganache'];
const colorThemes = [
  { label: 'Ivory & Gold', value: '#C9A84C' },
  { label: 'Blush Pink', value: '#F5D6C8' },
  { label: 'Sky Blue', value: '#93C5FD' },
  { label: 'Sage Green', value: '#86EFAC' },
  { label: 'Lilac', value: '#C4B5FD' },
  { label: 'Deep Rose', value: '#FDA4AF' },
  { label: 'Champagne', value: '#F5E6CA' },
  { label: 'Slate', value: '#94A3B8' },
];
const accessories = ['Fresh Flowers', 'Sprinkles', 'Cake Topper', 'Candles', 'Gold Leaf', 'Drip'];

interface FormState {
  base: string;
  size: string;
  sizePrice: number;
  frosting: string;
  message: string;
  referenceImage: File | null;
  theme: string;
  themeLabel: string;
  accessories: string[];
  deliveryType: 'delivery' | 'pickup';
  date: string;
  address: string;
}

const defaultForm: FormState = {
  base: '',
  size: '',
  sizePrice: 0,
  frosting: '',
  message: '',
  referenceImage: null,
  theme: '',
  themeLabel: '',
  accessories: [],
  deliveryType: 'delivery',
  date: '',
  address: '',
};

export default function Customize() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(defaultForm);
  const { addItem, openCart } = useCartStore();

  const customProduct = products.find((p) => p.id === 'custom-1')!;

  const totalPrice =
    form.sizePrice +
    (form.frosting === 'Fondant' ? 400 : form.frosting === 'Ganache' ? 300 : 0) +
    form.accessories.length * 100;

  const canProceed = (): boolean => {
    if (step === 1) return !!form.base;
    if (step === 2) return !!form.size;
    if (step === 3) return !!form.frosting;
    if (step === 6) return !!form.theme;
    if (step === 9) return !!form.date && (form.deliveryType === 'pickup' || !!form.address);
    return true;
  };

  const handleSubmit = () => {
    addItem(customProduct, {
      flavor: form.base,
      size: form.size,
      message: form.message,
      price: totalPrice || 1299,
    });
    toast.success('Custom cake added to cart! We\'ll contact you to confirm details.');
    openCart();
    setStep(1);
    setForm(defaultForm);
  };

  const stepContent: Record<number, React.ReactNode> = {
    1: (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {bases.map((b) => (
          <button
            key={b}
            onClick={() => setForm((f) => ({ ...f, base: b }))}
            className={`p-4 rounded-xl border-2 text-sm font-semibold transition-all ${
              form.base === b
                ? 'border-gold-500 bg-gold-500/10 text-gold-600 dark:text-gold-400'
                : 'border-cream-300 dark:border-dark-600 hover:border-gold-400'
            }`}
          >
            {b}
          </button>
        ))}
      </div>
    ),
    2: (
      <div className="flex flex-col gap-3">
        {sizes.map((s) => (
          <button
            key={s.label}
            onClick={() => setForm((f) => ({ ...f, size: s.label, sizePrice: s.price }))}
            className={`flex items-center justify-between p-4 rounded-xl border-2 text-sm font-semibold transition-all ${
              form.size === s.label
                ? 'border-gold-500 bg-gold-500/10 text-gold-600 dark:text-gold-400'
                : 'border-cream-300 dark:border-dark-600 hover:border-gold-400'
            }`}
          >
            <span>{s.label}</span>
            {s.price > 0 && (
              <span className="text-gold-600 font-bold">₹{s.price.toLocaleString()}</span>
            )}
            {s.price === 0 && <span className="text-cream-500 text-xs">Price on request</span>}
          </button>
        ))}
      </div>
    ),
    3: (
      <div className="grid grid-cols-2 gap-3">
        {frostings.map((f) => (
          <button
            key={f}
            onClick={() => setForm((prev) => ({ ...prev, frosting: f }))}
            className={`p-4 rounded-xl border-2 text-sm font-semibold transition-all ${
              form.frosting === f
                ? 'border-gold-500 bg-gold-500/10 text-gold-600 dark:text-gold-400'
                : 'border-cream-300 dark:border-dark-600 hover:border-gold-400'
            }`}
          >
            {f}
            {f === 'Fondant' && <span className="block text-xs text-cream-500 font-normal mt-0.5">+₹400</span>}
            {f === 'Ganache' && <span className="block text-xs text-cream-500 font-normal mt-0.5">+₹300</span>}
          </button>
        ))}
      </div>
    ),
    4: (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 bg-gold-500/10 rounded-xl p-4 border border-gold-400/30">
          <MessageSquare size={20} className="text-gold-500 flex-shrink-0" />
          <p className="text-sm text-dark-700 dark:text-cream-300">
            Add a personal message to be written on your cake — up to 50 characters.
          </p>
        </div>
        <input
          type="text"
          placeholder="e.g. Happy Birthday Riya! 🎂"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          maxLength={50}
          className="w-full bg-cream-100 dark:bg-dark-700 border border-cream-300 dark:border-dark-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
        />
        <p className="text-xs text-cream-500 text-right">{form.message.length}/50</p>
      </div>
    ),
    5: (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-dark-600 dark:text-cream-400">
          Upload a reference image or inspiration photo so we can bring your vision to life.
        </p>
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-cream-400 dark:border-dark-500 rounded-xl cursor-pointer hover:border-gold-400 transition-colors">
          <Upload size={28} className="text-cream-400 mb-2" />
          <span className="text-sm text-cream-500">Click to upload reference image</span>
          <span className="text-xs text-cream-400 mt-1">PNG, JPG up to 10MB</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              setForm((f) => ({ ...f, referenceImage: file }));
              if (file) toast.success(`${file.name} uploaded!`);
            }}
          />
        </label>
        {form.referenceImage && (
          <p className="text-sm text-gold-600 font-semibold">
            Uploaded: {form.referenceImage.name}
          </p>
        )}
      </div>
    ),
    6: (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {colorThemes.map((t) => (
          <button
            key={t.value}
            onClick={() => setForm((f) => ({ ...f, theme: t.value, themeLabel: t.label }))}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
              form.theme === t.value
                ? 'border-gold-500 bg-gold-500/10'
                : 'border-cream-300 dark:border-dark-600 hover:border-gold-400'
            }`}
          >
            <div
              className="w-10 h-10 rounded-full border-2 border-white shadow-md"
              style={{ backgroundColor: t.value }}
            />
            <span className="text-xs font-semibold text-center text-dark-700 dark:text-cream-300">
              {t.label}
            </span>
          </button>
        ))}
      </div>
    ),
    7: (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {accessories.map((a) => {
          const selected = form.accessories.includes(a);
          return (
            <button
              key={a}
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  accessories: selected
                    ? f.accessories.filter((x) => x !== a)
                    : [...f.accessories, a],
                }))
              }
              className={`flex items-center justify-between p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                selected
                  ? 'border-gold-500 bg-gold-500/10 text-gold-600 dark:text-gold-400'
                  : 'border-cream-300 dark:border-dark-600 hover:border-gold-400'
              }`}
            >
              <span>{a}</span>
              <span className="text-xs text-cream-500 font-normal">+₹100</span>
            </button>
          );
        })}
      </div>
    ),
    8: (
      <div className="bg-cream-50 dark:bg-dark-700 rounded-2xl p-6 flex flex-col gap-4">
        <h3 className="font-playfair text-lg font-semibold text-dark-900 dark:text-cream-100">
          Order Summary
        </h3>
        <div className="flex flex-col gap-2 text-sm">
          {[
            ['Base', form.base || '—'],
            ['Size', form.size || '—'],
            ['Frosting', form.frosting || '—'],
            ['Message', form.message || 'None'],
            ['Theme', form.themeLabel || '—'],
            ['Accessories', form.accessories.length > 0 ? form.accessories.join(', ') : 'None'],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4">
              <span className="text-cream-500">{label}</span>
              <span className="text-dark-800 dark:text-cream-200 font-medium text-right">{value}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-cream-200 dark:border-dark-600 pt-4 flex justify-between items-center">
          <span className="font-semibold text-dark-900 dark:text-cream-100">Estimated Price</span>
          <span className="font-playfair text-2xl font-bold text-gold-600">
            ₹{totalPrice > 0 ? totalPrice.toLocaleString() : 'On request'}
          </span>
        </div>
        <p className="text-xs text-cream-500">
          * Final price may vary. We'll confirm via WhatsApp after placing the order.
        </p>
      </div>
    ),
    9: (
      <div className="flex flex-col gap-5">
        <div className="flex gap-3">
          {(['delivery', 'pickup'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setForm((f) => ({ ...f, deliveryType: type }))}
              className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold capitalize transition-all ${
                form.deliveryType === type
                  ? 'border-gold-500 bg-gold-500/10 text-gold-600'
                  : 'border-cream-300 dark:border-dark-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-2">
            Delivery Date
          </label>
          <input
            type="date"
            value={form.date}
            min={new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0]}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className="w-full bg-cream-100 dark:bg-dark-700 border border-cream-300 dark:border-dark-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
          />
        </div>
        {form.deliveryType === 'delivery' && (
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-2">
              Delivery Address
            </label>
            <textarea
              rows={3}
              placeholder="Enter your full delivery address..."
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              className="w-full bg-cream-100 dark:bg-dark-700 border border-cream-300 dark:border-dark-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm resize-none"
            />
          </div>
        )}
      </div>
    ),
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-cream-100 dark:bg-dark-900">
      {/* Header */}
      <section className="relative py-16 bg-dark-900">
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold-400 font-playfair italic mb-3">Made Just for You</p>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
              Design Your Dream Cake
            </h1>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto" />
          </motion.div>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-10 overflow-x-auto pb-2">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => s.id < step && setStep(s.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2 ${
                    step === s.id
                      ? 'bg-gold-500 border-gold-500 text-dark-900'
                      : step > s.id
                      ? 'bg-gold-500/20 border-gold-500 text-gold-600'
                      : 'bg-cream-200 dark:bg-dark-700 border-cream-300 dark:border-dark-600 text-cream-500'
                  }`}
                >
                  {step > s.id ? <Check size={12} /> : s.id}
                </button>
                <span className="text-xs mt-1 text-cream-500 hidden sm:block">{s.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`h-0.5 w-6 mx-1 transition-colors ${
                    step > s.id ? 'bg-gold-500' : 'bg-cream-300 dark:bg-dark-600'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-md mb-6"
          >
            <h2 className="font-playfair text-xl font-semibold text-dark-900 dark:text-cream-100 mb-2">
              Step {step}: {steps[step - 1].label}
            </h2>
            <p className="text-sm text-cream-500 mb-6">
              {step === 1 && 'Choose your cake base flavour.'}
              {step === 2 && 'Select the size that fits your occasion.'}
              {step === 3 && 'Pick your frosting style.'}
              {step === 4 && 'Add a personalised message to the cake.'}
              {step === 5 && 'Share any reference images for inspiration.'}
              {step === 6 && 'Choose your preferred colour theme.'}
              {step === 7 && 'Add extra decorative accessories.'}
              {step === 8 && 'Review your custom cake order.'}
              {step === 9 && 'Choose delivery or pickup and set a date.'}
            </p>
            {stepContent[step]}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-cream-300 dark:border-dark-600 text-sm font-semibold disabled:opacity-40 hover:border-gold-400 transition-all"
          >
            <ChevronLeft size={16} />
            Back
          </button>

          {step < 9 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 disabled:opacity-40 text-dark-900 font-semibold px-5 py-3 rounded-xl text-sm transition-all"
            >
              Next
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 disabled:opacity-40 text-dark-900 font-semibold px-6 py-3 rounded-xl text-sm transition-all"
            >
              <Check size={16} />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
