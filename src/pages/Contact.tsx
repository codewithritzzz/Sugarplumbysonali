import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Youtube, Twitter } from 'lucide-react';
import toast from 'react-hot-toast';

const subjects = [
  'Custom Cake Order',
  'Product Enquiry',
  'Delivery Question',
  'Feedback',
  'Collaboration',
  'Other',
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success('Message sent! We\'ll get back to you shortly.');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-cream-100 dark:bg-dark-900">
      {/* Header */}
      <section className="relative py-20 bg-dark-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=1200)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold-400 font-playfair italic mb-3">We'd Love to Hear From You</p>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
              Get in Touch
            </h1>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto" />
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-800 rounded-2xl p-8 shadow-md"
            >
              <h2 className="font-playfair text-2xl font-semibold text-dark-900 dark:text-cream-100 mb-6">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full bg-cream-50 dark:bg-dark-700 border border-cream-300 dark:border-dark-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full bg-cream-50 dark:bg-dark-700 border border-cream-300 dark:border-dark-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full bg-cream-50 dark:bg-dark-700 border border-cream-300 dark:border-dark-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-2">
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      className="w-full bg-cream-50 dark:bg-dark-700 border border-cream-300 dark:border-dark-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full bg-cream-50 dark:bg-dark-700 border border-cream-300 dark:border-dark-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 disabled:opacity-60 text-dark-900 font-semibold px-6 py-3 rounded-xl transition-all duration-200 active:scale-95"
                >
                  {loading ? (
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-dark-900 border-t-transparent" />
                  ) : (
                    <Send size={16} />
                  )}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-md flex flex-col gap-5"
            >
              <h3 className="font-playfair text-xl font-semibold text-dark-900 dark:text-cream-100">
                Business Details
              </h3>

              {[
                {
                  icon: MapPin,
                  label: 'Address',
                  value: '92nd Avenuw, Manhattan, New york, NY',
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  value: '+260778624871',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'sugarplumbysonali@gmail.com',
                },
                {
                  icon: Clock,
                  label: 'Hours',
                  value: 'Mon–Sat: 9 AM – 8 PM\nSunday: 10 AM – 5 PM',
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon size={16} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gold-600 uppercase tracking-widest mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm text-dark-700 dark:text-cream-300 whitespace-pre-line">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}

              <div className="border-t border-cream-200 dark:border-dark-600 pt-4">
                <p className="text-xs font-bold text-gold-600 uppercase tracking-widest mb-3">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="p-2 rounded-full bg-cream-100 dark:bg-dark-700 hover:bg-gold-500 hover:text-dark-900 transition-all text-dark-600 dark:text-cream-400"
                  >
                    <Instagram size={18} />
                  </a>
                  <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="p-2 rounded-full bg-cream-100 dark:bg-dark-700 hover:bg-gold-500 hover:text-dark-900 transition-all text-dark-600 dark:text-cream-400"
                  >
                    <Youtube size={18} />
                  </a>
                  <a
                    href="https://www.x.com/sugarplumbysonali"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter)"
                    className="p-2 rounded-full bg-cream-100 dark:bg-dark-700 hover:bg-gold-500 hover:text-dark-900 transition-all text-dark-600 dark:text-cream-400"
                  >
                    <Twitter size={18} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-md h-56"
            >
              <iframe
                title="Sugar Plum Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5875!2d77.6193!3d12.9281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU1JzQxLjIiTiA3N8KwMzcnMDkuNSJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
