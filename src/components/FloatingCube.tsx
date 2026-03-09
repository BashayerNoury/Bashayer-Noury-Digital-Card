import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Float, Environment } from "@react-three/drei";

const VoxelBlock = ({ position, color = "#1a1a1a", metalness = 0.9 }: { position: [number, number, number]; color?: string; metalness?: number }) => {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const s = 0.18;
    const r = 0.03;
    shape.moveTo(-s + r, -s);
    shape.lineTo(s - r, -s);
    shape.quadraticCurveTo(s, -s, s, -s + r);
    shape.lineTo(s, s - r);
    shape.quadraticCurveTo(s, s, s - r, s);
    shape.lineTo(-s + r, s);
    shape.quadraticCurveTo(-s, s, -s, s - r);
    shape.lineTo(-s, -s + r);
    shape.quadraticCurveTo(-s, -s, -s + r, -s);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: s * 2,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 2,
    });
    geo.translate(0, 0, -s);
    return geo;
  }, []);

  return (
    <mesh position={position} geometry={geometry}>
      <meshPhysicalMaterial
        color={color}
        metalness={metalness}
        roughness={0.15}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={1.5}
      />
    </mesh>
  );
};

const YinYangCluster = () => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.2 + 0.4;
    groupRef.current.rotation.y = t * 0.15;
    groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.08;
  });

  const gap = 0.4;
  const radius = 3.5;
  const blocks: { pos: [number, number, number]; dark: boolean }[] = [];

  // Build a voxelized yin yang disc
  for (let x = -radius; x <= radius; x++) {
    for (let y = -radius; y <= radius; y++) {
      const dist = Math.sqrt(x * x + y * y);
      if (dist > radius) continue;

      // Yin yang logic
      let dark: boolean;
      const halfR = radius / 2;

      // Upper half circle center and lower half circle center
      const upperDist = Math.sqrt(x * x + (y - halfR) * (y - halfR));
      const lowerDist = Math.sqrt(x * x + (y + halfR) * (y + halfR));

      if (upperDist <= halfR) {
        dark = true;
        // Small dot in upper half
        if (upperDist <= halfR * 0.35) dark = false;
      } else if (lowerDist <= halfR) {
        dark = false;
        // Small dot in lower half
        if (lowerDist <= halfR * 0.35) dark = true;
      } else if (x >= 0) {
        dark = true;
      } else {
        dark = false;
      }

      blocks.push({ pos: [x * gap, y * gap, 0], dark });
    }
  }

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.4} floatingRange={[-0.08, 0.08]}>
      <group ref={groupRef}>
        {blocks.map((b, i) => (
          <VoxelBlock
            key={i}
            position={b.pos}
            color={b.dark ? "#111111" : "#888888"}
            metalness={b.dark ? 0.95 : 0.7}
          />
        ))}
      </group>
    </Float>
  );
};

const FloatingCube = () => {
  return (
    <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] z-10 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 6], fov: 35 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-3, -3, 2]} intensity={0.4} />
        <spotLight position={[0, 5, 3]} intensity={0.6} angle={0.5} penumbra={1} />
        <Environment preset="city" />
        <YinYangCluster />
      </Canvas>
    </div>
  );
};

export default FloatingCube;
