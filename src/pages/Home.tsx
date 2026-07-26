import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Star, Truck, Sparkles, Leaf, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, testimonials } from '../data/products';

const featuredProducts = products.filter((p) => p.featured);

const seasonalSpecials = [
  {
    id: 's1',
    title: 'Birthday Cakes',
    description: 'A pastel floral fondant creation to celebrate the most special woman in your life.',
    image: '/Bdaycake.jpg',
    badge: 'Limited Edition',
    price: '₹2,499',
  },
  {
    id: 's2',
    title: 'Mango Coconut Cake',
    description: 'A tropical summer delight — layers of mango cream, coconut sponge and fresh fruit.',
    image: 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=600',
    badge: 'Seasonal',
    price: '₹1,799',
  },
  {
    id: 's3',
    title: 'Festive Macaron Box',
    description: 'A curated box of 12 hand-crafted macarons in seasonal flavours, gift-wrapped to perfection.',
    image: 'https://images.pexels.com/photos/239578/pexels-photo-239578.jpeg?auto=compress&cs=tinysrgb&w=600',
    badge: 'New',
    price: '₹1,299',
  },
];

const features = [
  { icon: Clock, label: 'Fresh Daily', desc: 'Every creation is baked fresh to order — never stored, always perfect.' },
  { icon: Sparkles, label: 'Custom Orders', desc: 'Your vision brought to life — personalised cakes for every occasion.' },
  { icon: Leaf, label: 'Premium Ingredients', desc: 'We source only the finest locally-grown, natural ingredients.' },
  { icon: Truck, label: 'Delivered to You', desc: 'Careful, chilled delivery across the city so your cake arrives flawless.' },
];

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1291712/pexels-photo-1291712.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold-400 font-playfair italic text-lg mb-4 tracking-wide">
              Welcome to SugarPlum
            </p>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Crafted with Love.
              <br />
              <span className="text-gold-400">Baked to Perfection.</span>
            </h1>
            <p className="text-cream-200 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Artisan cakes & pastries made fresh, just for you — baked with the finest ingredients
              and delivered with love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-gold-500 hover:bg-gold-600 text-dark-900 font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:shadow-xl active:scale-95 font-lato tracking-wide"
              >
                Order Now
              </Link>
              <Link
                to="/products"
                className="border-2 border-white text-white hover:bg-white hover:text-dark-900 font-semibold px-8 py-4 rounded-lg transition-all duration-200 font-lato tracking-wide"
              >
                View Our Menu
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-cream-100 dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <p className="text-gold-500 font-playfair italic text-base mb-2">Our Specialties</p>
              <h2 className="section-title mb-4">Featured Creations</h2>
              <div className="w-16 h-0.5 bg-gold-500 mx-auto" />
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, i) => (
              <FadeInSection key={product.id} delay={i * 0.1}>
                <ProductCard product={product} />
              </FadeInSection>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block border-2 border-gold-500 text-gold-600 dark:text-gold-400 hover:bg-gold-500 hover:text-dark-900 font-semibold px-8 py-3 rounded-lg transition-all duration-200 font-lato"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Seasonal Specials */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <p className="text-gold-400 font-playfair italic text-base mb-2">Limited Time</p>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-cream-100 mb-4">
                Seasonal Specials
              </h2>
              <div className="w-16 h-0.5 bg-gold-500 mx-auto" />
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seasonalSpecials.map((item, i) => (
              <FadeInSection key={item.id} delay={i * 0.15}>
                <div className="group rounded-2xl overflow-hidden bg-dark-800 hover:bg-dark-700 transition-colors border border-dark-600 hover:border-gold-500/40">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-gold-500 text-dark-900 text-xs font-bold px-3 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-playfair text-lg font-semibold text-cream-100 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-cream-400 leading-relaxed mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-playfair text-xl font-bold text-gold-400">{item.price}</span>
                      <Link
                        to="/products"
                        className="text-xs text-gold-400 hover:text-gold-300 font-semibold underline underline-offset-2"
                      >
                        Order Now →
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-cream-100 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="text-gold-500 font-playfair italic text-base mb-2">Why Sugar Plum?</p>
              <h2 className="section-title mb-4">The Sugar Plum Promise</h2>
              <div className="w-16 h-0.5 bg-gold-500 mx-auto" />
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <FadeInSection key={feature.label} delay={i * 0.1}>
                <div className="text-center group">
                  <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-500 transition-colors duration-300">
                    <feature.icon size={24} className="text-gold-500 group-hover:text-dark-900 transition-colors" />
                  </div>
                  <h3 className="font-playfair text-lg font-semibold text-dark-900 dark:text-cream-100 mb-2">
                    {feature.label}
                  </h3>
                  <p className="text-sm text-dark-600 dark:text-cream-400 leading-relaxed">{feature.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <p className="text-gold-500 font-playfair italic text-base mb-2">Happy Customers</p>
              <h2 className="section-title mb-4">What They're Saying</h2>
              <div className="w-16 h-0.5 bg-gold-500 mx-auto" />
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeInSection key={t.id} delay={i * 0.15}>
                <div className="bg-cream-50 dark:bg-dark-800 rounded-2xl p-6 border border-cream-200 dark:border-dark-600">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={14} className="text-gold-500 fill-gold-500" />
                    ))}
                  </div>
                  <p className="text-sm text-dark-700 dark:text-cream-300 leading-relaxed mb-5 italic">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gold-400"
                    />
                    <div>
                      <p className="font-semibold text-sm text-dark-900 dark:text-cream-100">{t.name}</p>
                      <p className="text-xs text-cream-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gold-500">
        <FadeInSection>
          <div className="max-w-3xl mx-auto text-center px-4">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-dark-900 mb-4">
              Ready for Something Special?
            </h2>
            <p className="text-dark-800 mb-8 text-lg leading-relaxed">
              Order a custom cake designed around your vision — no dream is too big, no detail too
              small.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/customize"
                className="bg-dark-900 text-cream-100 font-semibold px-8 py-4 rounded-lg hover:bg-dark-800 transition-colors font-lato"
              >
                Design Your Cake
              </Link>
              <Link
                to="/contact"
                className="border-2 border-dark-900 text-dark-900 font-semibold px-8 py-4 rounded-lg hover:bg-dark-900 hover:text-cream-100 transition-all font-lato"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}
