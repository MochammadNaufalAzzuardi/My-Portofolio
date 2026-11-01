import profilCutout from '../../assets/profil_cutout.png';

/**
 * Komponen Foto Profil About Me (Clean & Elegan)
 * - Menampilkan ilustrasi profil cutout tanpa background
 * - Dilengkapi efek ambient glow luar angkasa halus di belakang foto
 */
export default function ProfileImage() {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[400px] mx-auto flex items-center justify-center select-none group">
      {/* Efek Ambient Space Glow di Belakang Karakter */}
      <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-[90px] scale-95 group-hover:scale-105 group-hover:bg-amber-400/25 transition-all duration-700 pointer-events-none" />

      {/* Kontainer Foto Profil */}
      <div className="relative w-full h-[460px] sm:h-[520px] flex items-center justify-center overflow-visible">
        <img
          src={profilCutout}
          alt="Mochammad Naufal Azzuardi"
          className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
    </div>
  );
}
