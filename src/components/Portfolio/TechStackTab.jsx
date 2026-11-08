import React from 'react';
import { motion } from 'framer-motion';
import { TECH_STACK_DATA } from './portfolioData';
import TechIcon from './TechIcon';

export default function TechStackTab() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
      {TECH_STACK_DATA.map((tech, idx) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: idx * 0.04 }}
          className="group relative rounded-2xl bg-[#0c121e]/80 backdrop-blur-xl border border-white/5 hover:border-amber-400/50 p-6 flex flex-col items-center justify-center gap-3.5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(245,158,11,0.18)] overflow-hidden cursor-default"
        >
          {/* Luminous Gold Shimmer Effect on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Top subtle border sheen */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Brand Vector Icon with Glow */}
          <div className="relative p-3 rounded-2xl bg-white/[0.03] group-hover:bg-white/[0.08] transition-colors duration-300">
            <TechIcon
              name={tech.icon}
              color={tech.color}
              size={42}
              className="transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* Technology Label & Category */}
          <div className="text-center">
            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight">
              {tech.name}
            </h4>
            <span className="text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors">
              {tech.category}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
