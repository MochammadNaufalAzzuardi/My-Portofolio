import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark } from 'react-icons/hi2';

export default function CertificateModal({ item, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative z-10 max-w-3xl w-full rounded-2xl bg-[#0c121e] border border-amber-400/40 shadow-[0_0_50px_rgba(245,158,11,0.25)] overflow-hidden p-4 sm:p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-400">
                {item.issuer || item.badge || 'Sertifikat Resmi'}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {item.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <HiXMark size={22} />
            </button>
          </div>

          {/* Certificate Image Frame */}
          <div className="relative rounded-xl overflow-hidden bg-black/60 border border-white/10 mb-4 flex items-center justify-center max-h-[60vh]">
            <img
              src={item.image}
              alt={item.title}
              className="max-h-[60vh] w-auto object-contain"
            />
          </div>

          {/* Footer Description */}
          {item.description && (
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed text-center sm:text-left">
              {item.description}
            </p>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
