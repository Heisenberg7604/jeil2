import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { GalleryScene } from '../components/3d/GalleryScene';

interface GalleryProps {
  isDark: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ isDark }) => {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800',
      title: 'Industrial Packaging'
    },
    {
      url: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800',
      title: 'Stretch Film'
    },
    {
      url: 'https://images.unsplash.com/photo-1535813547-3e2f90a94d3c?auto=format&fit=crop&w=800',
      title: 'Polymer Film'
    },
    {
      url: 'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&w=800',
      title: 'VCI Film'
    },
    {
      url: 'https://images.unsplash.com/photo-1536566482680-fca31930a0bd?auto=format&fit=crop&w=800',
      title: 'Breathable Film'
    },
    {
      url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800',
      title: 'Manufacturing'
    }
  ];

  return (
    <div className={`min-h-screen pt-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-800'}`}
        >
          Gallery
        </motion.h1>

        {/* 3D Gallery */}
        <div className="h-[70vh] mb-16 rounded-xl overflow-hidden">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 15]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Suspense fallback={null}>
              <GalleryScene images={images} isDark={isDark} />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </div>

        {/* Traditional Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-lg shadow-xl aspect-square"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <h3 className="text-white text-xl font-semibold p-6">
                  {image.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;