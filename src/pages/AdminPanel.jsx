import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, LogOut, User, Mail, Phone, Calendar, Eye, EyeOff, ChevronDown, ChevronUp, Edit2, Check, X, AlertTriangle } from 'lucide-react';

// API Configuration
const API_BASE = '/api';

const apiCall = async (endpoint, options = {}) => {
  const token = sessionStorage.getItem('adminToken');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };
  
  const response = await fetch(`${API_BASE}${endpoint}`, config);
  
  if (response.status === 401) {
    sessionStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
    return;
  }
  
  return response.json();
};

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
      const response = await fetch(`${API_BASE}/auth/admin/monitoring`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        sessionStorage.setItem('adminToken', data.token);
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

// Inquiry Row Component
const InquiryRow = ({ inquiry, onUpdate, expanded, onToggle }) => {
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    followupStatus: inquiry.followupStatus || 'pending',
    isSpam: inquiry.isSpam || false
  });

  const handleSave = async () => {
    try {
      await apiCall(`/inquiries/${inquiry.id}`, {
        method: 'PATCH',
        body: JSON.stringify(editData),
      });
      onUpdate();
      setEditMode(false);
    } catch (err) {
      console.error('Failed to update inquiry:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <tr className={`border-b hover:bg-gray-50 ${inquiry.isSpam ? 'bg-red-50' : ''}`}>
        <td className="px-4 py-3 text-sm">{inquiry.id}</td>
        <td className="px-4 py-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{inquiry.name}</span>
            {inquiry.isSpam && <AlertTriangle className="w-4 h-4 text-red-500" />}
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">{inquiry.email}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{inquiry.contact}</td>
        <td className="px-4 py-3">
          {editMode ? (
            <select
              value={editData.followupStatus}
              onChange={(e) => setEditData({...editData, followupStatus: e.target.value})}
              className="text-xs px-2 py-1 rounded border"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          ) : (
            <span className={`px-2 py-1 text-xs rounded-full ${
              inquiry.followupStatus === 'completed' ? 'bg-green-100 text-green-800' :
              inquiry.followupStatus === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {inquiry.followupStatus || 'pending'}
            </span>
          )}
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">
          {formatDate(inquiry.createdAt || inquiry.date)}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center space-x-2">
            {editMode ? (
              <div className="flex items-center space-x-1">
                <label className="flex items-center space-x-1 text-xs">
                  <input
                    type="checkbox"
                    checked={editData.isSpam}
                    onChange={(e) => setEditData({...editData, isSpam: e.target.checked})}
                    className="rounded"
                  />
                  <span>Spam</span>
                </label>
                <button onClick={handleSave} className="text-green-600 hover:text-green-800">
                  <Check className="w-4 h-4" />
                </button>
                <button onClick={() => setEditMode(false)} className="text-gray-600 hover:text-gray-800">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button onClick={() => setEditMode(true)} className="text-blue-600 hover:text-blue-800">
                <Edit2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => onToggle(inquiry.id)}
              className="text-gray-600 hover:text-gray-800"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </td>
      </tr>
      {expanded && (
        <tr className="border-b bg-gray-50">
          <td colSpan="7" className="px-4 py-4">
            <div className="space-y-2">
              <div><strong>Subject:</strong> {inquiry.subject}</div>
              <div><strong>Message:</strong></div>
              <div className="bg-white p-3 rounded border text-sm text-gray-700">
                {inquiry.message}
              </div>
              {inquiry.company && <div><strong>Company:</strong> {inquiry.company}</div>}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

// Contact Inquiries Component
const ContactInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showSpamOnly, setShowSpamOnly] = useState(false);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [spamCount, setSpamCount] = useState(0);
  const itemsPerPage = 10;

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const endpoint = showSpamOnly ? '/inquiries/spam' : '/inquiries';
      const data = await apiCall(endpoint);
      setInquiries(data);
      setFilteredInquiries(data);
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadSpamCount = async () => {
    try {
      const data = await apiCall('/inquiries/spam/count');
      setSpamCount(data.count);
    } catch (err) {
      console.error('Failed to load spam count:', err);
    }
  };

  useEffect(() => {
    loadInquiries();
    loadSpamCount();
  }, [showSpamOnly]);

  useEffect(() => {
    let filtered = inquiries.filter(inquiry =>
      inquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.subject?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (sortField === 'id') {
        aVal = parseInt(aVal);
        bVal = parseInt(bVal);
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredInquiries(filtered);
    setCurrentPage(1);
  }, [inquiries, searchTerm, sortField, sortDirection]);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleRowExpansion = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const exportToCsv = () => {
    const headers = ['ID', 'Name', 'Email', 'Contact', 'Subject', 'Message', 'Status', 'Date', 'Is Spam'];
    const csvData = [
      headers.join(','),
      ...filteredInquiries.map(inquiry => [
        inquiry.id,
        `"${inquiry.name}"`,
        inquiry.email,
        inquiry.contact,
        `"${inquiry.subject}"`,
        `"${inquiry.message?.replace(/"/g, '""')}"`,
        inquiry.followupStatus || 'pending',
        inquiry.createdAt || inquiry.date,
        inquiry.isSpam ? 'Yes' : 'No'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inquiries-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const paginatedInquiries = filteredInquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Contact Inquiries</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Spam Count: <span className="font-semibold text-red-600">{spamCount}</span>
          </span>
          <button
            onClick={exportToCsv}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search inquiries..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showSpamOnly}
                onChange={(e) => setShowSpamOnly(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Show spam only</span>
            </label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('id')}
                >
                  ID {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('name')}
                >
                  Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('email')}
                >
                  Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('contact')}
                >
                  Contact {sortField === 'contact' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('followupStatus')}
                >
                  Status {sortField === 'followupStatus' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500">Loading...</td>
                </tr>
              ) : paginatedInquiries.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500">No inquiries found</td>
                </tr>
              ) : (
                paginatedInquiries.map(inquiry => (
                  <InquiryRow
                    key={inquiry.id}
                    inquiry={inquiry}
                    onUpdate={loadInquiries}
                    expanded={expandedRows.has(inquiry.id)}
                    onToggle={toggleRowExpansion}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-4 py-3 border-t flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredInquiries.length)} of {filteredInquiries.length} entries
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 text-sm border rounded ${
                    currentPage === i + 1 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Catalog Submissions Component
const CatalogSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder for catalog submissions
    setTimeout(() => {
      setSubmissions([
        { id: 1, name: 'Product Catalog 2024', type: 'PDF', size: '2.5 MB', downloads: 45, date: '2024-01-15' },
        { id: 2, name: 'Service Brochure', type: 'PDF', size: '1.8 MB', downloads: 32, date: '2024-01-10' },
        { id: 3, name: 'Price List', type: 'XLSX', size: '0.5 MB', downloads: 67, date: '2024-01-08' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Download Catalogue</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add New Item
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Downloads
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Added
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500">Loading...</td>
                </tr>
              ) : submissions.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.type}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.size}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.downloads}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('inquiries');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'inquiries' 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Mail className="w-5 h-5" />
              <span>Contact Inquiries</span>
            </button>
            <button
              onClick={() => setActiveTab('catalogue')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'catalogue' 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Download className="w-5 h-5" />
              <span>Download Catalogue</span>
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {activeTab === 'inquiries' && <ContactInquiries />}
          {activeTab === 'catalogue' && <CatalogSubmissions />}
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

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    setIsAuthenticated(false);
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