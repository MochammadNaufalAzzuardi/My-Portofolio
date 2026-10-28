import { Suspense, useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import fotoProfil from '../assets/profil.png';
import {
  createCardFrontTexture,
  createCardBackTexture,
  createLanyardTexture,
} from './cardTextures';

// ============================================================================
// 🚀 OPTIMASI PERFORMA TINGGI (ZERO-GARBAGE COLLECTION & 60-120 FPS SMOOTH)
// ============================================================================
const RIBBON_SEGMENTS = 26;
const RIBBON_WIDTH = 0.22;

// Objek scratch statis untuk mencegah alokasi memori berulang di tiap frame
const _clipLocal = new THREE.Vector3(0, 1.82, 0);
const _bottomClip = new THREE.Vector3();
const _topAnchor = new THREE.Vector3();
const _midPoint = new THREE.Vector3();
const _dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const _raycaster = new THREE.Raycaster();
const _intersectPoint = new THREE.Vector3();

const InteractiveLanyardBadge = () => {
  const photoTexture = useTexture(fotoProfil);
  const { viewport } = useThree();

  const cardGroupRef = useRef();
  const ribbonGeomRef = useRef();

  // Status Drag & Deteksi Flip (Klik vs Drag)
  const isDragging = useRef(false);
  const pointerDownPos = useRef({ x: 0, y: 0, time: 0 });
  const hasMovedSignificantly = useRef(false);
  const isFlipped = useRef(false);

  // Posisi istirahat kartu
  const isDesktop = viewport.width > 7;
  const restX = isDesktop ? Math.min(2.8, viewport.width * 0.24) : 0;
  const restY = isDesktop ? -0.15 : -0.35;
  const restPos = useMemo(() => new THREE.Vector3(restX, restY, 0), [restX, restY]);

  // Posisi & Kecepatan Pegas
  const pos = useRef(new THREE.Vector3(restX, restY, 0));
  const vel = useRef(new THREE.Vector3(0, 0, 0));

  // Rotasi (Y mengontrol sisi depan vs belakang)
  const rot = useRef(new THREE.Euler(0, -0.28, 0));
  const rotVel = useRef(new THREE.Euler(0, 0, 0));

  // Update posisi saat resize
  useEffect(() => {
    if (!isDragging.current) {
      pos.current.x = restX;
      pos.current.y = restY;
    }
  }, [restX, restY]);

  // Tekstur Kartu & Tali (Dibuat sekali & di-cache)
  const frontTexture = useMemo(() => createCardFrontTexture(photoTexture.image), [photoTexture]);
  const backTexture = useMemo(() => createCardBackTexture(), []);
  const lanyardTexture = useMemo(() => createLanyardTexture(), []);

  // Inisialisasi Buffer Pita Ribbon Tali (Alokasi memori sekali saja)
  const ribbonBuffers = useMemo(() => {
    const posArr = new Float32Array(RIBBON_SEGMENTS * 2 * 3);
    const uvArr = new Float32Array(RIBBON_SEGMENTS * 2 * 2);
    const indices = [];

    for (let i = 0; i < RIBBON_SEGMENTS - 1; i++) {
      const idx = i * 2;
      indices.push(idx, idx + 1, idx + 2);
      indices.push(idx + 1, idx + 3, idx + 2);
    }

    for (let i = 0; i < RIBBON_SEGMENTS; i++) {
      const v = (i / (RIBBON_SEGMENTS - 1)) * 4;
      uvArr[i * 4 + 0] = 0;
      uvArr[i * 4 + 1] = v;
      uvArr[i * 4 + 2] = 1;
      uvArr[i * 4 + 3] = v;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    geom.setAttribute('uv', new THREE.BufferAttribute(uvArr, 2));
    geom.setIndex(indices);
    return geom;
  }, []);

  // Event Pointer Up Global
  useEffect(() => {
    const handleGlobalPointerUp = () => {
      if (isDragging.current) {
        const elapsed = Date.now() - pointerDownPos.current.time;
        // Klik singkat (< 220ms dan tanpa geser jauh) = BALIK KARTU!
        if (!hasMovedSignificantly.current || elapsed < 220) {
          isFlipped.current = !isFlipped.current;
        }
      }
      isDragging.current = false;
      document.body.style.cursor = 'default';
    };

    window.addEventListener('pointerup', handleGlobalPointerUp);
    return () => window.removeEventListener('pointerup', handleGlobalPointerUp);
  }, []);

  // Pointer Down pada Kartu
  const handlePointerDown = (e) => {
    e.stopPropagation();
    isDragging.current = true;
    hasMovedSignificantly.current = false;
    pointerDownPos.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    };
    document.body.style.cursor = 'grabbing';
  };

  // Loop Fisika & Animasi tiap frame (Zero Allocation untuk Kinerja 60-120 FPS Stabil)
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.035);

    // 1. Logika Dragging Bebas Tanpa Batas Border
    if (isDragging.current) {
      _raycaster.setFromCamera(state.pointer, state.camera);
      _raycaster.ray.intersectPlane(_dragPlane, _intersectPoint);

      if (_intersectPoint) {
        const moveDist = Math.hypot(
          _intersectPoint.x - pointerDownPos.current.x,
          _intersectPoint.y - pointerDownPos.current.y
        );
        if (moveDist > 0.1) {
          hasMovedSignificantly.current = true;
        }

        const targetX = _intersectPoint.x;
        const targetY = _intersectPoint.y;

        vel.current.x = (targetX - pos.current.x) * 20;
        vel.current.y = (targetY - pos.current.y) * 20;
        pos.current.x = targetX;
        pos.current.y = targetY;

        rot.current.z = -(pos.current.x - restPos.x) * 0.12;
        rot.current.x = -(pos.current.y - restPos.y) * 0.08;
      }
    } else {
      // 2. Fisika Elastis (Spring Harmonics) saat dilepas: Membal & Kembali
      const springTension = 140;
      const springDamping = 10.5;

      const forceX = (restPos.x - pos.current.x) * springTension - vel.current.x * springDamping;
      const forceY = (restPos.y - pos.current.y) * springTension - vel.current.y * springDamping;
      const forceZ = (restPos.z - pos.current.z) * springTension - vel.current.z * springDamping;

      vel.current.x += forceX * dt;
      vel.current.y += forceY * dt;
      vel.current.z += forceZ * dt;

      pos.current.x += vel.current.x * dt;
      pos.current.y += vel.current.y * dt;
      pos.current.z += vel.current.z * dt;

      // Animasi pernapasan lembut saat diam
      const time = state.clock.getElapsedTime();
      pos.current.y += Math.sin(time * 1.5) * 0.0015;
      rot.current.z += Math.sin(time * 1.3) * 0.001;
    }

    // 3. Rotasi Flip Y (Membalik Depan vs Belakang 180 Derajat saat Diklik)
    const targetRotY = isFlipped.current ? Math.PI - 0.28 : -0.28;
    const rotForceY = (targetRotY - rot.current.y) * 85 - rotVel.current.y * 11;
    rotVel.current.y += rotForceY * dt;
    rot.current.y += rotVel.current.y * dt;

    if (!isDragging.current) {
      const rotForceX = (0 - rot.current.x) * 70 - rotVel.current.x * 12;
      const rotForceZ = (0 - rot.current.z) * 70 - rotVel.current.z * 12;
      rotVel.current.x += rotForceX * dt;
      rotVel.current.z += rotForceZ * dt;
      rot.current.x += rotVel.current.x * dt;
      rot.current.z += rotVel.current.z * dt;
    }

    // Terapkan posisi dan rotasi ke mesh kartu
    if (cardGroupRef.current) {
      cardGroupRef.current.position.copy(pos.current);
      cardGroupRef.current.rotation.copy(rot.current);
    }

    // 4. Update Geometri Pita Lanyard secara Langsung (Fast Math tanpa alokasi objek baru)
    if (ribbonGeomRef.current) {
      _topAnchor.set(restX, viewport.height * 0.5 + 0.8, 0);

      _clipLocal.set(0, 1.82, 0).applyEuler(rot.current);
      _bottomClip.addVectors(pos.current, _clipLocal);

      _midPoint.addVectors(_topAnchor, _bottomClip).multiplyScalar(0.5);
      const pullDist = _topAnchor.distanceTo(_bottomClip);
      const sagAmount = Math.max(-0.35, 0.25 - pullDist * 0.07);
      _midPoint.y += sagAmount;
      _midPoint.z += 0.04;

      const p0 = _topAnchor;
      const p1 = _midPoint;
      const p2 = _bottomClip;

      const currentWidth = RIBBON_WIDTH * Math.max(0.72, 1 - (pullDist - 3.5) * 0.07);
      const halfW = currentWidth * 0.5;
      const posArray = ribbonGeomRef.current.attributes.position.array;

      // Evaluasi formula Quadratic Bezier secara langsung ke Float32Array (Sangat Cepat & Efisien)
      for (let i = 0; i < RIBBON_SEGMENTS; i++) {
        const t = i / (RIBBON_SEGMENTS - 1);
        const it = 1 - t;

        // Titik Bezier
        const px = it * it * p0.x + 2 * it * t * p1.x + t * t * p2.x;
        const py = it * it * p0.y + 2 * it * t * p1.y + t * t * p2.y;
        const pz = it * it * p0.z + 2 * it * t * p1.z + t * t * p2.z;

        // Turunan Tangent
        const tx = 2 * it * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
        const ty = 2 * it * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);

        // Vektor Normal tegak lurus
        const len = Math.hypot(ty, -tx) || 1;
        const nx = (ty / len) * halfW;
        const ny = (-tx / len) * halfW;

        const idx = i * 6;
        posArray[idx + 0] = px - nx;
        posArray[idx + 1] = py - ny;
        posArray[idx + 2] = pz;

        posArray[idx + 3] = px + nx;
        posArray[idx + 4] = py + ny;
        posArray[idx + 5] = pz;
      }

      ribbonGeomRef.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      {/* 1. TALI LANYARD DINAMIS ELASTIS */}
      <mesh>
        <primitive object={ribbonBuffers} ref={ribbonGeomRef} />
        <meshStandardMaterial
          map={lanyardTexture}
          side={THREE.DoubleSide}
          roughness={0.65}
          metalness={0.08}
        />
      </mesh>

      {/* 2. BADGE KARTU ID INTERAKTIF */}
      <group
        ref={cardGroupRef}
        onPointerDown={handlePointerDown}
      >
        {/* KLIP LOGAM */}
        <mesh position={[0, 1.95, 0]}>
          <boxGeometry args={[0.34, 0.16, 0.08]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
        </mesh>

        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.15, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
        </mesh>

        <mesh position={[0, 1.65, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.08, 0.022, 16, 24]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* SARUNG AKRILIK TRANSPARAN (Disederhanakan tanpa transmission berat untuk performa tinggi) */}
        <mesh position={[0, 1.65, 0]}>
          <boxGeometry args={[0.75, 0.2, 0.05]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.35}
            roughness={0.15}
            metalness={0.1}
          />
        </mesh>

        <mesh position={[0, 1.65, 0]}>
          <boxGeometry args={[0.3, 0.07, 0.06]} />
          <meshBasicMaterial color="#05070a" />
        </mesh>

        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.18, 3.22, 0.048]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.25}
            roughness={0.15}
            metalness={0.1}
          />
        </mesh>

        {/* BALOK KARTU ID DUA SISI */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.05, 3.08, 0.024]} />

          {/* Sisi 0-3: Pinggiran kartu warna solid */}
          <meshStandardMaterial attach="material-0" color="#111827" metalness={0.6} roughness={0.3} />
          <meshStandardMaterial attach="material-1" color="#111827" metalness={0.6} roughness={0.3} />
          <meshStandardMaterial attach="material-2" color="#111827" metalness={0.6} roughness={0.3} />
          <meshStandardMaterial attach="material-3" color="#111827" metalness={0.6} roughness={0.3} />

          {/* Sisi 4: Depan */}
          <meshStandardMaterial
            attach="material-4"
            map={frontTexture}
            roughness={0.25}
            metalness={0.1}
          />

          {/* Sisi 5: Belakang (QR Code & Socials) */}
          <meshStandardMaterial
            attach="material-5"
            map={backTexture}
            roughness={0.25}
            metalness={0.1}
          />
        </mesh>
      </group>
    </>
  );
};

const Card3D = () => {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 46 }}
        dpr={[1, 1.5]} // Batasi DPR maksimum 1.5 agar super ringan di layar High-DPI/Retina
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Pencahayaan Studio 3D */}
        <ambientLight intensity={1.1} />
        <directionalLight position={[6, 8, 6]} intensity={1.6} />
        <directionalLight position={[-6, 6, -4]} intensity={0.6} color="#ffffff" />

        {/* Aksen Neon Biru Cyberpunk */}
        <pointLight position={[-4, -0.5, 3]} intensity={2.5} color="#38bdf8" distance={9} />
        <pointLight position={[4, 1.8, 2.5]} intensity={2.0} color="#60a5fa" distance={8} />

        <Suspense fallback={null}>
          <InteractiveLanyardBadge />
        </Suspense>

        {/* Bayangan di Bawah Kartu Ringan & Halus */}
        <ContactShadows
          position={[0, -2.4, 0]}
          opacity={0.35}
          scale={7}
          blur={2.0}
          far={4}
          resolution={256} // Optimasi resolusi shadow untuk performa tinggi
        />
      </Canvas>
    </div>
  );
};

export default Card3D;
