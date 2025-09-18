import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  birthday: {
    type: Date,
    required: true
  },
  cakeType: {
    type: String,
    required: true,
    trim: true
  },
  cakeSize: {
    type: String,
    enum: ['small', 'medium', 'large', 'extra-large'],
    default: 'medium'
  },
  dietaryRestrictions: {
    type: String,
    trim: true,
    default: ''
  },
  specialNotes: {
    type: String,
    trim: true,
    default: ''
  }
});

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        // Icelandic phone number validation (7 digits)
        return /^\d{7}$/.test(v);
      },
      message: 'Phone number must be exactly 7 digits'
    }
  },
  employees: [employeeSchema],
  subscriptionStatus: {
    type: String,
    enum: ['pending_payment', 'active', 'suspended', 'cancelled'],
    default: 'pending_payment'
  },
  subscriptionTier: {
    type: String,
    enum: ['small', 'medium', 'large', 'enterprise'],
    default: 'small'
  },
  monthlyCost: {
    type: Number,
    required: true,
    min: 0
  },
  nextBillingDate: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
    }
  },
  aurCustomerId: {
    type: String,
    trim: true
  },
  orderId: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  paymentDate: {
    type: Date
  },
  lastPaymentDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
companySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate subscription tier based on employee count
companySchema.methods.calculateTier = function() {
  const employeeCount = this.employees.length;
  
  if (employeeCount <= 5) return 'small';
  if (employeeCount <= 10) return 'medium';
  if (employeeCount <= 20) return 'large';
  return 'enterprise';
};

// Calculate monthly cost based on tier
companySchema.methods.calculateMonthlyCost = function() {
  const tier = this.calculateTier();
  
  const pricing = {
    small: 3000,
    medium: 5000,
    large: 10000,
    enterprise: 15000
  };
  
  return pricing[tier] || 3000;
};

// Update subscription details
companySchema.methods.updateSubscription = function() {
  this.subscriptionTier = this.calculateTier();
  this.monthlyCost = this.calculateMonthlyCost();
  this.nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
};

// Check if subscription is active
companySchema.methods.isActive = function() {
  return this.subscriptionStatus === 'active' && 
         this.nextBillingDate > new Date();
};

// Get upcoming birthdays (next 30 days)
companySchema.methods.getUpcomingBirthdays = function() {
  const today = new Date();
  const next30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  
  return this.employees.filter(employee => {
    const birthday = new Date(employee.birthday);
    const thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
    
    // If birthday already passed this year, check next year
    if (thisYearBirthday < today) {
      thisYearBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    return thisYearBirthday >= today && thisYearBirthday <= next30Days;
  });
};

export default mongoose.models.Company || mongoose.model('Company', companySchema);
