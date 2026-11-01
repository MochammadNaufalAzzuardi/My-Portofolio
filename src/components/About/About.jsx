import { FiSend } from 'react-icons/fi';
import { LuCode } from 'react-icons/lu';
import ProfileImageWithSpiderman from './ProfileImageWithSpiderman';
import EducationExperience from './EducationExperience';
import StatsCards from './StatsCards';
import MusicWidget from './MusicWidget';

/**
 * Komponen Utama Tahap 3: About Me
 * Sesuai Video Referensi refrensi.mp4 (Detik 12 - 26)
 * - Heading "About Me"
 * - 3-Kolom Hero About: Teks Kiri, Foto Interaktif Spider-Man Tengah, Bio & CTA Kanan
 * - Section Education (SMK Darul 'Ulum & Unipdu) & Experience
 * - 3 Kartu Statistik Glassmorphism (Projects, Certificates, Awards)
 * - Widget Musik Custom Playlist ala Spotify
 */
export default function About() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Ambient Glow Halus */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ===================================================================== */}
        {/* 1. SECTION TITLE "About Me"                                          */}
        {/* ===================================================================== */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mt-4 rounded-full" />
        </div>

        {/* ===================================================================== */}
        {/* 2. THREE-COLUMN HERO ABOUT                                           */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Sisi Kiri: Salam & Nama Lengkap */}
          <div className="lg:col-span-4 flex flex-col items-start lg:pr-4 text-left">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 block mb-2">
              Hi, I'm
            </span>
            <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.15] mb-8">
              Mochammad <br className="hidden sm:inline" />
              Naufal Azzuardi
            </h3>

            <button
              onClick={() => scrollToSection('contact')}
              className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black px-7 py-3.5 rounded-full font-bold transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-400/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <FiSend className="text-base group-hover:translate-x-0.5 transition-transform" />
              <span>Hubungi Saya</span>
            </button>
          </div>

          {/* Sisi Tengah: Foto Interaktif */}
          <div className="lg:col-span-4 flex justify-center order-first lg:order-none mb-6 lg:mb-0">
            <ProfileImageWithSpiderman />
          </div>

          {/* Sisi Kanan: Paragraf Bio & Tombol CTA Projek */}
          <div className="lg:col-span-4 flex flex-col items-start lg:pl-4 text-left">
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
              Saya adalah <strong className="text-white font-bold">Junior Developer</strong> yang berfokus pada pengembangan teknologi yang fungsional sekaligus menarik. Saya senang memadukan kode, desain, dan pengalaman 3D untuk membangun produk digital yang berkesan.
            </p>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
              Dengan React, Three.js, dan teknologi web modern, saya mengubah ide menjadi pengalaman digital yang intuitif, responsif, dan berdampak.
            </p>

            <button
              onClick={() => scrollToSection('portfolio')}
              className="group inline-flex items-center gap-2.5 border border-gray-700/80 hover:border-amber-400/50 bg-[#0c101b]/60 hover:bg-amber-500/10 backdrop-blur-md text-gray-200 hover:text-white px-7 py-3.5 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-black/30"
            >
              <LuCode className="text-base text-amber-400" />
              <span>Lihat Projek</span>
              <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </button>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 3. EDUCATION & EXPERIENCE (SMK Darul 'Ulum & Unipdu 2025)             */}
        {/* ===================================================================== */}
        <EducationExperience />

        {/* ===================================================================== */}
        {/* 4. TIGA KARTU STATISTIK (Projects, Certificates, Awards)             */}
        {/* ===================================================================== */}
        <StatsCards />

        {/* ===================================================================== */}
        {/* 5. SPOTIFY-STYLE MUSIC WIDGET DENGAN PLAYLIST PRIBADI                 */}
        {/* ===================================================================== */}
        <MusicWidget />
      </div>
    </section>
  );
}
