import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import { ScrollToTop, WhatsAppButton } from './components/FloatingButtons';
import Home from './pages/Home';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import Customize from './pages/Customize';
import About from './pages/About';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import { useThemeStore } from './store/cartStore';

function ThemeInitializer() {
  const { isDark } = useThemeStore();
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);
  return null;
}

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function ScrollRestorer() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <div className="min-h-screen bg-cream-100 dark:bg-dark-900 transition-colors duration-300">
      <Navbar />
      <CartSidebar />
      <ScrollRestorer />
      <PageTransition>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/customize" element={<Customize />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </PageTransition>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  const basename = import.meta.env.BASE_URL;

  return (
    <BrowserRouter basename={basename}>
      <ThemeInitializer />
      <AppLayout />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1E1E1E',
            color: '#FAF6F0',
            border: '1px solid #C9A84C',
            borderRadius: '12px',
            fontFamily: 'Lato, sans-serif',
            fontSize: '14px',
          },
        }}
      />
    </BrowserRouter>
  );
}
