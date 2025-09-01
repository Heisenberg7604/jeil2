import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 480);
  const [statusFilter, setStatusFilter] = useState("all");
  const [spamFilter, setSpamFilter] = useState("all");
  const recordsPerPage = 10;

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallScreen(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get('https://jeil.in/api/contact-submissions/get-submissions')
      .then((res) => {
        setSubmissions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching submissions:", err);
        setLoading(false);
      });
  }, []);

  const toggleRowExpand = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };

  const updateStatus = async (submissionId, newStatus) => {
    // Store the original status in case we need to revert
    const originalSubmission = submissions.find(sub => sub._id === submissionId);
    const originalStatus = originalSubmission?.followupStatus || "Pending";
    
    try {
      // Optimistically update the UI first for instant feedback
      setSubmissions(prev => prev.map(sub => 
        sub._id === submissionId 
          ? { ...sub, followupStatus: newStatus }
          : sub
      ));

      const response = await axios.put(`https://jeil.in/api/contact-submissions/update-status/${submissionId}`, {
        followupStatus: newStatus,
        isSpam: originalSubmission?.isSpam || false
      });
      
      console.log("Status update response:", response.data);
      
      // If we get here, the API call was successful
      // The optimistic update is already applied, so we don't need to do anything
      // The backend has confirmed the update
    } catch (error) {
      console.error("Error updating status:", error);
      // Revert the optimistic update on error to the original status
      setSubmissions(prev => prev.map(sub => 
        sub._id === submissionId 
          ? { ...sub, followupStatus: originalStatus }
          : sub
      ));
    }
  };

  const updateSpamStatus = async (submissionId, isSpam) => {
    // Store the original spam status in case we need to revert
    const originalSubmission = submissions.find(sub => sub._id === submissionId);
    const originalSpamStatus = originalSubmission?.isSpam || false;
    
    try {
      // Optimistically update the UI first for instant feedback
      setSubmissions(prev => prev.map(sub => 
        sub._id === submissionId 
          ? { ...sub, isSpam: isSpam }
          : sub
      ));

      const response = await axios.put(`https://jeil.in/api/contact-submissions/update-status/${submissionId}`, {
        followupStatus: originalSubmission?.followupStatus || "Pending",
        isSpam: isSpam
      });
      
      console.log("Spam update response:", response.data);
      
      // If we get here, the API call was successful
      // The optimistic update is already applied, so we don't need to do anything
      // The backend has confirmed the update
    } catch (error) {
      console.error("Error updating spam status:", error);
      // Revert the optimistic update on error to the original status
      setSubmissions(prev => prev.map(sub => 
        sub._id === submissionId 
          ? { ...sub, isSpam: originalSpamStatus }
          : sub
      ));
    }
  };

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Export to CSV function
  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add header row
    csvContent += "Name,Email,Company,Subject,Message,Status,Spam,Date,IP Address\n";
    
    // Add data rows
    filteredSubmissions.forEach(item => {
      const name = item.name ? `"${item.name.replace(/"/g, '""')}"` : "";
      const email = item.email ? `"${item.email.replace(/"/g, '""')}"` : "";
      const company = item.company ? `"${item.company.replace(/"/g, '""')}"` : "";
      const subject = item.subject ? `"${item.subject.replace(/"/g, '""')}"` : "";
      const message = item.message ? `"${item.message.replace(/"/g, '""')}"` : "";
      const status = item.followupStatus || "Pending";
      const spam = item.isSpam ? "Yes" : "No";
      const date = item.createdAt ? `"${new Date(item.createdAt).toLocaleString()}"` : "";
      const ip = item.visitorIP ? `"${item.visitorIP}"` : "";
      
      csvContent += `${name},${email},${company},${subject},${message},${status},${spam},${date},${ip}\n`;
    });
    
    // Create and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contact_submissions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter submissions based on search term, status, and spam
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = 
      (submission.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (submission.email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (submission.company?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (submission.subject?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (submission.message?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || submission.followupStatus === statusFilter;
    const matchesSpam = spamFilter === "all" || 
      (spamFilter === "spam" && submission.isSpam) || 
      (spamFilter === "not-spam" && !submission.isSpam);
    
    return matchesSearch && matchesStatus && matchesSpam;
  });

  // Sort submissions
  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    if (!a[sortField]) return 1;
    if (!b[sortField]) return -1;
    
    let comparison = 0;
    if (sortField === "createdAt") {
      comparison = new Date(a[sortField]) - new Date(b[sortField]);
    } else {
      comparison = String(a[sortField]).localeCompare(String(b[sortField]));
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedSubmissions.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(sortedSubmissions.length / recordsPerPage);

  // Generate page numbers for pagination
  const generatePaginationButtons = () => {
    if (isMobile) {
      return (
        <>
          <button 
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            &lt;
          </button>
          <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600">
            {currentPage}
          </button>
          <button 
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            aria-label="Next page"
          >
            &gt;
          </button>
        </>
      );
    }
    
    const buttons = [];
    const maxVisiblePages = 5;
    
    buttons.push(
      <button 
        key="page-1"
        className={`px-3 py-2 text-sm font-medium border ${
          currentPage === 1 
            ? 'text-white bg-blue-600 border-blue-600' 
            : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
        }`}
        onClick={() => setCurrentPage(1)}
      >
        1
      </button>
    );
    
    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 2);
    
    if (endPage - startPage < maxVisiblePages - 2) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 2));
    }
    
    if (startPage > 2) {
      buttons.push(<span key="ellipsis-1" className="px-3 py-2 text-sm text-gray-700">...</span>);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={`page-${i}`}
          className={`px-3 py-2 text-sm font-medium border ${
            currentPage === i 
              ? 'text-white bg-blue-600 border-blue-600' 
              : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    
    if (endPage < totalPages - 1) {
      buttons.push(<span key="ellipsis-2" className="px-3 py-2 text-sm text-gray-700">...</span>);
    }
    
    if (totalPages > 1) {
      buttons.push(
        <button
          key={`page-${totalPages}`}
          className={`px-3 py-2 text-sm font-medium border ${
            currentPage === totalPages 
              ? 'text-white bg-blue-600 border-blue-600' 
              : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }
    
    return buttons;
  };

  // Define which columns to hide on small screens
  const getVisibleColumns = () => {
    if (isSmallScreen) {
      return {
        id: true,
        name: true,
        email: false,
        company: false,
        subject: false,
        date: true
      };
    }
    return {
      id: true,
      name: true,
      email: true,
      company: true,
      subject: true,
      date: true
    };
  };

  const visibleColumns = getVisibleColumns();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <span className="text-blue-600">Jeil</span>
            <span className="text-gray-400 mx-2">::</span>
            <span>Contact Submissions</span>
          </h1>
          <p className="text-gray-600">Manage contact form submissions</p>
        </div>
      </header>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex gap-4">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            onClick={exportToCSV}
          >
            Export CSV
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Read">Read</option>
            <option value="Contacted">Contacted</option>
            <option value="No Response">No Response</option>
          </select>
          <select 
            value={spamFilter}
            onChange={(e) => setSpamFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Messages</option>
            <option value="not-spam">Not Spam</option>
            <option value="spam">Spam</option>
          </select>
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
            Loading submissions...
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort("_id")}>
                  <div className="flex items-center">
                    ID
                    <span className={`ml-1 ${sortField === "_id" ? (sortDirection === "asc" ? "text-blue-600" : "text-blue-600") : "text-gray-400"}`}>
                      {sortField === "_id" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                    </span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort("name")}>
                  <div className="flex items-center">
                    NAME
                    <span className={`ml-1 ${sortField === "name" ? (sortDirection === "asc" ? "text-blue-600" : "text-blue-600") : "text-gray-400"}`}>
                      {sortField === "name" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                    </span>
                  </div>
                </th>
                {visibleColumns.email && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort("email")}>
                    <div className="flex items-center">
                      EMAIL
                      <span className={`ml-1 ${sortField === "email" ? (sortDirection === "asc" ? "text-blue-600" : "text-blue-600") : "text-gray-400"}`}>
                        {sortField === "email" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                      </span>
                    </div>
                  </th>
                )}
                {visibleColumns.company && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort("company")}>
                    <div className="flex items-center">
                      COMPANY
                      <span className={`ml-1 ${sortField === "company" ? (sortDirection === "asc" ? "text-blue-600" : "text-blue-600") : "text-gray-400"}`}>
                        {sortField === "company" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                      </span>
                    </div>
                  </th>
                )}
                {visibleColumns.subject && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort("subject")}>
                    <div className="flex items-center">
                      SUBJECT
                      <span className={`ml-1 ${sortField === "subject" ? (sortDirection === "asc" ? "text-blue-600" : "text-blue-600") : "text-gray-400"}`}>
                        {sortField === "subject" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                      </span>
                    </div>
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort("followupStatus")}>
                  <div className="flex items-center">
                    STATUS
                    <span className={`ml-1 ${sortField === "followupStatus" ? (sortDirection === "asc" ? "text-blue-600" : "text-blue-600") : "text-gray-400"}`}>
                      {sortField === "followupStatus" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                    </span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort("isSpam")}>
                  <div className="flex items-center">
                    SPAM
                    <span className={`ml-1 ${sortField === "isSpam" ? (sortDirection === "asc" ? "text-blue-600" : "text-blue-600") : "text-gray-400"}`}>
                      {sortField === "isSpam" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                    </span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort("createdAt")}>
                  <div className="flex items-center">
                    DATE
                    <span className={`ml-1 ${sortField === "createdAt" ? (sortDirection === "asc" ? "text-blue-600" : "text-blue-600") : "text-gray-400"}`}>
                      {sortField === "createdAt" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRecords.length > 0 ? (
                currentRecords.map((submission, index) => {
                  const displayIndex = indexOfFirstRecord + index + 1;
                  return (
                    <React.Fragment key={submission._id || index}>
                      <tr className={`${expandedRow === (submission._id || index) ? "bg-blue-50" : ""} hover:bg-gray-50`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <div className="flex items-center space-x-2">
                            <button 
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors ${
                                expandedRow === (submission._id || index) 
                                  ? "bg-blue-600 border-blue-600 text-white" 
                                  : "bg-white border-gray-300 text-gray-600 hover:border-blue-500"
                              }`}
                              onClick={() => toggleRowExpand(submission._id || index)}
                              aria-expanded={expandedRow === (submission._id || index)}
                              aria-label={expandedRow === (submission._id || index) ? "Collapse details" : "Expand details"}
                            >
                              {expandedRow === (submission._id || index) ? "-" : "+"}
                            </button>
                            <span>{displayIndex}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.name}</td>
                        {visibleColumns.email && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.email}</td>}
                        {visibleColumns.company && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.company || "N/A"}</td>}
                        {visibleColumns.subject && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.subject || "N/A"}</td>}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <select
                            value={submission.followupStatus || "Pending"}
                            onChange={(e) => updateStatus(submission._id, e.target.value)}
                            className={`px-2 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-blue-500 ${
                              submission.followupStatus === "Read" ? "bg-green-100 text-green-800" :
                              submission.followupStatus === "Contacted" ? "bg-blue-100 text-blue-800" :
                              submission.followupStatus === "No Response" ? "bg-red-100 text-red-800" :
                              "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Read">Read</option>
                            <option value="Contacted">Contacted</option>
                            <option value="No Response">No Response</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <select
                            value={submission.isSpam ? "true" : "false"}
                            onChange={(e) => updateSpamStatus(submission._id, e.target.value === "true")}
                            className={`px-2 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-blue-500 ${
                              submission.isSpam ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                            }`}
                          >
                            <option value="false">Not Spam</option>
                            <option value="true">Spam</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.createdAt ? new Date(submission.createdAt).toLocaleDateString() : ""}</td>
                      </tr>
                      {expandedRow === (submission._id || index) && (
                        <tr className="bg-blue-50">
                          <td colSpan={Object.values(visibleColumns).filter(Boolean).length + 1}>
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Details for {submission.name}</h3>
                                <button 
                                  className="text-gray-500 hover:text-gray-700 text-xl font-bold w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200" 
                                  onClick={() => setExpandedRow(null)}
                                  aria-label="Close details"
                                >×</button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="bg-white p-3 rounded-lg border">
                                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Name</div>
                                  <div className="text-sm text-gray-900 mt-1">{submission.name}</div>
                                </div>
                                <div className="bg-white p-3 rounded-lg border">
                                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</div>
                                  <div className="text-sm text-gray-900 mt-1">{submission.email}</div>
                                </div>
                                <div className="bg-white p-3 rounded-lg border">
                                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Company</div>
                                  <div className="text-sm text-gray-900 mt-1">{submission.company || "N/A"}</div>
                                </div>
                                <div className="bg-white p-3 rounded-lg border">
                                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</div>
                                  <div className="text-sm text-gray-900 mt-1">{submission.subject || "N/A"}</div>
                                </div>
                                <div className="bg-white p-3 rounded-lg border col-span-full">
                                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Message</div>
                                  <div className="text-sm text-gray-900 mt-1 whitespace-pre-wrap">{submission.message}</div>
                                </div>
                                <div className="bg-white p-3 rounded-lg border">
                                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</div>
                                  <div className="text-sm text-gray-900 mt-1">{submission.visitorIP || "Not available"}</div>
                                </div>
                                <div className="bg-white p-3 rounded-lg border">
                                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Date</div>
                                  <div className="text-sm text-gray-900 mt-1">{submission.createdAt ? new Date(submission.createdAt).toLocaleString() : ""}</div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    {searchTerm ? "No matching submissions found" : "No contact submissions found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <div className="text-sm text-gray-700">
          Showing page {currentPage} of {totalPages || 1}
        </div>
        <div className="flex items-center space-x-2">
          {generatePaginationButtons()}
        </div>
      </div>
    </div>
  );
};

export default ContactSubmissions;
