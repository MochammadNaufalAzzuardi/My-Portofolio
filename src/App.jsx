import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SpaceBackground from './components/SpaceBackground';
import About from './components/About';

function App() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white relative selection:bg-blue-500 selection:text-white">
      {/* 1. Latar Belakang Bintang & Meteor Bergerak (Z-index 0 di atas latar gelap) */}
      <SpaceBackground />
      
      {/* 2. Konten Halaman (Z-index 10 di atas bintang) */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
      </div>
    </div>
  );
}

export default App;
