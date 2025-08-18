import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ExternalLink } from 'lucide-react';

const Contact = ({ isDark = false }) => {
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
            details: 'C1B – 1034 to 1037 GIDC Industrial Estate, Ankleshwar – 393 002, Gujarat – INDIA',
            link: 'https://maps.google.com/?q=C1B+1034+to+1037+GIDC+Industrial+Estate+Ankleshwar+393002+Gujarat+INDIA',
            linkType: 'external'
        },
        {
            icon: Phone,
            title: 'Phone',
            details: '+91 9324800007\n+91 9924202318',
            phones: ['+919324800007', '+919924202318'],
            linkType: 'phone'
        },
        {
            icon: Mail,
            title: 'Email',
            details: 'patkar27@gmail.com\nparsai@pelwrap.com',
            emails: ['patkar27@gmail.com', 'parsai@pelwrap.com'],
            linkType: 'email'
        },
        {
            icon: Clock,
            title: 'Business Hours',
            details: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM',
            linkType: 'none'
        }
    ];

    const renderContactDetails = (info) => {
        if (info.linkType === 'external') {
            return (
                <a
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`whitespace-pre-line ${isDark ? 'text-gray-300 hover:text-red-400' : 'text-gray-600 hover:text-red-600'} transition-colors duration-200 flex items-start group cursor-pointer`}
                >
                    <span>{info.details}</span>
                    <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 mt-0.5" />
                </a>
            );
        } else if (info.linkType === 'phone') {
            return (
                <div className="space-y-1">
                    {info.phones.map((phone, index) => (
                        <div key={phone}>
                            <a
                                href={`tel:${phone}`}
                                className={`${isDark ? 'text-gray-300 hover:text-red-400' : 'text-gray-600 hover:text-red-600'} transition-colors duration-200 hover:underline cursor-pointer`}
                            >
                                {phone.replace('+91', '+91 ')}
                            </a>
                        </div>
                    ))}
                </div>
            );
        } else if (info.linkType === 'email') {
            return (
                <div className="space-y-1">
                    {info.emails.map((email, index) => (
                        <div key={email}>
                            <a
                                href={`mailto:${email}`}
                                className={`${isDark ? 'text-gray-300 hover:text-red-400' : 'text-gray-600 hover:text-red-600'} transition-colors duration-200 hover:underline cursor-pointer`}
                            >
                                {email}
                            </a>
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <p className={`whitespace-pre-line ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {info.details}
                </p>
            );
        }
    };

    return (
        <div className={`min-h-screen pt-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="container mx-auto px-4 py-16">
                <div
                    className={`text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-800'}`}
                >
                    Contact Us
                </div>

                <div
                    className={`text-lg text-center mb-16 max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                >
                    Get in touch with our team of packaging experts. We're here to help you find the perfect solution for your needs.
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div
                        className={`p-8 rounded-xl shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
                    >
                        <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Send us a Message
                        </h2>

                        {isSubmitted ? (
                            <div className="text-center py-8">
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    Message Sent Successfully!
                                </h3>
                                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                                    We'll get back to you as soon as possible.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
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
                                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
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
                                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
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
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                            }`}
                                        placeholder="Your company name"
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 ${isDark
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                            }`}
                                        placeholder="Your Company Address"
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
                                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 resize-none ${isDark
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                            }`}
                                        placeholder="Tell us more about your requirements..."
                                    />
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center cursor-pointer"
                                >
                                    <Send className="w-5 h-5 mr-2" />
                                    Send Message
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
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
                                <div
                                    key={info.title}
                                    className={`flex items-start p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'
                                        } shadow-lg hover:shadow-xl transition-shadow duration-200`}
                                >
                                    <div className={`p-3 rounded-full ${isDark ? 'bg-red-500/20' : 'bg-red-100'} mr-4 flex-shrink-0`}>
                                        <info.icon className={`w-6 h-6 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                            {info.title}
                                        </h3>
                                        {renderContactDetails(info)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;