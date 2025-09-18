import mongoose from 'mongoose';

const paymentLogSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  confirmedBy: {
    type: String,
    required: true,
    trim: true
  },
  dateConfirmed: {
    type: Date,
    required: true,
    default: Date.now
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentMethod: {
    type: String,
    enum: ['bank_transfer', 'aur', 'stripe', 'paypal'],
    default: 'bank_transfer'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient queries
paymentLogSchema.index({ orderId: 1 });
paymentLogSchema.index({ companyId: 1 });
paymentLogSchema.index({ dateConfirmed: -1 });
paymentLogSchema.index({ confirmedBy: 1 });

// Get payment logs for a specific company
paymentLogSchema.statics.getCompanyLogs = function(companyId) {
  return this.find({ companyId })
    .sort({ dateConfirmed: -1 })
    .populate('companyId', 'name email');
};

// Get payment logs by order ID
paymentLogSchema.statics.getOrderLogs = function(orderId) {
  return this.find({ orderId })
    .sort({ dateConfirmed: -1 })
    .populate('companyId', 'name email');
};

// Get admin activity summary
paymentLogSchema.statics.getAdminActivity = function(adminName, startDate, endDate) {
  const query = { confirmedBy: adminName };
  
  if (startDate && endDate) {
    query.dateConfirmed = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }
  
  return this.find(query)
    .sort({ dateConfirmed: -1 })
    .populate('companyId', 'name email');
};

export default mongoose.models.PaymentLog || mongoose.model('PaymentLog', paymentLogSchema);

