'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageContent from '@/components/LanguageContent';
import AdminNavigation from '@/components/AdminNavigation';

interface Birthday {
  id: string;
  employeeName: string;
  companyName: string;
  daysUntil: number;
  cakeType: string;
  dietaryRestrictions: string;
  celebrationStyle: string;
  deliveryAddress: string;
}

interface Delivery {
  id: string;
  employeeName: string;
  companyName: string;
  scheduledTime: string;
  status: 'pending' | 'confirmed' | 'out_for_delivery' | 'delivered' | 'failed';
  cakeType: string;
}

interface Order {
  id: string;
  companyName: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  date: string;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState<Birthday[]>([]);
  const [todayDeliveries, setTodayDeliveries] = useState<Delivery[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setUpcomingBirthdays([
        {
          id: '1',
          employeeName: 'Anna Jónsdóttir',
          companyName: 'TechCorp',
          daysUntil: 2,
          cakeType: 'Chocolate Cake',
          dietaryRestrictions: 'None',
          celebrationStyle: 'Office Party',
          deliveryAddress: 'Reykjavík'
        },
        {
          id: '2',
          employeeName: 'Bjarni Sigurðsson',
          companyName: 'DesignStudio',
          daysUntil: 5,
          cakeType: 'Vanilla Cake',
          dietaryRestrictions: 'Gluten-free',
          celebrationStyle: 'Small Gathering',
          deliveryAddress: 'Akureyri'
        }
      ]);

      setTodayDeliveries([
        {
          id: '1',
          employeeName: 'Anna Jónsdóttir',
          companyName: 'TechCorp',
          scheduledTime: '10:00',
          status: 'out_for_delivery',
          cakeType: 'Chocolate Cake'
        },
        {
          id: '2',
          employeeName: 'Bjarni Sigurðsson',
          companyName: 'DesignStudio',
          scheduledTime: '14:00',
          status: 'delivered',
          cakeType: 'Vanilla Cake'
        }
      ]);

      setRecentOrders([
        {
          id: '1',
          companyName: 'TechCorp',
          amount: 15000,
          status: 'delivered',
          date: '2025-01-23'
        },
        {
          id: '2',
          companyName: 'DesignStudio',
          amount: 12000,
          status: 'delivered',
          date: '2025-01-23'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getDaysUntilColor = (days: number) => {
    if (days === 0) return 'bg-red-100 text-red-800';
    if (days <= 2) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'out_for_delivery': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <LanguageContent fallback="Hleð gögnum...">
            {(t) => t('common.loading')}
          </LanguageContent>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
                    {(t) => t('dashboard.stats.upcoming_birthdays')}
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

        {/* Upcoming Birthdays Table */}
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

        {/* Today's Deliveries */}
        <div className="grid md:grid-cols-2 gap-6">
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {todayDeliveries.map((delivery) => (
                    <tr key={delivery.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{delivery.employeeName}</div>
                        <div className="text-sm text-gray-500">{delivery.companyName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {delivery.scheduledTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(delivery.status)}`}>
                          {delivery.status.replace('_', ' ').charAt(0).toUpperCase() + delivery.status.replace('_', ' ').slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

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
                      <LanguageContent fallback="Fyrirtæki">
                        {(t) => t('dashboard.orders.company')}
                      </LanguageContent>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <LanguageContent fallback="Upphæð">
                        {(t) => t('dashboard.orders.amount')}
                      </LanguageContent>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <LanguageContent fallback="Staða">
                        {(t) => t('dashboard.orders.status')}
                      </LanguageContent>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.companyName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.amount.toLocaleString('is-IS')} ISK
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}