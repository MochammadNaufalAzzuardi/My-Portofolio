import React from 'react';
import { motion } from 'framer-motion';
import { HiMagnifyingGlassPlus } from 'react-icons/hi2';
import { TbCertificate } from 'react-icons/tb';
import { CERTIFICATES_DATA } from './portfolioData';

export default function CertificatesTab({ onSelectCertificate }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {CERTIFICATES_DATA.map((cert, idx) => (
        <motion.div
          key={cert.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          onClick={() => onSelectCertificate(cert)}
          className="group relative rounded-2xl bg-[#0c121e]/80 backdrop-blur-xl border border-white/10 hover:border-amber-400/50 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between hover:shadow-[0_12px_35px_rgba(245,158,11,0.18)] hover:-translate-y-1.5 cursor-pointer overflow-hidden"
        >
          {/* Top golden border shine on hover */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent transition-all duration-500" />

          <div>
            {/* Certificate Preview Image */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/50 border border-white/10 group-hover:border-amber-400/30 transition-colors mb-4">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Zoom overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <span className="p-3 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 shadow-lg">
                  <HiMagnifyingGlassPlus size={22} />
                </span>
              </div>
            </div>

            {/* Badges & Meta */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-400/20">
                <TbCertificate size={13} />
                <span>{cert.badge || 'Sertifikat'}</span>
              </span>
              <span className="text-xs text-gray-400">{cert.date}</span>
            </div>

            {/* Title & Issuer */}
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-1 line-clamp-2">
              {cert.title}
            </h3>
            <p className="text-xs text-gray-400">{cert.issuer}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
