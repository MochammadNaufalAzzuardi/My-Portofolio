import { FiCode, FiAward } from 'react-icons/fi';
import { LuMedal } from 'react-icons/lu';

/**
 * Komponen 3 Kartu Statistik (Sesuai Video Referensi refrensi.mp4 - Detik 20-22)
 * - 3 Kartu Glassmorphism: PROJECTS, CERTIFICATES, AWARDS
 * - Ikon badge mini, angka tebal besar, label uppercase, dan deskripsi singkat
 */
export default function StatsCards() {
  const stats = [
    {
      number: '3',
      label: 'PROJECTS',
      description: 'Karya yang dibuat',
      icon: <FiCode className="w-5 h-5 text-amber-400" />,
      glowColor: 'from-amber-600/20 to-yellow-500/0',
      badgeBg: 'bg-amber-500/10 border-amber-400/30 text-amber-400',
    },
    {
      number: '3',
      label: 'CERTIFICATES',
      description: 'Skill yang divalidasi',
      icon: <LuMedal className="w-5 h-5 text-yellow-400" />,
      glowColor: 'from-yellow-600/20 to-amber-500/0',
      badgeBg: 'bg-yellow-500/10 border-yellow-400/30 text-yellow-400',
    },
    {
      number: '1',
      label: 'AWARDS',
      description: 'Pencapaian diraih',
      icon: <FiAward className="w-5 h-5 text-amber-300" />,
      glowColor: 'from-amber-500/20 to-yellow-400/0',
      badgeBg: 'bg-amber-400/10 border-amber-300/30 text-amber-300',
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="relative p-7 rounded-3xl bg-[#0c101b]/70 border border-white/[0.08] hover:border-amber-400/40 backdrop-blur-xl shadow-2xl shadow-black/40 transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden"
        >
          {/* Subtle Top Gradient Glow on Hover */}
          <div
            className={`absolute -top-12 -left-12 w-40 h-40 rounded-full bg-gradient-to-br ${stat.glowColor} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
          />

          <div className="relative z-10 flex flex-col justify-between h-full min-h-[120px]">
            {/* Baris Atas: Ikon Badge di Kiri, Angka Besar di Kanan */}
            <div className="flex items-center justify-between mb-6">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${stat.badgeBg} group-hover:scale-110 transition-transform duration-300 shadow-md`}
              >
                {stat.icon}
              </div>

              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] group-hover:text-amber-300 transition-colors">
                {stat.number}
              </span>
            </div>

            {/* Baris Bawah: Label Huruf Kapital & Keterangan */}
            <div>
              <h4 className="text-sm font-black text-white tracking-wider mb-1">
                {stat.label}
              </h4>
              <p className="text-xs text-gray-400 font-medium tracking-wide">
                {stat.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
