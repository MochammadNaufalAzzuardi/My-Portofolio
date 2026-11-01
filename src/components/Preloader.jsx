import { useState, useEffect } from 'react';

/**
 * Preloader Komponen (Sesuai Video Referensi refrensi.mp4 - Frame 1s)
 * - Tampilan persentase besar (angka putih, tanda % biru neon)
 * - Garis progress bar minimalis bernuansa cyberpunk/space glow
 * - Teks status "Memuat assets..."
 * - Animasi keluar (fade out + scale) yang halus setelah 100%
 */
export default function Preloader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Simulasi loading aset yang mulus hingga 100%
    const startTime = Date.now();
    const duration = 1800; // 1.8 detik durasi yang pas & responsif

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressFraction = Math.min(elapsed / duration, 1);
      
      // Easing curve (easeOutCubic) agar angka melambat halus mendekati 100%
      const easedProgress = Math.floor((1 - Math.pow(1 - progressFraction, 3)) * 100);
      
      setProgress(easedProgress);

      if (progressFraction >= 1) {
        clearInterval(timer);
        // Tahan sejenak di angka 100% agar terbaca sempurna
        setTimeout(() => {
          setIsFadingOut(true);
          // Beri waktu animasi fade-out selesai sebelum unmount
          setTimeout(() => {
            setIsDone(true);
            if (onFinish) onFinish();
          }, 700);
        }, 300);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [onFinish]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07090e] select-none transition-all duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Radial Glow Halus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.14)_0%,_transparent_65%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Angka Persentase Besar: Angka Putih + Tanda % Emas Neon */}
        <div className="flex items-baseline font-black tracking-tight select-none">
          <span className="text-6xl sm:text-7xl md:text-8xl text-white font-sans drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            {progress}
          </span>
          <span className="text-4xl sm:text-5xl md:text-6xl text-amber-400 font-bold ml-1.5 drop-shadow-[0_0_15px_rgba(251,191,36,0.85)]">
            %
          </span>
        </div>

        {/* Progress Bar Minimalis Berpendar Emas */}
        <div className="w-56 sm:w-72 md:w-80 h-[3px] bg-white/[0.08] rounded-full overflow-hidden mt-6 relative border border-white/[0.05]">
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-500 rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(245,158,11,0.9)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Subteks Status "Memuat assets..." */}
        <p className="text-xs sm:text-sm text-gray-400 font-mono tracking-widest mt-4 flex items-center gap-1.5">
          <span>Memuat assets...</span>
        </p>
      </div>
    </div>
  );
}
