const mongoose = require('mongoose');

const counsellingFormSchema = new mongoose.Schema({
  // Plan Information
  selectedPlan: { 
    type: String, 
    required: true,
    enum: ['Basic', 'Standard', 'Premium']
  },
  planPrice: { 
    type: Number, 
    required: true 
  },

  // Student Details
  fullName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  mobile: { 
    type: String, 
    required: true, 
    trim: true,
    match: /^[6-9]\d{9}$/
  },
  email: { 
    type: String, 
    required: true, 
    trim: true, 
    lowercase: true 
  },

  // Academic Information
  mhtCetPercentile: { 
    type: Number, 
    required: true,
    min: 0,
    max: 100
  },
  jeeMainPercentile: { 
    type: Number, 
    required: false,
    min: 0,
    max: 100,
    default: null
  },
  casteCategory: {
    type: String,
    required: true,
    enum: ['OPEN', 'EWS', 'OBC', 'SC', 'ST', 'NT-B', 'NT-C', 'NT-D', 'VJ/DT', 'SBC', 'TFWS'],
    trim: true
  },

  // Preferences
  homeUniversity: { 
    type: String, 
    required: false,
    trim: true,
    default: ''
  },
  preferredBranches: [{ 
    type: String, 
    required: true 
  }],
  preferredCities: [{ 
    type: String, 
    required: true 
  }],

  // Status & Metadata
  status: {
    type: String,
    enum: ['pending', 'contacted', 'payment_received', 'completed'],
    default: 'pending'
  },
  notes: { 
    type: String, 
    trim: true,
    default: ''
  },
  submittedAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('CounsellingForm', counsellingFormSchema);
