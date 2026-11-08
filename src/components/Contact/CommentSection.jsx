import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChatBubbleLeftRight, HiPhoto, HiPaperAirplane, HiTrash } from 'react-icons/hi2';

const STORAGE_KEY = 'portfolio_comments_list_v2';

const INITIAL_COMMENTS = [
  {
    id: 'default-1',
    name: 'naufalazz1',
    comment: 'Haii welcome to my portfolio website 👋',
    time: '2 hari lalu',
    avatar: null
  }
];

export default function CommentSection() {
  const [comments, setComments] = useState(() => {
    try {
      // Bersihkan key lama jika ada
      localStorage.removeItem('portfolio_comments_list');
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((c) =>
            c.name.toLowerCase().includes('alfari') ? { ...c, name: 'naufalazz1' } : c
          );
        }
      }
      return INITIAL_COMMENTS;
    } catch {
      return INITIAL_COMMENTS;
    }
  });

  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [fileError, setFileError] = useState('');

  // Sinkronkan ke localStorage setiap kali ada perubahan komentar
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    } catch (err) {
      console.warn('Failed to save comments to localStorage', err);
    }
  }, [comments]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setFileError('');
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFileError('Ukuran file maksimal 5 MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setAvatarPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      name: name.trim(),
      comment: commentText.trim(),
      time: 'Baru saja',
      avatar: avatarPreview
    };

    setComments([newComment, ...comments]);
    setName('');
    setCommentText('');
    setAvatarPreview(null);
  };

  return (
    <div className="rounded-2xl bg-[#0c121e]/80 backdrop-blur-xl border border-white/10 p-6 sm:p-7 shadow-2xl relative overflow-hidden flex flex-col justify-between">
      {/* Decorative Top Accent Glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

      <div>
        {/* Header with Comments Counter */}
        <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-white/10">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-400/20">
            <HiChatBubbleLeftRight size={20} />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Komentar ({comments.length})
          </h3>
        </div>

        {/* Form Komentar */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
          {/* Input Nama */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Nama
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama kamu"
              className="w-full px-4 py-2.5 rounded-xl bg-[#07090e]/80 border border-white/10 focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40 text-sm text-white placeholder-gray-500 outline-none transition-colors"
            />
          </div>

          {/* Input Komentar */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Komentar
            </label>
            <textarea
              rows={3}
              required
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Tulis komentar kamu di sini..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#07090e]/80 border border-white/10 focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40 text-sm text-white placeholder-gray-500 outline-none transition-colors resize-none"
            />
          </div>

          {/* Upload Foto Profil (Opsional) */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Foto Profil <span className="text-gray-500 font-normal">(opsional)</span>
            </label>

            {avatarPreview ? (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <img
                  src={avatarPreview}
                  alt="Preview"
                  className="w-12 h-12 rounded-full object-cover border border-amber-400/50"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-300 truncate">Foto profil terpilih</p>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 mt-0.5 cursor-pointer"
                  >
                    <HiTrash size={12} />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <label className="w-full border border-dashed border-white/15 hover:border-amber-400/40 rounded-xl py-3 px-4 flex items-center justify-center gap-2.5 cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                  <HiPhoto className="text-amber-400" size={18} />
                  <span className="text-xs font-medium text-gray-300">
                    Pilih Foto Profil
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-gray-500 mt-1 text-center">
                  Ukuran file maksimal 5 MB
                </p>
                {fileError && (
                  <p className="text-xs text-red-400 mt-1 text-center">{fileError}</p>
                )}
              </div>
            )}
          </div>

          {/* Tombol Kirim Komentar */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-1"
          >
            <HiPaperAirplane className="rotate-0 text-base" />
            <span>Kirim Komentar</span>
          </button>
        </form>

        {/* Daftar Komentar Terkirim */}
        <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
          <AnimatePresence>
            {comments.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0 border border-amber-400/40"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300 font-bold text-sm shrink-0">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <h4 className="text-sm font-bold text-white truncate">
                        {item.name}
                      </h4>
                      <span className="text-[11px] text-gray-500 shrink-0 font-mono">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed break-words">
                      {item.comment}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
