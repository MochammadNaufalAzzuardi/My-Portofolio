import * as THREE from 'three';

/**
 * Membuat tekstur sisi depan ID Card Badge (Mirip video referensi: Kontras tinggi, tajam, modern)
 * @param {HTMLImageElement|HTMLCanvasElement|ImageBitmap} photoImg
 * @returns {THREE.CanvasTexture}
 */
export function createCardFrontTexture(photoImg) {
  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 1500;
  const ctx = canvas.getContext('2d');

  // 1. Background Kartu (Dark Navy Carbon dengan tekstur grid)
  const bgGrad = ctx.createLinearGradient(0, 0, 1000, 1500);
  bgGrad.addColorStop(0, '#0f172a');
  bgGrad.addColorStop(0.5, '#090d16');
  bgGrad.addColorStop(1, '#05070a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1000, 1500);

  // Garis aksen grid halus
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
  ctx.lineWidth = 1.5;
  for (let y = 100; y < 1450; y += 70) {
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.lineTo(960, y);
    ctx.stroke();
  }
  for (let x = 70; x < 950; x += 140) {
    ctx.beginPath();
    ctx.moveTo(x, 60);
    ctx.lineTo(x, 1440);
    ctx.stroke();
  }

  // 2. Header Atas: Badge "DEVELOPER" Putih Kontras Tinggi (Persis video)
  ctx.fillStyle = '#ffffff';
  drawRoundedRect(ctx, 60, 60, 880, 140, 18);
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.font = '900 64px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '6px';
  ctx.fillText('DEVELOPER', 500, 145);

  // Tag Kategori kecil di atas judul
  ctx.fillStyle = '#2563eb';
  ctx.font = 'bold 18px system-ui, sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('• OFFICIAL BADGE ID •', 500, 95);

  // Status Hijau Online di pojok kanan atas
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(890, 130, 9, 0, Math.PI * 2);
  ctx.fill();

  // 3. Frame Foto Profil Utama (Besar & Jelas di Tengah)
  const frameX = 180;
  const frameY = 250;
  const frameW = 640;
  const frameH = 640;

  // Outer Glow Border
  ctx.shadowColor = '#38bdf8';
  ctx.shadowBlur = 24;
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 6;
  drawRoundedRect(ctx, frameX, frameY, frameW, frameH, 28);
  ctx.stroke();
  ctx.shadowBlur = 0; // reset

  // Gambar Foto Profil
  if (photoImg) {
    ctx.save();
    drawRoundedRect(ctx, frameX + 4, frameY + 4, frameW - 8, frameH - 8, 24);
    ctx.clip();

    const imgW = photoImg.width || 1;
    const imgH = photoImg.height || 1;
    const scale = Math.max(frameW / imgW, frameH / imgH);
    const sw = frameW / scale;
    const sh = frameH / scale;
    const sx = (imgW - sw) / 2;
    const sy = (imgH - sh) / 2;

    ctx.drawImage(photoImg, sx, sy, sw, sh, frameX + 4, frameY + 4, frameW - 8, frameH - 8);
    ctx.restore();
  }

  // Aksen Pita Vertikal di Sisi Kanan Foto ("TEKNIK JARINGAN" seperti di video)
  ctx.save();
  ctx.translate(frameX + frameW + 40, frameY + 320);
  ctx.rotate(Math.PI / 2);
  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 20px monospace';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '6px';
  ctx.fillText('TEKNIK JARINGAN KOMPUTER', 0, 0);
  ctx.restore();

  // 4. Nama Lengkap & Gelar / Spesialisasi
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 48px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('MOCHAMMAD NAUFAL AZZUARDI', 500, 960);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '700 26px system-ui, -apple-system, sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('3D & CREATIVE DEVELOPER', 500, 1010);

  // Garis Pembatas Halus
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(120, 1050);
  ctx.lineTo(880, 1050);
  ctx.stroke();

  // 5. Bagian Barcode & Serial Number
  drawBarcode(ctx, 120, 1080, 760, 95);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 20px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('* NF-2026-DEV-PORTFOLIO *', 500, 1220);

  // 6. Badge Bawah: "PORTFOLIO" Besar & Bold (Persis seperti di video)
  const botGrad = ctx.createLinearGradient(60, 1260, 940, 1420);
  botGrad.addColorStop(0, '#1d4ed8');
  botGrad.addColorStop(0.5, '#2563eb');
  botGrad.addColorStop(1, '#0284c7');
  ctx.fillStyle = botGrad;
  drawRoundedRect(ctx, 60, 1260, 880, 160, 22);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 76px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '8px';
  ctx.fillText('PORTFOLIO', 500, 1370);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Membuat tekstur sisi belakang ID Card (QR Code & Socials persis video)
 * @returns {THREE.CanvasTexture}
 */
export function createCardBackTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 1500;
  const ctx = canvas.getContext('2d');

  // Background
  const bgGrad = ctx.createLinearGradient(0, 0, 1000, 1500);
  bgGrad.addColorStop(0, '#090d16');
  bgGrad.addColorStop(0.5, '#0f172a');
  bgGrad.addColorStop(1, '#060910');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1000, 1500);

  // Pita Magnetik Hitam di Atas
  ctx.fillStyle = '#020617';
  ctx.fillRect(0, 60, 1000, 130);

  // Header Belakang: "SCAN HERE FOR CONNECT ME"
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 46px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '3px';
  ctx.fillText('SCAN HERE TO CONNECT', 500, 275);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '700 22px system-ui, sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('GET IN TOUCH & EXPLORE PROJECTS', 500, 320);

  // Kotak QR Code Besar di Tengah
  const qrX = 230;
  const qrY = 370;
  const qrSize = 540;

  ctx.fillStyle = '#ffffff';
  drawRoundedRect(ctx, qrX, qrY, qrSize, qrSize, 28);
  ctx.fill();

  // Gambar Pola QR Code yang Rapi & Kontras Tinggi
  drawSimulatedQRCode(ctx, qrX + 30, qrY + 30, qrSize - 60);

  // Username & URL
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('@nauvalargy', 500, 990);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 22px monospace';
  ctx.fillText('github.com/MochammadNaufalAzzuardi', 500, 1035);

  // Tech Badges Pills
  const techs = ['REACT', 'THREE.JS', 'TAILWIND', 'VITE', 'JS'];
  let startX = 90;
  techs.forEach((tech) => {
    ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
    drawRoundedRect(ctx, startX, 1090, 145, 48, 12);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    drawRoundedRect(ctx, startX, 1090, 145, 48, 12);
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(tech, startX + 72, 1122);
    startX += 165;
  });

  // Footer Box Belakang
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  drawRoundedRect(ctx, 60, 1180, 880, 240, 20);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, 60, 1180, 880, 240, 20);
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 20px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('• 3D Interactive ID Card Portfolio Component.', 100, 1240);
  ctx.fillText('• Built with React Three Fiber, Three.js & Tailwind.', 100, 1285);
  ctx.fillText('• Drag and rotate to view front & back details.', 100, 1330);
  ctx.fillText('• (C) 2026 Mochammad Naufal Azzuardi. All rights reserved.', 100, 1380);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Membuat tekstur tali Lanyard dengan teks berulang
 * @returns {THREE.CanvasTexture}
 */
export function createLanyardTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Background Anyaman Tali (Hitam Karbon)
  ctx.fillStyle = '#0f1115';
  ctx.fillRect(0, 0, 2048, 256);

  // Aksen Jahitan Garis Tepi
  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.moveTo(0, 18);
  ctx.lineTo(2048, 18);
  ctx.moveTo(0, 238);
  ctx.lineTo(2048, 238);
  ctx.stroke();

  // Teks Tali Berulang
  const phrase = 'MOCHAMMAD NAUFAL  ✦  CREATIVE DEVELOPER  ✦  PORTFOLIO  ✦  ';
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 68px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';

  for (let i = 0; i < 2048; i += 1100) {
    ctx.fillText(phrase, i, 150);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Helper rounded rectangle
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Helper barcode artistik
function drawBarcode(ctx, x, y, width, height) {
  ctx.fillStyle = '#ffffff';
  const barCount = 75;
  const unitW = width / barCount;
  for (let i = 0; i < barCount; i++) {
    if (i % 8 === 0 || i % 11 === 0) continue;
    const w = (i % 3 === 0) ? unitW * 1.7 : unitW * 0.75;
    ctx.fillRect(x + (i * unitW), y, Math.min(w, unitW), height);
  }
}

// Helper pola QR code detail
function drawSimulatedQRCode(ctx, x, y, size) {
  ctx.fillStyle = '#0f172a';
  const modules = 25;
  const cellSize = size / modules;

  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      const isCorner1 = (r < 7 && c < 7);
      const isCorner2 = (r < 7 && c >= modules - 7);
      const isCorner3 = (r >= modules - 7 && c < 7);

      if (isCorner1 || isCorner2 || isCorner3) {
        const inOuter = (r === 0 || r === 6 || c === 0 || c === 6 ||
                         r === modules - 7 || r === modules - 1 ||
                         c === modules - 7 || c === modules - 1);
        const inInner = (
          (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
          (r >= 2 && r <= 4 && c >= modules - 5 && c <= modules - 3) ||
          (r >= modules - 5 && r <= modules - 3 && c >= 2 && c <= 4)
        );
        if (inOuter || inInner) {
          ctx.fillRect(x + c * cellSize, y + r * cellSize, cellSize, cellSize);
        }
      } else {
        if (((r * 3 + c * 7 + (r ^ c)) % 3 === 0) || (r % 2 === 0 && c % 4 === 0)) {
          ctx.fillRect(x + c * cellSize, y + r * cellSize, cellSize, cellSize);
        }
      }
    }
  }

  // Logo tengah
  const centerSize = cellSize * 5;
  const centerX = x + (size - centerSize) / 2;
  const centerY = y + (size - centerSize) / 2;
  ctx.fillStyle = '#2563eb';
  drawRoundedRect(ctx, centerX, centerY, centerSize, centerSize, 6);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${cellSize * 2.2}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('</>', centerX + centerSize / 2, centerY + centerSize / 2);
}
