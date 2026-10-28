import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-24 bg-[#0a0a0a] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Judul Utama */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            About <span className="text-blue-500">Me</span>
          </h2>
        </div>

        {/* --- BARIS 1: Sapaan, Foto Cutout, Deskripsi --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
          {/* Kotak Kiri (Sapaan) */}
          <div className="bg-[#121318]/80 border border-gray-800/80 rounded-[2rem] p-8 flex flex-col justify-center items-start shadow-xl relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full"></div>
            
            <h3 className="text-3xl font-bold text-gray-300 mb-1 z-10">Hi, I'm</h3>
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-500 mb-8 z-10 leading-tight">
              Mochammad<br/>Naufal Azzuardi
            </h2>
            <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 px-6 rounded-full transition-all z-10 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              Hubungi Saya
            </a>
          </div>

          {/* Kotak Tengah (Foto Cutout tanpa background kotak) */}
          <div className="relative flex items-end justify-center min-h-[300px] lg:min-h-0">
            {/* Efek glow di belakang badan */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-600/30 blur-[60px] rounded-full -z-10"></div>
            
            {/* PENTING: Gunakan foto berformat PNG transparan (tanpa background) agar membaur seperti di video */}
            <img src="/profil.png" alt="Naufal" className="w-auto h-full max-h-[380px] object-contain drop-shadow-2xl z-10 hover:scale-105 transition-transform duration-500" />
          </div>

          {/* Kotak Kanan (Deskripsi) */}
          <div className="bg-[#121318]/80 border border-gray-800/80 rounded-[2rem] p-8 flex flex-col justify-center shadow-xl">
            <p className="text-gray-400 leading-relaxed text-sm md:text-base text-justify">
              Saya adalah <span className="text-white font-bold">Junior Developer</span> yang berfokus pada pengembangan teknologi yang fungsional sekaligus menarik. Saya senang memadukan kode, desain, dan pengalaman 3D untuk membangun produk digital yang berkesan.
              <br /><br />
              Dengan React, Three.js, dan teknologi web modern, saya selalu berusaha mengubah ide menjadi pengalaman digital yang intuitif, responsif, dan berdampak.
            </p>
          </div>
        </div>

        {/* --- BARIS 2: Education & Experience --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Education */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <span className="text-blue-500">🎓</span> Education
            </h4>
            <div className="space-y-4">
              <div className="bg-[#121318]/80 border border-gray-800/80 rounded-[1.5rem] p-5 flex items-center gap-5 shadow-lg">
                <div className="w-14 h-14 bg-gray-800/50 rounded-xl flex items-center justify-center border border-gray-700">
                  <span className="text-2xl">🏫</span>
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm md:text-base">Universitas ... (Ganti Kampusmu)</h5>
                  <p className="text-xs md:text-sm text-gray-400">Teknik Informatika</p>
                  <p className="text-xs text-blue-500 mt-1 font-medium">2022 - Sekarang</p>
                </div>
              </div>
              <div className="bg-[#121318]/80 border border-gray-800/80 rounded-[1.5rem] p-5 flex items-center gap-5 shadow-lg">
                <div className="w-14 h-14 bg-gray-800/50 rounded-xl flex items-center justify-center border border-gray-700">
                   <span className="text-2xl">🏫</span>
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm md:text-base">SMA/SMK ... (Ganti Sekolahmu)</h5>
                  <p className="text-xs md:text-sm text-gray-400">Jurusan ...</p>
                  <p className="text-xs text-blue-500 mt-1 font-medium">2019 - 2022</p>
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <span className="text-blue-500">💼</span> Experience
            </h4>
            <div className="space-y-4">
              <div className="bg-[#121318]/80 border border-gray-800/80 rounded-[1.5rem] p-5 flex items-center gap-5 shadow-lg">
                <div className="w-14 h-14 bg-blue-900/20 rounded-xl flex items-center justify-center border border-blue-800/30">
                  <span className="text-blue-500 text-2xl">💻</span>
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm md:text-base">Web Developer</h5>
                  <p className="text-xs md:text-sm text-gray-400">Freelance / Personal Projects</p>
                  <p className="text-xs text-blue-500 mt-1 font-medium">2023 - Present</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- BARIS 3: Stats (Projects, Certificates, Awards) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Card 1 */}
          <div className="bg-[#121318]/80 border border-gray-800/80 rounded-[2rem] p-6 flex items-center justify-between shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 blur-2xl rounded-full group-hover:bg-blue-600/20 transition-all"></div>
            <div className="flex flex-col h-full justify-between z-10">
              <div className="w-10 h-10 bg-gray-800/80 rounded-lg flex items-center justify-center border border-gray-700 mb-6">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
              </div>
              <div>
                <h5 className="text-sm font-bold tracking-widest text-white mb-1">PROJECTS</h5>
                <p className="text-xs text-gray-500">Karya yang dibuat</p>
              </div>
            </div>
            <div className="z-10">
              <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">3</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#121318]/80 border border-gray-800/80 rounded-[2rem] p-6 flex items-center justify-between shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 blur-2xl rounded-full group-hover:bg-blue-600/20 transition-all"></div>
            <div className="flex flex-col h-full justify-between z-10">
              <div className="w-10 h-10 bg-gray-800/80 rounded-lg flex items-center justify-center border border-gray-700 mb-6">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
              </div>
              <div>
                <h5 className="text-sm font-bold tracking-widest text-white mb-1">CERTIFICATES</h5>
                <p className="text-xs text-gray-500">Skill divalidasi</p>
              </div>
            </div>
            <div className="z-10">
              <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">3</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#121318]/80 border border-gray-800/80 rounded-[2rem] p-6 flex items-center justify-between shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 blur-2xl rounded-full group-hover:bg-blue-600/20 transition-all"></div>
            <div className="flex flex-col h-full justify-between z-10">
              <div className="w-10 h-10 bg-gray-800/80 rounded-lg flex items-center justify-center border border-gray-700 mb-6">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
              </div>
              <div>
                <h5 className="text-sm font-bold tracking-widest text-white mb-1">AWARDS</h5>
                <p className="text-xs text-gray-500">Pencapaian diraih</p>
              </div>
            </div>
            <div className="z-10">
              <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">1</span>
            </div>
          </div>
        </div>

        {/* --- BARIS 4: Music & Spotify --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Teks Musik */}
          <div className="lg:col-span-5 bg-[#121318]/80 border border-gray-800/80 rounded-[2rem] p-8 md:p-10 flex flex-col justify-center shadow-lg">
            <h3 className="text-4xl md:text-5xl font-extrabold mb-2 text-white">A little music.</h3>
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-500 mb-6">A lot of ideas.</h3>
            <p className="text-gray-400 mb-8 text-sm md:text-base leading-relaxed">
              Musik yang menemani proses saya mengubah ide menjadi sesuatu yang nyata. Intip playlist yang sedang sering saya putar.
            </p>
            <div className="inline-flex items-center gap-3 bg-[#1db954]/10 border border-[#1db954]/20 px-4 py-2 rounded-full w-max">
              <svg className="w-5 h-5 text-[#1db954]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.32-1.38 9.72-.72 13.44 1.56.42.24.54.78.3 1.26zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.2-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.299.42-1.02.599-1.559.3z"/></svg>
              <span className="text-sm font-medium text-gray-300">Daily Rotation di Spotify</span>
            </div>
          </div>

          {/* Spotify Player iframe */}
          <div className="lg:col-span-7">
            <iframe 
              style={{ borderRadius: '2rem' }} 
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0" 
              width="100%" 
              height="100%" 
              className="min-h-[352px] shadow-lg border border-gray-800/80"
              frameBorder="0" 
              allowFullScreen="" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy">
            </iframe>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;