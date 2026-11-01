import { HiAcademicCap, HiBriefcase } from 'react-icons/hi2';
import { LuGraduationCap, LuNetwork, LuCode, LuBuilding2 } from 'react-icons/lu';

/**
 * Komponen Education & Experience (Sesuai Video Referensi refrensi.mp4 - Detik 18-20)
 * - Menampilkan 2 kolom sejajar: Education di kiri, Experience di kanan
 * - Menggunakan data asli pengguna:
 *   1. SMK Telekomunikasi Darul 'Ulum (TKJ)
 *   2. Universitas Pesantren Tinggi Darul 'Ulum (Sistem Informasi, 2025 - Sekarang)
 */
export default function EducationExperience() {
  const educationData = [
    {
      institution: "Universitas Pesantren Tinggi Darul 'Ulum",
      degree: "S1 - Sistem Informasi",
      period: "2025 – Sekarang",
      icon: <LuGraduationCap className="w-6 h-6 text-amber-400" />,
      tag: "Kuliah Aktif",
    },
    {
      institution: "SMK Telekomunikasi Darul 'Ulum",
      degree: "Teknik Komputer dan Jaringan (TKJ)",
      period: "2021 – 2024",
      icon: <LuNetwork className="w-6 h-6 text-yellow-400" />,
      tag: "Sekolah Menengah Kejuruan",
    },
  ];

  const experienceData = [
    {
      role: "Junior Web Developer & 3D Enthusiast",
      company: "Personal & Freelance Projects",
      period: "2024 – Sekarang",
      icon: <LuCode className="w-6 h-6 text-emerald-400" />,
      tag: "Full Stack & 3D Creative",
    },
    {
      role: "Network & IT Support Praktikum",
      company: "Lab TKJ SMK Telkom Darul 'Ulum",
      period: "2023 – 2024",
      icon: <LuBuilding2 className="w-6 h-6 text-cyan-400" />,
      tag: "Infrastruktur & Jaringan",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mt-16">
      {/* Kolom Kiri: Education */}
      <div>
        <div className="flex items-center gap-2.5 mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <HiAcademicCap className="text-amber-400 text-2xl" />
            <span>Education</span>
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          {educationData.map((item, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-[#0c101b]/70 border border-white/[0.08] hover:border-amber-400/40 backdrop-blur-xl shadow-xl shadow-black/30 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-start gap-4">
                {/* Logo / Icon Institusi */}
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/25 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-amber-400/50 transition-all duration-300">
                  {item.icon}
                </div>

                {/* Konten Edukasi */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {item.institution}
                    </h4>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-gray-300">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 font-medium mb-1.5">{item.degree}</p>
                  <p className="text-xs font-mono text-amber-400 font-semibold tracking-wide">
                    {item.period}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kolom Kanan: Experience */}
      <div>
        <div className="flex items-center gap-2.5 mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <HiBriefcase className="text-emerald-400 text-2xl" />
            <span>Experience</span>
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          {experienceData.map((item, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-[#0c101b]/70 border border-white/[0.08] hover:border-emerald-500/40 backdrop-blur-xl shadow-xl shadow-black/30 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-start gap-4">
                {/* Logo / Icon Peran */}
                <div className="w-12 h-12 rounded-xl bg-emerald-600/15 border border-emerald-500/25 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-emerald-400/50 transition-all duration-300">
                  {item.icon}
                </div>

                {/* Konten Pengalaman */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {item.role}
                    </h4>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-gray-300">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 font-medium mb-1.5">{item.company}</p>
                  <p className="text-xs font-mono text-emerald-400 font-semibold tracking-wide">
                    {item.period}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
