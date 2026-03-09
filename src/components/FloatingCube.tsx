import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Float, Environment } from "@react-three/drei";

const MobiusStrip = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => {
    const segments = 200;
    const radius = 1.2;
    const width = 0.4;
    const positions: number[] = [];
    const indices: number[] = [];
    const normals: number[] = [];
    const strips = 20;

    for (let i = 0; i <= segments; i++) {
      const u = (i / segments) * Math.PI * 2;
      for (let j = 0; j <= strips; j++) {
        const v = (j / strips - 0.5) * width;
        const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
        const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
        const z = v * Math.sin(u / 2);
        positions.push(x, y, z);

        // Approximate normals
        const nx = Math.cos(u) * Math.sin(u / 2);
        const ny = Math.sin(u) * Math.sin(u / 2);
        const nz = Math.cos(u / 2);
        normals.push(nx, ny, nz);
      }
    }

    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < strips; j++) {
        const a = i * (strips + 1) + j;
        const b = a + strips + 1;
        indices.push(a, b, a + 1);
        indices.push(b, b + 1, a + 1);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2 + 0.3;
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
          side={THREE.DoubleSide}
        />
      </mesh>
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
        <MobiusStrip />
      </Canvas>
    </div>
  );
};

export default FloatingCube;
