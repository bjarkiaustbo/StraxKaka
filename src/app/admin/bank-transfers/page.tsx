'use client';

import { useState, useEffect } from 'react';
import AdminNavigation from '@/components/AdminNavigation';

interface BankTransfer {
  orderId: string;
  companyName: string;
  companyEmail: string;
  amount: number;
  status: 'pending' | 'completed';
  createdAt: string;
  completedAt?: string;
  adminNotes?: string;
  confirmedBy?: string;
}

export default function BankTransfersPage() {
  const [transfers, setTransfers] = useState<BankTransfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTransfer, setSelectedTransfer] = useState<BankTransfer | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch('/api/admin/confirm-payment?status=pending', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        if (response.status === 500) {
          throw new Error('Server error - please try again later');
        } else if (response.status === 404) {
          throw new Error('API endpoint not found');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      
      const result = await response.json();
      
      if (result.success) {
        setTransfers(result.data || []);
      } else {
        setError(result.error || 'Failed to fetch transfers');
        setTransfers([]);
      }
    } catch (err) {
      let errorMessage = 'Failed to fetch transfers';
      
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = 'Request timed out - please try again';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      setTransfers([]);
      console.error('Error fetching transfers:', err);
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = async (orderId: string) => {
    try {
      setConfirming(true);
      const response = await fetch('/api/admin/confirm-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          adminNotes,
          confirmedBy: 'admin'
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        // Refresh the list
        await fetchTransfers();
        setSelectedTransfer(null);
        setAdminNotes('');
        alert('Payment confirmed successfully!');
      } else {
        alert(result.error || 'Failed to confirm payment');
      }
    } catch (err) {
      alert('Failed to confirm payment');
      console.error('Error confirming payment:', err);
    } finally {
      setConfirming(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('is-IS', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('is-IS') + ' ISK';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading bank transfers...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminNavigation currentPage="bank-transfers" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bank Transfer Management</h1>
          <p className="mt-2 text-gray-600">Manage pending bank transfer payments</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <p className="text-red-800 font-medium">{error}</p>
                <p className="text-red-600 text-sm mt-1">
                  If this problem persists, please contact support or try again later.
                </p>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={fetchTransfers}
                  className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors text-sm"
                >
                  Retry
                </button>
                <button
                  onClick={() => window.location.href = '/admin'}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors text-sm"
                >
                  Back to Admin
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Transfers</p>
                <p className="text-2xl font-semibold text-gray-900">{transfers.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Pending Amount</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatAmount(transfers.reduce((sum, transfer) => sum + transfer.amount, 0))}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">🏢</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Companies</p>
                <p className="text-2xl font-semibold text-gray-900">{transfers.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transfers List */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Pending Bank Transfers</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transfers.map((transfer) => (
                  <tr key={transfer.orderId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="text-sm font-mono text-gray-900">{transfer.orderId}</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{transfer.companyName}</div>
                        <div className="text-sm text-gray-500">{transfer.companyEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">
                        {formatAmount(transfer.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(transfer.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedTransfer(transfer)}
                        className="text-yellow-600 hover:text-yellow-900 mr-4"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => confirmPayment(transfer.orderId)}
                        className="text-green-600 hover:text-green-900"
                        disabled={confirming}
                      >
                        {confirming ? 'Confirming...' : 'Confirm Payment'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {transfers.length === 0 && !loading && (
            <div className="text-center py-12">
              <span className="text-4xl">📋</span>
              <p className="mt-4 text-gray-500">No pending bank transfers</p>
              <p className="text-sm text-gray-400 mt-2">
                New bank transfer payments will appear here once companies complete their subscription.
              </p>
            </div>
          )}
        </div>

        {/* Transfer Details Modal */}
        {selectedTransfer && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Transfer Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Order ID</label>
                    <p className="text-sm text-gray-900 font-mono">{selectedTransfer.orderId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Company</label>
                    <p className="text-sm text-gray-900">{selectedTransfer.companyName}</p>
                    <p className="text-sm text-gray-500">{selectedTransfer.companyEmail}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Amount</label>
                    <p className="text-sm text-gray-900 font-semibold">{formatAmount(selectedTransfer.amount)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Created</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedTransfer.createdAt)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Admin Notes</label>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      rows={3}
                      placeholder="Add notes about this payment confirmation..."
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setSelectedTransfer(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => confirmPayment(selectedTransfer.orderId)}
                    disabled={confirming}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    {confirming ? 'Confirming...' : 'Confirm Payment'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
