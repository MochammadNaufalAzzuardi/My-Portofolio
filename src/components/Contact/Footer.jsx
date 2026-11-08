import React from 'react';
import { SiGithub, SiInstagram } from 'react-icons/si';
import { HiArrowSmallUp } from 'react-icons/hi2';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="mt-20 border-t border-white/10 pt-16 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pb-12">
          {/* Brand & Mission Statement */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-mono font-bold text-xl">&gt;_</span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Naufal<span className="text-amber-400">.dev</span>
              </h3>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Membangun pengalaman web modern dengan presisi kode, tipografi tajam, dan dimensi 3D interaktif.
            </p>
          </div>

          {/* Navigasi Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4">
              NAVIGASI
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { id: 'home', label: 'Beranda' },
                { id: 'about', label: 'Tentang Saya' },
                { id: 'portfolio', label: 'Portofolio' },
                { id: 'contact', label: 'Kontak' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons & Terhubung */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4">
              TERHUBUNG
            </h4>
            <div className="flex items-center gap-3">
              {[
                { name: 'GitHub', icon: SiGithub, url: 'https://github.com/MochammadNaufalAzzuardi/' },
                { name: 'Instagram', icon: SiInstagram, url: 'https://www.instagram.com/naufalazz1/' }
              ].map((soc) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={soc.name}
                    href={soc.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={soc.name}
                    className="p-3 rounded-xl bg-white/[0.04] hover:bg-amber-500/10 border border-white/10 hover:border-amber-400/50 text-gray-300 hover:text-amber-300 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Mochammad Naufal Azzuardi. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-amber-500/10 border border-white/10 hover:border-amber-400/40 text-gray-400 hover:text-amber-300 transition-all duration-200 cursor-pointer"
          >
            <span>Kembali ke Atas</span>
            <HiArrowSmallUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
