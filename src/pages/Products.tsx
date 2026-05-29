import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

type Category = 'all' | 'birthday' | 'wedding' | 'pastries' | 'cupcakes' | 'macarons' | 'custom';

const tabs: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Birthday Cakes', value: 'birthday' },
  { label: 'Wedding Cakes', value: 'wedding' },
  { label: 'Pastries', value: 'pastries' },
  { label: 'Cupcakes', value: 'cupcakes' },
  { label: 'Macarons', value: 'macarons' },
  { label: 'Custom Cakes', value: 'custom' },
];

export default function Products() {
  const [activeTab, setActiveTab] = useState<Category>('all');

  const filtered =
    activeTab === 'all' ? products : products.filter((p) => p.category === activeTab);

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-cream-100 dark:bg-dark-900">
      {/* Header */}
      <section className="relative py-20 bg-dark-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=1200)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold-400 font-playfair italic mb-3">Our Collection</p>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
              Our Products
            </h1>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mb-4" />
            <p className="text-cream-300 max-w-xl mx-auto">
              Every item is crafted to order with the finest ingredients — browse our collection and
              find the perfect treat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-16 md:top-20 z-40 bg-white dark:bg-dark-800 border-b border-cream-200 dark:border-dark-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-3">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  activeTab === tab.value
                    ? 'bg-gold-500 text-dark-900'
                    : 'bg-cream-100 dark:bg-dark-700 text-dark-700 dark:text-cream-300 hover:bg-cream-200 dark:hover:bg-dark-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-cream-500">
            <p className="font-playfair text-2xl mb-2">No products found</p>
            <p className="text-sm">Try a different category</p>
          </div>
        )}
      </section>
    </div>
  );
}
