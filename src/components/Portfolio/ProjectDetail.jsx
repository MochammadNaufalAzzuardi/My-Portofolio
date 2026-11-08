import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiCodeBracket, HiCheckCircle, HiArrowTopRightOnSquare } from 'react-icons/hi2';
import { SiGithub } from 'react-icons/si';
import TechIcon from './TechIcon';

export default function ProjectDetail({ project, onBack }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="w-full"
    >
      {/* Top Bar: Back Button & Breadcrumbs */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-amber-400/30 transition-all duration-200 cursor-pointer hover:-translate-x-1"
        >
          <HiArrowLeft className="text-amber-400" />
          <span>Back</span>
        </button>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
          <button
            onClick={onBack}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Projects
          </button>
          <span className="text-gray-600 font-bold">&gt;</span>
          <span className="text-white font-medium truncate max-w-[200px] sm:max-w-none">
            {project.title}
          </span>
        </div>
      </div>

      {/* Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Title, Description, Features & Tech Stack */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            {project.subtitle && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-400/20 mb-3">
                {project.subtitle}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {project.title}
            </h2>
          </div>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {project.fullDesc || project.shortDesc}
          </p>

          {/* Key Features List */}
          {project.features && project.features.length > 0 && (
            <div className="rounded-2xl p-4 bg-white/[0.02] border border-white/5">
              <h4 className="text-xs font-semibold tracking-wider text-amber-400/90 uppercase mb-3">
                Key Highlights
              </h4>
              <ul className="space-y-2">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                    <HiCheckCircle className="text-amber-400 shrink-0 mt-0.5" size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Used Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <HiCodeBracket className="text-amber-400 text-lg" />
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Technologies Used
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {project.technologies.map((tech, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0c121e]/90 border border-white/10 hover:border-amber-400/40 hover:bg-amber-500/10 transition-all duration-200 text-xs sm:text-sm text-gray-200"
                >
                  <TechIcon name={tech.icon} color={tech.color} size={18} />
                  <span className="font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition-all duration-200"
              >
                <span>Live Demo</span>
                <HiArrowTopRightOnSquare size={16} />
              </a>
            )}

            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-amber-400/30 transition-all duration-200"
              >
                <SiGithub size={16} />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Sleek App/Browser Mockup */}
        <div className="lg:col-span-6 w-full">
          <div className="relative rounded-2xl bg-[#080c14]/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-3 sm:p-4 overflow-hidden group">
            {/* Top Mockup Chrome Window Bar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-gray-400 max-w-[200px] truncate">
                https://naufal.dev/projects/{project.id}
              </div>
              <span className="text-[10px] font-mono text-amber-400/80 uppercase">
                Preview
              </span>
            </div>

            {/* Mockup Preview Image */}
            <div className="relative rounded-xl overflow-hidden bg-black/70 border border-white/5 aspect-video flex items-center justify-center">
              <img
                src={project.mockupImage || project.cardImage}
                alt={`${project.title} Preview Mockup`}
                className="w-full h-full object-contain sm:object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
                onError={(e) => {
                  e.target.src = project.cardImage;
                }}
              />
              <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-xl" />
            </div>

            {/* Decorative Ambient Underglow */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
