import { useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa6';
import { FiSkipBack, FiSkipForward, FiMusic, FiCheck, FiSearch, FiShuffle } from 'react-icons/fi';
import { useAudio } from '../../context/AudioContext';

/**
 * Komponen Spotify Music Widget Interaktif dengan Koleksi 62 Musik Asli Pengguna
 * - Cover album otomatis diekstrak dari metadata ID3 asli masing-masing file MP3
 * - Cover otomatis berganti sesuai lagu yang sedang diputar
 * - Menampilkan thumbnail cover di setiap baris playlist
 */
export default function MusicWidget() {
  const {
    playlist,
    currentTrack,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    isShuffle,
    togglePlay,
    selectTrack,
    handleNext,
    handlePrev,
    seek,
    toggleShuffle,
    formatTime,
  } = useAudio();

  const [searchQuery, setSearchQuery] = useState('');

  // Helper untuk menentukan URL cover album presisi dengan base path Vite
  const resolveCoverUrl = (coverPath) => {
    if (!coverPath) return null;
    const base = import.meta.env.BASE_URL || '/';
    const cleanBase = base.endsWith('/') ? base : `${base}/`;
    return `${cleanBase}music/${coverPath}`;
  };

  // Handle klik progress bar untuk lompat waktu (seek)
  const handleSeek = (e) => {
    if (!duration || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    seek(newProgress * duration);
  };

  // Filter lagu berdasarkan query pencarian
  const filteredPlaylist = playlist.filter((track) => {
    const query = searchQuery.toLowerCase();
    return (
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query)
    );
  });

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full rounded-3xl bg-[#0c101b]/70 border border-white/[0.08] backdrop-blur-xl p-6 sm:p-10 lg:p-12 shadow-2xl shadow-black/50 mt-16 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* ===================================================================== */}
        {/* SISI KIRI: Headline & Info                                            */}
        {/* ===================================================================== */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-4">
            A little music. <br />
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
              A lot of ideas.
            </span>
          </h3>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
            Musik yang menemani proses saya mengubah ide menjadi sesuatu yang nyata. Intip playlist favorit yang menemani waktu produktif dan santai saya.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={togglePlay}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-amber-500/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <FiMusic className="text-base" />
              <span>{isPlaying ? 'Jeda Musik' : 'Putar Playlist'}</span>
            </button>

            <span className="text-xs text-amber-400 font-mono flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-500/10 border border-amber-400/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>{playlist.length} Lagu Tersedia</span>
            </span>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* SISI KANAN: Player Card Ala Spotify dengan Cover Album Dinamis       */}
        {/* ===================================================================== */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-[#12141c]/90 border border-white/[0.08] p-5 sm:p-6 shadow-2xl relative overflow-hidden">
            {/* Header Player */}
            <div className="flex items-start gap-4 mb-5">
              {/* Cover Album Dinamis (Berganti sesuai lagu yang sedang diputar) */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-amber-400/30 shadow-xl shadow-amber-500/10 relative group bg-black/60">
                {currentTrack?.cover ? (
                  <img
                    src={resolveCoverUrl(currentTrack.cover)}
                    alt={currentTrack.title}
                    key={currentTrack.id}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-600 to-yellow-800 flex items-center justify-center font-bold text-white text-xs">
                    MP3
                  </div>
                )}

                {/* Animated Equalizer saat Musik Berputar */}
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px] flex items-center justify-center">
                    <span className="flex items-end gap-[3px] h-4">
                      <span className="w-1 bg-amber-400 rounded-full animate-[bounce_0.8s_infinite] h-3" />
                      <span className="w-1 bg-yellow-300 rounded-full animate-[bounce_1.2s_infinite] h-4" />
                      <span className="w-1 bg-amber-400 rounded-full animate-[bounce_0.7s_infinite] h-2.5" />
                    </span>
                  </div>
                )}
              </div>

              {/* Info Lagu yang Sedang Berjalan */}
              <div className="flex-1 min-w-0">
                <div className="mb-1">
                  <h4 className="text-base sm:text-lg font-black text-white truncate">
                    {currentTrack?.title || 'Memilih Lagu...'}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 font-medium mb-1.5 truncate">
                  {currentTrack?.artist || 'Artis'}
                </p>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-400 bg-amber-500/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full">
                  <FiCheck className="text-xs" />
                  <span>Koleksi Favorit Pribadi</span>
                </div>
              </div>
            </div>

            {/* Tombol Kontrol, Waktu & Progress Bar */}
            <div className="flex flex-col gap-2.5 mb-4 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Shuffle Button */}
                  <button
                    onClick={toggleShuffle}
                    className={`p-2 transition-colors rounded-full cursor-pointer ${
                      isShuffle ? 'text-amber-400 bg-amber-500/10' : 'text-gray-400 hover:text-white'
                    }`}
                    title={isShuffle ? 'Mode Acak Aktif' : 'Mode Acak Nonaktif'}
                  >
                    <FiShuffle className="text-sm" />
                  </button>

                  {/* Previous Button */}
                  <button
                    onClick={handlePrev}
                    className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    title="Lagu Sebelumnya"
                  >
                    <FiSkipBack className="text-base" />
                  </button>

                  {/* Play / Pause Bulat */}
                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-white hover:bg-gray-200 text-black flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
                    title={isPlaying ? 'Jeda' : 'Putar'}
                  >
                    {isPlaying ? (
                      <FaPause className="text-sm text-black" />
                    ) : (
                      <FaPlay className="text-sm text-black ml-0.5" />
                    )}
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={handleNext}
                    className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    title="Lagu Berikutnya"
                  >
                    <FiSkipForward className="text-base" />
                  </button>
                </div>

                {/* Indikator Waktu Lagu */}
                <span className="text-xs font-mono text-gray-400">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Progress Bar Interaktif (Bisa Diklik untuk Lompat Waktu) */}
              <div
                onClick={handleSeek}
                className="w-full h-1.5 bg-white/10 hover:h-2.5 rounded-full overflow-hidden cursor-pointer transition-all duration-150 relative group"
                title="Klik untuk mengatur waktu"
              >
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full relative transition-all duration-100 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Input Pencarian Lagu */}
            <div className="relative mb-3">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="text"
                placeholder="Cari lagu atau artis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 transition-colors"
              />
            </div>

            {/* Daftar Lagu (Scrollable Track List dengan Thumbnail Cover Asli) */}
            <div className="flex flex-col gap-1 max-h-56 overflow-y-auto pr-1 select-none custom-scrollbar">
              {filteredPlaylist.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-4">Lagu tidak ditemukan</p>
              ) : (
                filteredPlaylist.map((track) => {
                  const originalIndex = playlist.findIndex((t) => t.id === track.id);
                  const isCurrent = currentTrackIndex === originalIndex;

                  return (
                    <div
                      key={track.id}
                      onClick={() => selectTrack(originalIndex)}
                      className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        isCurrent
                          ? 'bg-amber-500/15 text-white border border-amber-400/30 shadow-sm'
                          : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        {/* Nomor / Indikator Play */}
                        <span className="w-4 text-center text-xs font-mono font-medium text-gray-400 shrink-0">
                          {isCurrent && isPlaying ? (
                            <span className="text-amber-400 font-bold">▶</span>
                          ) : (
                            originalIndex + 1
                          )}
                        </span>

                        {/* Thumbnail Cover Album Asli di Setiap Baris */}
                        <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-white/10 relative bg-black/40">
                          {track.cover ? (
                            <img
                              src={resolveCoverUrl(track.cover)}
                              alt={track.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-white/5 flex items-center justify-center text-[10px] text-gray-400">
                              ♪
                            </div>
                          )}
                        </div>

                        {/* Title & Artist */}
                        <div className="truncate">
                          <p
                            className={`text-xs sm:text-sm font-semibold truncate ${
                              isCurrent ? 'text-amber-400 font-bold' : 'text-gray-200'
                            }`}
                          >
                            {track.title}
                          </p>
                          <p className="text-[11px] text-gray-400 truncate">{track.artist}</p>
                        </div>
                      </div>

                      <span className="text-xs font-mono text-gray-400 shrink-0">
                        {isCurrent && duration > 0 ? formatTime(currentTime) : 'MP3'}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
