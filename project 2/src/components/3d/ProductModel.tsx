import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ProductModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  hovered?: boolean;
}

export function ProductModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = '#ffffff', hovered = false }: ProductModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      if (hovered) {
        meshRef.current.scale.setScalar(scale * 1.1);
      } else {
        meshRef.current.scale.setScalar(scale);
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        envMapIntensity={1}
      />
    </mesh>
  );
}

export function ProductCarousel({ products, isDark }: { products: any[], isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 5;
  const totalProducts = products.length;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {products.map((product, index) => {
        const angle = (index / totalProducts) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        
        return (
          <ProductModel
            key={product.id}
            position={[x, 0, z]}
            rotation={[0, -angle, 0]}
            scale={1}
            color={isDark ? '#ff6b6b' : '#4834d4'}
          />
        );
      })}
    </group>
  );
}