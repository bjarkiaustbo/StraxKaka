'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import LanguageContent from '@/components/LanguageContent';
import AdminNavigation from '@/components/AdminNavigation';
import AdminErrorBoundary from '@/components/AdminErrorBoundary';

interface Employee {
  name: string;
  birthday: string;
  cakeType: string;
  cakeSize: string;
  dietaryRestrictions: string;
  specialNotes: string;
  // New essential fields
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
  // New essential fields
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
  const [selectedSubmission, setSelectedSubmission] = useState<CompanySubmission | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSubscriptionStatus, setFilterSubscriptionStatus] = useState('');
  const [filterDeliveryStatus, setFilterDeliveryStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [showOnlyActiveEmployees, setShowOnlyActiveEmployees] = useState(false);
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
      // Load submissions from localStorage
      const storedSubmissions = localStorage.getItem('straxkaka_submissions');
      const storedSubscriptions = localStorage.getItem('straxkaka_subscriptions');
      
      if (storedSubscriptions) {
        // Load from new subscription data
        setSubmissions(JSON.parse(storedSubscriptions));
      } else if (storedSubmissions) {
        // Fallback to old data format
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
    // Simple password check - you can change this password
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

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = searchTerm === '' || 
      submission.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.contactPersonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.accountManager?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCompany = filterCompany === '' || submission.companyName === filterCompany;
    const matchesStatus = filterStatus === '' || submission.status === filterStatus;
    const matchesSubscriptionStatus = filterSubscriptionStatus === '' || submission.subscriptionStatus === filterSubscriptionStatus;
    const matchesDeliveryStatus = filterDeliveryStatus === '' || submission.deliveryStatus === filterDeliveryStatus;
    const matchesPriority = filterPriority === '' || submission.priorityLevel === filterPriority;
    
    // Filter employees if showOnlyActiveEmployees is true
    const filteredEmployees = showOnlyActiveEmployees 
      ? submission.employees.filter(emp => emp.employmentStatus === 'active')
      : submission.employees;
    
    const hasActiveEmployees = showOnlyActiveEmployees ? filteredEmployees.length > 0 : true;
    
    return matchesSearch && matchesCompany && matchesStatus && 
           matchesSubscriptionStatus && matchesDeliveryStatus && matchesPriority && hasActiveEmployees;
  });

  const removeCompany = (companyId: string) => {
    if (confirm('Are you sure you want to remove this company? This action cannot be undone.')) {
      const updatedSubmissions = submissions.filter(sub => sub.id !== companyId);
      setSubmissions(updatedSubmissions);
      if (typeof window !== 'undefined') {
        if (typeof window !== 'undefined') {
      localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
    }
      }
    }
  };

  // const updatePaymentStatus = (companyId: string, newStatus: 'pending_payment' | 'paid' | 'cancelled') => {
  //   const updatedSubmissions = submissions.map(sub => 
  //     sub.id === companyId ? { ...sub, status: newStatus } : sub
  //   );
  //   setSubmissions(updatedSubmissions);
  //   if (typeof window !== 'undefined') {
  //     if (typeof window !== 'undefined') {
  //     localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
  //   }
  //   }
  // };

  // const toggleDeliveredStatus = (companyId: string) => {
  //   const updatedSubmissions = submissions.map(sub => 
  //     sub.id === companyId ? { ...sub, delivered: !sub.delivered } : sub
  //   );
  //   setSubmissions(updatedSubmissions);
  //   if (typeof window !== 'undefined') {
  //     localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
  //   }
  // };

  const updateDeliveryStatus = (companyId: string, newStatus: 'scheduled' | 'in_transit' | 'delivered' | 'failed') => {
    const updatedSubmissions = submissions.map(sub => 
      sub.id === companyId ? { ...sub, deliveryStatus: newStatus } : sub
    );
    setSubmissions(updatedSubmissions);
    if (typeof window !== 'undefined') {
      localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
    }
  };

  const updateSubscriptionStatus = (companyId: string, newStatus: 'active' | 'paused' | 'cancelled' | 'suspended') => {
    const updatedSubmissions = submissions.map(sub => 
      sub.id === companyId ? { ...sub, subscriptionStatus: newStatus } : sub
    );
    setSubmissions(updatedSubmissions);
    if (typeof window !== 'undefined') {
      localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
    }
  };

  const updatePriorityLevel = (companyId: string, newPriority: 'low' | 'medium' | 'high') => {
    const updatedSubmissions = submissions.map(sub => 
      sub.id === companyId ? { ...sub, priorityLevel: newPriority } : sub
    );
    setSubmissions(updatedSubmissions);
    if (typeof window !== 'undefined') {
      localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
    }
  };

  // const addCommunicationNote = (companyId: string, method: string, notes: string) => {
  //   const newNote = {
  //     date: new Date().toISOString(),
  //     method,
  //     notes,
  //     user: 'Admin'
  //   };
  //   
  //   const updatedSubmissions = submissions.map(sub => 
  //     sub.id === companyId ? { 
  //       ...sub, 
  //       communicationHistory: [...sub.communicationHistory, newNote],
  //       lastContactDate: new Date().toISOString(),
  //       lastContactMethod: method as 'email' | 'phone' | 'in_person'
  //     } : sub
  //   );
  //   setSubmissions(updatedSubmissions);
  //   if (typeof window !== 'undefined') {
  //     localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
  //   }
  // };

  const getUpcomingBirthdays = () => {
    const today = new Date();
    // const next30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    const upcomingBirthdays: Array<{
      employee: Employee;
      company: string;
      daysUntil: number;
    }> = [];

    submissions.forEach(submission => {
      submission.employees
        .filter(employee => employee.employmentStatus === 'active') // Only active employees
        .forEach(employee => {
          const birthday = new Date(employee.birthday);
          const thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
          
          // If birthday already passed this year, check next year
          if (thisYearBirthday < today) {
            thisYearBirthday.setFullYear(today.getFullYear() + 1);
          }
          
          const daysUntil = Math.ceil((thisYearBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          
          if (daysUntil <= 30) {
            upcomingBirthdays.push({
              employee,
              company: submission.companyName,
              daysUntil
            });
          }
        });
    });

    return upcomingBirthdays.sort((a, b) => a.daysUntil - b.daysUntil);
  };

  const exportToCSV = () => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const csvContent = [
      ['Company Name', 'Contact Person', 'Email', 'Phone', 'Address', 'Employee Name', 'Birthday', 'Cake Type', 'Cake Size', 'Dietary Restrictions', 'Special Notes', 'Date Created'],
      ...submissions.flatMap(submission => 
        submission.employees.map(employee => [
          submission.companyName,
          submission.contactPersonName,
          submission.contactEmail,
          submission.contactPhone,
          submission.deliveryAddress,
          employee.name,
          employee.birthday,
          employee.cakeType,
          employee.cakeSize || '',
          employee.dietaryRestrictions,
          employee.specialNotes,
          new Date(submission.dateCreated).toLocaleDateString()
        ])
      )
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `straxkaka_submissions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Password form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter password to access admin panel</p>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Access Admin Panel
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
          <LanguageContent fallback="Hleð gögnum...">
            {(t) => <p className="text-gray-600">{t('admin.loading')}</p>}
          </LanguageContent>
        </div>
      </div>
    );
  }

  return (
    <AdminErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Navigation */}
        <AdminNavigation currentPage="admin" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image 
              src="/logo.svg" 
              alt="Strax Logo" 
              width={48}
              height={48}
              className="h-12 w-auto"
            />
            <div>
              <LanguageContent fallback={
                <>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">Stjórnendadashboard</h1>
                  <p className="text-gray-600">Skoða og stjórna skráningum fyrirtækja og starfsmanna</p>
                </>
              }>
                {(t) => (
                  <>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('admin.title')}</h1>
                    <p className="text-gray-600">{t('admin.subtitle')}</p>
                  </>
                )}
              </LanguageContent>
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
                Uppfæri...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Uppfæra
              </>
            )}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  <LanguageContent fallback="Aktív fyrirtæki">
                    {(t) => t('admin.stats.active_companies')}
                  </LanguageContent>
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {submissions.filter(sub => sub.subscriptionStatus === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  <LanguageContent fallback="Aktívir starfsmenn">
                    {(t) => t('admin.stats.active_employees')}
                  </LanguageContent>
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {submissions.reduce((total, sub) => 
                    total + sub.employees.filter(emp => emp.employmentStatus === 'active').length, 0
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  <LanguageContent fallback="Kemur afmæli næstu 7 daga">
                    {(t) => t('admin.stats.upcoming_week')}
                  </LanguageContent>
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {getUpcomingBirthdays().filter(b => b.daysUntil <= 7).length}
                </p>
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
                <p className="text-sm font-medium text-gray-600">
                  <LanguageContent fallback="Afhendingar í dag">
                    {(t) => t('admin.stats.deliveries_today')}
                  </LanguageContent>
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {submissions.filter(sub => sub.deliveryStatus === 'in_transit').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  <LanguageContent fallback="Mánaðarleg tekjur">
                    {(t) => t('admin.stats.mrr')}
                  </LanguageContent>
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {submissions
                    .filter(sub => sub.subscriptionStatus === 'active')
                    .reduce((total, sub) => total + (sub.monthlyCost || 0), 0)
                    .toLocaleString('is-IS')} ISK
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Birthdays */}
        {getUpcomingBirthdays().length > 0 && (
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6">
              <LanguageContent fallback={
                <h2 className="text-xl font-bold text-gray-900 mb-4">Kemur afmæli næstu 30 daga</h2>
              }>
                {(t) => <h2 className="text-xl font-bold text-gray-900 mb-4">{t('admin.upcoming.title')}</h2>}
              </LanguageContent>
              <div className="space-y-3">
                {getUpcomingBirthdays().slice(0, 5).map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.employee.name}</p>
                      <p className="text-sm text-gray-600">{item.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        <LanguageContent fallback="Kökutegund">
                          {(t) => t('admin.upcoming.cake_type')}
                        </LanguageContent>: {item.employee.cakeType}
                      </p>
                      <p className="text-sm font-medium text-yellow-600">
                        {item.daysUntil === 0 ? (
                          <LanguageContent fallback="Í dag!">
                            {(t) => t('admin.upcoming.today')}
                          </LanguageContent>
                        ) : (
                          <LanguageContent fallback={`${item.daysUntil} daga`}>
                            {(t) => `${item.daysUntil} ${t('admin.upcoming.days')}`}
                          </LanguageContent>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Customer Satisfaction Dashboard */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                <LanguageContent fallback="Viðskiptavinastuðningur">
                  {(t) => t('admin.satisfaction.title')}
                </LanguageContent>
              </h3>
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div className="space-y-3">
              {submissions
                .filter(sub => sub.customerSatisfactionRating)
                .map(submission => (
                  <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{submission.companyName}</p>
                      <p className="text-sm text-gray-500">
                        {submission.lastContactDate && new Date(submission.lastContactDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < (submission.customerSatisfactionRating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {submission.customerSatisfactionRating}/5
                      </span>
                    </div>
                  </div>
                ))}
              {submissions.filter(sub => sub.customerSatisfactionRating).length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  <LanguageContent fallback="Engin viðskiptavinastuðningur skráður enn">
                    {(t) => t('admin.satisfaction.no_ratings')}
                  </LanguageContent>
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                <LanguageContent fallback="Nýleg samskipti">
                  {(t) => t('admin.communication.title')}
                </LanguageContent>
              </h3>
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="space-y-3">
              {submissions
                .filter(sub => sub.communicationHistory && sub.communicationHistory.length > 0)
                .sort((a, b) => new Date(b.lastActivityDate || 0).getTime() - new Date(a.lastActivityDate || 0).getTime())
                .slice(0, 5)
                .map(submission => (
                  <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{submission.companyName}</p>
                      <p className="text-sm text-gray-500">
                        {submission.lastContactMethod && (
                          <span className="capitalize">{submission.lastContactMethod}</span>
                        )}
                        {submission.lastContactDate && (
                          <span className="ml-2">
                            {new Date(submission.lastContactDate).toLocaleDateString()}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        submission.priorityLevel === 'high' ? 'bg-red-100 text-red-800' :
                        submission.priorityLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {submission.priorityLevel}
                      </span>
                    </div>
                  </div>
                ))}
              {submissions.filter(sub => sub.communicationHistory && sub.communicationHistory.length > 0).length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  <LanguageContent fallback="Engin samskipti skráð enn">
                    {(t) => t('admin.communication.no_activity')}
                  </LanguageContent>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
            <div>
              <LanguageContent fallback={
                <label className="block text-sm font-medium text-gray-700 mb-2">Leita</label>
              }>
                {(t) => <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.search.title')}</label>}
              </LanguageContent>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Fyrirtæki, tengiliður, netfang..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <div>
              <LanguageContent fallback={
                <label className="block text-sm font-medium text-gray-700 mb-2">Fyrirtæki</label>
              }>
                {(t) => <label className="block text-sm font-medium text-gray-700 mb-2">{t('admin.search.company')}</label>}
              </LanguageContent>
              <select
                value={filterCompany}
                onChange={(e) => setFilterCompany(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">
                  <LanguageContent fallback="Allir">
                    {(t) => t('admin.search.all')}
                  </LanguageContent>
                </option>
                {submissions.map(submission => (
                  <option key={submission.id} value={submission.companyName}>
                    {submission.companyName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">All Subscriptions</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="cancelled">Cancelled</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Status</label>
              <select
                value={filterDeliveryStatus}
                onChange={(e) => setFilterDeliveryStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">All Deliveries</option>
                <option value="scheduled">Scheduled</option>
                <option value="in_transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="activeEmployees"
                checked={showOnlyActiveEmployees}
                onChange={(e) => setShowOnlyActiveEmployees(e.target.checked)}
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
              />
              <label htmlFor="activeEmployees" className="ml-2 block text-sm text-gray-700">
                Show only active employees
              </label>
            </div>
            
            <button
              onClick={exportToCSV}
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
            >
              <LanguageContent fallback="Flytja út CSV">
                {(t) => t('admin.export')}
              </LanguageContent>
            </button>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden hidden md:block">
          <div className="px-6 py-4 border-b border-gray-200">
            <LanguageContent fallback={
              <h2 className="text-lg font-semibold text-gray-900">Skráningar</h2>
            }>
              {(t) => <h2 className="text-lg font-semibold text-gray-900">{t('admin.submissions.title')}</h2>}
            </LanguageContent>
          </div>
          
          {filteredSubmissions.length === 0 ? (
            <div className="p-8 text-center">
              <LanguageContent fallback={
                <p className="text-gray-500">Engar skráningar fundust</p>
              }>
                {(t) => <p className="text-gray-500">{t('admin.submissions.empty')}</p>}
              </LanguageContent>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <LanguageContent fallback="Fyrirtæki">
                        {(t) => t('admin.table.company')}
                      </LanguageContent>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <LanguageContent fallback="Tengiliður">
                        {(t) => t('admin.table.contact')}
                      </LanguageContent>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <LanguageContent fallback="Starfsmenn">
                        {(t) => t('admin.table.employees')}
                      </LanguageContent>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <LanguageContent fallback="Áskrift">
                        {(t) => t('admin.table.subscription')}
                      </LanguageContent>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <LanguageContent fallback="Afhending">
                        {(t) => t('admin.table.delivery')}
                      </LanguageContent>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <LanguageContent fallback="Forgangur">
                        {(t) => t('admin.table.priority')}
                      </LanguageContent>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <LanguageContent fallback="Aðgerðir">
                        {(t) => t('admin.table.actions')}
                      </LanguageContent>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubmissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{submission.companyName}</div>
                        <div className="text-sm text-gray-500">{submission.contactEmail}</div>
                        {submission.accountManager && (
                          <div className="text-xs text-blue-600">Manager: {submission.accountManager}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{submission.contactPersonName}</div>
                        <div className="text-sm text-gray-500">{submission.contactPhone}</div>
                        {submission.lastContactDate && (
                          <div className="text-xs text-gray-400">
                            Last: {new Date(submission.lastContactDate).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {submission.employees.filter(emp => emp.employmentStatus === 'active').length} / {submission.employees.length}
                        </div>
                        <div className="text-sm text-gray-500">
                          <LanguageContent fallback="aktívir / allir">
                            {(t) => t('admin.table.active_total')}
                          </LanguageContent>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          submission.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' :
                          submission.subscriptionStatus === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                          submission.subscriptionStatus === 'suspended' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {submission.subscriptionStatus.charAt(0).toUpperCase() + submission.subscriptionStatus.slice(1)}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {submission.monthlyCost?.toLocaleString('is-IS') || '0'} ISK
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          submission.deliveryStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                          submission.deliveryStatus === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                          submission.deliveryStatus === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {submission.deliveryStatus.charAt(0).toUpperCase() + submission.deliveryStatus.slice(1).replace('_', ' ')}
                        </span>
                        {submission.bakeryAssignment && (
                          <div className="text-xs text-gray-500 mt-1">
                            Bakery: {submission.bakeryAssignment}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          submission.priorityLevel === 'high' ? 'bg-red-100 text-red-800' :
                          submission.priorityLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {submission.priorityLevel.charAt(0).toUpperCase() + submission.priorityLevel.slice(1)}
                        </span>
                        {submission.customerSatisfactionRating && (
                          <div className="text-xs text-gray-500 mt-1">
                            Rating: {submission.customerSatisfactionRating}/5
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-wrap gap-1">
                          <button
                            onClick={() => setSelectedSubmission(submission)}
                            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                          >
                            <LanguageContent fallback="Skoða">
                              {(t) => t('admin.table.view')}
                            </LanguageContent>
                          </button>
                          <button
                            onClick={() => updateDeliveryStatus(submission.id, 'delivered')}
                            className="bg-green-100 hover:bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                          >
                            Delivered
                          </button>
                          <button
                            onClick={() => updateSubscriptionStatus(submission.id, 'active')}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                          >
                            Activate
                          </button>
                          <button
                            onClick={() => updatePriorityLevel(submission.id, 'high')}
                            className="bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                          >
                            High Priority
                          </button>
                          <button
                            onClick={() => removeCompany(submission.id)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
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

        {/* Mobile Card View */}
        <div className="block md:hidden">
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <div key={submission.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{submission.companyName}</h3>
                    <p className="text-sm text-gray-500">{submission.contactPersonName}</p>
                    {submission.accountManager && (
                      <p className="text-xs text-blue-600">Manager: {submission.accountManager}</p>
                    )}
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    submission.priorityLevel === 'high' ? 'bg-red-100 text-red-800' :
                    submission.priorityLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {submission.priorityLevel}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Employees</p>
                    <p className="text-sm font-medium">
                      {submission.employees.filter(emp => emp.employmentStatus === 'active').length} / {submission.employees.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Subscription</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      submission.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' :
                      submission.subscriptionStatus === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      submission.subscriptionStatus === 'suspended' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {submission.subscriptionStatus}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Delivery</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      submission.deliveryStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                      submission.deliveryStatus === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                      submission.deliveryStatus === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {submission.deliveryStatus}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="text-sm font-medium">
                      {(submission.monthlyCost || 0).toLocaleString('is-IS')} ISK
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSubmission(submission)}
                    className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200"
                  >
                    View
                  </button>
                  <button
                    onClick={() => updateDeliveryStatus(submission.id, 'delivered')}
                    className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200"
                  >
                    Delivered
                  </button>
                  <button
                    onClick={() => updateSubscriptionStatus(submission.id, 'active')}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200"
                  >
                    Activate
                  </button>
                  <button
                    onClick={() => removeCompany(submission.id)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for viewing submission details */}
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
                  <h4 className="font-medium text-gray-900">
                    <LanguageContent fallback="Fyrirtækisupplýsingar">
                      {(t) => t('admin.modal.company_info')}
                    </LanguageContent>
                  </h4>
                  <div className="mt-2 text-sm text-gray-600">
                    <p><strong>
                      <LanguageContent fallback="Tengiliður">
                        {(t) => t('admin.modal.contact')}
                      </LanguageContent>
                    </strong>: {selectedSubmission.contactPersonName}</p>
                    <p><strong>Email</strong>: {selectedSubmission.contactEmail}</p>
                    <p><strong>
                      <LanguageContent fallback="Sími">
                        {(t) => t('admin.modal.phone')}
                      </LanguageContent>
                    </strong>: {selectedSubmission.contactPhone}</p>
                    <p><strong>
                      <LanguageContent fallback="Heimilisfang">
                        {(t) => t('admin.modal.address')}
                      </LanguageContent>
                    </strong>: {selectedSubmission.deliveryAddress}</p>
                    <p><strong>Subscription Tier</strong>: {selectedSubmission.subscriptionTier}</p>
                    <p><strong>Monthly Cost</strong>: {selectedSubmission.monthlyCost?.toLocaleString('is-IS') || '0'} ISK</p>
                    <p><strong>Payment Method</strong>: {selectedSubmission.paymentMethod}</p>
                    <p><strong>Status</strong>: 
                      <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedSubmission.status === 'paid' ? 'bg-green-100 text-green-800' :
                        selectedSubmission.status === 'pending_payment' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedSubmission.status === 'paid' ? 'Paid' :
                         selectedSubmission.status === 'pending_payment' ? 'Pending Payment' : 'Cancelled'}
                      </span>
                    </p>
                    <p><strong>Order ID</strong>: {selectedSubmission.orderId}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">
                    <LanguageContent fallback="Starfsmenn">
                      {(t) => t('admin.modal.employees')}
                    </LanguageContent>
                  </h4>
                  <div className="mt-2 space-y-3">
                    {selectedSubmission.employees.map((employee, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-gray-900">{employee.name}</p>
                            {employee.position && (
                              <p className="text-sm text-gray-600">{employee.position}</p>
                            )}
                            {employee.department && (
                              <p className="text-sm text-gray-500">{employee.department}</p>
                            )}
                          </div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            employee.employmentStatus === 'active' ? 'bg-green-100 text-green-800' :
                            employee.employmentStatus === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {employee.employmentStatus.charAt(0).toUpperCase() + employee.employmentStatus.slice(1)}
                          </span>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">
                              <LanguageContent fallback="Afmælisdagur">
                                {(t) => t('admin.modal.birthday')}
                              </LanguageContent>: {new Date(employee.birthday).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600">
                              <LanguageContent fallback="Kökutegund">
                                {(t) => t('admin.modal.cake_type')}
                              </LanguageContent>: {employee.cakeType}
                            </p>
                            <p className="text-sm text-gray-600">
                              <LanguageContent fallback="Fagnaðarstíll">
                                {(t) => t('admin.modal.celebration_style')}
                              </LanguageContent>: {employee.celebrationPreferences}
                            </p>
                          </div>
                          <div>
                            {employee.dietaryRestrictions && (
                              <p className="text-sm text-gray-600">
                                <LanguageContent fallback="Matarheftir">
                                  {(t) => t('admin.modal.dietary')}
                                </LanguageContent>: {employee.dietaryRestrictions}
                              </p>
                            )}
                            {employee.allergies && (
                              <p className="text-sm text-red-600 font-medium">
                                <LanguageContent fallback="Ofnæmi">
                                  {(t) => t('admin.modal.allergies')}
                                </LanguageContent>: {employee.allergies}
                              </p>
                            )}
                            {employee.specialNotes && (
                              <p className="text-sm text-gray-600">
                                <LanguageContent fallback="Athugasemdir">
                                  {(t) => t('admin.modal.notes')}
                                </LanguageContent>: {employee.specialNotes}
                              </p>
                            )}
                            <p className="text-xs text-gray-400 mt-2">
                              <LanguageContent fallback="Síðast uppfært">
                                {(t) => t('admin.modal.last_updated')}
                              </LanguageContent>: {new Date(employee.lastUpdated).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </AdminErrorBoundary>
  );
}

