import { useEffect, useRef } from 'react';

const SpaceBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 1. Kumpulan Bintang Berkelap-kelip & Melayang (Twinkling Starfield)
    const STAR_COUNT = Math.min(220, Math.floor((width * height) / 6000));
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.4,
      baseAlpha: Math.random() * 0.7 + 0.3,
      alpha: Math.random() * 0.7 + 0.3,
      speedY: Math.random() * 0.15 + 0.05,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
      // Warna bintang: putih murni, cyan terang, atau biru muda
      color: Math.random() > 0.4 ? '#ffffff' : (Math.random() > 0.5 ? '#7dd3fc' : '#93c5fd'),
    }));

    // 2. Bintang Jatuh (Shooting Stars / Meteor)
    const meteors = [];
    const spawnMeteor = () => {
      // Mulai dari atas atau kiri atas
      const startX = Math.random() * width * 0.9;
      const startY = Math.random() * height * 0.4;
      const angle = (Math.PI / 4) + (Math.random() * 0.15 - 0.075); // Sudut ~45 derajat
      const speed = Math.random() * 14 + 12;
      const length = Math.random() * 140 + 90;

      meteors.push({
        x: startX,
        y: startY,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length,
        life: 1.0,
        decay: Math.random() * 0.02 + 0.012,
        size: Math.random() * 1.8 + 1.2,
      });
    };

    // Jadwalkan kemunculan meteor pertama & berikutnya
    let nextMeteorTime = Date.now() + 1000;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Loop Animasi Utama
    const render = () => {
      // Bersihkan canvas
      ctx.clearRect(0, 0, width, height);

      // --- 1. Gambar Bintang ---
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Kelap-kelip halus
        s.twinklePhase += s.twinkleSpeed;
        const dynamicAlpha = s.baseAlpha + Math.sin(s.twinklePhase) * 0.35;
        s.alpha = Math.max(0.15, Math.min(1.0, dynamicAlpha));

        // Melayang perlahan ke atas
        s.y -= s.speedY;
        if (s.y < 0) {
          s.y = height;
          s.x = Math.random() * width;
        }

        // Gambar titik bintang
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();

        // Glow untuk bintang yang cukup besar
        if (s.radius > 1.1) {
          ctx.fillStyle = '#38bdf8';
          ctx.globalAlpha = s.alpha * 0.35;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- 2. Spawn & Gambar Meteor / Bintang Jatuh ---
      const now = Date.now();
      if (now > nextMeteorTime) {
        spawnMeteor();
        // Muncul tiap 2.5 - 5 detik
        nextMeteorTime = now + Math.random() * 2500 + 2500;
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.dx;
        m.y += m.dy;
        m.life -= m.decay;

        if (m.life <= 0 || m.x > width || m.y > height) {
          meteors.splice(i, 1);
          continue;
        }

        const dist = Math.hypot(m.dx, m.dy);
        const tailX = m.x - (m.dx / dist) * m.length;
        const tailY = m.y - (m.dy / dist) * m.length;

        // Ekor Gradien Menyala
        const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0)');
        grad.addColorStop(0.6, `rgba(125, 211, 252, ${m.life * 0.6})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${m.life})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = m.size;
        ctx.lineCap = 'round';
        ctx.globalAlpha = m.life;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();

        // Kepala Meteor
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = m.life;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Reset alpha
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};

export default SpaceBackground;
