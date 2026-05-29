import { Link } from 'react-router-dom';
import { Instagram, Youtube, Twitter } from 'lucide-react';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Customize', to: '/customize' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-cream-200 pt-16 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/sugarplumlogo.jpeg"
                alt="Sugar Plum Logo"
                className="w-14 h-14 rounded-full object-cover border-2 border-gold-500"
              />
              <div className="flex flex-col leading-none">
                <span className="font-playfair text-xl font-bold tracking-widest text-gold-500 uppercase">
                  Sugar Plum
                </span>
                <span className="font-playfair italic text-xs text-cream-400 self-end">
                  by Sonali
                </span>
              </div>
            </div>
            <p className="text-sm text-cream-400 leading-relaxed max-w-xs">
              Artisan cakes and pastries crafted with love, baked to perfection — bringing a touch of
              sweetness to your most cherished moments.
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full bg-dark-700 hover:bg-gold-500 hover:text-dark-900 text-cream-300 transition-all duration-200"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-2 rounded-full bg-dark-700 hover:bg-gold-500 hover:text-dark-900 text-cream-300 transition-all duration-200"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://www.x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="p-2 rounded-full bg-dark-700 hover:bg-gold-500 hover:text-dark-900 text-cream-300 transition-all duration-200"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold text-gold-400 mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-cream-400 hover:text-gold-400 transition-colors duration-200 tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-lg font-semibold text-gold-400 mb-6">Get in Touch</h4>
            <ul className="flex flex-col gap-3 text-sm text-cream-400">
              <li>
                <span className="text-gold-500 font-semibold block text-xs uppercase tracking-widest mb-1">Phone</span>
                +91 99999 99999
              </li>
              <li>
                <span className="text-gold-500 font-semibold block text-xs uppercase tracking-widest mb-1">Email</span>
                hello@sugarplumbySonali.com
              </li>
              <li>
                <span className="text-gold-500 font-semibold block text-xs uppercase tracking-widest mb-1">Hours</span>
                Mon – Sat: 9 AM – 8 PM<br />
                Sunday: 10 AM – 5 PM
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-cream-500 text-center">
            &copy; {new Date().getFullYear()} Sugar Plum by Sonali. All rights reserved.
          </p>
          <p className="text-xs text-cream-600">
            Crafted with love &amp; a generous sprinkle of sugar
          </p>
        </div>
      </div>
    </footer>
  );
}
