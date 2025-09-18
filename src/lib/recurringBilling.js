import cron from 'node-cron';
import connectDB from './mongodb';
import Company from '@/models/Company';
import Payment from '@/models/Payment';
import aurService from './aurService';

class RecurringBillingService {
  constructor() {
    this.isRunning = false;
    this.cronJob = null;
  }

  /**
   * Start the recurring billing service
   * Runs daily at 9:00 AM to check for due subscriptions
   */
  start() {
    if (this.isRunning) {
      console.log('Recurring billing service is already running');
      return;
    }

    // Run daily at 9:00 AM
    this.cronJob = cron.schedule('0 9 * * *', async () => {
      console.log('Running recurring billing check...');
      await this.processRecurringBilling();
    }, {
      scheduled: true,
      timezone: 'Atlantic/Reykjavik' // Iceland timezone
    });

    this.isRunning = true;
    console.log('Recurring billing service started - runs daily at 9:00 AM Iceland time');
  }

  /**
   * Stop the recurring billing service
   */
  stop() {
    if (this.cronJob) {
      this.cronJob.stop();
      this.cronJob = null;
    }
    this.isRunning = false;
    console.log('Recurring billing service stopped');
  }

  /**
   * Process all due subscriptions
   */
  async processRecurringBilling() {
    try {
      await connectDB();

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Find companies with due subscriptions
      const dueCompanies = await Company.find({
        subscriptionStatus: 'active',
        nextBillingDate: { $lte: today }
      });

      console.log(`Found ${dueCompanies.length} companies with due subscriptions`);

      for (const company of dueCompanies) {
        await this.processCompanyBilling(company);
      }

      console.log('Recurring billing check completed');

    } catch (error) {
      console.error('Recurring billing error:', error);
    }
  }

  /**
   * Process billing for a single company
   * @param {Object} company - Company object
   */
  async processCompanyBilling(company) {
    try {
      console.log(`Processing billing for company: ${company.name}`);

      // Generate new order ID
      const orderId = Payment.generateOrderId();

      // Create payment record
      const payment = new Payment({
        companyId: company._id,
        orderId: orderId,
        amount: company.monthlyCost,
        status: 'pending',
        isRecurring: true,
        billingPeriod: {
          start: company.nextBillingDate,
          end: new Date(company.nextBillingDate.getTime() + 30 * 24 * 60 * 60 * 1000)
        }
      });

      await payment.save();

      // Create Aur charge
      const aurResult = await aurService.createRecurringCharge(company, orderId);

      if (aurResult.success) {
        // Update payment with Aur details
        payment.aurToken = aurResult.aurToken;
        payment.status = 'processing';
        await payment.save();

        console.log(`Payment request sent for company ${company.name}, order: ${orderId}`);

        // Update company next billing date (will be confirmed when payment completes)
        company.nextBillingDate = new Date(company.nextBillingDate.getTime() + 30 * 24 * 60 * 60 * 1000);
        await company.save();

      } else {
        // Aur charge failed
        payment.status = 'failed';
        payment.failureReason = aurResult.error;
        payment.updateRetryInfo();
        await payment.save();

        console.error(`Payment request failed for company ${company.name}:`, aurResult.error);

        // If this is the third failed attempt, suspend subscription
        if (payment.retryCount >= 3) {
          company.subscriptionStatus = 'suspended';
          await company.save();
          console.log(`Subscription suspended for company ${company.name} after 3 failed attempts`);
        }
      }

    } catch (error) {
      console.error(`Error processing billing for company ${company.name}:`, error);
    }
  }

  /**
   * Process failed payments retry
   * Runs every 6 hours to retry failed payments
   */
  async processFailedPaymentsRetry() {
    try {
      await connectDB();

      const now = new Date();
      
      // Find failed payments that are ready for retry
      const failedPayments = await Payment.find({
        status: 'failed',
        retryCount: { $lt: 3 },
        nextRetryDate: { $lte: now }
      }).populate('companyId');

      console.log(`Found ${failedPayments.length} failed payments ready for retry`);

      for (const payment of failedPayments) {
        await this.retryPayment(payment);
      }

    } catch (error) {
      console.error('Failed payments retry error:', error);
    }
  }

  /**
   * Retry a failed payment
   * @param {Object} payment - Payment object
   */
  async retryPayment(payment) {
    try {
      const company = payment.companyId;
      
      if (!company || company.subscriptionStatus !== 'active') {
        console.log(`Skipping retry for payment ${payment.orderId} - company not active`);
        return;
      }

      console.log(`Retrying payment for company: ${company.name}, order: ${payment.orderId}`);

      // Create new order ID for retry
      const newOrderId = Payment.generateOrderId();

      // Create new payment record
      const newPayment = new Payment({
        companyId: company._id,
        orderId: newOrderId,
        amount: payment.amount,
        status: 'pending',
        isRecurring: payment.isRecurring,
        parentPaymentId: payment._id,
        billingPeriod: payment.billingPeriod
      });

      await newPayment.save();

      // Create Aur charge
      const aurResult = await aurService.createRecurringCharge(company, newOrderId);

      if (aurResult.success) {
        newPayment.aurToken = aurResult.aurToken;
        newPayment.status = 'processing';
        await newPayment.save();

        console.log(`Retry payment request sent for company ${company.name}, order: ${newOrderId}`);

      } else {
        newPayment.status = 'failed';
        newPayment.failureReason = aurResult.error;
        newPayment.updateRetryInfo();
        await newPayment.save();

        console.error(`Retry payment failed for company ${company.name}:`, aurResult.error);
      }

    } catch (error) {
      console.error(`Error retrying payment ${payment.orderId}:`, error);
    }
  }

  /**
   * Get billing statistics
   * @returns {Object} Billing statistics
   */
  async getBillingStats() {
    try {
      await connectDB();

      const today = new Date();
      const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

      const stats = await Payment.aggregate([
        {
          $match: {
            createdAt: { $gte: thisMonth }
          }
        },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            totalAmount: { $sum: '$amount' }
          }
        }
      ]);

      const totalCompanies = await Company.countDocuments({
        subscriptionStatus: 'active'
      });

      const dueSubscriptions = await Company.countDocuments({
        subscriptionStatus: 'active',
        nextBillingDate: { $lte: today }
      });

      return {
        thisMonth: stats,
        totalActiveCompanies: totalCompanies,
        dueSubscriptions: dueSubscriptions,
        lastChecked: new Date()
      };

    } catch (error) {
      console.error('Error getting billing stats:', error);
      return null;
    }
  }

  /**
   * Manually trigger billing for a specific company
   * @param {string} companyId - Company ID
   */
  async triggerBillingForCompany(companyId) {
    try {
      await connectDB();

      const company = await Company.findById(companyId);
      if (!company) {
        throw new Error('Company not found');
      }

      if (company.subscriptionStatus !== 'active') {
        throw new Error('Company subscription is not active');
      }

      await this.processCompanyBilling(company);
      return { success: true, message: 'Billing triggered successfully' };

    } catch (error) {
      console.error('Error triggering billing for company:', error);
      return { success: false, error: error.message };
    }
  }
}

// Export singleton instance
export default new RecurringBillingService();

