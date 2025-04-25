
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

function Bubble({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.002;
  });

  return (
    <Sphere ref={meshRef} position={position} args={[0.3]} castShadow>
      <meshPhysicalMaterial
        transparent
        opacity={0.3}
        roughness={0}
        clearcoat={1}
        transmission={0.9}
        color="#9b87f5"
      />
    </Sphere>
  );
}

export function Bubbles() {
  return (
    <Canvas className="absolute inset-0 z-0">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      {Array.from({ length: 8 }).map((_, i) => (
        <Bubble
          key={i}
          position={[
            Math.random() * 6 - 3,
            Math.random() * 6 - 3,
            Math.random() * 6 - 3,
          ]}
        />
      ))}
    </Canvas>
  );
}
