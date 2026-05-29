import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore, useThemeStore } from '../store/cartStore';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Customize', to: '/customize' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleCart } = useCartStore();
  const count = useCartStore((s) => s.itemCount());
  const { isDark, toggle } = useThemeStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white dark:bg-dark-900 shadow-lg'
          : 'bg-white/90 dark:bg-dark-900/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo + Brand */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/sugarplumlogo.jpeg"
              alt="Sugar Plum Logo"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-gold-500"
            />
            <div className="flex flex-col leading-none">
              <span className="font-playfair text-lg md:text-xl font-bold tracking-widest text-gold-500 uppercase">
                Sugar Plum
              </span>
              <span className="font-playfair italic text-xs text-cream-400 dark:text-cream-300 tracking-wide self-end -mt-0.5">
                by Sonali
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link text-xs lg:text-sm tracking-wider uppercase font-semibold ${
                  location.pathname === link.to
                    ? 'text-gold-500 dark:text-gold-400'
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full hover:bg-cream-200 dark:hover:bg-dark-600 transition-colors"
            >
              {isDark ? (
                <Sun size={18} className="text-gold-400" />
              ) : (
                <Moon size={18} className="text-dark-700" />
              )}
            </button>

            <button
              onClick={toggleCart}
              aria-label="Open cart"
              className="relative p-2 rounded-full hover:bg-cream-200 dark:hover:bg-dark-600 transition-colors"
            >
              <ShoppingCart size={20} className="text-dark-900 dark:text-cream-100" />
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-gold-500 text-dark-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {count}
                </motion.span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-cream-200 dark:hover:bg-dark-600 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-dark-900 border-t border-cream-200 dark:border-dark-700"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link text-sm tracking-wider uppercase font-semibold py-2 border-b border-cream-200 dark:border-dark-700 ${
                    location.pathname === link.to ? 'text-gold-500' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
