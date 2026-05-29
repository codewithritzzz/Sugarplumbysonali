import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Product } from '../types';
import { useCartStore } from '../store/cartStore';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[0]);
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(1);
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCartStore();

  const sizeObj = product.sizes[selectedSizeIdx] ?? product.sizes[0];
  const unitPrice = Math.round(product.price * sizeObj.multiplier);
  const total = unitPrice * quantity;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, {
        flavor: selectedFlavor,
        size: sizeObj.label,
        message: message || undefined,
        price: unitPrice,
      });
    }
    toast.success(`${product.name} added to cart!`);
    onClose();
    openCart();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-dark-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-gold-500 text-dark-900 text-xs font-bold px-3 py-1 rounded-full">
                {product.badge}
              </span>
            )}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 bg-white/90 dark:bg-dark-700/90 p-2 rounded-full hover:bg-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col gap-5">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-dark-900 dark:text-cream-100">
                {product.name}
              </h2>
              <p className="text-sm text-dark-600 dark:text-cream-400 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Flavor */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-2">
                Flavour
              </label>
              <div className="relative">
                <select
                  value={selectedFlavor}
                  onChange={(e) => setSelectedFlavor(e.target.value)}
                  className="w-full appearance-none bg-cream-100 dark:bg-dark-700 border border-cream-300 dark:border-dark-600 rounded-lg px-4 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-gold-400"
                >
                  {product.flavors.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-3 pointer-events-none text-cream-500" />
              </div>
            </div>

            {/* Size */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-2">
                Size
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s, idx) => (
                  <button
                    key={s.label}
                    onClick={() => setSelectedSizeIdx(idx)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                      selectedSizeIdx === idx
                        ? 'bg-gold-500 border-gold-500 text-dark-900'
                        : 'bg-cream-100 dark:bg-dark-700 border-cream-300 dark:border-dark-600 text-dark-700 dark:text-cream-300 hover:border-gold-400'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-2">
                Cake Message (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Happy Birthday Riya!"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={50}
                className="w-full bg-cream-100 dark:bg-dark-700 border border-cream-300 dark:border-dark-600 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>

            {/* Allergens */}
            <p className="text-xs text-cream-500 dark:text-cream-500">
              Contains: {product.allergens.join(', ')}
            </p>

            {/* Quantity + Add */}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-3 bg-cream-100 dark:bg-dark-700 rounded-lg px-3 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-dark-700 dark:text-cream-300 hover:text-gold-600"
                  aria-label="Decrease"
                >
                  −
                </button>
                <span className="w-6 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-dark-700 dark:text-cream-300 hover:text-gold-600"
                  aria-label="Increase"
                >
                  +
                </button>
              </div>

              <div className="flex-1 flex items-center justify-between">
                <span className="font-playfair text-2xl font-bold text-gold-600">
                  ₹{total.toLocaleString()}
                </span>
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-dark-900 font-semibold px-5 py-3 rounded-lg transition-colors duration-200"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
