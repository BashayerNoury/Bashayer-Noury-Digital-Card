import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Float, Environment } from "@react-three/drei";

const RoundedBox = ({ position, size = 0.42, gap = 0.06 }: { position: [number, number, number]; size?: number; gap?: number }) => {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const r = 0.06;
    const s = size / 2;
    shape.moveTo(-s + r, -s);
    shape.lineTo(s - r, -s);
    shape.quadraticCurveTo(s, -s, s, -s + r);
    shape.lineTo(s, s - r);
    shape.quadraticCurveTo(s, s, s - r, s);
    shape.lineTo(-s + r, s);
    shape.quadraticCurveTo(-s, s, -s, s - r);
    shape.lineTo(-s, -s + r);
    shape.quadraticCurveTo(-s, -s, -s + r, -s);

    const extrudeSettings = { depth: size, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 3 };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.translate(0, 0, -size / 2);
    return geo;
  }, [size]);

  return (
    <mesh position={position} geometry={geometry}>
      <meshPhysicalMaterial
        color="#1a1a1a"
        metalness={0.9}
        roughness={0.15}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={1.5}
      />
    </mesh>
  );
};

const CubeCluster = () => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.3 + 0.5;
    groupRef.current.rotation.y = t * 0.2;
    groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;
  });

  const gap = 0.5;
  const positions: [number, number, number][] = [];
  for (let x = -1; x <= 1; x++)
    for (let y = -1; y <= 1; y++)
      for (let z = -1; z <= 1; z++)
        positions.push([x * gap, y * gap, z * gap]);

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <group ref={groupRef}>
        {positions.map((pos, i) => (
          <RoundedBox key={i} position={pos} />
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
        <CubeCluster />
      </Canvas>
    </div>
  );
};

export default FloatingCube;
