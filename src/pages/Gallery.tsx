import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '../data/products';
import type { GalleryImage } from '../types';

type GalleryCategory = 'all' | 'cakes' | 'wedding' | 'cupcakes' | 'pastries' | 'bakery';

const tabs: { label: string; value: GalleryCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Cakes', value: 'cakes' },
  { label: 'Wedding', value: 'wedding' },
  { label: 'Cupcakes', value: 'cupcakes' },
  { label: 'Pastries', value: 'pastries' },
  { label: 'Bakery', value: 'bakery' },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<GalleryCategory>('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered =
    activeTab === 'all' ? galleryImages : galleryImages.filter((g) => g.category === activeTab);

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prev = () =>
    setLightboxIdx((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length));
  const next = () =>
    setLightboxIdx((i) => (i === null ? 0 : (i + 1) % filtered.length));

  const currentImage: GalleryImage | undefined =
    lightboxIdx !== null ? filtered[lightboxIdx] : undefined;

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-cream-100 dark:bg-dark-900">
      {/* Header */}
      <section className="relative py-20 bg-dark-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1488315/pexels-photo-1488315.jpeg?auto=compress&cs=tinysrgb&w=1200)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold-400 font-playfair italic mb-3">Our Portfolio</p>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">Gallery</h1>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mb-4" />
            <p className="text-cream-300 max-w-xl mx-auto">
              A glimpse into our sweet creations — each one crafted with love and attention to
              detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-16 md:top-20 z-40 bg-white dark:bg-dark-800 border-b border-cream-200 dark:border-dark-600 shadow-sm">
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
      </div>

      {/* Masonry Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="masonry-grid"
          >
            {filtered.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.04 }}
                className="masonry-grid-item cursor-pointer group overflow-hidden rounded-xl"
                onClick={() => openLightbox(idx)}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white text-xs font-semibold bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      View
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
            <motion.img
              key={currentImage.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-w-4xl max-h-[85vh] w-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightboxIdx + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
