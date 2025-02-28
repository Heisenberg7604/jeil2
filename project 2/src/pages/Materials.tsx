import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { MaterialsShowcase } from '../components/3d/MaterialsShowcase';
import { Database, Layers, Recycle, Leaf } from 'lucide-react';

interface MaterialsProps {
  isDark: boolean;
}

const Materials: React.FC<MaterialsProps> = ({ isDark }) => {
  const materials = [
    {
      id: 'hdpe',
      name: 'High-Density Polyethylene (HDPE)',
      description: 'Versatile polymer with excellent chemical resistance and durability',
      applications: ['Industrial containers', 'Chemical storage', 'Packaging films'],
      properties: ['High tensile strength', 'Chemical resistant', 'Temperature resistant up to 120°C']
    },
    {
      id: 'pp',
      name: 'Polypropylene (PP)',
      description: 'Lightweight thermoplastic with excellent fatigue resistance',
      applications: ['Food packaging', 'Automotive components', 'Medical devices'],
      properties: ['Heat resistant', 'Chemical resistant', 'Excellent fatigue resistance']
    },
    {
      id: 'pet',
      name: 'Polyethylene Terephthalate (PET)',
      description: 'Clear, strong, and lightweight plastic with good gas barrier properties',
      applications: ['Beverage bottles', 'Food containers', 'Textile fibers'],
      properties: ['Excellent clarity', 'Good gas barrier', 'Recyclable']
    },
    {
      id: 'ldpe',
      name: 'Low-Density Polyethylene (LDPE)',
      description: 'Flexible and transparent polymer with good moisture barrier properties',
      applications: ['Stretch film', 'Plastic bags', 'Flexible packaging'],
      properties: ['Flexible', 'Good moisture barrier', 'Chemical resistant']
    }
  ];

  return (
    <div className={`min-h-screen pt-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}
        >
          Raw Materials
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-xl text-center max-w-3xl mx-auto mb-16 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
        >
          We source and process the highest quality polymers to create packaging solutions that meet the most demanding requirements
        </motion.p>

        {/* 3D Materials Showcase */}
        <div className="h-[50vh] mb-16 rounded-xl overflow-hidden">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Suspense fallback={null}>
              <MaterialsShowcase isDark={isDark} />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {materials.map((material, index) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-lg shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h3 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {material.name}
              </h3>
              <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {material.description}
              </p>
              
              <div className="mb-4">
                <h4 className={`text-lg font-medium mb-2 flex items-center ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  <Database className={`w-5 h-5 mr-2 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                  Applications
                </h4>
                <ul className={`list-disc pl-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {material.applications.map((app, i) => (
                    <li key={i}>{app}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className={`text-lg font-medium mb-2 flex items-center ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  <Layers className={`w-5 h-5 mr-2 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                  Properties
                </h4>
                <ul className={`list-disc pl-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {material.properties.map((prop, i) => (
                    <li key={i}>{prop}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sustainability Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-8 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl mb-16`}
        >
          <div className="flex items-start gap-6 flex-col md:flex-row">
            <div className={`w-16 h-16 rounded-full ${isDark ? 'bg-green-500/20' : 'bg-green-100'} flex items-center justify-center flex-shrink-0`}>
              <Recycle className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            
            <div>
              <h3 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Our Commitment to Sustainability
              </h3>
              <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                At JEIL, we're committed to reducing the environmental impact of our products. We actively work to:
              </p>
              <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-center">
                  <Leaf className={`w-5 h-5 mr-2 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  Develop recyclable and biodegradable packaging solutions
                </li>
                <li className="flex items-center">
                  <Leaf className={`w-5 h-5 mr-2 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  Reduce waste in our manufacturing processes
                </li>
                <li className="flex items-center">
                  <Leaf className={`w-5 h-5 mr-2 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  Source materials from environmentally responsible suppliers
                </li>
                <li className="flex items-center">
                  <Leaf className={`w-5 h-5 mr-2 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  Continuously research and develop more sustainable alternatives
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Materials;