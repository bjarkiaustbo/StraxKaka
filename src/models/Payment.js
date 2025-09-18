import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  orderId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  aurToken: {
    type: String,
    trim: true
  },
  aurTransactionId: {
    type: String,
    trim: true
  },
  aurStatus: {
    type: String,
    trim: true
  },
  aurResponse: {
    type: mongoose.Schema.Types.Mixed
  },
  paymentMethod: {
    type: String,
    enum: ['aur', 'stripe', 'paypal'],
    default: 'aur'
  },
  billingPeriod: {
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    }
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  parentPaymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  failureReason: {
    type: String,
    trim: true
  },
  retryCount: {
    type: Number,
    default: 0,
    max: 3
  },
  nextRetryDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
});

// Update the updatedAt field before saving
paymentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Set completedAt when status changes to completed
  if (this.isModified('status') && this.status === 'completed' && !this.completedAt) {
    this.completedAt = new Date();
  }
  
  next();
});

// Generate unique order ID
paymentSchema.statics.generateOrderId = function() {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8);
  return `STRAX_${timestamp}_${random}`.toUpperCase();
};

// Check if payment is successful
paymentSchema.methods.isSuccessful = function() {
  return this.status === 'completed' && this.aurStatus === 'FINISHED';
};

// Check if payment failed
paymentSchema.methods.isFailed = function() {
  return ['failed', 'cancelled'].includes(this.status) || 
         this.aurStatus === 'CANCELLED';
};

// Check if payment is pending
paymentSchema.methods.isPending = function() {
  return ['pending', 'processing'].includes(this.status) && 
         !['FINISHED', 'CANCELLED'].includes(this.aurStatus);
};

// Calculate days until next retry
paymentSchema.methods.getDaysUntilRetry = function() {
  if (!this.nextRetryDate) return null;
  
  const now = new Date();
  const diffTime = this.nextRetryDate - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Update retry information
paymentSchema.methods.updateRetryInfo = function() {
  this.retryCount += 1;
  
  // Exponential backoff: 1 day, 3 days, 7 days
  const retryDays = [1, 3, 7][Math.min(this.retryCount - 1, 2)];
  this.nextRetryDate = new Date(Date.now() + retryDays * 24 * 60 * 60 * 1000);
};

// Get payment summary for display
paymentSchema.methods.getSummary = function() {
  return {
    orderId: this.orderId,
    amount: this.amount,
    status: this.status,
    aurStatus: this.aurStatus,
    createdAt: this.createdAt,
    completedAt: this.completedAt,
    isSuccessful: this.isSuccessful(),
    isFailed: this.isFailed(),
    isPending: this.isPending()
  };
};

// Index for efficient queries
paymentSchema.index({ companyId: 1, createdAt: -1 });
paymentSchema.index({ orderId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ aurToken: 1 });
paymentSchema.index({ nextRetryDate: 1 });

export default mongoose.models.Payment || mongoose.model('Payment', paymentSchema);

