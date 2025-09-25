'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<{employee: Employee, companyName: string} | null>(null);

  // Function to calculate next birthday date
  const getNextBirthdayDate = (birthday: string) => {
    const today = new Date();
    const birthdayDate = new Date(birthday);
    const thisYearBirthday = new Date(today.getFullYear(), birthdayDate.getMonth(), birthdayDate.getDate());
    
    // If birthday has passed this year, use next year
    const nextBirthday = thisYearBirthday < today ? 
      new Date(today.getFullYear() + 1, birthdayDate.getMonth(), birthdayDate.getDate()) : 
      thisYearBirthday;
    
    return nextBirthday;
  };
  const [showQuickStats, setShowQuickStats] = useState(false);

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

  // Auto-refresh data every 30 seconds when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const interval = setInterval(() => {
      loadData();
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load from external storage service (JSONBin)
      console.log('Loading data from external storage...');
      const response = await fetch('/api/submissions');
      
      if (response.ok) {
        const data = await response.json();
        console.log('External storage data received:', data.submissions?.length || 0);
        setSubmissions(data.submissions || []);
      } else {
        console.log('External storage failed, falling back to localStorage...');
        // Fallback to localStorage
        const storedSubmissions = localStorage.getItem('straxkaka_submissions');
        const storedSubscriptions = localStorage.getItem('straxkaka_subscriptions');
        
        let localData = [];
        if (storedSubscriptions) {
          localData = JSON.parse(storedSubscriptions);
          console.log('Found subscriptions in localStorage:', localData.length);
        } else if (storedSubmissions) {
          localData = JSON.parse(storedSubmissions);
          console.log('Found submissions in localStorage:', localData.length);
        }
        
        setSubmissions(localData);
        console.log('Loaded from localStorage fallback:', localData.length);
      }
      
    } catch (error) {
      console.error('Error loading data:', error);
      // Final fallback to localStorage
      const storedSubmissions = localStorage.getItem('straxkaka_submissions');
      const storedSubscriptions = localStorage.getItem('straxkaka_subscriptions');
      
      let localData = [];
      if (storedSubscriptions) {
        localData = JSON.parse(storedSubscriptions);
      } else if (storedSubmissions) {
        localData = JSON.parse(storedSubmissions);
      }
      
      setSubmissions(localData);
      console.log('Final fallback to localStorage:', localData.length);
    } finally {
      setLoading(false);
    }
  };

  // Manual sync - copy data to clipboard for sharing
  const syncData = async () => {
    try {
      const dataToShare = {
        submissions,
        timestamp: new Date().toISOString(),
        device: navigator.userAgent
      };
      
      const dataString = JSON.stringify(dataToShare, null, 2);
      await navigator.clipboard.writeText(dataString);
      
      alert('Data copied to clipboard! You can now paste this into another device to sync data.');
      console.log('Data copied to clipboard for sharing');
    } catch (error) {
      console.error('Error copying data:', error);
      alert('Failed to copy data. Please try again.');
    }
  };

  // Import data from clipboard
  const importData = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      const importedData = JSON.parse(clipboardText);
      
      if (importedData.submissions && Array.isArray(importedData.submissions)) {
        setSubmissions(importedData.submissions);
        
        // Save to localStorage
        localStorage.setItem('straxkaka_subscriptions', JSON.stringify(importedData.submissions));
        
        alert(`Successfully imported ${importedData.submissions.length} submissions!`);
        console.log('Data imported from clipboard:', importedData.submissions.length);
      } else {
        alert('Invalid data format. Please make sure you copied the correct data.');
      }
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Failed to import data. Please check the format and try again.');
    }
  };

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const interval = setInterval(loadData, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, [isAuthenticated]);

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
      ['Employee Name', 'Birthday', 'Cake Type', 'Cake Cost', 'Delivery Status', 'Company Name', 'Contact Person', 'Email', 'Phone', 'Delivery Address', 'Subscription Tier', 'Payment Status', 'Order ID', 'Dietary Restrictions', 'Special Notes'],
      ...filteredSubmissions.flatMap(sub => 
        (sub.employees || []).map(emp => {
          const cakeType = CAKE_TYPES.find(cake => cake.id === emp.cakeType);
          return [
            emp.name || '',
            new Date(emp.birthday).toLocaleDateString('en-CA'),
            language === 'is' ? (cakeType?.nameIcelandic || emp.cakeType || 'Not selected') : (cakeType?.nameEnglish || emp.cakeType || 'Not selected'),
            cakeType?.price?.toString() || '0',
            emp.deliveryStatus?.replace('_', ' ') || 'pending',
            sub.companyName || '',
            sub.contactPersonName || '',
            sub.contactEmail || '',
            sub.contactPhone || '',
            sub.deliveryAddress || '',
            sub.subscriptionTier || '',
            sub.status || '',
            sub.orderId || '',
            emp.dietaryRestrictions || '',
            emp.specialNotes || ''
          ];
        })
      )
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `straxkaka-employees-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToGoogleSheets = async () => {
    try {
      // Prepare data for Google Sheets
      const data = [
        ['Employee Name', 'Birthday', 'Cake Type', 'Cake Cost', 'Delivery Status', 'Company Name', 'Contact Person', 'Email', 'Phone', 'Delivery Address', 'Subscription Tier', 'Payment Status', 'Order ID', 'Dietary Restrictions', 'Special Notes'],
        ...filteredSubmissions.flatMap(sub => 
          (sub.employees || []).map(emp => {
            const cakeType = CAKE_TYPES.find(cake => cake.id === emp.cakeType);
            return [
              emp.name || '',
              new Date(emp.birthday).toLocaleDateString('en-CA'),
              language === 'is' ? (cakeType?.nameIcelandic || emp.cakeType || 'Not selected') : (cakeType?.nameEnglish || emp.cakeType || 'Not selected'),
              cakeType?.price?.toString() || '0',
              emp.deliveryStatus?.replace('_', ' ') || 'pending',
              sub.companyName || '',
              sub.contactPersonName || '',
              sub.contactEmail || '',
              sub.contactPhone || '',
              sub.deliveryAddress || '',
              sub.subscriptionTier || '',
              sub.status || '',
              (sub.monthlyCost || 0).toString(),
              sub.orderId || '',
              emp.dietaryRestrictions || '',
              emp.specialNotes || ''
            ];
          })
        )
      ];

      // Convert data to CSV format
      const csvContent = data.map(row => row.map(field => `"${field}"`).join(',')).join('\n');
      
      // Create a downloadable CSV file that can be imported to Google Sheets
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `straxkaka-employees-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // Show instructions for importing to Google Sheets
      alert('CSV file downloaded! To import to Google Sheets:\n1. Go to sheets.google.com\n2. Click "Blank" to create a new sheet\n3. Go to File > Import\n4. Upload the downloaded CSV file\n5. Choose "Replace current sheet" and click "Import data"');
      
    } catch (error) {
      console.error('Error exporting to Google Sheets:', error);
      alert('Error exporting to Google Sheets. Please try again.');
    }
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
  
  // Get upcoming birthdays (next 3 days) - check delivery dates
  const upcomingBirthdays = submissions.reduce((total, sub) => {
    if (!sub.employees) return total;
    const today = new Date();
    
    return total + sub.employees.filter(emp => {
      if (emp.employmentStatus !== 'active') return false;
      
      // Get next birthday date
      const nextBirthday = getNextBirthdayDate(emp.birthday);
      
      // Calculate days until next birthday
      const timeDiff = nextBirthday.getTime() - today.getTime();
      const daysUntilBirthday = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      return daysUntilBirthday >= 0 && daysUntilBirthday <= 3;
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
            <Image 
              src="/logo.svg" 
              alt="Strax Logo" 
              width={48}
              height={48}
              className="mx-auto mb-4"
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
              <Image 
                src="/logo.svg" 
                alt="Strax Logo" 
                width={40}
                height={40}
                className="mr-3"
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
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <h3 className="text-lg font-semibold text-black">Quick Actions</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="px-3 py-2 md:px-4 md:py-2 bg-yellow-500 text-black rounded-lg text-xs md:text-sm font-medium hover:bg-yellow-600 transition-colors"
                >
                  {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
                </button>
                <button
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  className="px-3 py-2 md:px-4 md:py-2 bg-black text-white rounded-lg text-xs md:text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
                </button>
                <button
                  onClick={() => setShowQuickStats(!showQuickStats)}
                  className="px-3 py-2 md:px-4 md:py-2 bg-yellow-500 text-black rounded-lg text-xs md:text-sm font-medium hover:bg-yellow-600 transition-colors"
                >
                  {showQuickStats ? 'Hide Quick Stats' : 'Show Quick Stats'}
                </button>
                <button
                  onClick={syncData}
                  className="px-3 py-2 md:px-4 md:py-2 bg-green-500 text-white rounded-lg text-xs md:text-sm font-medium hover:bg-green-600 transition-colors"
                >
                  📤 Export Data
                </button>
                <button
                  onClick={importData}
                  className="px-3 py-2 md:px-4 md:py-2 bg-blue-500 text-white rounded-lg text-xs md:text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  📥 Import Data
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <span className="text-xs md:text-sm text-gray-600">Upcoming Birthdays: <span className="text-black font-semibold">{upcomingBirthdays}</span></span>
              <span className="hidden md:inline text-gray-400">|</span>
              <span className="text-xs md:text-sm text-gray-600">Monthly Revenue: <span className="text-black font-semibold">{totalRevenue.toLocaleString()} ISK</span></span>
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
                    
                    // Get next birthday date
                    const nextBirthday = getNextBirthdayDate(emp.birthday);
                    
                    // Check if this date matches the next birthday
                    return nextBirthday.toDateString() === date.toDateString();
                  }).length;
                }, 0);
                
                return (
                  <div
                    key={i}
                    className={`p-2 text-center text-sm rounded-lg ${
                      i === 0 ? 'bg-yellow-500/20 text-yellow-500 font-semibold border border-yellow-500/30' :
                      dayBirthdays > 0 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
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
                  .map((sub) => (
                    <div key={sub.id} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-black">{sub.companyName}</span>
                      <span className="text-sm text-gray-600">{sub.employees?.length || 0} employees</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats Dashboard */}
        {showQuickStats && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
            <h3 className="text-lg font-semibold text-black mb-6">Quick Stats Dashboard</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Today's Deliveries */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-500 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Today&apos;s Deliveries</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {submissions.flatMap(sub => sub.employees || [])
                        .filter(emp => {
                          const today = new Date().toDateString();
                          const birthday = new Date(emp.birthday).toDateString();
                          return today === birthday;
                        }).length}
                    </p>
                  </div>
                </div>
              </div>

              {/* This Week's Deliveries */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-500 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">This Week</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {submissions.flatMap(sub => sub.employees || [])
                        .filter(emp => {
                          const today = new Date();
                          const birthday = new Date(emp.birthday);
                          const diffTime = birthday.getTime() - today.getTime();
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                          return diffDays >= 0 && diffDays <= 7;
                        }).length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pending Deliveries */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-500 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {submissions.flatMap(sub => sub.employees || [])
                        .filter(emp => emp.deliveryStatus === 'pending').length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Completed Deliveries */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-500 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {submissions.flatMap(sub => sub.employees || [])
                        .filter(emp => emp.deliveryStatus === 'delivered').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Stats Row */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Most Popular Cake</h4>
                <p className="text-lg font-bold text-gray-900">
                  {(() => {
                    const cakeCounts: {[key: string]: number} = {};
                    submissions.flatMap(sub => sub.employees || []).forEach(emp => {
                      if (emp.cakeType) {
                        cakeCounts[emp.cakeType] = (cakeCounts[emp.cakeType] || 0) + 1;
                      }
                    });
                    const mostPopular = Object.entries(cakeCounts).sort(([,a], [,b]) => b - a)[0];
                    if (mostPopular) {
                      const cakeType = CAKE_TYPES.find(cake => cake.id === mostPopular[0]);
                      return language === 'is' ? cakeType?.nameIcelandic : cakeType?.nameEnglish;
                    }
                    return 'None selected';
                  })()}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Average Cake Cost</h4>
                <p className="text-lg font-bold text-gray-900">
                  {(() => {
                    const totalCost = submissions.flatMap(sub => sub.employees || [])
                      .reduce((sum, emp) => {
                        const cakeType = CAKE_TYPES.find(cake => cake.id === emp.cakeType);
                        return sum + (cakeType?.price || 0);
                      }, 0);
                    const count = submissions.flatMap(sub => sub.employees || []).length;
                    return count > 0 ? Math.round(totalCost / count).toLocaleString() + ' ISK' : '0 ISK';
                  })()}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Success Rate</h4>
                <p className="text-lg font-bold text-gray-900">
                  {(() => {
                    const total = submissions.flatMap(sub => sub.employees || []).length;
                    const completed = submissions.flatMap(sub => sub.employees || [])
                      .filter(emp => emp.deliveryStatus === 'delivered').length;
                    return total > 0 ? Math.round((completed / total) * 100) + '%' : '0%';
                  })()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Actions */}
        {selectedCompanies.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold text-black">Bulk Actions</h3>
                <span className="text-sm text-gray-600">{selectedCompanies.length} companies selected</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      selectedCompanies.forEach(id => markAsPaidWithWebhook(id));
                      setSelectedCompanies([]);
                    }}
                    className="px-3 py-2 md:px-4 md:py-2 bg-yellow-500 text-black rounded-lg text-xs md:text-sm font-medium hover:bg-yellow-600 transition-colors"
                  >
                    Mark All as Paid
                  </button>
                  <button
                    onClick={() => {
                      selectedCompanies.forEach(id => markAsPending(id));
                      setSelectedCompanies([]);
                    }}
                    className="px-3 py-2 md:px-4 md:py-2 bg-yellow-500 text-black rounded-lg text-xs md:text-sm font-medium hover:bg-yellow-600 transition-colors"
                  >
                    Mark All as Pending
                  </button>
                  <button
                    onClick={() => {
                      selectedCompanies.forEach(id => toggleSubscriptionStatus(id));
                      setSelectedCompanies([]);
                    }}
                    className="px-3 py-2 md:px-4 md:py-2 bg-yellow-500 text-black rounded-lg text-xs md:text-sm font-medium hover:bg-yellow-600 transition-colors"
                  >
                    Toggle Subscriptions
                  </button>
                </div>
                <button
                  onClick={() => setSelectedCompanies([])}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Companies</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 placeholder-gray-500"
                placeholder="Search by company name, contact, email, or subscription tier..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900"
              >
                <option value="all">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending_payment">Pending Payment</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-600">
            <div className="text-sm text-gray-600">
              Showing <span className="text-black font-semibold">{filteredSubmissions.length}</span> of <span className="text-black font-semibold">{totalCompanies}</span> companies
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
                    className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium hover:bg-yellow-500/30 transition-colors border border-yellow-500/30"
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
              <button
                onClick={exportToGoogleSheets}
                className="px-4 py-2 bg-yellow-500/20 text-yellow-500 rounded-lg text-sm font-medium hover:bg-yellow-500/30 transition-colors border border-yellow-500/30"
              >
                Export to Google Sheets
              </button>
            </div>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-black">Company Submissions</h2>
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
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedCompanies.length === filteredSubmissions.length && filteredSubmissions.length > 0}
                        onChange={selectedCompanies.length === filteredSubmissions.length ? clearSelection : selectAllCompanies}
                        className="rounded border-gray-300 bg-white text-yellow-500 focus:ring-yellow-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Contact Person</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Delivery Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Delivery Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Subscription</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Payment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Notes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Last Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubmissions.flatMap((submission) => 
                    (submission.employees || []).map((employee, empIndex) => (
                      <tr 
                        key={`${submission.id}-${empIndex}`} 
                        className={`hover:bg-gray-50 cursor-pointer transition-colors ${selectedCompanies.includes(submission.id) ? 'bg-yellow-50' : ''}`}
                        onClick={() => setSelectedEmployee({employee, companyName: submission.companyName || 'Unknown'})}
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
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">
                            Birthday: {new Date(employee.birthday).toLocaleDateString()}
                          </div>
                          {employee.cakeType && (
                            <div className="text-xs text-blue-600">
                              {(() => {
                                const cakeType = CAKE_TYPES.find(cake => cake.id === employee.cakeType);
                                return language === 'is' ? cakeType?.nameIcelandic : cakeType?.nameEnglish;
                              })()}
                            </div>
                          )}
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
                          <div className="text-sm text-gray-900">{submission.deliveryAddress || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            employee.deliveryStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                            employee.deliveryStatus === 'out_for_delivery' ? 'bg-blue-100 text-blue-800' :
                            employee.deliveryStatus === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                            employee.deliveryStatus === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {employee.deliveryStatus?.replace('_', ' ') || 'pending'}
                          </span>
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
                        <div className="flex flex-col space-y-1">
                          <div className="flex flex-wrap gap-1 md:gap-2">
                            {submission.status !== 'paid' ? (
                              <button
                                onClick={() => markAsPaidWithWebhook(submission.id)}
                                className="px-2 py-1 md:px-3 md:py-1 bg-yellow-500 text-black rounded text-xs font-medium hover:bg-yellow-600 transition-colors"
                              >
                                Mark Paid
                              </button>
                            ) : (
                              <button
                                onClick={() => markAsPending(submission.id)}
                                className="px-2 py-1 md:px-3 md:py-1 bg-yellow-500 text-black rounded text-xs font-medium hover:bg-yellow-600 transition-colors"
                              >
                                Mark Pending
                              </button>
                            )}
                            <button
                              onClick={() => setSelectedSubmission(submission)}
                              className="px-2 py-1 md:px-3 md:py-1 bg-yellow-500 text-black rounded text-xs font-medium hover:bg-yellow-600 transition-colors"
                            >
                              View Details
                            </button>
                            <button
                            onClick={() => {
                              toggleSubscriptionStatus(submission.id);
                            }}
                              className="px-2 py-1 md:px-3 md:py-1 bg-yellow-500 text-black rounded text-xs font-medium hover:bg-yellow-600 transition-colors"
                            >
                              {submission.subscriptionStatus === 'active' ? 'Pause' : 'Resume'}
                            </button>
                          </div>
                        </div>
                      </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
      </div>

        {/* Company Details Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div key={selectedSubmission.id} className="relative top-10 mx-auto p-0 border-0 w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-2xl rounded-xl bg-white">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedSubmission.companyName}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedSubmission.contactPersonName} • {selectedSubmission.contactEmail}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              
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
                          <div key={index} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-center">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-3">
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 truncate">{employee.name}</p>
                                    <div className="flex items-center space-x-4 text-xs text-gray-600 mt-1">
                                      <span>🎂 {new Date(employee.birthday).toLocaleDateString()}</span>
                                      <span>📅 Next Birthday: {getNextBirthdayDate(employee.birthday).toLocaleDateString()}</span>
                                      <span>🍰 {employee.cakeType || 'No cake selected'}</span>
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        employee.employmentStatus === 'active' ? 'bg-green-100 text-green-800' :
                                        employee.employmentStatus === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                      }`}>
                                        {employee.employmentStatus || 'Unknown'}
                                      </span>
                                    </div>
                                    {(employee.dietaryRestrictions || employee.specialNotes) && (
                                      <div className="mt-1 text-xs text-gray-500">
                                        {employee.dietaryRestrictions && (
                                          <span className="text-red-600">⚠️ {employee.dietaryRestrictions}</span>
                                        )}
                                        {employee.dietaryRestrictions && employee.specialNotes && <span> • </span>}
                                        {employee.specialNotes && (
                                          <span>📝 {employee.specialNotes}</span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <select
                                      value={employee.deliveryStatus || 'pending'}
                                      onChange={(e) => updateDeliveryStatusWithWebhook(selectedSubmission.id, index, e.target.value as Employee['deliveryStatus'])}
                                      className="text-xs border border-gray-300 rounded px-2 py-1 bg-white"
                                    >
                                      <option value="pending">Pending</option>
                                      <option value="confirmed">Confirmed</option>
                                      <option value="out_for_delivery">Out for Delivery</option>
                                      <option value="delivered">Delivered</option>
                                      <option value="failed">Failed</option>
                                    </select>
                                    <button
                                      onClick={() => setEditingEmployee({submissionId: selectedSubmission.id, employeeIndex: index})}
                                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                                    >
                                      ✏️ Edit
                                    </button>
                                    <button
                                      onClick={() => removeEmployee(selectedSubmission.id, index)}
                                      className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
                                    >
                                      🗑️ Remove
                                    </button>
                                  </div>
                                </div>
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

        {/* Employee Details Modal */}
        {selectedEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-0 border-0 w-11/12 md:w-2/3 lg:w-1/2 xl:w-2/5 shadow-2xl rounded-xl bg-white">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedEmployee.employee.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedEmployee.companyName}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedEmployee(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Basic Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Name:</span>
                          <span className="text-sm font-medium text-gray-900">{selectedEmployee.employee.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Birthday:</span>
                          <span className="text-sm font-medium text-gray-900">
                            {new Date(selectedEmployee.employee.birthday).toLocaleDateString('en-CA')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Employment Status:</span>
                          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                            selectedEmployee.employee.employmentStatus === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {selectedEmployee.employee.employmentStatus || 'active'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Cake Information */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Cake Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Cake Type:</span>
                          <span className="text-sm font-medium text-gray-900">
                            {selectedEmployee.employee.cakeType || 'Not selected'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Cake Cost:</span>
                          <span className="text-sm font-medium text-gray-900">
                            {selectedEmployee.employee.cakeType ? 
                              CAKE_TYPES.find(cake => cake.id === selectedEmployee.employee.cakeType)?.price.toLocaleString() + ' ISK' 
                              : 'N/A'
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Delivery Status:</span>
                          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                            selectedEmployee.employee.deliveryStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                            selectedEmployee.employee.deliveryStatus === 'out_for_delivery' ? 'bg-blue-100 text-blue-800' :
                            selectedEmployee.employee.deliveryStatus === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                            selectedEmployee.employee.deliveryStatus === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {selectedEmployee.employee.deliveryStatus?.replace('_', ' ') || 'pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dietary Restrictions & Notes */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Dietary Restrictions</h4>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600">
                          {selectedEmployee.employee.dietaryRestrictions || 'No dietary restrictions noted'}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Special Notes</h4>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600">
                          {selectedEmployee.employee.specialNotes || 'No special notes'}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Delivery Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Next Birthday:</span>
                          <span className="text-sm font-medium text-gray-900">
                            {getNextBirthdayDate(selectedEmployee.employee.birthday).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Last Updated:</span>
                          <span className="text-sm font-medium text-gray-900">
                            Unknown
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        // Update delivery status
                        const newStatus = selectedEmployee.employee.deliveryStatus === 'delivered' ? 'pending' : 'delivered';
                        // Find the submission and employee index
                        const submission = submissions.find(sub => 
                          sub.employees?.some(emp => emp.name === selectedEmployee.employee.name)
                        );
                        if (submission) {
                          const employeeIndex = submission.employees?.findIndex(emp => emp.name === selectedEmployee.employee.name) || 0;
                          updateDeliveryStatus(submission.id, employeeIndex, newStatus as Employee['deliveryStatus']);
                        }
                        setSelectedEmployee(null);
                      }}
                      className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
                    >
                      {selectedEmployee.employee.deliveryStatus === 'delivered' ? 'Mark as Pending' : 'Mark as Delivered'}
                    </button>
                    <button
                      onClick={() => setSelectedEmployee(null)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
                    >
                      Close
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
