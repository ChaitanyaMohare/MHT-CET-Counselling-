const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: false, 
    trim: true, 
    lowercase: true,
    default: 'callback@praveshmitra.in'
  },
  mobile: { 
    type: String, 
    required: true, 
    trim: true 
  },
  message: { 
    type: String, 
    required: false, 
    trim: true,
    default: ''
  },
  preferredDate: {
    type: String,
    required: false
  },
  preferredTime: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'completed'],
    default: 'pending'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Contact', contactSchema);
