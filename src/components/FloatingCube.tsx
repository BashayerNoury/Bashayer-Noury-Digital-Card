import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Float, Environment } from "@react-three/drei";

const Sphere = ({ distance, speed, offset, size, color }: { distance: number; speed: number; offset: number; size: number; color: string }) => {
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
        color={color}
        metalness={0.95}
        roughness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={2}
      />
    </mesh>
  );
};

const MouseTracker = ({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) => {
  const { viewport } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.05;
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.05;

    if (groupRef.current) {
      groupRef.current.rotation.y += (smoothMouse.current.x * 0.5 - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x += (smoothMouse.current.y * 0.3 - groupRef.current.rotation.x) * 0.03;
    }
  });

  return null;
};

const SphereCluster = ({ isDark }: { isDark: boolean }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const color = isDark ? "#1a1a1a" : "#c0c0c8";

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
        <MouseTracker groupRef={groupRef} />
        {spheres.map((s, i) => (
          <Sphere key={i} {...s} color={color} />
        ))}
      </group>
    </Float>
  );
};

const FloatingCube = () => {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] z-10 pointer-events-none opacity-70"
      style={{ pointerEvents: "none" }}
    >
      <div style={{ pointerEvents: "auto", width: "100%", height: "100%" }}>
        <Canvas camera={{ position: [0, 0, 4], fov: 35 }} dpr={[1, 2]}>
          <ambientLight intensity={isDark ? 0.3 : 0.6} />
          <directionalLight position={[5, 5, 5]} intensity={isDark ? 1 : 1.5} />
          <directionalLight position={[-3, -3, 2]} intensity={0.4} />
          <spotLight position={[0, 5, 3]} intensity={0.6} angle={0.5} penumbra={1} />
          <Environment preset="city" />
          <SphereCluster isDark={isDark} />
        </Canvas>
      </div>
    </div>
  );
};

export default FloatingCube;
