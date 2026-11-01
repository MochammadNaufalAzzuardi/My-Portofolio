import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { userPlaylist } from '../components/About/playlistData';

const AudioContext = createContext(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export function AudioProvider({ children }) {
  const [playlist] = useState(userPlaylist);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const audioRef = useRef(null);

  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  // Helper untuk menentukan URL audio yang presisi dengan base path Vite
  const resolveAudioUrl = (filename) => {
    const base = import.meta.env.BASE_URL || '/';
    const cleanBase = base.endsWith('/') ? base : `${base}/`;
    return `${cleanBase}music/${encodeURIComponent(filename)}`;
  };

  // Setup dan sinkronisasi audio saat track berubah
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    const targetUrl = resolveAudioUrl(currentTrack.filename);
    audio.src = targetUrl;
    audio.load();

    if (isPlaying) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback error on track change:', err);
          setIsPlaying(false);
        });
    }
  }, [currentTrackIndex]);

  // Event listener untuk elemen audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onEnded = () => {
      handleNext();
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => {
      console.warn('Audio failed to load from primary path, trying fallback...');
      // Fallback jika base path berbeda di server lokal
      const fallbackUrl = `/music/${encodeURIComponent(currentTrack.filename)}`;
      if (audio.src !== fallbackUrl && !audio.src.endsWith(fallbackUrl)) {
        audio.src = fallbackUrl;
        audio.load();
        if (isPlaying) {
          audio.play().catch(() => {});
        }
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
    };
  }, [currentTrackIndex, isShuffle, isPlaying]);

  // Format detik ke MM:SS
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds <= 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle Play / Pause (Digunakan bersama oleh Navbar & MusicWidget)
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      // Pastikan ada src jika belum ter-set
      if (!audio.src || audio.src === '') {
        audio.src = resolveAudioUrl(currentTrack.filename);
        audio.load();
      }

      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback blocked or failed:', err);
          setIsPlaying(false);
        });
    }
  };

  // Ganti lagu ke index tertentu
  const selectTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  // Lagu Berikutnya
  const handleNext = () => {
    if (isShuffle) {
      const randomIdx = Math.floor(Math.random() * playlist.length);
      selectTrack(randomIdx);
    } else {
      const nextIdx = (currentTrackIndex + 1) % playlist.length;
      selectTrack(nextIdx);
    }
  };

  // Lagu Sebelumnya
  const handlePrev = () => {
    const prevIdx = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    selectTrack(prevIdx);
  };

  // Lompat waktu (Seek)
  const seek = (timeInSeconds) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = timeInSeconds;
    setCurrentTime(timeInSeconds);
  };

  const toggleShuffle = () => {
    setIsShuffle((prev) => !prev);
  };

  return (
    <AudioContext.Provider
      value={{
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
      }}
    >
      {/* Satu-satunya Elemen Audio Global untuk Seluruh Website */}
      <audio
        ref={audioRef}
        preload="metadata"
        src={resolveAudioUrl(currentTrack.filename)}
      />
      {children}
    </AudioContext.Provider>
  );
}
