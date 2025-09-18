'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import LanguageContent from '@/components/LanguageContent';

interface Employee {
  name: string;
  birthday: string;
  cakeType: string;
  dietaryRestrictions: string;
  specialNotes: string;
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
}

export default function Admin() {
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submissions, setSubmissions] = useState<CompanySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<CompanySubmission | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Check if already authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem('straxkaka_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    
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
    setLoading(false);
  }, [isAuthenticated]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - you can change this password
    if (password === 'straxkaka2025') {
      setIsAuthenticated(true);
      localStorage.setItem('straxkaka_admin_auth', 'true');
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = searchTerm === '' || 
      submission.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.contactPersonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.contactEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCompany = filterCompany === '' || submission.companyName === filterCompany;
    const matchesStatus = filterStatus === '' || submission.status === filterStatus;
    
    return matchesSearch && matchesCompany && matchesStatus;
  });

  const removeCompany = (companyId: string) => {
    if (confirm('Are you sure you want to remove this company? This action cannot be undone.')) {
      const updatedSubmissions = submissions.filter(sub => sub.id !== companyId);
      setSubmissions(updatedSubmissions);
      localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
    }
  };

  const updatePaymentStatus = (companyId: string, newStatus: 'pending_payment' | 'paid' | 'cancelled') => {
    const updatedSubmissions = submissions.map(sub => 
      sub.id === companyId ? { ...sub, status: newStatus } : sub
    );
    setSubmissions(updatedSubmissions);
    localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
  };

  const getUpcomingBirthdays = () => {
    const today = new Date();
    const next30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    const upcomingBirthdays: Array<{
      employee: Employee;
      company: string;
      daysUntil: number;
    }> = [];

    submissions.forEach(submission => {
      submission.employees.forEach(employee => {
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
    const csvContent = [
      ['Company Name', 'Contact Person', 'Email', 'Phone', 'Address', 'Employee Name', 'Birthday', 'Cake Type', 'Dietary Restrictions', 'Special Notes', 'Date Created'],
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-black shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-yellow-500">StraxKaka</Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <LanguageContent fallback={<Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors">Heim</Link>}>
                {(t) => <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.home')}</Link>}
              </LanguageContent>
              <LanguageContent fallback={<Link href="/subscribe" className="text-gray-300 hover:text-yellow-400 transition-colors">Skrá fyrirtæki</Link>}>
                {(t) => <Link href="/subscribe" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.subscribe')}</Link>}
              </LanguageContent>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
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

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">🏢</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  <LanguageContent fallback="Fyrirtæki">
                    {(t) => t('admin.stats.companies')}
                  </LanguageContent>
                </p>
                <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  <LanguageContent fallback="Starfsmenn">
                    {(t) => t('admin.stats.employees')}
                  </LanguageContent>
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {submissions.reduce((total, sub) => total + sub.employees.length, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-2xl">🎂</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  <LanguageContent fallback="Kemur afmæli næstu 30 daga">
                    {(t) => t('admin.stats.upcoming')}
                  </LanguageContent>
                </p>
                <p className="text-2xl font-bold text-gray-900">{getUpcomingBirthdays().length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  <LanguageContent fallback="Meðaltal starfsmanna">
                    {(t) => t('admin.stats.average')}
                  </LanguageContent>
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {submissions.length > 0 ? Math.round(submissions.reduce((total, sub) => total + sub.employees.length, 0) / submissions.length) : 0}
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

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
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
            <div className="flex items-end">
              <button
                onClick={exportToCSV}
                className="w-full bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
              >
                <LanguageContent fallback="Flytja út CSV">
                  {(t) => t('admin.export')}
                </LanguageContent>
              </button>
            </div>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
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
                      <LanguageContent fallback="Staða">
                        {(t) => t('admin.table.status')}
                      </LanguageContent>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <LanguageContent fallback="Dagsetning">
                        {(t) => t('admin.table.date')}
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
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{submission.contactPersonName}</div>
                        <div className="text-sm text-gray-500">{submission.contactPhone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{submission.employees.length}</div>
                        <div className="text-sm text-gray-500">
                          <LanguageContent fallback="starfsmenn">
                            {(t) => t('admin.table.employees_count')}
                          </LanguageContent>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          submission.status === 'paid' ? 'bg-green-100 text-green-800' :
                          submission.status === 'pending_payment' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {submission.status === 'paid' ? 'Paid' :
                           submission.status === 'pending_payment' ? 'Pending' : 'Cancelled'}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {submission.monthlyCost?.toLocaleString('is-IS') || '0'} ISK
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(submission.dateCreated).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedSubmission(submission)}
                            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                          >
                            <LanguageContent fallback="Skoða">
                              {(t) => t('admin.table.view')}
                            </LanguageContent>
                          </button>
                          <button
                            onClick={() => updatePaymentStatus(submission.id, 'paid')}
                            className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                          >
                            Mark Paid
                          </button>
                          <button
                            onClick={() => removeCompany(submission.id)}
                            className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
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
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-gray-900">{employee.name}</p>
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
                          </div>
                          <div>
                            {employee.dietaryRestrictions && (
                              <p className="text-sm text-gray-600">
                                <LanguageContent fallback="Matarheftir">
                                  {(t) => t('admin.modal.dietary')}
                                </LanguageContent>: {employee.dietaryRestrictions}
                              </p>
                            )}
                            {employee.specialNotes && (
                              <p className="text-sm text-gray-600">
                                <LanguageContent fallback="Athugasemdir">
                                  {(t) => t('admin.modal.notes')}
                                </LanguageContent>: {employee.specialNotes}
                              </p>
                            )}
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
  );
}

