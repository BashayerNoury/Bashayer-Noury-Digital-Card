import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { Float, Environment, RoundedBox } from "@react-three/drei";

const VoxelBlock = ({ position, shade }: { position: [number, number, number]; shade: number }) => {
  const color = useMemo(() => {
    const v = Math.round(shade * 255);
    return `rgb(${v},${v},${v})`;
  }, [shade]);

  return (
    <mesh position={position}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.85}
        roughness={0.18}
        clearcoat={0.8}
        clearcoatRoughness={0.15}
        envMapIntensity={1.2}
      />
    </mesh>
  );
};

const ThemeWatcher = ({ onChange }: { onChange: (dark: boolean) => void }) => {
  useEffect(() => {
    const check = () => onChange(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, [onChange]);
  return null;
};

const AbstractYinYang = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const [isDark, setIsDark] = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.x = Math.sin(t * 0.25) * 0.25 + 0.45;
    groupRef.current.rotation.y = t * 0.12;
    groupRef.current.rotation.z = Math.sin(t * 0.18) * 0.06;
  });

  const blocks = useMemo(() => {
    const gap = 0.42;
    const gridR = 7;
    const R = gridR * gap;
    const halfR = R / 2;
    const eyeR = R * 0.18;
    const result: { pos: [number, number, number]; shade: number }[] = [];

    for (let ix = -gridR; ix <= gridR; ix++) {
      for (let iy = -gridR; iy <= gridR; iy++) {
        const wx = ix * gap;
        const wy = iy * gap;
        const dist = Math.sqrt(wx * wx + wy * wy);
        if (dist > R) continue;

        // Classic yin yang S-curve division
        let isYin = wx < 0;

        // Upper semicircle: belongs to yang (light)
        const dUpper = Math.sqrt(wx * wx + (wy - halfR) * (wy - halfR));
        if (dUpper <= halfR) isYin = false;

        // Lower semicircle: belongs to yin (dark)
        const dLower = Math.sqrt(wx * wx + (wy + halfR) * (wy + halfR));
        if (dLower <= halfR) isYin = true;

        let shade = isYin ? 0.1 : 0.9;

        // Eye dots - contrasting dots
        if (dUpper <= eyeR) shade = 0.1;
        if (dLower <= eyeR) shade = 0.9;

        result.push({ pos: [wx, wy, 0], shade });
      }
    }
    return result;
  }, []);

  // Theme mapping: dark mode = light tones, light mode = dark tones
  const mappedBlocks = blocks.map((b) => ({
    ...b,
    shade: isDark ? 0.5 + b.shade * 0.5 : b.shade * 0.35,
  }));

  return (
    <>
      <ThemeWatcher onChange={setIsDark} />
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.4} floatingRange={[-0.08, 0.08]}>
        <group ref={groupRef}>
          {mappedBlocks.map((b, i) => (
            <VoxelBlock key={i} position={b.pos} shade={b.shade} />
          ))}
        </group>
      </Float>
    </>
  );
};

const FloatingCube = () => {
  return (
    <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] z-10 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 35 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-3, -3, 2]} intensity={0.3} />
        <spotLight position={[0, 5, 3]} intensity={0.5} angle={0.5} penumbra={1} />
        <Environment preset="city" />
        <AbstractYinYang />
      </Canvas>
    </div>
  );
};

export default FloatingCube;
