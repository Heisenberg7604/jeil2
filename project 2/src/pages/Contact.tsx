import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

interface ContactProps {
  isDark: boolean;
}

const Contact: React.FC<ContactProps> = ({ isDark }) => {
  return (
    <div className={`min-h-screen pt-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className={`text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Contact Us
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-8 rounded-lg shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Send us a message
              </h2>
              <form>
                <div className="mb-4">
                  <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Name
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDark 
                        ? 'bg-gray-700 text-white border-gray-600' 
                        : 'bg-gray-50 text-gray-900 border-gray-300'
                    }`}
                  />
                </div>
                <div className="mb-4">
                  <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDark 
                        ? 'bg-gray-700 text-white border-gray-600' 
                        : 'bg-gray-50 text-gray-900 border-gray-300'
                    }`}
                  />
                </div>
                <div className="mb-4">
                  <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDark 
                        ? 'bg-gray-700 text-white border-gray-600' 
                        : 'bg-gray-50 text-gray-900 border-gray-300'
                    }`}
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className={`w-full py-2 rounded-lg text-white ${
                    isDark ? 'bg-red-500 hover:bg-red-600' : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
                <Phone className={`w-8 h-8 mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Phone
                </h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  +91 XXXXXXXXXX
                </p>
              </div>

              <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
                <Mail className={`w-8 h-8 mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Email
                </h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  info@jeil.in
                </p>
              </div>

              <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
                <MapPin className={`w-8 h-8 mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Address
                </h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  Gujarat, India
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;