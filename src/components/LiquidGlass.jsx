import React, { useState, useEffect, useRef, useId } from 'react';

/**
 * LiquidGlass - Crystal-Clear Water Refraction Lens Component
 * Menghasilkan distorsi cembung cairan (liquid lens refraction) & aberasi kromatik optik
 * persis seperti tetesan air transparan, sehingga teks di belakangnya saat digulir (scrolled)
 * ikut terlihat dan terdistorsi cembung seperti dilihat dari atas air.
 */
export default function LiquidGlass({
  children,
  width = 'auto',
  height = 'auto',
  borderRadius = 999,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 14,
  displace = 0.25,
  distortionScale = -70,
  redOffset = 0,
  greenOffset = 4,
  blueOffset = 8,
  backgroundOpacity = 0.06,
  saturation = 1.25,
  mixBlendMode = 'difference',
  className = '',
  style = {}
}) {
  const rawId = useId().replace(/:/g, '-');
  const filterId = `liquid-lens-${rawId}`;
  const redGradId = `red-grad-${rawId}`;
  const blueGradId = `blue-grad-${rawId}`;
  const softFilterId = `soft-blur-${rawId}`;

  const containerRef = useRef(null);
  const feImageRef = useRef(null);
  const redMapRef = useRef(null);
  const greenMapRef = useRef(null);
  const blueMapRef = useRef(null);
  const blurRef = useRef(null);

  const [supportsSvgFilter, setSupportsSvgFilter] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 420, h: 54 });

  // Deteksi dukungan browser terhadap backdrop-filter dengan SVG filter URL (Chromium / Chrome / Edge)
  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    if (isSafari || isFirefox) {
      setSupportsSvgFilter(false);
      return;
    }
    const testDiv = document.createElement('div');
    testDiv.style.backdropFilter = `url(#test-filter)`;
    setSupportsSvgFilter(testDiv.style.backdropFilter !== '');
  }, []);

  // Update ukuran elemen secara presisi saat resize
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect && (rect.width !== dimensions.w || rect.height !== dimensions.h)) {
        setDimensions({
          w: Math.round(rect.width) || 420,
          h: Math.round(rect.height) || 54
        });
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [dimensions.w, dimensions.h]);

  // Generate SVG Displacement Map data URI secara dinamis
  const generateMap = () => {
    const w = Math.max(dimensions.w, 80);
    const h = Math.max(dimensions.h, 36);
    const bw = borderWidth * 0.5 * Math.min(w, h);

    const svg = `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#000000"/>
            <stop offset="100%" stop-color="#ff0000"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#000000"/>
            <stop offset="100%" stop-color="#0000ff"/>
          </linearGradient>
          <filter id="${softFilterId}" filterUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}" color-interpolation-filters="sRGB">
            <feGaussianBlur stdDeviation="${blur}" />
          </filter>
        </defs>
        <rect x="0" y="0" width="${w}" height="${h}" fill="black" />
        <rect x="0" y="0" width="${w}" height="${h}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${w}" height="${h}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${bw}" y="${bw}" width="${w - bw * 2}" height="${h - bw * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" filter="url(#${softFilterId})" />
      </svg>
    `;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  };

  // Set atribut SVG filter secara real-time
  useEffect(() => {
    const mapUri = generateMap();
    if (feImageRef.current) {
      feImageRef.current.setAttribute('href', mapUri);
      feImageRef.current.setAttribute('xlink:href', mapUri);
    }
    if (redMapRef.current) {
      redMapRef.current.setAttribute('scale', (distortionScale + redOffset).toString());
      redMapRef.current.setAttribute('xChannelSelector', 'R');
      redMapRef.current.setAttribute('yChannelSelector', 'G');
    }
    if (greenMapRef.current) {
      greenMapRef.current.setAttribute('scale', (distortionScale + greenOffset).toString());
      greenMapRef.current.setAttribute('xChannelSelector', 'R');
      greenMapRef.current.setAttribute('yChannelSelector', 'G');
    }
    if (blueMapRef.current) {
      blueMapRef.current.setAttribute('scale', (distortionScale + blueOffset).toString());
      blueMapRef.current.setAttribute('xChannelSelector', 'R');
      blueMapRef.current.setAttribute('yChannelSelector', 'G');
    }
    if (blurRef.current) {
      blurRef.current.setAttribute('stdDeviation', displace.toString());
    }
  }, [dimensions, distortionScale, redOffset, greenOffset, blueOffset, displace, blur, borderRadius]);

  const containerStyle = {
    ...style,
    width,
    height,
    borderRadius: `${borderRadius}px`,
    '--filter-id': `url(#${filterId})`,
    '--glass-frost': backgroundOpacity,
    '--glass-saturation': saturation
  };

  const isSvgMode = mounted && supportsSvgFilter;

  return (
    <div
      ref={containerRef}
      className={`glass-surface ${isSvgMode ? 'glass-surface--svg' : 'glass-surface--fallback'} ${className}`}
      style={containerStyle}
    >
      {/* SVG Chromatic Lens Filter Definition */}
      <svg className="glass-surface__filter" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="-15%" y="-15%" width="130%" height="130%">
            <feImage
              ref={feImageRef}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="map"
            />
            {/* Red Channel Displacement */}
            <feDisplacementMap
              ref={redMapRef}
              in="SourceGraphic"
              in2="map"
              id="redchannel"
              result="dispRed"
            />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="red"
            />

            {/* Green Channel Displacement */}
            <feDisplacementMap
              ref={greenMapRef}
              in="SourceGraphic"
              in2="map"
              id="greenchannel"
              result="dispGreen"
            />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="green"
            />

            {/* Blue Channel Displacement */}
            <feDisplacementMap
              ref={blueMapRef}
              in="SourceGraphic"
              in2="map"
              id="bluechannel"
              result="dispBlue"
            />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
              result="blue"
            />

            {/* Recombine Channels via Screen Blending */}
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur ref={blurRef} in="output" stdDeviation="0.4" />
          </filter>
        </defs>
      </svg>

      {/* Surface Sheen & Specular Water Rim Highlight */}
      <span className="glass-surface__sheen" aria-hidden="true" />
      <span className="glass-surface__rim" aria-hidden="true" />

      {/* Inner Content */}
      <div className="glass-surface__content">
        {children}
      </div>
    </div>
  );
}
