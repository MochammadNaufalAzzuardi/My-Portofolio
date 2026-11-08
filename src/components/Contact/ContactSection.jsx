import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from './ContactForm';
import FindMe from './FindMe';
import CommentSection from './CommentSection';

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
            Hubungi saya
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto">
            Silakan tinggalkan pesan langsung atau berikan komentar Anda di bawah ini.
          </p>
        </motion.div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Kontak & Find Me */}
        <div className="lg:col-span-5 flex flex-col">
          <ContactForm />
          <FindMe />
        </div>

        {/* Right Column: Komentar Interaktif */}
        <div className="lg:col-span-7">
          <CommentSection />
        </div>
      </div>
    </section>
  );
}
