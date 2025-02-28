import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Text } from '@react-three/drei';
import * as THREE from 'three';

interface GallerySceneProps {
  images: Array<{
    url: string;
    title: string;
  }>;
  isDark: boolean;
}

export function GalleryScene({ images, isDark }: GallerySceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const radius = 10;

  useFrame((state) => {
    if (groupRef.current) {
      const targetRotation = (activeIndex / images.length) * Math.PI * 2;
      groupRef.current.rotation.y += (targetRotation - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {images.map((image, index) => {
        const angle = (index / images.length) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <group key={index} position={[x, 0, z]} rotation={[0, -angle + Math.PI, 0]}>
            <Image
              url={image.url}
              scale={[4, 3, 1]}
              position={[0, 0, 0]}
              transparent
              opacity={0.9}
            />
            <Text
              position={[0, -2, 0]}
              fontSize={0.5}
              color={isDark ? '#ffffff' : '#000000'}
              anchorX="center"
              anchorY="middle"
            >
              {image.title}
            </Text>
          </group>
        );
      })}
    </group>
  );
}