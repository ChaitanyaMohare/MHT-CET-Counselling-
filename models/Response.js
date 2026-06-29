const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  mobileNo: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  mhtCetScore: {
    type: Number,
    required: true
  },
  jeeScore: {
    type: Number,
    default: null
  },
  percentileRange: {
    type: String,
    required: true
  },
  branches: {
    type: [String],
    required: true
  },
  cities: {
    type: [String],
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Response', responseSchema);
