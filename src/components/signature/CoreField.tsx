"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 1800;

function buildScattered() {
  const positions = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 9;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 9;
  }
  return positions;
}

function buildTorus() {
  const positions = new Float32Array(COUNT * 3);
  const R = 2.6;
  const r = 0.9;
  for (let i = 0; i < COUNT; i++) {
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI * 2;
    const wobble = 1 + Math.sin(u * 5 + v * 3) * 0.06;
    positions[i * 3] = (R + r * Math.cos(v) * wobble) * Math.cos(u);
    positions[i * 3 + 1] = (R + r * Math.cos(v) * wobble) * Math.sin(u);
    positions[i * 3 + 2] = r * Math.sin(v) * wobble;
  }
  return positions;
}

export default function CoreField({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const scattered = useMemo(buildScattered, []);
  const torus = useMemo(buildTorus, []);
  const current = useMemo(() => new Float32Array(scattered), [scattered]);

  const colors = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    const a = new THREE.Color("#6c7cff");
    const b = new THREE.Color("#4fe8c8");
    for (let i = 0; i < COUNT; i++) {
      const c = a.clone().lerp(b, Math.random());
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const p = progressRef.current;
    const t = state.clock.getElapsedTime();

    const geom = pointsRef.current?.geometry;
    if (geom) {
      const posAttr = geom.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < COUNT; i++) {
        const idx = i * 3;
        for (let k = 0; k < 3; k++) {
          const target = THREE.MathUtils.lerp(
            scattered[idx + k],
            torus[idx + k],
            p
          );
          current[idx + k] = THREE.MathUtils.lerp(
            current[idx + k],
            target,
            0.05
          );
        }
      }
      posAttr.array = current;
      posAttr.needsUpdate = true;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y =
        t * 0.08 + state.pointer.x * 0.4 * p + (1 - p) * 0;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -state.pointer.y * 0.25 * p,
        0.05
      );
    }

    if (coreRef.current) {
      const s = 0.55 + p * 0.35 + Math.sin(t * 1.4) * 0.02 * p;
      coreRef.current.scale.setScalar(s);
      coreRef.current.rotation.y -= delta * 0.25;
      coreRef.current.rotation.z += delta * 0.12;
      const mat = coreRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.15 + p * 0.55;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[current, 3]}
            count={COUNT}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
            count={COUNT}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.038}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial
          color="#f2f3f8"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
