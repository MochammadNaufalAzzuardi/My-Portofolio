import { useState, useEffect } from 'react';
import { FiArrowUpRight, FiSend } from 'react-icons/fi';
import { FaGithub, FaInstagram } from 'react-icons/fa6';
import Card3D from './Card3D';

// Komponen Efek Ketik (Typewriter) Halus
const Typewriter = () => {
  const words = [
    '3D Creative Developer',
    'React & Three.js Enthusiast',
    'Junior Web Developer',
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        if (currentText.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        if (currentText.length - 1 === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <div className="h-9 flex items-center mb-6">
      <h2 className="text-xl md:text-2xl text-gray-200 font-semibold tracking-wide">
        {currentText}
        <span className="inline-block w-[3px] h-6 bg-amber-400 ml-1.5 animate-pulse align-middle"></span>
      </h2>
    </div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-24 pb-12 relative overflow-hidden">
      {/* Background Glow Emas Angkasa Halus */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-600/15 rounded-full blur-[128px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[128px] pointer-events-none -z-10"></div>

      {/* ========================================================================= */}
      {/* FULL-SECTION 3D CANVAS (Mencakup seluruh layar Hero: Tanpa batas potong!) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full z-10">
        <Card3D />
      </div>

      {/* ========================================================================= */}
      {/* KONTEN HTML (Teks, Tombol CTA, Media Sosial)                             */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          
          {/* Sisi Kiri: Teks & Tombol (pointer-events-auto agar tombol dan teks bisa diklik) */}
          <div className="lg:col-span-6 pointer-events-auto">
            {/* Judul Utama */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-3 tracking-tight leading-[1.15]">
              Welcome to <br />
              <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
                My Portfolio
              </span>
            </h1>

            {/* Efek Ketik Dinamis (Typewriter) */}
            <Typewriter />

            {/* Paragraf Deskripsi Sesuai Video Referensi */}
            <p className="text-gray-400 mb-8 max-w-xl leading-relaxed text-sm md:text-base">
              Berawal dari rasa penasaran, sekarang jadi passion. Aku suka bereksperimen dengan kode, mengeksplorasi teknologi baru, dan mengubah ide menjadi sesuatu yang nyata. Dari tampilan web yang menarik sampai interaksi 3D yang seru, aku selalu berusaha bikin sesuatu yang bukan cuma keren dilihat, tapi juga nyaman digunakan.
            </p>

            {/* Tombol Aksi CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#portfolio"
                className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black px-7 py-3.5 rounded-full font-bold transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-400/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Lihat Projek</span>
                <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2 border border-gray-700 hover:border-amber-500/50 bg-white/[0.03] hover:bg-amber-500/[0.06] backdrop-blur-md text-gray-200 hover:text-white px-7 py-3.5 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <FiSend className="text-base text-gray-400 group-hover:text-amber-400 transition-colors" />
                <span>Hubungi Saya</span>
              </a>
            </div>

            {/* Bagian FIND ME (Sosial Media) */}
            <div className="pt-8 border-t border-gray-800/80 mt-10">
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold block mb-3.5">
                FIND ME
              </span>
              <div className="flex items-center space-x-3">
                <a
                  href="https://github.com/MochammadNaufalAzzuardi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-amber-500/15 border border-gray-800 hover:border-amber-400/40 flex items-center justify-center text-gray-400 hover:text-amber-300 transition-all duration-300 hover:-translate-y-1"
                  aria-label="GitHub"
                >
                  <FaGithub className="text-lg" />
                </a>

                <a
                  href="https://www.instagram.com/naufalazz1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-amber-500/15 border border-gray-800 hover:border-amber-400/40 flex items-center justify-center text-gray-400 hover:text-amber-300 transition-all duration-300 hover:-translate-y-1"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-lg" />
                </a>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Ruang transparan untuk tempat bersandarnya kartu 3D */}
          <div className="lg:col-span-6 h-[480px] lg:h-[620px] pointer-events-none"></div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
