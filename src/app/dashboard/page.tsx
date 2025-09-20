'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import LanguageContent from '@/components/LanguageContent';
import AdminNavigation from '@/components/AdminNavigation';

interface UpcomingBirthday {
  id: string;
  employeeName: string;
  companyName: string;
  birthday: string;
  daysUntil: number;
  cakeType: string;
  dietaryRestrictions: string;
  deliveryAddress: string;
  celebrationStyle: string;
}

interface TodayDelivery {
  id: string;
  employeeName: string;
  companyName: string;
  cakeType: string;
  deliveryTime: string;
  deliveryAddress: string;
  status: 'scheduled' | 'in_transit' | 'delivered' | 'failed';
  bakery: string;
}

interface RecentOrder {
  id: string;
  companyName: string;
  employeeName: string;
  cakeType: string;
  orderDate: string;
  deliveryDate: string;
  status: 'confirmed' | 'in_production' | 'ready' | 'delivered';
  amount: number;
}

export default function Dashboard() {
  const { t } = useLanguage();
  const [upcomingBirthdays, setUpcomingBirthdays] = useState<UpcomingBirthday[]>([]);
  const [todayDeliveries, setTodayDeliveries] = useState<TodayDelivery[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Mock data for cake delivery service dashboard
      const mockData = {
        upcomingBirthdays: [
          {
            id: '1',
            employeeName: 'Anna Jónsdóttir',
            companyName: 'TechCorp Iceland',
            birthday: '2024-01-20',
            daysUntil: 2,
            cakeType: 'Chocolate Cake',
            dietaryRestrictions: 'Gluten-free',
            deliveryAddress: 'Reykjavík, Iceland',
            celebrationStyle: 'Team celebration'
          },
          {
            id: '2',
            employeeName: 'Bjarni Sigurðsson',
            companyName: 'Finance Solutions',
            birthday: '2024-01-22',
            daysUntil: 4,
            cakeType: 'Vanilla Cake',
            dietaryRestrictions: 'None',
            deliveryAddress: 'Kópavogur, Iceland',
            celebrationStyle: 'Private celebration'
          },
          {
            id: '3',
            employeeName: 'Guðrún Einarsdóttir',
            companyName: 'Marketing Pro',
            birthday: '2024-01-25',
            daysUntil: 7,
            cakeType: 'Red Velvet Cake',
            dietaryRestrictions: 'Dairy-free',
            deliveryAddress: 'Hafnarfjörður, Iceland',
            celebrationStyle: 'Company-wide celebration'
          }
        ],
        todayDeliveries: [
          {
            id: '1',
            employeeName: 'Eiríkur Magnússon',
            companyName: 'Design Studio',
            cakeType: 'Birthday Cake',
            deliveryTime: '10:00 AM',
            deliveryAddress: 'Reykjavík, Iceland',
            status: 'in_transit' as const,
            bakery: 'Sweet Dreams Bakery'
          },
          {
            id: '2',
            employeeName: 'Helga Pétursdóttir',
            companyName: 'Consulting Group',
            cakeType: 'Chocolate Cake',
            deliveryTime: '2:00 PM',
            deliveryAddress: 'Garðabær, Iceland',
            status: 'scheduled' as const,
            bakery: 'Cake Masters'
          }
        ],
        recentOrders: [
          {
            id: '1',
            companyName: 'TechCorp Iceland',
            employeeName: 'Anna Jónsdóttir',
            cakeType: 'Chocolate Cake',
            orderDate: '2024-01-18',
            deliveryDate: '2024-01-20',
            status: 'confirmed' as const,
            amount: 12500
          },
          {
            id: '2',
            companyName: 'Finance Solutions',
            employeeName: 'Bjarni Sigurðsson',
            cakeType: 'Vanilla Cake',
            orderDate: '2024-01-19',
            deliveryDate: '2024-01-22',
            status: 'in_production' as const,
            amount: 12000
          }
        ]
      };

      setUpcomingBirthdays(mockData.upcomingBirthdays);
      setTodayDeliveries(mockData.todayDeliveries);
      setRecentOrders(mockData.recentOrders);
      
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDeliveryStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'in_transit': return 'text-blue-600 bg-blue-100';
      case 'scheduled': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'ready': return 'text-blue-600 bg-blue-100';
      case 'in_production': return 'text-yellow-600 bg-yellow-100';
      case 'confirmed': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDaysUntilColor = (days: number) => {
    if (days === 0) return 'text-red-600 bg-red-100';
    if (days <= 2) return 'text-orange-600 bg-orange-100';
    if (days <= 7) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
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
      <AdminNavigation currentPage="dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <LanguageContent fallback={
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Kökudreifingar Dashboard</h1>
              <p className="text-gray-600">Stjórna afmæliskökum og afhendingum</p>
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
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  <LanguageContent fallback="Kemur afmæli næstu 7 daga">
                    {(t) => t('dashboard.stats.upcoming')}
                  </LanguageContent>
                </p>
                <p className="text-2xl font-bold text-gray-900">{upcomingBirthdays.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  <LanguageContent fallback="Afhendingar í dag">
                    {(t) => t('dashboard.stats.deliveries_today')}
                  </LanguageContent>
                </p>
                <p className="text-2xl font-bold text-gray-900">{todayDeliveries.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  <LanguageContent fallback="Afhentar í dag">
                    {(t) => t('dashboard.stats.delivered_today')}
                  </LanguageContent>
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {todayDeliveries.filter(d => d.status === 'delivered').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  <LanguageContent fallback="Tekjur í dag">
                    {(t) => t('dashboard.stats.revenue_today')}
                  </LanguageContent>
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {recentOrders
                    .filter(o => o.status === 'delivered')
                    .reduce((sum, o) => sum + o.amount, 0)
                    .toLocaleString('is-IS')} ISK
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Birthdays */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <LanguageContent fallback={
              <h2 className="text-lg font-semibold text-gray-900">Kemur afmæli næstu 7 daga</h2>
            }>
              {(t) => <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.upcoming.title')}</h2>}
            </LanguageContent>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <LanguageContent fallback="Starfsmaður">
                      {(t) => t('dashboard.upcoming.employee')}
                    </LanguageContent>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <LanguageContent fallback="Fyrirtæki">
                      {(t) => t('dashboard.upcoming.company')}
                    </LanguageContent>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <LanguageContent fallback="Dagar">
                      {(t) => t('dashboard.upcoming.days')}
                    </LanguageContent>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <LanguageContent fallback="Kökutegund">
                      {(t) => t('dashboard.upcoming.cake_type')}
                    </LanguageContent>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <LanguageContent fallback="Matarheftir">
                      {(t) => t('dashboard.upcoming.dietary')}
                    </LanguageContent>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <LanguageContent fallback="Fagnaðarstíll">
                      {(t) => t('dashboard.upcoming.celebration')}
                    </LanguageContent>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingBirthdays.map((birthday) => (
                  <tr key={birthday.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{birthday.employeeName}</div>
                      <div className="text-sm text-gray-500">{birthday.deliveryAddress}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{birthday.companyName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDaysUntilColor(birthday.daysUntil)}`}>
                        {birthday.daysUntil === 0 ? 'Í dag!' : `${birthday.daysUntil} daga`}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {birthday.cakeType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {birthday.dietaryRestrictions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {birthday.celebrationStyle}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Today's Deliveries and Recent Orders */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Today's Deliveries */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <LanguageContent fallback={
                <h2 className="text-lg font-semibold text-gray-900">Afhendingar í dag</h2>
              }>
                {(t) => <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.deliveries.title')}</h2>}
              </LanguageContent>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <LanguageContent fallback="Starfsmaður">
                        {(t) => t('dashboard.deliveries.employee')}
                      </LanguageContent>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <LanguageContent fallback="Tími">
                        {(t) => t('dashboard.deliveries.time')}
                      </LanguageContent>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <LanguageContent fallback="Staða">
                        {(t) => t('dashboard.deliveries.status')}
                      </LanguageContent>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <LanguageContent fallback="Bakarí">
                        {(t) => t('dashboard.deliveries.bakery')}
                      </LanguageContent>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {todayDeliveries.map((delivery) => (
                    <tr key={delivery.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{delivery.employeeName}</div>
                        <div className="text-sm text-gray-500">{delivery.companyName}</div>
                        <div className="text-xs text-gray-400">{delivery.deliveryAddress}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {delivery.deliveryTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDeliveryStatusColor(delivery.status)}`}>
                          {delivery.status.charAt(0).toUpperCase() + delivery.status.slice(1).replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {delivery.bakery}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <LanguageContent fallback={
                <h2 className="text-lg font-semibold text-gray-900">Nýlegar pantanir</h2>
              }>
                {(t) => <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.orders.title')}</h2>}
              </LanguageContent>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <LanguageContent fallback="Pöntun">
                        {(t) => t('dashboard.orders.order')}
                      </LanguageContent>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <LanguageContent fallback="Staða">
                        {(t) => t('dashboard.orders.status')}
                      </LanguageContent>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <LanguageContent fallback="Upphæð">
                        {(t) => t('dashboard.orders.amount')}
                      </LanguageContent>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <LanguageContent fallback="Afhending">
                        {(t) => t('dashboard.orders.delivery')}
                      </LanguageContent>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.employeeName}</div>
                        <div className="text-sm text-gray-500">{order.companyName}</div>
                        <div className="text-xs text-gray-400">{order.cakeType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getOrderStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.amount.toLocaleString('is-IS')} ISK
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.deliveryDate).toLocaleDateString('is-IS')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

