import { useState, useEffect } from 'react';

const NotFoundPage = ({ isDark = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className={`text-center transform transition-all duration-700 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-light tracking-tight">
            <span className="text-red-400">4</span>
            <span className="text-blue-400">0</span>
            <span className="text-yellow-400">4</span>
          </h1>
        </div>

        {/* Divider Line */}
        <div className="w-16 h-px bg-gradient-to-r from-red-200 via-blue-200 to-yellow-200 mx-auto mb-8 transform transition-all duration-500 delay-300 scale-x-0 animate-pulse" 
             style={{ animationDelay: '0.5s', animationFillMode: 'forwards', animationName: 'scaleX' }} />

        {/* Message */}
        <div className={`mb-12 transition-all duration-700 delay-200 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <h2 className={`text-xl md:text-2xl font-normal mb-2 ${
            isDark ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Page not found
          </h2>
          <p className={`text-sm md:text-base max-w-md mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-400 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <button 
            onClick={() => window.history.back()}
            className={`px-6 py-3 rounded-sm font-medium transition-all duration-200 ${
              isDark 
                ? 'text-gray-300 border border-gray-600 hover:bg-gray-800 hover:border-gray-500 hover:text-white' 
                : 'text-gray-600 border border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600'
            }`}
          >
            ← Go back
          </button>

          <button 
            onClick={() => window.location.href = '/'}
            className={`px-6 py-3 rounded-sm font-medium transition-all duration-200 ${
              isDark 
                ? 'bg-gray-700 text-white hover:bg-red-600' 
                : 'bg-gray-900 text-white hover:bg-red-500'
            }`}
          >
            Home
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleX {
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;