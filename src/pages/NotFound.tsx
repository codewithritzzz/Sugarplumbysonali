import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-cream-100 dark:bg-dark-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="text-8xl mb-6">🎂</div>
        <h1 className="font-playfair text-6xl font-bold text-gold-500 mb-2">404</h1>
        <h2 className="font-playfair text-2xl font-semibold text-dark-900 dark:text-cream-100 mb-4">
          Oops! This page got eaten.
        </h2>
        <p className="text-dark-600 dark:text-cream-400 mb-8 leading-relaxed">
          Looks like this page was too delicious and disappeared. Let's get you back to the
          good stuff.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-dark-900 font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <Home size={16} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
