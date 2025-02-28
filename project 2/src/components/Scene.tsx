import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface SceneProps {
  isDark: boolean;
}

const Scene: React.FC<SceneProps> = ({ isDark }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={isDark ? 0.1 : 0.5} />
      <pointLight position={[10, 10, 10]} intensity={isDark ? 0.5 : 1} />
      
      <group ref={groupRef}>
        {/* Abstract geometric shapes */}
        {[...Array(5)].map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.sin((i / 5) * Math.PI * 2) * 2,
              Math.cos((i / 5) * Math.PI * 2) * 2,
              0
            ]}
          >
            <dodecahedronGeometry args={[0.5]} />
            <meshStandardMaterial
              color={isDark ? '#ff6b6b' : '#4834d4'}
              metalness={0.5}
              roughness={0.2}
            />
          </mesh>
        ))}

        {/* Central shape */}
        <mesh position={[0, 0, 0]}>
          <torusKnotGeometry args={[1, 0.3, 100, 16]} />
          <meshStandardMaterial
            color={isDark ? '#00cec9' : '#6c5ce7'}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
    </>
  );
};

export default Scene;