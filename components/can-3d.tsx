"use client";

import { Suspense, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useFBX } from "@react-three/drei";
import * as THREE from "three";

type ProgressRef = RefObject<number>;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function CanModel({ progress }: { progress: ProgressRef }) {
  const group = useRef<THREE.Group>(null);
  const fbx = useFBX("/monster_txt.fbx");
  const { viewport } = useThree();

  // Normalize the model: center it and scale to a predictable world size
  const model = useMemo(() => {
    const obj = fbx.clone();
    const box = new THREE.Box3().setFromObject(obj);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const s = 5 / maxDim;
    obj.scale.setScalar(s);
    obj.position.set(-center.x * s, -center.y * s, -center.z * s);
    return obj;
  }, [fbx]);

  useFrame(() => {
    if (!group.current) return;
    const p = progress.current ?? 0;

    let rotZ = 0;
    let x = 0;
    let y = 0;
    let s = 1;

    if (p <= 0.5) {
      // Section 1 -> Section 2: rotate 0deg -> 90deg, drift right under "SINCE 2002"
      const t = easeInOut(p / 0.5);
      rotZ = lerp(0, Math.PI / 2, t);
      x = lerp(0, viewport.width * 0.18, t);
      y = lerp(0, -viewport.height * 0.05, t);
      s = lerp(1, 1.15, t);
    } else {
      // Section 2 -> Section 3: rotate 90deg -> 0deg, land in the NITRO GREEN slot
      const t = easeInOut((p - 0.5) / 0.5);
      rotZ = lerp(Math.PI / 2, 0, t);
      x = lerp(viewport.width * 0.18, 0, t);
      y = lerp(-viewport.height * 0.05, viewport.height * 0.08, t);
      s = lerp(1.15, 0.45, t);
    }

    group.current.rotation.z = rotZ;
    group.current.position.set(x, y, 0);
    group.current.scale.setScalar(s);
  });

  return (
    <group ref={group}>
      <primitive object={model} />
    </group>
  );
}

useFBX.preload("/monster_txt.fbx");

export default function Can3D({ progress }: { progress: ProgressRef }) {
  return (
    <div className="fixed inset-0 z-30 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 5, 5]} intensity={1.6} />
        <directionalLight position={[-5, -2, 4]} intensity={0.7} color="#d6ff00" />
        <Suspense fallback={null}>
          <CanModel progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
