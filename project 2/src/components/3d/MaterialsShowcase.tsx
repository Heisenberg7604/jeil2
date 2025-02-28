import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface MaterialsShowcaseProps {
  isDark: boolean;
}

export function MaterialsShowcase({ isDark }: MaterialsShowcaseProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const materials = [
    { name: "HDPE", color: "#3498db", position: [0, 0, 0] },
    { name: "PP", color: "#e74c3c", position: [-3, 1, -2] },
    { name: "PET", color: "#2ecc71", position: [3, -1, -1] },
    { name: "LDPE", color: "#f39c12", position: [-2, -2, 2] },
    { name: "PS", color: "#9b59b6", position: [2, 2, 1] }
  ];

  return (
    <group ref={groupRef}>
      {materials.map((material, index) => (
        <MaterialSphere 
          key={material.name}
          name={material.name}
          color={material.color}
          position={material.position as [number, number, number]}
          isDark={isDark}
          delay={index * 0.2}
        />
      ))}
    </group>
  );
}

interface MaterialSphereProps {
  name: string;
  color: string;
  position: [number, number, number];
  isDark: boolean;
  delay: number;
}

function MaterialSphere({ name, color, position, isDark, delay }: MaterialSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Add subtle movement
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.2;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      position={position}
    >
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.2} 
          metalness={0.8}
          envMapIntensity={1}
        />
      </mesh>
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.4}
        color={isDark ? '#ffffff' : '#000000'}
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </Float>
  );
}