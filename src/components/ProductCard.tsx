import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Product } from '../types';
import { useCartStore } from '../store/cartStore';
import ProductDetailModal from './ProductDetailModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);
  const { addItem, openCart } = useCartStore();

  const defaultSize = product.sizes[1] ?? product.sizes[0];
  const price = Math.round(product.price * defaultSize.multiplier);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, {
      flavor: product.flavors[0],
      size: defaultSize.label,
      price,
    });
    toast.success(`${product.name} added to cart!`);
    openCart();
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        className="card group cursor-pointer overflow-hidden rounded-2xl"
        onClick={() => setShowModal(true)}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-gold-500 text-dark-900 text-xs font-bold px-2.5 py-1 rounded-full">
              {product.badge}
            </span>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="flex items-center gap-2 bg-white/90 text-dark-900 text-xs font-semibold px-4 py-2 rounded-full">
              <Eye size={14} />
              View Details
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col gap-2">
          <h3 className="font-playfair text-base font-semibold text-dark-900 dark:text-cream-100 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-dark-600 dark:text-cream-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          <p className="text-xs text-cream-500 dark:text-cream-500 mt-0.5">
            Contains: {product.allergens.join(', ')}
          </p>

          <div className="flex items-center justify-between mt-2">
            <span className="font-playfair text-lg font-bold text-gold-600">
              ₹{price.toLocaleString()}
              <span className="text-xs text-cream-500 font-lato font-normal ml-1">
                / {defaultSize.label}
              </span>
            </span>
            <button
              onClick={handleQuickAdd}
              aria-label="Add to cart"
              className="flex items-center gap-1.5 bg-gold-500 hover:bg-gold-600 text-dark-900 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200 active:scale-95"
            >
              <ShoppingCart size={13} />
              Add
            </button>
          </div>
        </div>
      </motion.div>

      {showModal && (
        <ProductDetailModal product={product} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
