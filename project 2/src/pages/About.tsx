import React from 'react';
import { motion } from 'framer-motion';
import { Factory, Award, Package, Users, Target, Leaf, Shield, Globe } from 'lucide-react';

interface AboutProps {
  isDark: boolean;
}

const About: React.FC<AboutProps> = ({ isDark }) => {
  const stats = [
    { label: "Years of Experience", value: "10+" },
    { label: "Products Delivered", value: "1M+" },
    { label: "Global Clients", value: "500+" },
    { label: "Team Members", value: "100+" }
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "Striving for perfection in every product we deliver"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working together to achieve exceptional results"
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Committed to environmentally conscious practices"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Making a difference across international markets"
    }
  ];

  return (
    <div className={`min-h-screen pt-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-10" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              About JEIL
            </h1>
            <p className={`text-xl mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              JAGANNATH EXTRUSION INDIA LTD. and PATKAR EXTRUSIONS LTD. are pioneering forces in the packaging industry,
              delivering innovative solutions that set new standards for quality and reliability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className={`text-4xl font-bold mb-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                  {stat.value}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Our Core Values
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              These principles guide every decision we make and every product we deliver
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
              >
                <div className={`w-16 h-16 rounded-full ${isDark ? 'bg-red-500/20' : 'bg-red-100'} flex items-center justify-center mb-6 mx-auto`}>
                  <value.icon className={`w-8 h-8 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                </div>
                <h3 className={`text-xl font-semibold mb-3 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {value.title}
                </h3>
                <p className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
            >
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Our Mission
              </h2>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                To understand and exceed customer requirements through timely delivery of quality-proven products at competitive prices.
                We constantly emphasize product excellence and client satisfaction to mark our distinction in the market.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
            >
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Our Vision
              </h2>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                To be the global leader in innovative packaging solutions, setting industry standards for quality,
                sustainability, and customer satisfaction while fostering growth and excellence in everything we do.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Our Certifications
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
            >
              <Shield className={`w-12 h-12 mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
              <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                ISO 9001:2015
              </h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Certified quality management system ensuring consistent product excellence
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
            >
              <Leaf className={`w-12 h-12 mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
              <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Environmental Management
              </h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Committed to sustainable practices and environmental responsibility
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
            >
              <Award className={`w-12 h-12 mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
              <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Industry Recognition
              </h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Multiple awards for innovation and excellence in packaging solutions
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;