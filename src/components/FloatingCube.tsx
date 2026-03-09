import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { Float, Environment } from "@react-three/drei";

const VoxelBlock = ({ position, shade }: { position: [number, number, number]; shade: number }) => {
  const geometry = useMemo(() => {
    const s = 0.17;
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
      depth: s * 2, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2,
    });
    geo.translate(0, 0, -s);
    return geo;
  }, []);

  const color = useMemo(() => {
    const v = Math.round(shade * 255);
    return `rgb(${v},${v},${v})`;
  }, [shade]);

  return (
    <mesh position={position} geometry={geometry}>
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
    const gap = 0.38;
    const R = 3.2;
    const halfR = R / 2;
    const eyeR = R * 0.25;
    const result: { pos: [number, number, number]; shade: number }[] = [];

    for (let gx = -R; gx <= R; gx++) {
      for (let gy = -R; gy <= R; gy++) {
        const dist = Math.sqrt(gx * gx + gy * gy);
        if (dist > R) continue;

        // Classic yin yang geometry
        // Default: left half is dark (0.15), right half is light (0.85)
        let shade = gx < 0 ? 0.15 : 0.85;

        // Upper small semicircle (centered at top of vertical axis): flips to light
        const distUpper = Math.sqrt(gx * gx + (gy - halfR) * (gy - halfR));
        if (distUpper <= halfR) {
          shade = 0.85;
        }

        // Lower small semicircle (centered at bottom of vertical axis): flips to dark
        const distLower = Math.sqrt(gx * gx + (gy + halfR) * (gy + halfR));
        if (distLower <= halfR) {
          shade = 0.15;
        }

        // Eye dots: contrasting dots in each half
        const distUpperEye = Math.sqrt(gx * gx + (gy - halfR) * (gy - halfR));
        if (distUpperEye <= eyeR) {
          shade = 0.15; // dark eye in light region
        }

        const distLowerEye = Math.sqrt(gx * gx + (gy + halfR) * (gy + halfR));
        if (distLowerEye <= eyeR) {
          shade = 0.85; // light eye in dark region
        }

        result.push({ pos: [gx * gap, gy * gap, 0], shade });
      }
    }
    return result;
  }, []);

  // In dark mode: light shades (white/silver), in light mode: dark shades (black/charcoal)
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
      <Canvas camera={{ position: [0, 0, 6], fov: 35 }} dpr={[1, 2]}>
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
