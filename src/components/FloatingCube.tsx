import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Float, Environment } from "@react-three/drei";

const Sphere = ({ radius, distance, speed, offset, size }: { radius: number; distance: number; speed: number; offset: number; size: number }) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * distance;
    ref.current.position.y = Math.sin(t * 0.7) * distance * 0.5;
    ref.current.position.z = Math.sin(t) * distance;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshPhysicalMaterial
        color="#1a1a1a"
        metalness={0.95}
        roughness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={2}
      />
    </mesh>
  );
};

const SphereCluster = () => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.08;
    groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.2;
  });

  const spheres = [
    { distance: 0, speed: 0, offset: 0, size: 0.45 },
    { distance: 0.9, speed: 0.6, offset: 0, size: 0.2 },
    { distance: 1.1, speed: 0.5, offset: 2, size: 0.15 },
    { distance: 0.7, speed: 0.8, offset: 4, size: 0.25 },
    { distance: 1.3, speed: 0.4, offset: 1, size: 0.12 },
    { distance: 0.5, speed: 1.0, offset: 3, size: 0.1 },
    { distance: 1.0, speed: 0.55, offset: 5, size: 0.18 },
  ];

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <group ref={groupRef}>
        {spheres.map((s, i) => (
          <Sphere key={i} radius={0} {...s} />
        ))}
      </group>
    </Float>
  );
};

const FloatingCube = () => {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] z-10 pointer-events-none opacity-70">
      <Canvas camera={{ position: [0, 0, 4], fov: 35 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-3, -3, 2]} intensity={0.4} />
        <spotLight position={[0, 5, 3]} intensity={0.6} angle={0.5} penumbra={1} />
        <Environment preset="city" />
        <SphereCluster />
      </Canvas>
    </div>
  );
};

export default FloatingCube;
