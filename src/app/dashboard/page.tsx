'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import LanguageContent from '@/components/LanguageContent';

export default function Dashboard() {
  const { t } = useLanguage();
  const [companies, setCompanies] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // In a real app, you'd fetch from your API
      // For now, we'll show a placeholder
      const mockData = {
        companies: [
          {
            id: '1',
            name: 'StraxKaka ehf.',
            email: 'orders@straxkaka.is',
            phone: '1234567',
            subscriptionStatus: 'active',
            monthlyCost: 3000,
            employeeCount: 3,
            nextBillingDate: '2024-02-15',
            lastPaymentDate: '2024-01-15'
          }
        ],
        payments: [
          {
            id: '1',
            orderId: 'STRAX_1234567890_ABC123',
            amount: 3000,
            status: 'completed',
            aurStatus: 'FINISHED',
            createdAt: '2024-01-15T10:00:00Z',
            completedAt: '2024-01-15T10:05:00Z'
          }
        ]
      };

      setCompanies(mockData.companies);
      setPayments(mockData.payments);
      
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending_payment': return 'text-yellow-600 bg-yellow-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      case 'cancelled': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <LanguageContent fallback="Hleð gögnum...">
            {(t) => <p className="text-gray-600">{t('dashboard.loading')}</p>}
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
              <LanguageContent fallback={<Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">Um okkur</Link>}>
                {(t) => <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.about')}</Link>}
              </LanguageContent>
              <LanguageContent fallback={<Link href="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">Þjónusta</Link>}>
                {(t) => <Link href="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.services')}</Link>}
              </LanguageContent>
              <LanguageContent fallback={<Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">Hafa samband</Link>}>
                {(t) => <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.contact')}</Link>}
              </LanguageContent>
              <LanguageContent fallback={<Link href="/subscription" className="text-gray-300 hover:text-yellow-400 transition-colors">Áskrift</Link>}>
                {(t) => <Link href="/subscription" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.subscription')}</Link>}
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
              <p className="text-gray-600">Skoða og stjórna áskriftum og greiðslum</p>
            </>
          }>
            {(t) => (
              <>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('dashboard.title')}</h1>
                <p className="text-gray-600">{t('dashboard.subtitle')}</p>
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
                    {(t) => t('dashboard.stats.companies')}
                  </LanguageContent>
                </p>
                <p className="text-2xl font-bold text-gray-900">{companies.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  <LanguageContent fallback="Aktívar áskriftir">
                    {(t) => t('dashboard.stats.active')}
                  </LanguageContent>
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {companies.filter(c => c.subscriptionStatus === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-2xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  <LanguageContent fallback="Bíður greiðslu">
                    {(t) => t('dashboard.stats.pending')}
                  </LanguageContent>
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {companies.filter(c => c.subscriptionStatus === 'pending_payment').length}
                </p>
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
                  <LanguageContent fallback="Mánaðartekjur">
                    {(t) => t('dashboard.stats.revenue')}
                  </LanguageContent>
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {companies
                    .filter(c => c.subscriptionStatus === 'active')
                    .reduce((sum, c) => sum + c.monthlyCost, 0)
                    .toLocaleString('is-IS')} ISK
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Companies Table */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <LanguageContent fallback={
              <h2 className="text-lg font-semibold text-gray-900">Fyrirtæki</h2>
            }>
              {(t) => <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.companies.title')}</h2>}
            </LanguageContent>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <LanguageContent fallback="Fyrirtæki">
                      {(t) => t('dashboard.companies.company')}
                    </LanguageContent>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <LanguageContent fallback="Staða">
                      {(t) => t('dashboard.companies.status')}
                    </LanguageContent>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <LanguageContent fallback="Mánaðargjald">
                      {(t) => t('dashboard.companies.monthly_cost')}
                    </LanguageContent>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <LanguageContent fallback="Starfsmenn">
                      {(t) => t('dashboard.companies.employees')}
                    </LanguageContent>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <LanguageContent fallback="Næsta greiðsla">
                      {(t) => t('dashboard.companies.next_payment')}
                    </LanguageContent>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {companies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{company.name}</div>
                      <div className="text-sm text-gray-500">{company.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(company.subscriptionStatus)}`}>
                        <LanguageContent fallback={company.subscriptionStatus}>
                          {(t) => t(`dashboard.status.${company.subscriptionStatus}`)}
                        </LanguageContent>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {company.monthlyCost.toLocaleString('is-IS')} ISK
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {company.employeeCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(company.nextBillingDate).toLocaleDateString('is-IS')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <LanguageContent fallback={
              <h2 className="text-lg font-semibold text-gray-900">Nýlegar greiðslur</h2>
            }>
              {(t) => <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.payments.title')}</h2>}
            </LanguageContent>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <LanguageContent fallback="Pöntun">
                      {(t) => t('dashboard.payments.order')}
                    </LanguageContent>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <LanguageContent fallback="Upphæð">
                      {(t) => t('dashboard.payments.amount')}
                    </LanguageContent>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <LanguageContent fallback="Staða">
                      {(t) => t('dashboard.payments.status')}
                    </LanguageContent>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <LanguageContent fallback="Dagsetning">
                      {(t) => t('dashboard.payments.date')}
                    </LanguageContent>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.orderId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.amount.toLocaleString('is-IS')} ISK
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(payment.status)}`}>
                        <LanguageContent fallback={payment.status}>
                          {(t) => t(`dashboard.payment_status.${payment.status}`)}
                        </LanguageContent>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(payment.createdAt).toLocaleDateString('is-IS')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

