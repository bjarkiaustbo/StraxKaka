'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Employee {
  name: string;
  birthday: string;
  cakeType: string;
  cakeSize?: string;
  dietaryRestrictions?: string;
  specialNotes?: string;
  employmentStatus?: string;
}

interface Submission {
  id: string;
  companyName?: string;
  contactPersonName?: string;
  contactEmail?: string;
  contactPhone?: string;
  deliveryAddress?: string;
  subscriptionTier?: string;
  status?: string;
  subscriptionStatus?: string;
  employees?: Employee[];
  monthlyCost?: number;
  dateCreated?: string;
  orderId?: string;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  // Check if already authenticated
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('straxkaka_admin_auth');
      if (authStatus === 'true') {
        setIsAuthenticated(true);
        loadData();
      }
    }
  }, []);

  const loadData = () => {
    if (typeof window === 'undefined') return;
    
    try {
      setLoading(true);
      const storedSubmissions = localStorage.getItem('straxkaka_submissions');
      const storedSubscriptions = localStorage.getItem('straxkaka_subscriptions');
      
      if (storedSubscriptions) {
        setSubmissions(JSON.parse(storedSubscriptions));
      } else if (storedSubmissions) {
        setSubmissions(JSON.parse(storedSubmissions));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'straxkaka2025') {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('straxkaka_admin_auth', 'true');
      }
      setPasswordError('');
      loadData();
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const removeCompany = (companyId: string) => {
    if (confirm('Are you sure you want to remove this company?')) {
      const updatedSubmissions = submissions.filter((sub: Submission) => sub.id !== companyId);
      setSubmissions(updatedSubmissions);
      if (typeof window !== 'undefined') {
        localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
      }
    }
  };

  // Filter submissions based on search
  const filteredSubmissions = submissions.filter(submission => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      submission.companyName?.toLowerCase().includes(search) ||
      submission.contactPersonName?.toLowerCase().includes(search) ||
      submission.contactEmail?.toLowerCase().includes(search) ||
      submission.subscriptionTier?.toLowerCase().includes(search)
    );
  });

  // Calculate statistics
  const totalCompanies = submissions.length;
  const activeCompanies = submissions.filter(sub => sub.subscriptionStatus === 'active').length;
  const paidCompanies = submissions.filter(sub => sub.status === 'paid').length;
  const totalEmployees = submissions.reduce((total, sub) => total + (sub.employees?.length || 0), 0);
  const activeEmployees = submissions.reduce((total, sub) => 
    total + (sub.employees?.filter(emp => emp.employmentStatus === 'active').length || 0), 0
  );
  const totalRevenue = submissions.reduce((total, sub) => total + (sub.monthlyCost || 0), 0);
  
  // Get upcoming birthdays (next 30 days)
  const upcomingBirthdays = submissions.reduce((total, sub) => {
    if (!sub.employees) return total;
    const today = new Date();
    const next30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    return total + sub.employees.filter(emp => {
      if (emp.employmentStatus !== 'active') return false;
      const birthday = new Date(emp.birthday);
      birthday.setFullYear(today.getFullYear());
      return birthday >= today && birthday <= next30Days;
    }).length;
  }, 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <img 
              src="/logo.svg" 
              alt="Strax Logo" 
              className="h-12 w-auto mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-600">Enter password to access admin panel</p>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            {passwordError && (
              <p className="text-red-600 text-sm">{passwordError}</p>
            )}
            
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors font-semibold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Simple Navigation */}
      <nav className="bg-black shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <img 
                src="/logo.svg" 
                alt="Strax Logo" 
                className="h-8 w-auto mr-2"
              />
              <span className="text-2xl font-bold text-yellow-500">Strax Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          <p className="text-gray-600">Manage company subscriptions and employees</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{totalCompanies}</p>
                <p className="text-sm font-medium text-gray-600">Total Companies</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{activeCompanies}</p>
                <p className="text-sm font-medium text-gray-600">Active Companies</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{activeEmployees}</p>
                <p className="text-sm font-medium text-gray-600">Active Employees</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{upcomingBirthdays}</p>
                <p className="text-sm font-medium text-gray-600">Birthdays Next 30 Days</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{totalRevenue.toLocaleString()} ISK</p>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Companies</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Search by company name, contact, email, or subscription tier..."
              />
            </div>
            <div className="text-sm text-gray-500">
              Showing {filteredSubmissions.length} of {totalCompanies} companies
            </div>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Company Submissions</h2>
          </div>
          
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {searchTerm ? 'No companies match your search' : 'No submissions found'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubmissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{submission.companyName || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{submission.subscriptionTier || 'N/A'}</div>
                        {submission.orderId && (
                          <div className="text-xs text-gray-400">ID: {submission.orderId}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{submission.contactPersonName || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{submission.contactEmail || 'N/A'}</div>
                        {submission.contactPhone && (
                          <div className="text-xs text-gray-400">{submission.contactPhone}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {submission.employees?.filter(emp => emp.employmentStatus === 'active').length || 0} / {submission.employees?.length || 0}
                        </div>
                        <div className="text-sm text-gray-500">active / total</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          submission.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' :
                          submission.subscriptionStatus === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                          submission.subscriptionStatus === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {submission.subscriptionStatus?.charAt(0).toUpperCase() + submission.subscriptionStatus?.slice(1) || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          submission.status === 'paid' ? 'bg-green-100 text-green-800' :
                          submission.status === 'pending_payment' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {submission.status?.replace('_', ' ').charAt(0).toUpperCase() + submission.status?.replace('_', ' ').slice(1) || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {(submission.monthlyCost || 0).toLocaleString()} ISK
                        </div>
                        <div className="text-xs text-gray-500">monthly</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedSubmission(submission)}
                            className="text-blue-600 hover:text-blue-900 bg-blue-100 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors"
                          >
                            View
                          </button>
                          <button
                            onClick={() => removeCompany(submission.id)}
                            className="text-red-600 hover:text-red-900 bg-red-100 px-3 py-1 rounded-full text-xs font-medium hover:bg-red-200 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Company Details Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedSubmission.companyName}
                  </h3>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="text-2xl">&times;</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Company Information</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Contact:</strong> {selectedSubmission.contactPersonName}</p>
                      <p><strong>Email:</strong> {selectedSubmission.contactEmail}</p>
                      <p><strong>Phone:</strong> {selectedSubmission.contactPhone || 'N/A'}</p>
                      <p><strong>Address:</strong> {selectedSubmission.deliveryAddress || 'N/A'}</p>
                      <p><strong>Subscription:</strong> {selectedSubmission.subscriptionTier}</p>
                      <p><strong>Status:</strong> {selectedSubmission.status}</p>
                      <p><strong>Monthly Cost:</strong> {(selectedSubmission.monthlyCost || 0).toLocaleString()} ISK</p>
                      <p><strong>Order ID:</strong> {selectedSubmission.orderId || 'N/A'}</p>
                    </div>
                  </div>
                  
                  {selectedSubmission.employees && selectedSubmission.employees.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Employees ({selectedSubmission.employees.length})</h4>
                      <div className="max-h-60 overflow-y-auto space-y-2">
                        {selectedSubmission.employees.map((employee, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-gray-900">{employee.name}</p>
                                <p className="text-sm text-gray-600">
                                  Birthday: {new Date(employee.birthday).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">Cake: {employee.cakeType}</p>
                                {employee.dietaryRestrictions && (
                                  <p className="text-sm text-red-600">
                                    Restrictions: {employee.dietaryRestrictions}
                                  </p>
                                )}
                                {employee.specialNotes && (
                                  <p className="text-sm text-gray-500">
                                    Notes: {employee.specialNotes}
                                  </p>
                                )}
                              </div>
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                employee.employmentStatus === 'active' ? 'bg-green-100 text-green-800' :
                                employee.employmentStatus === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {employee.employmentStatus || 'Unknown'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
