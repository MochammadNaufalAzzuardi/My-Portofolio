import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiUser, HiEnvelope, HiPaperAirplane, HiCheckCircle } from 'react-icons/hi2';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setLoading(true);
    // Simulasi pengiriman pesan
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 600);
  };

  return (
    <div className="rounded-2xl bg-[#0c121e]/80 backdrop-blur-xl border border-white/10 p-6 sm:p-7 shadow-2xl relative overflow-hidden">
      {/* Decorative Top Accent Glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <span>Hubungi</span>
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
          Ada yang mau didiskusikan? Langsung kirim pesan aja ya...
        </p>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs sm:text-sm flex items-center gap-2.5"
          >
            <HiCheckCircle className="text-amber-400 shrink-0 text-lg" />
            <span>Pesan Anda telah terkirim! Terima kasih telah menghubungi saya.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Input Nama */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Nama
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
              <HiUser size={18} />
            </span>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nama Anda"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#07090e]/80 border border-white/10 focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40 text-sm text-white placeholder-gray-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Input Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
              <HiEnvelope size={18} />
            </span>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email Anda"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#07090e]/80 border border-white/10 focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40 text-sm text-white placeholder-gray-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Input Pesan */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Pesan
          </label>
          <textarea
            rows={4}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Pesan Anda..."
            className="w-full px-4 py-2.5 rounded-xl bg-[#07090e]/80 border border-white/10 focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40 text-sm text-white placeholder-gray-500 outline-none transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <HiPaperAirplane className="rotate-0 text-base" />
          <span>{loading ? 'Mengirim...' : 'Kirim Pesan'}</span>
        </button>
      </form>
    </div>
  );
}
