// Helper untuk memastikan path gambar selalu cocok dengan base path Vite (/My-Portofolio/)
const getAssetUrl = (path) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

export const PROJECTS_DATA = [
  {
    id: 'cyber-gyzn',
    title: 'CYBER GYZN',
    subtitle: 'Cybersecurity & Phishing Intelligence Dashboard',
    shortDesc: 'Aplikasi dashboard hasil link phising untuk memantau dan menganalisis data phishing secara real-time.',
    fullDesc: 'CYBER GYZN merupakan platform pemantauan dan analisis intelijen ancaman siber (phishing link analyzer) yang dirancang untuk melacak aktivitas sesi target, memverifikasi integritas kredensial uji coba, serta menyajikan visualisasi data intelijen secara komprehensif, cepat, dan aman dalam satu kesatuan dashboard modern.',
    cardImage: getAssetUrl('projects/cyber_gyzn_card.png'),
    mockupImage: getAssetUrl('projects/cyber_gyzn_mockup.png'),
    technologies: [
      { name: 'Python', icon: 'SiPython', color: '#3776AB' },
      { name: 'HTML5', icon: 'SiHtml5', color: '#E34F26' },
      { name: 'CSS3', icon: 'SiCss3', color: '#1572B6' },
      { name: 'JavaScript', icon: 'SiJavascript', color: '#F7DF1E' },
      { name: 'PHP', icon: 'SiPhp', color: '#777BB4' },
      { name: 'MySQL', icon: 'SiMysql', color: '#4479A1' },
      { name: 'VSCode', icon: 'VscVscode', color: '#007ACC' }
    ],
    features: [
      'Real-time session tracker & alert monitoring',
      'Target data parsing & categorization',
      'Credential inspection & test log auditing',
      'Dark-mode tactical glassmorphism UI'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/MochammadNaufalAzzuardi/'
  },
  {
    id: 'bot-generate-artikel',
    title: 'Bot Generate Artikel',
    subtitle: 'AI-Powered Article & SEO Generation Engine',
    shortDesc: 'Aplikasi dashboard otomatisasi pembuatan artikel berbasis AI untuk menghasilkan, mengelola, dan memantau proses pembuatan serta publikasi artikel secara efisien pada website.',
    fullDesc: 'Website otomatisasi pembuatan artikel yang memanfaatkan kecerdasan buatan (AI) untuk membuat artikel secara otomatis berdasarkan kata kunci atau topik yang ditentukan, lengkap dengan optimasi SEO, pengelolaan konten, dan penjadwalan publikasi dalam satu dashboard yang intuitif dan terintegrasi.',
    cardImage: getAssetUrl('projects/bot_artikel_card.png'),
    mockupImage: getAssetUrl('projects/bot_artikel_mockup.png'),
    technologies: [
      { name: 'Python', icon: 'SiPython', color: '#3776AB' },
      { name: 'HTML', icon: 'SiHtml5', color: '#E34F26' },
      { name: 'CSS', icon: 'SiCss3', color: '#1572B6' },
      { name: 'JavaScript', icon: 'SiJavascript', color: '#F7DF1E' },
      { name: 'VSCode', icon: 'VscVscode', color: '#007ACC' },
      { name: 'Gemini', icon: 'SiGooglegemini', color: '#8E75FF' },
      { name: 'Chromium', icon: 'SiGooglechrome', color: '#4285F4' }
    ],
    features: [
      'Automated SEO Keyword Generation & Content Structuring',
      'Integrasi AI Engine generasi teks terkini',
      'Dashboard manajemen status & penjadwalan publish',
      'Anti-detection readability & tone customization'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/MochammadNaufalAzzuardi/'
  },
  {
    id: 'database-siswa',
    title: 'Database Siswa',
    subtitle: 'Centralized Student Information & Academic Portal',
    shortDesc: 'Aplikasi Dashboard Data Siswa merupakan platform berbasis website untuk memantau data siswa secara terpusat.',
    fullDesc: 'Aplikasi Dashboard Data Siswa merupakan platform berbasis website yang dibangun untuk memusatkan informasi kesiswaan, memantau riwayat akademik, memudahkan pencarian berdasarkan nama maupun NISN secara instan, serta mengoptimalkan efisiensi tata kelola sekolah dengan hak akses terproteksi.',
    cardImage: getAssetUrl('projects/database_siswa_card.png'),
    mockupImage: getAssetUrl('projects/database_siswa_mockup.png'),
    technologies: [
      { name: 'PHP', icon: 'SiPhp', color: '#777BB4' },
      { name: 'MySQL', icon: 'SiMysql', color: '#4479A1' },
      { name: 'JavaScript', icon: 'SiJavascript', color: '#F7DF1E' },
      { name: 'HTML5', icon: 'SiHtml5', color: '#E34F26' },
      { name: 'CSS3', icon: 'SiCss3', color: '#1572B6' },
      { name: 'XAMPP', icon: 'SiXampp', color: '#FB7A24' }
    ],
    features: [
      'Pencarian data siswa kilat & filter multi-parameter',
      'Manajemen database relasional MySQL terstruktur',
      'Pemisahan hak akses administrator dan guru',
      'Export data laporan & cetak kartu siswa'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/MochammadNaufalAzzuardi/'
  }
];

export const CERTIFICATES_DATA = [
  {
    id: 'cert-pkl',
    title: 'Sertifikat Praktik Kerja Lapangan (PKL)',
    issuer: 'SMK Telekomunikasi / Mitra Industri',
    date: 'Januari - Mei 2024',
    badge: 'Industri & Vokasi',
    image: getAssetUrl('certificates/cert_pkl.png'),
    description: 'Telah menyelesaikan Praktik Kerja Lapangan (PKL) dengan predikat Amat Baik dalam kompetensi Teknik Komputer dan Jaringan.'
  },
  {
    id: 'cert-udemy-css',
    title: 'CSS And Javascript Crash Course',
    issuer: 'Udemy',
    date: 'Februari 2024',
    badge: 'Frontend Mastery',
    image: getAssetUrl('certificates/cert_udemy_css.png'),
    description: 'Sertifikasi penguasaan modern CSS styling, DOM manipulation, responsive layouts, dan logika interaktif JavaScript.'
  },
  {
    id: 'cert-udemy-hack',
    title: 'Ethically Hack the Planet Part 2',
    issuer: 'Udemy',
    date: '2024',
    badge: 'Cyber Security',
    image: getAssetUrl('certificates/cert_udemy_hack.png'),
    description: 'Sertifikasi pemahaman fundamental ethical hacking, penetration testing reconnaissance, dan analisis keamanan jaringan.'
  }
];

export const ACHIEVEMENTS_DATA = [
  {
    id: 'achieve-ksm',
    title: 'Juara III Kompetisi Sains Madrasah (KSM)',
    issuer: 'Kementerian Agama Republik Indonesia',
    year: '2022',
    badge: 'Penghargaan Sains',
    rank: 'Juara III',
    image: getAssetUrl('certificates/achievement_ksm.png'),
    description: 'Piagam Penghargaan atas raihan Juara III dalam ajang Kompetisi Sains Madrasah (KSM) Tingkat Kabupaten/Kota.'
  }
];

export const TECH_STACK_DATA = [
  { name: 'React', icon: 'SiReact', color: '#61DAFB', category: 'Frontend' },
  { name: 'JavaScript', icon: 'SiJavascript', color: '#F7DF1E', category: 'Language' },
  { name: 'HTML5', icon: 'SiHtml5', color: '#E34F26', category: 'Frontend' },
  { name: 'CSS3', icon: 'SiCss3', color: '#1572B6', category: 'Frontend' },
  { name: 'Tailwind CSS', icon: 'SiTailwindcss', color: '#06B6D4', category: 'Styling' },
  { name: 'Font Awesome', icon: 'SiFontawesome', color: '#528DD7', category: 'Assets' },
  { name: 'Python', icon: 'SiPython', color: '#3776AB', category: 'Language' },
  { name: 'PHP', icon: 'SiPhp', color: '#777BB4', category: 'Backend' },
  { name: 'MySQL', icon: 'SiMysql', color: '#4479A1', category: 'Database' },
  { name: 'Supabase', icon: 'SiSupabase', color: '#3ECF8E', category: 'Backend/DB' },
  { name: 'Firebase', icon: 'SiFirebase', color: '#FFCA28', category: 'Cloud/BaaS' },
  { name: 'XAMPP', icon: 'SiXampp', color: '#FB7A24', category: 'Server Env' },
  { name: 'Git', icon: 'SiGit', color: '#F05032', category: 'Version Control' },
  { name: 'GitHub', icon: 'SiGithub', color: '#FFFFFF', category: 'Collaboration' },
  { name: 'Vite', icon: 'SiVite', color: '#646CFF', category: 'Build Tool' },
  { name: 'Vercel', icon: 'SiVercel', color: '#FFFFFF', category: 'Deployment' }
];
