import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ExternalLink } from 'lucide-react';
import OurNetworkcard from '../components/OurNetworkcard';

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

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('https://jeil.in/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setIsSubmitted(true);
                setFormData({ name: '', email: '', company: '', subject: '', message: '' });
                // Reset submission status after 3 seconds
                setTimeout(() => setIsSubmitted(false), 3000);
            } else {
                setError(data.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
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
        <div className={`min-h-screen pt-16 sm:pt-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div
                    className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 ${isDark ? 'text-white' : 'text-gray-800'}`}
                >
                    Contact Us
                </div>

                <div
                    className={`text-base sm:text-lg text-center mb-12 sm:mb-16 max-w-3xl mx-auto px-4 sm:px-0 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                >
                    Get in touch with our team of packaging experts. We're here to help you find the perfect solution for your needs.
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                    {/* Contact Form */}
                    <div
                        className={`p-4 sm:p-6 lg:p-8 rounded-xl shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
                    >
                        <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Send us a Message
                        </h2>

                        {isSubmitted ? (
                            <div className="text-center py-6 sm:py-8">
                                <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-3 sm:mb-4" />
                                <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    Message Sent Successfully!
                                </h3>
                                <p className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    We'll get back to you as soon as possible.
                                </p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-6 sm:py-8">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                    <span className="text-red-600 text-xl sm:text-2xl">!</span>
                                </div>
                                <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    Error Sending Message
                                </h3>
                                <p className={`mb-4 text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {error}
                                </p>
                                <button
                                    onClick={() => setError('')}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4 sm:space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base ${isDark
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
                                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base ${isDark
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
                                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base ${isDark
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
                                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base ${isDark
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
                                        rows={4}
                                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 resize-none text-sm sm:text-base ${isDark
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                            }`}
                                        placeholder="Tell us more about your requirements..."
                                    />
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-colors flex items-center justify-center cursor-pointer text-sm sm:text-base ${isLoading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-red-600 hover:bg-red-700 text-white'
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6 sm:space-y-8">
                        <div>
                            <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                Get in Touch
                            </h2>
                            <p className={`text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                Our team is ready to assist you with any questions about our packaging solutions.
                            </p>
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            {contactInfo.map((info, index) => (
                                <div
                                    key={info.title}
                                    className={`flex items-start p-4 sm:p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'
                                        } shadow-lg hover:shadow-xl transition-shadow duration-200`}
                                >
                                    <div className={`p-2 sm:p-3 rounded-full ${isDark ? 'bg-red-500/20' : 'bg-red-100'} mr-3 sm:mr-4 flex-shrink-0`}>
                                        <info.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold mb-2 text-sm sm:text-base ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                            {info.title}
                                        </h3>
                                        {renderContactDetails(info)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Our Network Section */}
                <div className="mt-16 sm:mt-20">
                    <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        Our Network
                    </h2>
                    {/* First row - 3 cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
                        <OurNetworkcard
                            title="Ankleshwar, Gujarat"
                            address="C1B – 1034 to 1037 GIDC Industrial Estate, Ankleshwar – 393 002, Gujarat – INDIA"
                            phone1="+91 2646 221134"
                            phone2="+91 2646 222163"
                            phone3="+91 2646 251083"
                            emails={['info@jeil.in']}
                            googleMapsUrl="https://maps.google.com/?q=C1B+1034+to+1037+GIDC+Industrial+Estate+Ankleshwar+393002+Gujarat+INDIA"
                            isDark={isDark}
                        />
                        <OurNetworkcard
                            title="Mumbai, Maharashtra"
                            address="A-34, Virwani Industrial Estate, Goregaon (E), Mumbai - 400063, Maharashtra, India"
                            phone1=""
                            phone2=""
                            linkUrl="#contact"
                            isDark={isDark}
                        />
                        <OurNetworkcard
                            title="Silvassa, Dadra & Nagar Haveli"
                            address="Survey No:40/1, Shed No-1 Dadra Village, Dadra Nagar Haveli, Silvassa"
                            phone1="+91 260 2669408"
                            phone2="+91 260 6453234"
                            linkUrl="#contact"
                            googleMapsUrl={'https://share.google/W89O9gOQmWStLHR2B'}
                            isDark={isDark}
                        />
                    </div>

                    {/* Second row - 2 cards centered */}
                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl">
                            <OurNetworkcard
                                title="Dehej, Gujarat"
                                address="Plot N. D-2/E/21/14, Dahej-II Industrial Estate, Tal. Vagra, Dist. Bharuch - 392110, Gujarat, India"
                                phone1=""
                                phone2=""
                                emails={['', '']}
                                linkText=""
                                linkUrl="#contact"
                                googleMapsUrl={'https://share.google/AnK2hnHq2PDyc3PIn'}
                                isDark={isDark}
                            />
                            <OurNetworkcard
                                title="Nardana, Maharashtra"
                                address="Plot No. B-2, Nardana Industrial Area, Bhabale - 425504, TA. Shindkheda, Dist. Dhule, Maharashtra 425404."
                                phone1=""
                                phone2=""
                                emails={['', '']}
                                linkText=""
                                linkUrl="#contact"
                                googleMapsUrl={'https://share.google/bn537zO8fDRMrFcJd'}
                                isDark={isDark}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;