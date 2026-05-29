import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export default function CartSidebar() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, total } = useCartStore();
  const cartTotal = useCartStore((s) => s.total());

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-dark-800 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-cream-200 dark:border-dark-600">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-gold-500" />
                <h2 className="font-playfair text-xl font-semibold text-dark-900 dark:text-cream-100">
                  Your Cart
                </h2>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="p-2 rounded-full hover:bg-cream-200 dark:hover:bg-dark-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} className="text-cream-400" />
                  <p className="font-playfair text-lg text-dark-600 dark:text-cream-400">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-cream-500">
                    Add some delicious treats to get started!
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-2 text-sm text-gold-500 hover:text-gold-600 font-semibold underline underline-offset-2"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-3 p-3 rounded-xl bg-cream-50 dark:bg-dark-700"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-playfair text-sm font-semibold text-dark-900 dark:text-cream-100 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-cream-500 mt-0.5">
                          {item.selectedFlavor} · {item.selectedSize}
                        </p>
                        {item.message && (
                          <p className="text-xs text-gold-600 italic mt-0.5 truncate">
                            "{item.message}"
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-cream-200 dark:bg-dark-600 flex items-center justify-center hover:bg-gold-500 hover:text-dark-900 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-cream-200 dark:bg-dark-600 flex items-center justify-center hover:bg-gold-500 hover:text-dark-900 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-gold-600">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                        className="self-start p-1 text-cream-400 hover:text-red-500 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-cream-200 dark:border-dark-600 p-5 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="font-lato text-sm text-dark-600 dark:text-cream-300">Subtotal</span>
                  <span className="font-playfair text-xl font-bold text-gold-600">
                    ₹{cartTotal.toLocaleString()}
                  </span>
                </div>
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="w-full bg-gold-500 hover:bg-gold-600 text-dark-900 font-semibold py-3 rounded-lg text-center transition-colors duration-200 font-lato tracking-wide"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
