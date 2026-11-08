import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About/About';
import Portfolio from './components/Portfolio/Portfolio';
import ContactSection from './components/Contact/ContactSection';
import Footer from './components/Contact/Footer';
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

          {/* Section 2: About Me (Tahap 3) */}
          <About />

          {/* Section 3: Portfolio (Tahap 4) */}
          <Portfolio />

          {/* Section 4: Contact & Komentar (Tahap 5) */}
          <ContactSection />
        </main>

        {/* 5. Footer (Tahap 5) */}
        <Footer />
      </div>
    </AudioProvider>
  );
}

export default App;
