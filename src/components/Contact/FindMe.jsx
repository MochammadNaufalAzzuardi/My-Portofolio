import React from 'react';
import { SiInstagram, SiGithub } from 'react-icons/si';
import { HiArrowUpRight } from 'react-icons/hi2';

const SOCIALS = [
  {
    name: 'Instagram',
    handle: '@naufalazz1',
    url: 'https://www.instagram.com/naufalazz1/',
    icon: SiInstagram,
    color: '#E4405F',
    bgHover: 'group-hover:border-[#E4405F]/50 group-hover:shadow-[0_0_20px_rgba(228,64,95,0.2)]'
  },
  {
    name: 'GitHub',
    handle: '@MochammadNaufalAzzuardi',
    url: 'https://github.com/MochammadNaufalAzzuardi/',
    icon: SiGithub,
    color: '#FFFFFF',
    bgHover: 'group-hover:border-amber-400/50 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]'
  }
];

export default function FindMe() {
  return (
    <div className="mt-8">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span>FIND ME</span>
      </h3>

      <div className="flex flex-col gap-3">
        {SOCIALS.map((soc) => {
          const Icon = soc.icon;
          return (
            <a
              key={soc.name}
              href={soc.url}
              target="_blank"
              rel="noreferrer"
              className={`group relative rounded-2xl bg-[#0c121e]/80 backdrop-blur-xl border border-white/10 p-4 flex items-center justify-between transition-all duration-300 hover:-translate-y-1 ${soc.bgHover}`}
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={22} style={{ color: soc.color }} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {soc.name}
                  </h4>
                  <p className="text-xs text-gray-400">{soc.handle}</p>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-white/[0.03] text-gray-400 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                <HiArrowUpRight size={18} />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
