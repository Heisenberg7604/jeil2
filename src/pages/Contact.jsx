import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = ({ isDark }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', company: '', subject: '', message: '' });

        // Reset submission status after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Address',
            details: '123 Industrial Area, Phase II\nGujarat, India 380015'
        },
        {
            icon: Phone,
            title: 'Phone',
            details: '+91 XXXXXXXXXX\n+91 XXXXXXXXXX'
        },
        {
            icon: Mail,
            title: 'Email',
            details: 'info@jeil.in\nsales@jeil.in'
        },
        {
            icon: Clock,
            title: 'Business Hours',
            details: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM'
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
                    Contact Us
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`text-lg text-center mb-16 max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                >
                    Get in touch with our team of packaging experts. We're here to help you find the perfect solution for your needs.
                </motion.p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-8 rounded-xl shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
                    >
                        <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Send us a Message
                        </h2>

                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    Message Sent Successfully!
                                </h3>
                                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                                    We'll get back to you as soon as possible.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 ${isDark
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                                }`}
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div>
                                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 ${isDark
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                                }`}
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 ${isDark
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                            }`}
                                        placeholder="Your company name"
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 ${isDark
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                            }`}
                                        placeholder="What is this about?"
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 ${isDark
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                            }`}
                                        placeholder="Tell us more about your requirements..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
                                >
                                    <Send className="w-5 h-5 mr-2" />
                                    Send Message
                                </motion.button>
                            </form>
                        )}
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                Get in Touch
                            </h2>
                            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                Our team is ready to assist you with any questions about our packaging solutions.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={info.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`flex items-start p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'
                                        } shadow-lg`}
                                >
                                    <div className={`p-3 rounded-full ${isDark ? 'bg-red-500/20' : 'bg-red-100'} mr-4`}>
                                        <info.icon className={`w-6 h-6 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                                    </div>
                                    <div>
                                        <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                            {info.title}
                                        </h3>
                                        <p className={`whitespace-pre-line ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                            {info.details}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
