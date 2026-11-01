import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About/About';
import SpaceBackground from './components/SpaceBackground';
import { AudioProvider } from './context/AudioContext';

function App() {
  return (
    <AudioProvider>
      <div className="min-h-screen bg-[#07090e] text-white relative selection:bg-amber-500 selection:text-black">
        {/* 1. Preloader Persentase (Tahap 2) */}
        <Preloader />

        {/* 2. Latar Belakang Luar Angkasa, Bintang & Meteor (Z-index 0) */}
        <SpaceBackground />

        {/* 3. Floating Pill Navbar (Tahap 2) */}
        <Navbar />

        {/* 4. Konten Halaman (Z-index 10 di atas bintang) */}
        <main className="relative z-10">
          {/* Section 1: Hero Section (Tahap 1) */}
          <Hero />

          {/* Section 2: About Me (Tahap 3 Selesai) */}
          <About />

          {/* Section 3: Portfolio (Placeholder untuk Tahap 4) */}
          <section
            id="portfolio"
            className="min-h-screen flex items-center justify-center border-t border-gray-800/40 relative px-4"
          >
            <div className="text-center max-w-xl p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-md">
              <h2 className="text-3xl font-bold mb-3 text-white">Portfolio</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tab Projects, Certificates, dan Tech Stack interaktif akan kita bangun di Tahap 4.
              </p>
            </div>
          </section>

          {/* Section 4: Contact (Placeholder untuk Tahap 5) */}
          <section
            id="contact"
            className="min-h-screen flex items-center justify-center border-t border-gray-800/40 relative px-4"
          >
            <div className="text-center max-w-xl p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-md">
              <h2 className="text-3xl font-bold mb-3 text-white">Contact</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Formulir kontak langsung dan kolom komentar interaktif akan kita bangun di Tahap 5.
              </p>
            </div>
          </section>
        </main>
      </div>
    </AudioProvider>
  );
}

export default App;
