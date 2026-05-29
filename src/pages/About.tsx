import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Award, Leaf, Users } from 'lucide-react';

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
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

const timeline = [
  { year: '2018', title: 'The First Cake', desc: 'Sonali baked her first custom cake for a friend\'s birthday — and the compliments never stopped.' },
  { year: '2019', title: 'Word Spreads', desc: 'Orders began flowing through word of mouth, with weddings and corporate events joining the mix.' },
  { year: '2021', title: 'Home Bakery Official', desc: 'Sugar Plum became an official home bakery, with a dedicated kitchen and a full product menu.' },
  { year: '2023', title: 'Growing Family', desc: 'Hundreds of celebrations later, Sugar Plum now serves the whole city with same-day deliveries.' },
];

const philosophy = [
  { icon: Heart, title: 'Baked with Love', desc: 'Every cake is a labour of love — we pour our heart into every piped rose and ganache drip.' },
  { icon: Leaf, title: 'Pure Ingredients', desc: 'We use only natural, locally-sourced, additive-free ingredients — no shortcuts, ever.' },
  { icon: Award, title: 'Artisan Quality', desc: 'French techniques meet Indian flavours for a uniquely Sugar Plum experience.' },
];

export default function About() {
  return (
    <div className="pt-16 md:pt-20 bg-cream-100 dark:bg-dark-900 min-h-screen">
      {/* Hero */}
      <section className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/3185747/pexels-photo-3185747.jpeg?auto=compress&cs=tinysrgb&w=1200)',
          }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold-400 font-playfair italic mb-3">Our Story</p>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
              About Sugar Plum
            </h1>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Sugar Plum bakery"
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-gold-500 rounded-2xl p-4 shadow-xl hidden md:block">
                <p className="font-playfair text-2xl font-bold text-dark-900">500+</p>
                <p className="text-xs font-semibold text-dark-800">Happy Customers</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col gap-6">
              <p className="text-gold-500 font-playfair italic">Our Story</p>
              <h2 className="section-title">Where Every Cake Tells a Story</h2>
              <div className="w-12 h-0.5 bg-gold-500" />
              <p className="text-dark-600 dark:text-cream-400 leading-relaxed">
                Sugar Plum was born in a home kitchen in 2018 with one simple belief: that every
                celebration deserves a cake as unique and beautiful as the people at the heart of it.
              </p>
              <p className="text-dark-600 dark:text-cream-400 leading-relaxed">
                What began as weekend baking for friends and family quickly grew into something much
                bigger — a brand built on trust, taste, and the kind of artistry you can taste in
                every crumb.
              </p>
              <p className="text-dark-600 dark:text-cream-400 leading-relaxed">
                Today, Sugar Plum by Sonali serves hundreds of families across the city, crafting
                birthday cakes, wedding tiers, and everyday pastries that bring genuine joy.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeIn>
            <p className="text-gold-400 font-playfair italic mb-3">The Person Behind the Magic</p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-10">
              Meet the Founder
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="bg-dark-800 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 text-left border border-dark-600">
              <img
                src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Sonali, Founder"
                className="w-36 h-36 rounded-full object-cover border-4 border-gold-500 flex-shrink-0"
              />
              <div>
                <h3 className="font-playfair text-2xl font-bold text-gold-400 mb-1">Sonali</h3>
                <p className="text-cream-400 text-sm mb-4 font-semibold tracking-wide">
                  Pastry Chef & Founder — Sugar Plum
                </p>
                <p className="text-cream-300 leading-relaxed text-sm">
                  Trained in classical French patisserie, Sonali has spent the last decade perfecting
                  the art of edible luxury. Her philosophy is simple: premium ingredients, honest
                  technique, and an uncompromising obsession with flavour. When she's not piping
                  rosettes or tempering chocolate, you'll find her hunting for the finest seasonal
                  fruits at the local market.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-cream-100 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-gold-500 font-playfair italic mb-3">What Drives Us</p>
              <h2 className="section-title mb-4">Our Baking Philosophy</h2>
              <div className="w-16 h-0.5 bg-gold-500 mx-auto" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophy.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-4">
                    <p.icon size={26} className="text-gold-500" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-dark-900 dark:text-cream-100 mb-3">
                    {p.title}
                  </h3>
                  <p className="text-sm text-dark-600 dark:text-cream-400 leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white dark:bg-dark-900">
        <div className="max-w-3xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-gold-500 font-playfair italic mb-3">Our Journey</p>
              <h2 className="section-title mb-4">How Sugar Plum Grew</h2>
              <div className="w-16 h-0.5 bg-gold-500 mx-auto" />
            </div>
          </FadeIn>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gold-500/30" />
            <div className="flex flex-col gap-10">
              {timeline.map((item, i) => (
                <FadeIn key={item.year} delay={i * 0.1}>
                  <div className="flex gap-6 pl-4">
                    <div className="relative">
                      <div className="w-5 h-5 rounded-full bg-gold-500 border-4 border-cream-100 dark:border-dark-900 flex-shrink-0 mt-1" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gold-600 tracking-widest uppercase">
                        {item.year}
                      </span>
                      <h3 className="font-playfair text-lg font-semibold text-dark-900 dark:text-cream-100 mt-1 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-dark-600 dark:text-cream-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ingredient highlight */}
      <section className="py-16 bg-gold-500">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center px-4">
            <Users size={32} className="text-dark-900 mx-auto mb-4" />
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-dark-900 mb-4">
              We use only the finest locally-sourced ingredients
            </h2>
            <p className="text-dark-800 leading-relaxed">
              No artificial flavours. No preservatives. No shortcuts. Every ingredient is chosen for
              its purity, taste, and provenance — because what goes into your cake matters as much
              as what comes out.
            </p>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
