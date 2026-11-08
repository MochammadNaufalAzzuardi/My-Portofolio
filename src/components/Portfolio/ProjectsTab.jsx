import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi2';
import { PROJECTS_DATA } from './portfolioData';

export default function ProjectsTab({ onSelectProject }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {PROJECTS_DATA.map((project, idx) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          className="group relative rounded-2xl bg-[#0c121e]/80 backdrop-blur-xl border border-white/10 hover:border-amber-400/50 transition-all duration-300 p-5 flex flex-col justify-between hover:shadow-[0_12px_35px_rgba(245,158,11,0.18)] hover:-translate-y-1.5 overflow-hidden"
        >
          {/* Subtle glowing gold line at top on hover */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent transition-all duration-500" />

          <div>
            {/* Project Preview Image */}
            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-black/50 border border-white/10 group-hover:border-amber-400/30 transition-colors mb-4">
              <img
                src={project.cardImage}
                alt={project.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  // Fallback jika file belum diisi
                  e.target.style.display = 'none';
                  e.target.parentNode.classList.add('flex', 'items-center', 'justify-center', 'bg-amber-950/20');
                  const span = document.createElement('span');
                  span.className = 'text-amber-400/60 text-xs font-mono';
                  span.innerText = project.title;
                  e.target.parentNode.appendChild(span);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c121e] via-transparent to-transparent opacity-60" />
            </div>

            {/* Title & Short Description */}
            <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2 tracking-tight">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
              {project.shortDesc}
            </p>
          </div>

          {/* Details Action Button */}
          <div className="pt-2 border-t border-white/5">
            <button
              onClick={() => onSelectProject(project)}
              className="group/btn inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white/5 hover:bg-amber-500/20 text-white hover:text-amber-300 border border-white/10 hover:border-amber-400/40 transition-all duration-200 cursor-pointer"
            >
              <span>Details</span>
              <HiArrowRight className="text-sm transition-transform duration-200 group-hover/btn:translate-x-1 text-amber-400" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
