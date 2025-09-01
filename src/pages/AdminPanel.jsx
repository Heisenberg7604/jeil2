import React, { useState, useEffect } from 'react';
import { Download, LogOut, User, Mail } from 'lucide-react';
import CatalogueSubmissions from '../components/CatalogueSubmissions';
import ContactSubmissions from '../components/ContactSubmissions';

// Login Component
const LoginPage = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://jeil.in/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.username,
          password: credentials.password
        }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.token) {
        sessionStorage.setItem('adminToken', data.token);
        sessionStorage.setItem('adminUser', JSON.stringify(data.user));
        onLogin();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600">Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={credentials.username}
                onChange={e => setCredentials({...credentials, username: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={credentials.password}
                onChange={e => setCredentials({...credentials, password: e.target.value})}
                required
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-medium transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('catalogue');
  const [logoutLoading, setLogoutLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
              <nav className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
          </div>
        </nav>

      <div className="flex">
        <aside className="w-64 bg-white shadow-sm min-h-screen flex flex-col">
          <nav className="p-4 space-y-2 flex-1">
            <button
              onClick={() => setActiveTab('catalogue')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'catalogue' 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Download className="w-5 h-5" />
              <span>Catalogue Submissions</span>
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'contact' 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Mail className="w-5 h-5" />
              <span>Contact Submissions</span>
            </button>
          </nav>
          
          {/* Logout button at bottom of sidebar */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={async () => {
                setLogoutLoading(true);
                await onLogout();
                setLogoutLoading(false);
              }}
              disabled={logoutLoading}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">{logoutLoading ? 'Logging out...' : 'Logout'}</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 p-6">
          {activeTab === 'catalogue' && <CatalogueSubmissions />}
          {activeTab === 'contact' && <ContactSubmissions />}
        </main>
      </div>
    </div>
  );
};

// Main App Component
const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const token = sessionStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      // Call logout endpoint to invalidate token on server
      const token = sessionStorage.getItem('adminToken');
      if (token) {
        await fetch('https://jeil.in/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear all session data
      sessionStorage.removeItem('adminToken');
      sessionStorage.removeItem('adminUser');
      
      // Reset authentication state
      setIsAuthenticated(false);
      
      console.log('Logged out successfully');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default AdminPanel;