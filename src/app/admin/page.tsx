'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { CAKE_TYPES } from '@/contexts/SubscriptionContext';

interface Employee {
  name: string;
  birthday: string;
  cakeType: string;
  cakeSize?: string;
  dietaryRestrictions?: string;
  specialNotes?: string;
  employmentStatus?: string;
  deliveryStatus?: 'pending' | 'confirmed' | 'out_for_delivery' | 'delivered' | 'failed';
  deliveryDate?: string;
  deliveryNotes?: string;
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
  lastPaymentDate?: string;
  nextPaymentDate?: string;
  paymentReminderSent?: boolean;
  notes?: string;
  lastContactDate?: string;
  lastContactNotes?: string;
}

export default function Admin() {
  const { language } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<{submissionId: string, employeeIndex: number} | null>(null);
  const [showAddEmployee, setShowAddEmployee] = useState<{submissionId: string} | null>(null);
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({});
  const [editingNotes, setEditingNotes] = useState<{submissionId: string} | null>(null);
  const [notesText, setNotesText] = useState('');
  const [editingLastContact, setEditingLastContact] = useState<{submissionId: string} | null>(null);
  const [lastContactDate, setLastContactDate] = useState('');
  const [lastContactNotes, setLastContactNotes] = useState('');
  const [showQuickActions, setShowQuickActions] = useState<{submissionId: string} | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

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

  const markAsPaid = (companyId: string) => {
    const updatedSubmissions = submissions.map((sub: Submission) => 
      sub.id === companyId ? { ...sub, status: 'paid' } : sub
    );
    setSubmissions(updatedSubmissions);
    if (typeof window !== 'undefined') {
      localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
    }
  };

  const markAsPending = (companyId: string) => {
    const updatedSubmissions = submissions.map((sub: Submission) => 
      sub.id === companyId ? { ...sub, status: 'pending_payment' } : sub
    );
    setSubmissions(updatedSubmissions);
    if (typeof window !== 'undefined') {
      localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
    }
  };

  const toggleCompanySelection = (companyId: string) => {
    setSelectedCompanies(prev => 
      prev.includes(companyId) 
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    );
  };

  const selectAllCompanies = () => {
    setSelectedCompanies(filteredSubmissions.map(sub => sub.id));
  };

  const clearSelection = () => {
    setSelectedCompanies([]);
  };

  const bulkMarkAsPaid = () => {
    if (selectedCompanies.length === 0) return;
    const updatedSubmissions = submissions.map((sub: Submission) => 
      selectedCompanies.includes(sub.id) ? { ...sub, status: 'paid' } : sub
    );
    setSubmissions(updatedSubmissions);
    if (typeof window !== 'undefined') {
      localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
    }
    setSelectedCompanies([]);
  };

  const bulkRemove = () => {
    if (selectedCompanies.length === 0) return;
    if (confirm(`Are you sure you want to remove ${selectedCompanies.length} companies?`)) {
      const updatedSubmissions = submissions.filter((sub: Submission) => !selectedCompanies.includes(sub.id));
      setSubmissions(updatedSubmissions);
      if (typeof window !== 'undefined') {
        localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
      }
      setSelectedCompanies([]);
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Company Name', 'Contact Person', 'Email', 'Phone', 'Subscription Tier', 'Status', 'Monthly Cost', 'Employees Count', 'Order ID'],
      ...filteredSubmissions.map(sub => [
        sub.companyName || '',
        sub.contactPersonName || '',
        sub.contactEmail || '',
        sub.contactPhone || '',
        sub.subscriptionTier || '',
        sub.status || '',
        (sub.monthlyCost || 0).toString(),
        (sub.employees?.length || 0).toString(),
        sub.orderId || ''
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `straxkaka-companies-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Phase 1: Delivery Status Management
  const updateDeliveryStatus = (submissionId: string, employeeIndex: number, status: Employee['deliveryStatus']) => {
    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === submissionId && sub.employees) {
        const updatedEmployees = [...sub.employees];
        updatedEmployees[employeeIndex] = {
          ...updatedEmployees[employeeIndex],
          deliveryStatus: status,
          deliveryDate: status === 'delivered' ? new Date().toISOString() : updatedEmployees[employeeIndex].deliveryDate
        };
        return { ...sub, employees: updatedEmployees };
      }
      return sub;
    });
    setSubmissions(updatedSubmissions);
    if (typeof window !== 'undefined') {
      localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
    }
  };

  // Phase 1: Employee Management
  const updateEmployee = (submissionId: string, employeeIndex: number, updatedEmployee: Employee) => {
    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === submissionId && sub.employees) {
        const updatedEmployees = [...sub.employees];
        updatedEmployees[employeeIndex] = updatedEmployee;
        return { ...sub, employees: updatedEmployees };
      }
      return sub;
    });
    setSubmissions(updatedSubmissions);
    if (typeof window !== 'undefined') {
      localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
    }
    setEditingEmployee(null);
  };

  const addEmployee = (submissionId: string) => {
    if (!newEmployee.name || !newEmployee.birthday || !newEmployee.cakeType) return;
    
    const employee: Employee = {
      name: newEmployee.name,
      birthday: newEmployee.birthday,
      cakeType: newEmployee.cakeType,
      cakeSize: newEmployee.cakeSize || 'Medium',
      dietaryRestrictions: newEmployee.dietaryRestrictions || '',
      specialNotes: newEmployee.specialNotes || '',
      employmentStatus: 'active',
      deliveryStatus: 'pending'
    };

    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === submissionId) {
        return {
          ...sub,
          employees: [...(sub.employees || []), employee]
        };
      }
      return sub;
    });
    setSubmissions(updatedSubmissions);
    if (typeof window !== 'undefined') {
      localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
    }
    setNewEmployee({});
    setShowAddEmployee(null);
  };

  const removeEmployee = (submissionId: string, employeeIndex: number) => {
    if (confirm('Are you sure you want to remove this employee?')) {
      const updatedSubmissions = submissions.map(sub => {
        if (sub.id === submissionId && sub.employees) {
          const updatedEmployees = sub.employees.filter((_, index) => index !== employeeIndex);
          return { ...sub, employees: updatedEmployees };
        }
        return sub;
      });
      setSubmissions(updatedSubmissions);
      if (typeof window !== 'undefined') {
        localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
      }
    }
  };

  // Phase 1: Payment Reminders
  const sendPaymentReminder = (submissionId: string) => {
    const updatedSubmissions = submissions.map(sub => 
      sub.id === submissionId ? { ...sub, paymentReminderSent: true } : sub
    );
    setSubmissions(updatedSubmissions);
    if (typeof window !== 'undefined') {
      localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
    }
    alert('Payment reminder sent! (This would normally send an email)');
  };

  // Phase 1: Pause/Resume Subscription
  const toggleSubscriptionStatus = (submissionId: string) => {
    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === submissionId) {
        const newStatus = sub.subscriptionStatus === 'active' ? 'paused' : 'active';
        return { ...sub, subscriptionStatus: newStatus };
      }
      return sub;
    });
    setSubmissions(updatedSubmissions);
    if (typeof window !== 'undefined') {
      localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
    }
  };

  // Notes Management
  const updateNotes = (submissionId: string) => {
    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === submissionId) {
        return { ...sub, notes: notesText };
      }
      return sub;
    });
    setSubmissions(updatedSubmissions);
    if (typeof window !== 'undefined') {
      localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
    }
    setEditingNotes(null);
    setNotesText('');
  };

  // Last Contact Management
  const updateLastContact = (submissionId: string) => {
    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === submissionId) {
        return { 
          ...sub, 
          lastContactDate: lastContactDate,
          lastContactNotes: lastContactNotes
        };
      }
      return sub;
    });
    setSubmissions(updatedSubmissions);
    if (typeof window !== 'undefined') {
      localStorage.setItem('straxkaka_subscriptions', JSON.stringify(updatedSubmissions));
    }
    setEditingLastContact(null);
    setLastContactDate('');
    setLastContactNotes('');
  };

  // Make Integration Functions
  const triggerMakeWebhook = async (eventType: string, data: Record<string, unknown>) => {
    try {
      await fetch('/api/make/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: eventType,
          timestamp: new Date().toISOString(),
          data: data
        })
      });
    } catch (error) {
      console.error('Failed to trigger Make webhook:', error);
    }
  };

  // Enhanced functions with Make integration
  const markAsPaidWithWebhook = (companyId: string) => {
    const submission = submissions.find(sub => sub.id === companyId);
    if (submission) {
      markAsPaid(companyId);
      
      // Trigger Make webhook
      triggerMakeWebhook('payment_received', {
        companyName: submission.companyName,
        contactEmail: submission.contactEmail,
        amount: submission.monthlyCost,
        orderId: submission.orderId,
        subscriptionTier: submission.subscriptionTier
      });
    }
  };

  const updateDeliveryStatusWithWebhook = (submissionId: string, employeeIndex: number, status: Employee['deliveryStatus']) => {
    const submission = submissions.find(sub => sub.id === submissionId);
    const employee = submission?.employees?.[employeeIndex];
    
    updateDeliveryStatus(submissionId, employeeIndex, status);
    
    if (submission && employee) {
      // Trigger Make webhook
      triggerMakeWebhook('delivery_status_updated', {
        companyName: submission.companyName,
        employeeName: employee.name,
        deliveryStatus: status,
        deliveryDate: new Date().toISOString(),
        contactEmail: submission.contactEmail,
        cakeType: employee.cakeType
      });
    }
  };

  // Filter submissions based on search and status
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = !searchTerm || (() => {
      const search = searchTerm.toLowerCase();
      return (
        submission.companyName?.toLowerCase().includes(search) ||
        submission.contactPersonName?.toLowerCase().includes(search) ||
        submission.contactEmail?.toLowerCase().includes(search) ||
        submission.subscriptionTier?.toLowerCase().includes(search)
      );
    })();
    
    const matchesStatus = filterStatus === 'all' || submission.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalCompanies = submissions.length;
  const activeCompanies = submissions.filter(sub => sub.subscriptionStatus === 'active').length;
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

  // Get today's deliveries
  const todaysDeliveries = submissions.reduce((total, sub) => {
    if (!sub.employees) return total;
    const today = new Date().toDateString();
    
    return total + sub.employees.filter(emp => {
      if (emp.employmentStatus !== 'active') return false;
      const birthday = new Date(emp.birthday);
      birthday.setFullYear(new Date().getFullYear());
      return birthday.toDateString() === today;
    }).length;
  }, 0);

  // Get pending deliveries
  const pendingDeliveries = submissions.reduce((total, sub) => {
    if (!sub.employees) return total;
    return total + sub.employees.filter(emp => 
      emp.employmentStatus === 'active' && emp.deliveryStatus === 'pending'
    ).length;
  }, 0);

  // Get overdue payments
  const overduePayments = submissions.filter(sub => 
    sub.status === 'pending_payment' && sub.subscriptionStatus === 'active'
  ).length;

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
    <div className="min-h-screen bg-white">
      {/* Clean Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <img 
                src="/logo.svg" 
                alt="Strax Logo" 
                className="h-10 w-auto mr-3"
              />
              <span className="text-3xl font-bold text-black">Strax Admin</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-black transition-colors text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-100">
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">Admin Dashboard</h1>
          <p className="text-gray-600 text-lg">Manage company subscriptions and employees</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-500 rounded-xl">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-black">{totalCompanies}</p>
                <p className="text-sm font-medium text-gray-600">Total Companies</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-500 rounded-xl">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-black">{activeCompanies}</p>
                <p className="text-sm font-medium text-gray-600">Active Companies</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-500 rounded-xl">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-black">{activeEmployees}</p>
                <p className="text-sm font-medium text-gray-600">Active Employees</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-500 rounded-xl">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-black">{todaysDeliveries}</p>
                <p className="text-sm font-medium text-gray-600">Today&apos;s Deliveries</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-500 rounded-xl">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-black">{pendingDeliveries}</p>
                <p className="text-sm font-medium text-gray-600">Pending Deliveries</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-500 rounded-xl">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-black">{overduePayments}</p>
                <p className="text-sm font-medium text-gray-600">Overdue Payments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 1: Quick Actions Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-black">Quick Actions</h3>
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
              >
                {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
              </button>
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Upcoming Birthdays: <span className="text-black font-semibold">{upcomingBirthdays}</span></span>
              <span className="text-gray-400">|</span>
              <span className="text-sm text-gray-600">Monthly Revenue: <span className="text-black font-semibold">{totalRevenue.toLocaleString()} ISK</span></span>
            </div>
          </div>
        </div>

        {/* Phase 1: Calendar View */}
        {showCalendar && (
          <div className="bg-gray-900 rounded-xl shadow-2xl p-6 mb-8 border border-yellow-500/20">
            <h3 className="text-lg font-semibold text-yellow-500 mb-4">Upcoming Birthdays Calendar</h3>
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-300 py-2">
                  {day}
                  </div>
                ))}
              {Array.from({ length: 30 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i);
                const dayBirthdays = submissions.reduce((count, sub) => {
                  if (!sub.employees) return count;
                  return count + sub.employees.filter(emp => {
                    if (emp.employmentStatus !== 'active') return false;
                    const birthday = new Date(emp.birthday);
                    birthday.setFullYear(date.getFullYear());
                    return birthday.toDateString() === date.toDateString();
                  }).length;
                }, 0);
                
                return (
                  <div
                    key={i}
                    className={`p-2 text-center text-sm rounded-lg ${
                      i === 0 ? 'bg-yellow-500/20 text-yellow-500 font-semibold border border-yellow-500/30' :
                      dayBirthdays > 0 ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                      'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                    }`}
                  >
                    <div>{date.getDate()}</div>
                    {dayBirthdays > 0 && (
                      <div className="text-xs font-bold">{dayBirthdays}</div>
                    )}
              </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Analytics Section */}
        {showAnalytics && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
            <h3 className="text-lg font-semibold text-black mb-6">Company Analytics</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-black mb-2">
                  {Math.round((activeCompanies / totalCompanies) * 100)}%
                </div>
                <p className="text-sm text-gray-600">Active Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black mb-2">
                  {Math.round(activeEmployees / activeCompanies)}
                </div>
                <p className="text-sm text-gray-600">Avg Employees/Company</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black mb-2">
                  {Math.round(totalRevenue / activeCompanies)}
                </div>
                <p className="text-sm text-gray-600">Avg Revenue/Company</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black mb-2">
                  {Math.round((overduePayments / totalCompanies) * 100)}%
                </div>
                <p className="text-sm text-gray-600">Overdue Rate</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-md font-semibold text-black mb-4">Top Performing Companies</h4>
              <div className="space-y-2">
                {submissions
                  .filter(sub => sub.subscriptionStatus === 'active')
                  .sort((a, b) => (b.employees?.length || 0) - (a.employees?.length || 0))
                  .slice(0, 5)
                  .map((sub, index) => (
                    <div key={sub.id} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-black">{sub.companyName}</span>
                      <span className="text-sm text-gray-600">{sub.employees?.length || 0} employees</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-gray-900 rounded-xl shadow-2xl p-6 mb-8 border border-yellow-500/20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Search Companies</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-200 placeholder-gray-400"
                placeholder="Search by company name, contact, email, or subscription tier..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-200"
              >
                <option value="all">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending_payment">Pending Payment</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-600">
            <div className="text-sm text-gray-300">
              Showing <span className="text-yellow-500 font-semibold">{filteredSubmissions.length}</span> of <span className="text-yellow-500 font-semibold">{totalCompanies}</span> companies
              {selectedCompanies.length > 0 && ` • ${selectedCompanies.length} selected`}
            </div>
            <div className="flex items-center space-x-3">
              {selectedCompanies.length > 0 && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={clearSelection}
                    className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    Clear Selection
                  </button>
                  <button
                    onClick={bulkMarkAsPaid}
                    className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium hover:bg-green-500/30 transition-colors border border-green-500/30"
                  >
                    Mark Selected as Paid
                  </button>
                  <button
                    onClick={bulkRemove}
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium hover:bg-red-500/30 transition-colors border border-red-500/30"
                  >
                    Remove Selected
                  </button>
                </div>
              )}
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-yellow-500/20 text-yellow-500 rounded-lg text-sm font-medium hover:bg-yellow-500/30 transition-colors border border-yellow-500/30"
              >
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-yellow-500/20">
          <div className="px-6 py-4 border-b border-gray-600 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-yellow-500">Company Submissions</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={selectAllCompanies}
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
              >
                Select All
              </button>
              <span className="text-gray-500">|</span>
              <button
                onClick={clearSelection}
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
              >
                Clear All
              </button>
            </div>
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
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedCompanies.length === filteredSubmissions.length && filteredSubmissions.length > 0}
                        onChange={selectedCompanies.length === filteredSubmissions.length ? clearSelection : selectAllCompanies}
                        className="rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Employees</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Delivery Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Subscription</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Payment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Notes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-700">
                  {filteredSubmissions.map((submission) => (
                    <tr 
                      key={submission.id} 
                      className={`hover:bg-gray-800 cursor-pointer transition-colors ${selectedCompanies.includes(submission.id) ? 'bg-yellow-500/10' : ''}`}
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedCompanies.includes(submission.id)}
                          onChange={() => toggleCompanySelection(submission.id)}
                          className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                        />
                      </td>
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
                        <button
                          onClick={() => setShowAddEmployee({submissionId: submission.id})}
                          className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                        >
                          + Add Employee
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          {submission.employees?.slice(0, 2).map((emp, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                emp.deliveryStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                                emp.deliveryStatus === 'out_for_delivery' ? 'bg-blue-100 text-blue-800' :
                                emp.deliveryStatus === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                                emp.deliveryStatus === 'failed' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {emp.deliveryStatus?.replace('_', ' ') || 'pending'}
                              </span>
                              <span className="text-xs text-gray-500">{emp.name}</span>
                            </div>
                          ))}
                          {submission.employees && submission.employees.length > 2 && (
                            <div className="text-xs text-gray-500">+{submission.employees.length - 2} more</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          submission.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' :
                          submission.subscriptionStatus === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                          submission.subscriptionStatus === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {submission.subscriptionStatus ? submission.subscriptionStatus.charAt(0).toUpperCase() + submission.subscriptionStatus.slice(1) : 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          submission.status === 'paid' ? 'bg-green-100 text-green-800' :
                          submission.status === 'pending_payment' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {submission.status ? submission.status.replace('_', ' ').charAt(0).toUpperCase() + submission.status.replace('_', ' ').slice(1) : 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="font-semibold">{(submission.monthlyCost || 0).toLocaleString()} ISK</div>
                          <div className="text-xs text-gray-500">monthly subscription</div>
                          {submission.employees && submission.employees.length > 0 && (
                            <div className="mt-1">
                              <div className="text-xs text-blue-600 font-medium">Cake Preferences:</div>
                              {submission.employees.slice(0, 2).map((emp, idx) => {
                                const cakeType = CAKE_TYPES.find(cake => cake.id === emp.cakeType);
                                return (
                                  <div key={idx} className="text-xs text-gray-600">
                                    {emp.name}: {language === 'is' ? cakeType?.nameIcelandic : cakeType?.nameEnglish} ({cakeType?.price.toLocaleString()} ISK)
                                  </div>
                                );
                              })}
                              {submission.employees.length > 2 && (
                                <div className="text-xs text-gray-500">+{submission.employees.length - 2} more</div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 max-w-xs">
                          {submission.notes ? (
                            <div className="truncate" title={submission.notes}>
                              {submission.notes}
                            </div>
                          ) : (
                            <span className="text-gray-400 italic">No notes</span>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingNotes({submissionId: submission.id});
                            setNotesText(submission.notes || '');
                          }}
                          className="text-xs text-blue-400 hover:text-blue-300 mt-2 px-2 py-1 bg-blue-600/20 hover:bg-blue-600/30 rounded transition-colors font-medium"
                        >
                          {submission.notes ? 'Edit Notes' : 'Add Notes'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300 max-w-xs">
                          {submission.lastContactDate ? (
                            <div>
                              <div className="text-yellow-500 font-medium">
                                {new Date(submission.lastContactDate).toLocaleDateString()}
                              </div>
                              {submission.lastContactNotes && (
                                <div className="text-xs text-gray-400 truncate" title={submission.lastContactNotes}>
                                  {submission.lastContactNotes}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-500 italic">No contact</span>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingLastContact({submissionId: submission.id});
                            setLastContactDate(submission.lastContactDate || '');
                            setLastContactNotes(submission.lastContactNotes || '');
                          }}
                          className="text-xs text-purple-400 hover:text-purple-300 mt-2 px-2 py-1 bg-purple-600/20 hover:bg-purple-600/30 rounded transition-colors font-medium"
                        >
                          {submission.lastContactDate ? 'Edit Contact' : 'Add Contact'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                        <div className="relative">
                          <button
                            onClick={() => setShowQuickActions(showQuickActions?.submissionId === submission.id ? null : {submissionId: submission.id})}
                            className="text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-lg flex items-center gap-1"
                          >
                            Quick Actions
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          
                          {showQuickActions?.submissionId === submission.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-yellow-500/30 z-10">
                              <div className="py-2">
                                <button
                                  onClick={() => {
                                    setSelectedSubmission(submission);
                                    setShowQuickActions(null);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                                >
                                  📋 View Details
                                </button>
                                {submission.status !== 'paid' && (
                                  <button
                                    onClick={() => {
                                      markAsPaidWithWebhook(submission.id);
                                      setShowQuickActions(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-green-400 hover:bg-gray-700 hover:text-green-300 transition-colors"
                                  >
                                    ✅ Mark as Paid
                                  </button>
                                )}
                                {submission.status === 'paid' && (
                                  <button
                                    onClick={() => {
                                      markAsPending(submission.id);
                                      setShowQuickActions(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-yellow-400 hover:bg-gray-700 hover:text-yellow-300 transition-colors"
                                  >
                                    ⏳ Mark as Pending
                                  </button>
                                )}
                                {submission.status === 'pending_payment' && !submission.paymentReminderSent && (
                                  <button
                                    onClick={() => {
                                      sendPaymentReminder(submission.id);
                                      setShowQuickActions(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-orange-400 hover:bg-gray-700 hover:text-orange-300 transition-colors"
                                  >
                                    📧 Send Reminder
                                  </button>
                                )}
                                <button
                                  onClick={() => {
                                    toggleSubscriptionStatus(submission.id);
                                    setShowQuickActions(null);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-blue-400 hover:bg-gray-700 hover:text-blue-300 transition-colors"
                                >
                                  {submission.subscriptionStatus === 'active' ? '⏸️ Pause Subscription' : '▶️ Resume Subscription'}
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingNotes({submissionId: submission.id});
                                    setNotesText(submission.notes || '');
                                    setShowQuickActions(null);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-purple-400 hover:bg-gray-700 hover:text-purple-300 transition-colors"
                                >
                                  📝 Edit Notes
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingLastContact({submissionId: submission.id});
                                    setLastContactDate(submission.lastContactDate || '');
                                    setLastContactNotes(submission.lastContactNotes || '');
                                    setShowQuickActions(null);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-cyan-400 hover:bg-gray-700 hover:text-cyan-300 transition-colors"
                                >
                                  📞 Edit Contact
                                </button>
                                <div className="border-t border-gray-600 my-1"></div>
                                <button
                                  onClick={() => {
                                    removeCompany(submission.id);
                                    setShowQuickActions(null);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
                                >
                                  🗑️ Remove Company
                                </button>
                              </div>
                            </div>
                          )}
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
                      <p><strong>Monthly Subscription:</strong> {(selectedSubmission.monthlyCost || 0).toLocaleString()} ISK</p>
                      {selectedSubmission.employees && selectedSubmission.employees.length > 0 && (
                        <div className="mt-4">
                          <p><strong>Cake Preferences & Costs:</strong></p>
                          <div className="mt-2 space-y-2">
                            {selectedSubmission.employees.map((emp, idx) => {
                              const cakeType = CAKE_TYPES.find(cake => cake.id === emp.cakeType);
                              return (
                                <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                                  <div className="font-medium">{emp.name}</div>
                                  <div className="text-sm text-gray-600">
                                    Cake: {language === 'is' ? cakeType?.nameIcelandic : cakeType?.nameEnglish}
                                  </div>
                                  <div className="text-sm font-semibold text-blue-600">
                                    Cost: {cakeType?.price.toLocaleString()} ISK
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Birthday: {new Date(emp.birthday).toLocaleDateString()}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      <p><strong>Order ID:</strong> {selectedSubmission.orderId || 'N/A'}</p>
                  </div>
                </div>
                
                  {selectedSubmission.employees && selectedSubmission.employees.length > 0 && (
                <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900">Employees ({selectedSubmission.employees.length})</h4>
                        <button
                          onClick={() => setShowAddEmployee({submissionId: selectedSubmission.id})}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                        >
                          + Add Employee
                        </button>
                      </div>
                      <div className="max-h-60 overflow-y-auto space-y-2">
                    {selectedSubmission.employees.map((employee, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
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
                                <div className="mt-2 flex items-center space-x-2">
                                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    employee.deliveryStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                                    employee.deliveryStatus === 'out_for_delivery' ? 'bg-blue-100 text-blue-800' :
                                    employee.deliveryStatus === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                                    employee.deliveryStatus === 'failed' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {employee.deliveryStatus?.replace('_', ' ') || 'pending'}
                                  </span>
                                  <select
                                    value={employee.deliveryStatus || 'pending'}
                                    onChange={(e) => updateDeliveryStatusWithWebhook(selectedSubmission.id, index, e.target.value as Employee['deliveryStatus'])}
                                    className="text-xs border border-gray-300 rounded px-2 py-1"
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="out_for_delivery">Out for Delivery</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="failed">Failed</option>
                                  </select>
                                </div>
                              </div>
                              <div className="flex flex-col space-y-1 ml-2">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  employee.employmentStatus === 'active' ? 'bg-green-100 text-green-800' :
                                  employee.employmentStatus === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {employee.employmentStatus || 'Unknown'}
                                </span>
                                <button
                                  onClick={() => setEditingEmployee({submissionId: selectedSubmission.id, employeeIndex: index})}
                                  className="text-xs text-blue-600 hover:text-blue-800"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => removeEmployee(selectedSubmission.id, index)}
                                  className="text-xs text-red-600 hover:text-red-800"
                                >
                                  Remove
                                </button>
                          </div>
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

        {/* Add Employee Modal */}
        {showAddEmployee && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Add New Employee</h3>
                  <button
                    onClick={() => {
                      setShowAddEmployee(null);
                      setNewEmployee({});
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="text-2xl">&times;</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      value={newEmployee.name || ''}
                      onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Employee name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Birthday *</label>
                    <input
                      type="date"
                      value={newEmployee.birthday || ''}
                      onChange={(e) => setNewEmployee({...newEmployee, birthday: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cake Type *</label>
                    <select
                      value={newEmployee.cakeType || ''}
                      onChange={(e) => setNewEmployee({...newEmployee, cakeType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="">Select cake type</option>
                      {CAKE_TYPES.map((cake) => (
                        <option key={cake.id} value={cake.id}>
                          {language === 'is' ? cake.nameIcelandic : cake.nameEnglish} - {cake.price.toLocaleString('is-IS')} ISK
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cake Size</label>
                    <select
                      value={newEmployee.cakeSize || 'Medium'}
                      onChange={(e) => setNewEmployee({...newEmployee, cakeSize: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
                    <input
                      type="text"
                      value={newEmployee.dietaryRestrictions || ''}
                      onChange={(e) => setNewEmployee({...newEmployee, dietaryRestrictions: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="e.g., Gluten-free, Vegan, Nut allergy"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Special Notes</label>
                    <textarea
                      value={newEmployee.specialNotes || ''}
                      onChange={(e) => setNewEmployee({...newEmployee, specialNotes: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      rows={3}
                      placeholder="Any special instructions or notes"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setShowAddEmployee(null);
                        setNewEmployee({});
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => addEmployee(showAddEmployee.submissionId)}
                      className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition-colors font-semibold"
                    >
                      Add Employee
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Employee Modal */}
        {editingEmployee && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Edit Employee</h3>
                  <button
                    onClick={() => setEditingEmployee(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="text-2xl">&times;</span>
                  </button>
                </div>
                
                {(() => {
                  const submission = submissions.find(sub => sub.id === editingEmployee.submissionId);
                  const employee = submission?.employees?.[editingEmployee.employeeIndex];
                  if (!employee) return null;
                  
                  return (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          defaultValue={employee.name}
                          onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Birthday</label>
                        <input
                          type="date"
                          defaultValue={employee.birthday}
                          onChange={(e) => setNewEmployee({...newEmployee, birthday: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cake Type</label>
                        <select
                          defaultValue={employee.cakeType}
                          onChange={(e) => setNewEmployee({...newEmployee, cakeType: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                          {CAKE_TYPES.map((cake) => (
                            <option key={cake.id} value={cake.id}>
                              {language === 'is' ? cake.nameIcelandic : cake.nameEnglish} - {cake.price.toLocaleString('is-IS')} ISK
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Employment Status</label>
                        <select
                          defaultValue={employee.employmentStatus || 'active'}
                          onChange={(e) => setNewEmployee({...newEmployee, employmentStatus: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => setEditingEmployee(null)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            const updatedEmployee: Employee = {
                              ...employee,
                              name: newEmployee.name || employee.name,
                              birthday: newEmployee.birthday || employee.birthday,
                              cakeType: newEmployee.cakeType || employee.cakeType,
                              employmentStatus: newEmployee.employmentStatus || employee.employmentStatus
                            };
                            updateEmployee(editingEmployee.submissionId, editingEmployee.employeeIndex, updatedEmployee);
                          }}
                          className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition-colors font-semibold"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Edit Last Contact Modal */}
        {editingLastContact && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Edit Last Contact</h3>
                  <button
                    onClick={() => {
                      setEditingLastContact(null);
                      setLastContactDate('');
                      setLastContactNotes('');
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="text-2xl">&times;</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Date</label>
                    <input
                      type="date"
                      value={lastContactDate}
                      onChange={(e) => setLastContactDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Notes</label>
                    <textarea
                      value={lastContactNotes}
                      onChange={(e) => setLastContactNotes(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      rows={4}
                      placeholder="Add notes about the contact (e.g., phone call, email, meeting, etc.)"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setEditingLastContact(null);
                        setLastContactDate('');
                        setLastContactNotes('');
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => updateLastContact(editingLastContact.submissionId)}
                      className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition-colors font-semibold"
                    >
                      Save Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Notes Modal */}
        {editingNotes && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Edit Company Notes</h3>
                  <button
                    onClick={() => {
                      setEditingNotes(null);
                      setNotesText('');
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="text-2xl">&times;</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <textarea
                      value={notesText}
                      onChange={(e) => setNotesText(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      rows={6}
                      placeholder="Add notes about this company (e.g., special requirements, contact preferences, etc.)"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setEditingNotes(null);
                        setNotesText('');
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => updateNotes(editingNotes.submissionId)}
                      className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition-colors font-semibold"
                    >
                      Save Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
    </div>
  );
}
// Force deployment Tue Sep 23 19:19:19 GMT 2025
