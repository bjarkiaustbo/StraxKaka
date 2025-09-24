import crypto from 'crypto';
import axios from 'axios';

class AurService {
  constructor() {
    this.baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://api.aurapp.is/figo/api/v1/store/web'
      : 'https://test-backendapi.aurapp.is/figo/api/v1/store/web';
    
    this.webToken = process.env.AUR_WEB_TOKEN;
    this.secret = process.env.AUR_SECRET;
    this.merchantId = process.env.AUR_MERCHANT_ID;
    this.callbackUrl = process.env.CALLBACK_URL || `${process.env.NEXT_PUBLIC_BASE_URL}/api/aur/orderupdate`;
  }

  /**
   * Generate HMAC signature for Aur API
   * @param {string} data - Data to sign
   * @returns {string} HMAC signature
   */
  generateHmac(data) {
    return crypto
      .createHmac('sha256', this.secret)
      .update(data)
      .digest('hex');
  }

  /**
   * Create a charge request to Aur
   * @param {Object} params - Charge parameters
   * @param {string} params.msisdn - Phone number (7 digits)
   * @param {number} params.amount - Amount in ISK
   * @param {string} params.description - Payment description
   * @param {string} params.orderId - Unique order ID
   * @returns {Promise<Object>} Aur API response
   */
  async createCharge({ msisdn, amount, description, orderId }) {
    try {
      // Validate inputs
      if (!msisdn || !/^\d{7}$/.test(msisdn)) {
        throw new Error('Invalid phone number. Must be exactly 7 digits.');
      }

      if (!amount || amount <= 0) {
        throw new Error('Invalid amount. Must be greater than 0.');
      }

      if (!description || !orderId) {
        throw new Error('Description and orderId are required.');
      }

      // Prepare request data
      const requestData = {
        msisdn: msisdn,
        amount: Math.round(amount), // Ensure integer
        description: description.substring(0, 100), // Limit description length
        orderid: orderId,
        merchantId: this.merchantId, // Your merchant ID
        callbackUrl: this.callbackUrl
      };

      // Generate HMAC
      const hmacData = `${msisdn}${amount}${description}${orderId}${this.merchantId}`;
      const hmac = this.generateHmac(hmacData);
      requestData.hmac = hmac;

      // Make API request
      const response = await axios.post(
        `${this.baseUrl}/purchase`,
        requestData,
        {
          headers: {
            'figo-web-token': this.webToken,
            'Content-Type': 'application/json'
          },
          timeout: 30000 // 30 second timeout
        }
      );

      return {
        success: true,
        data: response.data,
        orderId: orderId,
        aurToken: response.data.token || response.data.orderid
      };

    } catch (error) {
      console.error('Aur charge creation failed:', error);
      
      return {
        success: false,
        error: error.message,
        details: error.response?.data || null
      };
    }
  }

  /**
   * Check transaction status with Aur
   * @param {string} token - Aur transaction token
   * @returns {Promise<Object>} Transaction status
   */
  async checkTransactionStatus(token) {
    try {
      if (!token) {
        throw new Error('Token is required to check transaction status.');
      }

      const response = await axios.get(
        `${this.baseUrl}/transaction`,
        {
          headers: {
            'figo-web-token': this.webToken
          },
          params: {
            token: token
          },
          timeout: 15000 // 15 second timeout
        }
      );

      return {
        success: true,
        data: response.data
      };

    } catch (error) {
      console.error('Aur transaction status check failed:', error);
      
      return {
        success: false,
        error: error.message,
        details: error.response?.data || null
      };
    }
  }

  /**
   * Validate webhook signature
   * @param {Object} payload - Webhook payload
   * @param {string} signature - Received signature
   * @returns {boolean} Whether signature is valid
   */
  validateWebhookSignature(payload, signature) {
    try {
      const expectedSignature = this.generateHmac(JSON.stringify(payload));
      return crypto.timingSafeEqual(
        Buffer.from(signature, 'hex'),
        Buffer.from(expectedSignature, 'hex')
      );
    } catch (error) {
      console.error('Webhook signature validation failed:', error);
      return false;
    }
  }

  /**
   * Process webhook callback
   * @param {Object} payload - Webhook payload
   * @returns {Object} Processed webhook data
   */
  processWebhook(payload) {
    try {
      const {
        orderid,
        status,
        transactionid,
        amount,
        msisdn,
        timestamp,
        errorcode,
        errormessage
      } = payload;

      return {
        orderId: orderid,
        status: status?.toUpperCase(),
        transactionId: transactionid,
        amount: parseInt(amount) || 0,
        msisdn: msisdn,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
        errorCode: errorcode,
        errorMessage: errormessage,
        isSuccessful: status?.toUpperCase() === 'FINISHED',
        isFailed: status?.toUpperCase() === 'CANCELLED' || !!errorcode
      };

    } catch (error) {
      console.error('Webhook processing failed:', error);
      return {
        error: 'Failed to process webhook payload',
        originalPayload: payload
      };
    }
  }

  /**
   * Create recurring charge for subscription
   * @param {Object} company - Company object
   * @param {string} orderId - New order ID
   * @returns {Promise<Object>} Charge creation result
   */
  async createRecurringCharge(company, orderId) {
    const description = `StraxKaka subscription - ${company.name} (${company.subscriptionTier})`;
    
    return await this.createCharge({
      msisdn: company.phone,
      amount: company.monthlyCost,
      description: description,
      orderId: orderId
    });
  }

  /**
   * Test Aur API connection
   * @returns {Promise<Object>} Connection test result
   */
  async testConnection() {
    try {
      // Try to create a test charge with minimal amount
      const testResult = await this.createCharge({
        msisdn: '1234567', // Test phone number
        amount: 1, // 1 ISK test amount
        description: 'StraxKaka API Test',
        orderId: `TEST_${Date.now()}`
      });

      return {
        success: testResult.success,
        message: testResult.success ? 'Aur API connection successful' : 'Aur API connection failed',
        details: testResult
      };

    } catch (error) {
      return {
        success: false,
        message: 'Aur API connection test failed',
        error: error.message
      };
    }
  }
}

// Export singleton instance
const aurService = new AurService();
export default aurService;
