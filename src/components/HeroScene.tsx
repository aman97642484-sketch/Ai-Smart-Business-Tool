import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

const GlowingSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.3;
      innerRef.current.rotation.z = t * 0.25;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <group>
        {/* Outer distorted glass sphere */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.6, 20]} />
          <MeshDistortMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.15}
            roughness={0.1}
            metalness={0.8}
            distort={0.3}
            speed={2}
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Inner glowing core */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.9, 12]} />
          <MeshDistortMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.5}
            roughness={0}
            metalness={1}
            distort={0.45}
            speed={3}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Center bright point */}
        <mesh>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.9} />
        </mesh>
      </group>
    </Float>
  );
};

const ParticleRing = () => {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.2 + (Math.random() - 0.5) * 0.4;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.1;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.15;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#00d4ff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const HeroScene = () => {
  return (
    <div className="w-[300px] h-[300px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />
        <pointLight position={[-5, -3, 3]} intensity={0.6} color="#a855f7" />
        <pointLight position={[0, 3, -5]} intensity={0.4} color="#00d4ff" />
        <GlowingSphere />
        <ParticleRing />
      </Canvas>
    </div>
  );
};

export default HeroScene;
