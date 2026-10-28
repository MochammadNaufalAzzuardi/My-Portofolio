import { useEffect, useState } from 'react';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', targetId: 'home' },
  { id: 'about', label: 'About', targetId: 'about' },
  { id: 'portfolio', label: 'Portfolio', targetId: 'portfolio' },
  { id: 'contact', label: 'Contact', targetId: 'contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);

  // Otomatis mengubah menu aktif sesuai posisi scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      NAV_ITEMS.forEach((item) => {
        const el = document.getElementById(item.targetId);
        if (el) {
          const top = el.offsetTop - 150;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActive(item.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi smooth scroll saat tombol diklik
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto">
      <div className="flex items-center gap-2 bg-[#121318]/80 backdrop-blur-xl border border-gray-700/50 px-4 py-2 rounded-full shadow-xl shadow-black/40">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.targetId)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
              active === item.id
                ? 'bg-gray-800 text-white border border-gray-700/60 shadow-inner'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
            }`}
          >
            {item.label}
          </button>
        ))}

        {/* Tombol Audio */}
        <button
          onClick={toggleAudio}
          className="p-2 text-gray-300 hover:text-white bg-gray-800/60 hover:bg-gray-700/70 rounded-full transition-all duration-300 border border-gray-700/50 ml-1"
          title="Toggle Music"
        >
          {isPlaying ? (
            <FiVolume2 className="w-4 h-4 text-blue-400" />
          ) : (
            <FiVolumeX className="w-4 h-4" />
          )}
        </button>
      </div>
    </nav>
  );
}