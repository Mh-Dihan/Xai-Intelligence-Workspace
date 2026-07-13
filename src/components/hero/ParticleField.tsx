"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 2600;
const GRID_X = 52;
const GRID_Y = 34;

function buildChaosPositions() {
  const positions = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const r = 5.4 * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
    positions[i * 3 + 2] = r * Math.cos(phi) * 0.9;
  }
  return positions;
}

function buildGridPositions() {
  const positions = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const gx = i % GRID_X;
    const gy = Math.floor(i / GRID_X) % GRID_Y;
    const layer = Math.floor(i / (GRID_X * GRID_Y));
    const x = (gx / (GRID_X - 1) - 0.5) * 11;
    const y = (gy / (GRID_Y - 1) - 0.5) * 6.4;
    const z = layer * -0.6;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  return positions;
}

export default function ParticleField({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const chaos = useMemo(buildChaosPositions, []);
  const grid = useMemo(buildGridPositions, []);
  const current = useMemo(() => new Float32Array(chaos), [chaos]);
  const colorArray = useMemo(() => {
    const colors = new Float32Array(COUNT * 3);
    const indigo = new THREE.Color("#6c7cff");
    const cyan = new THREE.Color("#4fe8c8");
    for (let i = 0; i < COUNT; i++) {
      const c = i % 5 === 0 ? cyan : indigo;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return colors;
  }, []);

  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    pointer.current.x = THREE.MathUtils.lerp(
      pointer.current.x,
      state.pointer.x,
      0.03
    );
    pointer.current.y = THREE.MathUtils.lerp(
      pointer.current.y,
      state.pointer.y,
      0.03
    );

    const p = progressRef.current;
    const geom = pointsRef.current?.geometry;
    if (!geom) return;
    const posAttr = geom.getAttribute("position") as THREE.BufferAttribute;

    for (let i = 0; i < COUNT; i++) {
      const idx = i * 3;
      const idx1 = idx + 1;
      const idx2 = idx + 2;

      const noise =
        Math.sin(t * 0.6 + i * 0.37) * 0.05 * (1 - p) +
        Math.sin(t * 0.35 + i * 0.13) * 0.02;

      const targetX = THREE.MathUtils.lerp(chaos[idx], grid[idx], p);
      const targetY = THREE.MathUtils.lerp(chaos[idx1], grid[idx1], p);
      const targetZ = THREE.MathUtils.lerp(chaos[idx2], grid[idx2], p);

      current[idx] = THREE.MathUtils.lerp(
        current[idx],
        targetX + noise,
        0.06
      );
      current[idx1] = THREE.MathUtils.lerp(
        current[idx1],
        targetY + noise * 0.6,
        0.06
      );
      current[idx2] = THREE.MathUtils.lerp(current[idx2], targetZ, 0.06);
    }
    posAttr.array = current;
    posAttr.needsUpdate = true;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(
        pointsRef.current.rotation.y,
        pointer.current.x * 0.15 + (1 - p) * 0.25,
        0.04
      );
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        -pointer.current.y * 0.08,
        0.04
      );
    }
  });

  return (
    <points ref={pointsRef} scale={Math.min(viewport.width / 14, 1.15)}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[current, 3]}
          count={COUNT}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colorArray, 3]}
          count={COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
