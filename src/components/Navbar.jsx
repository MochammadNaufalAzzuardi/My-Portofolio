import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';
import { useAudio } from '../context/AudioContext';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
];

/**
 * Floating Pill Navbar (Sesuai Video Referensi refrensi.mp4 - Frame 5s, 15s, 25s, 35s, 45s)
 * - Desain kapsul mengambang (floating pill) di tengah atas layar
 * - Dark translucent glassmorphism dengan backdrop-blur
 * - Pill aktif yang meluncur mulus (fluid spring animation)
 * - Pemisah vertikal (divider)
 * - Tombol audio interaktif terhubung dengan pemutar musik utama (AudioContext)
 */
export default function Navbar() {
  const [active, setActive] = useState('home');
  const { isPlaying, togglePlay, currentTrack } = useAudio();

  // Otomatis mendeteksi section yang sedang aktif di viewport saat scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset deteksi yang pas

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const section = document.getElementById(item.id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActive(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Cek posisi awal
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll saat tab diklik
  const handleNavClick = (id) => {
    setActive(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-auto select-none">
      <nav
        aria-label="Main Navigation"
        className="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-full bg-[#0b0f19]/80 backdrop-blur-xl border border-white/[0.08] border-t-white/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
      >
        {/* Daftar Menu Navigasi */}
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {/* Animasi Pill Bergerak Halus Mengikuti Menu Aktif */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-amber-500/20 border border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.35)]"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Garis Pemisah (Divider) Vertikal */}
        <div className="w-[1px] h-4 bg-white/15 mx-1" aria-hidden="true" />

        {/* Tombol Audio Interaktif (Terhubung langsung ke Pemutar Musik Global) */}
        <button
          onClick={togglePlay}
          className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
            isPlaying
              ? 'text-amber-400 bg-amber-500/20 border border-amber-400/30 shadow-[0_0_12px_rgba(245,158,11,0.35)]'
              : 'text-gray-400 hover:text-white hover:bg-white/[0.06]'
          }`}
          title={
            isPlaying
              ? `Jeda Musik: ${currentTrack?.title || ''}`
              : 'Putar Musik Latar'
          }
          aria-label={isPlaying ? 'Mute background audio' : 'Play background audio'}
        >
          {isPlaying ? (
            <div className="flex items-center justify-center gap-1">
              <FiVolume2 className="w-4 h-4 text-amber-400 animate-pulse" />
              {/* Visualizer Equalizer Mini Saat Musik Berputar */}
              <span className="flex items-end gap-[2px] h-3 ml-0.5">
                <span className="w-[2px] bg-amber-400 rounded-full animate-[bounce_0.8s_infinite] h-2.5" />
                <span className="w-[2px] bg-yellow-300 rounded-full animate-[bounce_1.1s_infinite] h-3.5" />
                <span className="w-[2px] bg-amber-400 rounded-full animate-[bounce_0.7s_infinite] h-2" />
              </span>
            </div>
          ) : (
            <FiVolumeX className="w-4 h-4" />
          )}
        </button>
      </nav>
    </header>
  );
}
