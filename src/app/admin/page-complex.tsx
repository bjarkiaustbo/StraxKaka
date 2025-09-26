'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminNavigation from '@/components/AdminNavigation';
import AdminErrorBoundary from '@/components/AdminErrorBoundary';

interface Employee {
  name: string;
  birthday: string;
  cakeType: string;
  cakeSize: string;
  dietaryRestrictions: string;
  specialNotes: string;
  department?: string;
  position?: string;
  employmentStatus: 'active' | 'inactive' | 'terminated';
  allergies?: string;
  celebrationPreferences: 'private' | 'team' | 'company-wide';
  lastUpdated: string;
}

interface CompanySubmission {
  id: string;
  companyName: string;
  contactPersonName: string;
  contactEmail: string;
  contactPhone: string;
  deliveryAddress: string;
  employees: Employee[];
  subscriptionTier: string;
  monthlyCost: number;
  paymentMethod: string;
  status: 'pending_payment' | 'paid' | 'cancelled';
  dateCreated: string;
  orderId: string;
  delivered: boolean;
  companySize: number;
  billingAddress?: string;
  preferredLanguage: 'is' | 'en';
  accountManager?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  lastContactDate?: string;
  lastContactMethod?: 'email' | 'phone' | 'in_person';
  subscriptionStatus: 'active' | 'paused' | 'cancelled' | 'suspended';
  deliveryStatus: 'scheduled' | 'in_transit' | 'delivered' | 'failed';
  orderStatus: 'confirmed' | 'in_production' | 'ready' | 'delivered';
  priorityLevel: 'low' | 'medium' | 'high';
  lastActivityDate: string;
  bakeryAssignment?: string;
  deliveryInstructions?: string;
  customerSatisfactionRating?: number;
  communicationHistory: Array<{
    date: string;
    method: string;
    notes: string;
    user: string;
  }>;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submissions, setSubmissions] = useState<CompanySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  // const [selectedSubmission, setSelectedSubmission] = useState<CompanySubmission | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSubscriptionStatus, setFilterSubscriptionStatus] = useState('');
  // const [filterDeliveryStatus, setFilterDeliveryStatus] = useState('');
  // const [filterPriority, setFilterPriority] = useState('');
  // const [showOnlyActiveEmployees, setShowOnlyActiveEmployees] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Check if already authenticated
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('straxkaka_admin_auth');
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const loadSubmissions = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const storedSubmissions = localStorage.getItem('straxkaka_submissions');
      const storedSubscriptions = localStorage.getItem('straxkaka_subscriptions');
      
      if (storedSubscriptions) {
        setSubmissions(JSON.parse(storedSubscriptions));
      } else if (storedSubmissions) {
        setSubmissions(JSON.parse(storedSubmissions));
      }
    } catch (error) {
      console.error('Error loading submissions:', error);
      setSubmissions([]);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    loadSubmissions();
  }, [isAuthenticated, loadSubmissions]);

  const refreshData = () => {
    setIsRefreshing(true);
    loadSubmissions();
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'straxkaka2025') {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('straxkaka_admin_auth', 'true');
      }
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const removeCompany = (companyId: string) => {
    if (confirm('Are you sure you want to remove this company? This action cannot be undone.')) {
      const updatedSubmissions = submissions.filter(sub => sub.id !== companyId);
      setSubmissions(updatedSubmissions);
      if (typeof window !== 'undefined') {
        localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
      }
    }
  };

  // Filter submissions based on search and filters
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.contactPersonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.contactEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCompany = !filterCompany || submission.companyName === filterCompany;
    const matchesStatus = !filterStatus || submission.status === filterStatus;
    const matchesSubscriptionStatus = !filterSubscriptionStatus || submission.subscriptionStatus === filterSubscriptionStatus;
    const matchesDeliveryStatus = !filterDeliveryStatus || submission.deliveryStatus === filterDeliveryStatus;
    const matchesPriority = !filterPriority || submission.priorityLevel === filterPriority;
    
    return matchesSearch && matchesCompany && matchesStatus && matchesSubscriptionStatus && matchesDeliveryStatus && matchesPriority;
  });

  // Calculate stats
  const activeCompanies = submissions.filter(sub => sub.subscriptionStatus === 'active').length;
  const activeEmployees = submissions.reduce((total, sub) => {
    return total + sub.employees.filter(emp => emp.employmentStatus === 'active').length;
  }, 0);
  
  const upcomingBirthdays = submissions.reduce((total, sub) => {
    const today = new Date();
    const next7Days = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return total + sub.employees.filter(emp => {
      if (emp.employmentStatus !== 'active') return false;
      const birthday = new Date(emp.birthday);
      birthday.setFullYear(today.getFullYear());
      return birthday >= today && birthday <= next7Days;
    }).length;
  }, 0);

  const todayDeliveries = submissions.filter(sub => sub.deliveryStatus === 'delivered').length;
  const monthlyRevenue = submissions.reduce((total, sub) => total + (sub.monthlyCost || 0), 0);

  if (!isAuthenticated) {
    return (
      <AdminErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <AdminNavigation currentPage="admin" />
          
          <div className="max-w-md mx-auto px-4 py-20">
            <div className="bg-white rounded-lg shadow-lg p-8">
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
        </div>
      </AdminErrorBoundary>
    );
  }

  if (loading) {
    return (
      <AdminErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <AdminNavigation currentPage="admin" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading data...</p>
            </div>
          </div>
        </div>
      </AdminErrorBoundary>
    );
  }

  return (
    <AdminErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <AdminNavigation currentPage="admin" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img 
                src="/logo.svg" 
                alt="Strax Logo" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
                <p className="text-gray-600">Manage company subscriptions and employees</p>
              </div>
            </div>
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="flex items-center px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isRefreshing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                  Refreshing...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </>
              )}
            </button>
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
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{upcomingBirthdays}</p>
                  <p className="text-sm font-medium text-gray-600">Birthdays Next 7 Days</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{todayDeliveries}</p>
                  <p className="text-sm font-medium text-gray-600">Deliveries Today</p>
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
                  <p className="text-2xl font-bold text-gray-900">{monthlyRevenue.toLocaleString()} ISK</p>
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Search companies..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <select
                  value={filterCompany}
                  onChange={(e) => setFilterCompany(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">All Companies</option>
                  {Array.from(new Set(submissions.map(sub => sub.companyName))).map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">All Statuses</option>
                  <option value="pending_payment">Pending Payment</option>
                  <option value="paid">Paid</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subscription</label>
                <select
                  value={filterSubscriptionStatus}
                  onChange={(e) => setFilterSubscriptionStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">All Subscriptions</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="suspended">Suspended</option>
                </select>
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
                <p className="text-gray-500">No submissions found</p>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSubmissions.map((submission) => (
                      <tr key={submission.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{submission.companyName}</div>
                          <div className="text-sm text-gray-500">{submission.subscriptionTier}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{submission.contactPersonName}</div>
                          <div className="text-sm text-gray-500">{submission.contactEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {submission.employees.filter(emp => emp.employmentStatus === 'active').length} / {submission.employees.length}
                          </div>
                          <div className="text-sm text-gray-500">active / total</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            submission.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' :
                            submission.subscriptionStatus === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {submission.subscriptionStatus.charAt(0).toUpperCase() + submission.subscriptionStatus.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            submission.status === 'paid' ? 'bg-green-100 text-green-800' :
                            submission.status === 'pending_payment' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {submission.status.replace('_', ' ').charAt(0).toUpperCase() + submission.status.replace('_', ' ').slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedSubmission(submission)}
                              className="text-yellow-600 hover:text-yellow-900 bg-yellow-100 px-3 py-1 rounded-full text-xs font-medium hover:bg-yellow-200 transition-colors"
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
        </div>
      </div>
    </AdminErrorBoundary>
  );
}
