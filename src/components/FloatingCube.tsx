import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Float, Environment } from "@react-three/drei";

const VoxelBlock = ({ position, color = "#1a1a1a", metalness = 0.9 }: { position: [number, number, number]; color?: string; metalness?: number }) => {
  const geometry = useMemo(() => {
    const s = 0.18;
    const r = 0.03;
    const shape = new THREE.Shape();
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
      depth: s * 2, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.015, bevelSegments: 2,
    });
    geo.translate(0, 0, -s);
    return geo;
  }, []);

  return (
    <mesh position={position} geometry={geometry}>
      <meshPhysicalMaterial color={color} metalness={metalness} roughness={0.15} clearcoat={1} clearcoatRoughness={0.1} envMapIntensity={1.5} />
    </mesh>
  );
};

const isYinSide = (x: number, y: number, R: number): boolean => {
  const halfR = R / 2;

  // Upper small circle (centered at 0, +halfR) — belongs to dark (yin)
  const upperDist = Math.sqrt(x * x + (y - halfR) * (y - halfR));
  if (upperDist <= halfR) return true;

  // Lower small circle (centered at 0, -halfR) — belongs to light (yang)
  const lowerDist = Math.sqrt(x * x + (y + halfR) * (y + halfR));
  if (lowerDist <= halfR) return false;

  // Outside the two small circles: left half is yin (dark), right is yang (light)
  return x <= 0;
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
  const R = 3.5; // radius in grid units
  const dotR = R * 0.18; // small dot radius
  const blocks: { pos: [number, number, number]; dark: boolean }[] = [];

  for (let gx = -R; gx <= R; gx++) {
    for (let gy = -R; gy <= R; gy++) {
      const dist = Math.sqrt(gx * gx + gy * gy);
      if (dist > R) continue;

      let dark = isYinSide(gx, gy, R);

      // Small dot eyes: light dot in dark side (upper), dark dot in light side (lower)
      const halfR = R / 2;
      const upperEyeDist = Math.sqrt(gx * gx + (gy - halfR) * (gy - halfR));
      const lowerEyeDist = Math.sqrt(gx * gx + (gy + halfR) * (gy + halfR));

      if (upperEyeDist <= dotR) dark = false; // light dot in dark half
      if (lowerEyeDist <= dotR) dark = true;  // dark dot in light half

      blocks.push({ pos: [gx * gap, gy * gap, 0], dark });
    }
  }

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.4} floatingRange={[-0.08, 0.08]}>
      <group ref={groupRef}>
        {blocks.map((b, i) => (
          <VoxelBlock key={i} position={b.pos} color={b.dark ? "#111111" : "#888888"} metalness={b.dark ? 0.95 : 0.7} />
        ))}
      </group>
    </Float>
  );
};

const FloatingCube = () => {
  return (
    <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] z-10 pointer-events-none opacity-60">
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
