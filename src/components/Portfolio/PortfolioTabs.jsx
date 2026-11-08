import React from 'react';
import { motion } from 'framer-motion';
import { HiCodeBracket } from 'react-icons/hi2';
import { TbCertificate, TbTrophy, TbCpu } from 'react-icons/tb';

const TABS = [
  { id: 'projects', label: 'Projects', icon: HiCodeBracket },
  { id: 'certificates', label: 'Certificates', icon: TbCertificate },
  { id: 'achievements', label: 'Achievements', icon: TbTrophy },
  { id: 'tech-stack', label: 'Tech Stack', icon: TbCpu }
];

export default function PortfolioTabs({ activeTab, onSelectTab }) {
  return (
    <div className="flex justify-center mb-12 px-2">
      <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#0c121e]/80 backdrop-blur-xl border border-white/10 shadow-2xl relative">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative z-10 flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                isActive ? 'text-slate-950' : 'text-gray-400 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activePortfolioTabPill"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.35)] -z-10"
                />
              )}
              <Icon className="text-base sm:text-lg shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
