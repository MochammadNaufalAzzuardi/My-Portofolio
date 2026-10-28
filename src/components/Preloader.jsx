import React, { useEffect, useState } from 'react';

// Full‑screen preloader showing loading percentage
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Simulate progress based on window load events
    const updateProgress = (e) => {
      // e is a ProgressEvent from resource loading (not reliable in SPA), so we use a simple timer fallback
    };
    // Simple timer to animate progress to 100% over ~1.5s
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 5, 100);
        if (next === 100) {
          clearInterval(interval);
          // fade out after short delay
          setTimeout(() => setVisible(false), 500);
        }
        return next;
      });
    }, 75);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#07090e] z-30 transition-opacity duration-500" style={{ opacity: progress === 100 ? 0 : 1 }}>
      <div className="text-2xl font-mono">{progress}%</div>
    </div>
  );
}
