import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Package, Shield, Truck, Users } from 'lucide-react';
import ParallaxProducts from '../components/ParallaxProducts';
import ParallaxRawMaterials from '../components/ParallaxRawMaterials';

interface HomeProps {
  isDark: boolean;
}

const Home: React.FC<HomeProps> = ({ isDark }) => {
  const features = [
    {
      icon: Package,
      title: "Premium Quality",
      description: "Industry-leading packaging solutions crafted with precision"
    },
    {
      icon: Shield,
      title: "ISO Certified",
      description: "Internationally recognized quality management systems"
    },
    {
      icon: Truck,
      title: "Global Delivery",
      description: "Reliable shipping to destinations worldwide"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Dedicated team of packaging specialists at your service"
    }
  ];

  return (
    <>
      <div className="relative min-h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000')",
          }}
        >
          <div className={`absolute inset-0 ${isDark ? 'bg-black bg-opacity-70' : 'bg-black bg-opacity-50'}`} />
        </div>

        <div className="relative h-screen flex items-center justify-center text-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6"
              >
                Innovative Packaging Solutions
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto"
              >
                Elevating your products with premium quality packaging solutions for the modern industry
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 rounded-lg text-lg font-medium transition-colors ${
                    isDark 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  Explore Products
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-lg text-lg font-medium border-2 border-white text-white hover:bg-white/10 transition-colors"
                >
                  Contact Us
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </div>

      {/* Parallax Products Section */}
      <ParallaxProducts isDark={isDark} />

      <section className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Why Choose JEIL?
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We combine innovation with expertise to deliver packaging solutions that exceed expectations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
              >
                <div className={`w-16 h-16 rounded-full ${isDark ? 'bg-red-500/20' : 'bg-red-100'} flex items-center justify-center mb-6 mx-auto`}>
                  <feature.icon className={`w-8 h-8 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                </div>
                <h3 className={`text-xl font-semibold mb-3 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Raw Materials Section */}
      <ParallaxRawMaterials isDark={isDark} />

      <section className={`py-24 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Leading the Industry in Innovation
              </h2>
              <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                With over a decade of experience, we've established ourselves as pioneers in the packaging industry.
                Our commitment to quality and innovation drives us to continuously improve and evolve our solutions.
              </p>
              <ul className="space-y-4">
                {[
                  "State-of-the-art manufacturing facility",
                  "Rigorous quality control processes",
                  "Environmentally conscious practices",
                  "Custom solutions for unique requirements"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-red-400' : 'bg-red-600'} mr-3`} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1200"
                alt="Manufacturing Facility"
                className="rounded-lg shadow-2xl"
              />
              <div className={`absolute -bottom-6 -right-6 p-6 rounded-lg ${isDark ? 'bg-red-500' : 'bg-red-600'} text-white`}>
                <p className="text-3xl font-bold">10+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;