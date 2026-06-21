const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true },
  lastName: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  school: { type: String, required: true, trim: true },
  board: { type: String, enum: ['SSC', 'CBSE', 'ICSE', 'Other'], required: true },
  twelfthPercent: { type: Number, required: true, min: 0, max: 100 },
  pcmPercent: { type: Number, required: true, min: 0, max: 100 },
  cetPercentile: { type: Number, required: true, min: 0, max: 100 },
  attempt: { type: String, enum: ['1st', '2nd', 'Both'], required: true },
  category: {
    type: String,
    enum: ['General', 'OBC', 'SC', 'ST', 'NT', 'EWS', 'VJ-DT'],
    required: true
  },
  subCategory: {
    type: String,
    enum: ['PWD', 'Ex-Serviceman', 'Orphan', 'None'],
    default: 'None'
  },
  domicile: {
    type: String,
    enum: ['Maharashtra', 'Outside Maharashtra'],
    required: true
  },
  selectedPlan: {
    type: String,
    enum: ['Basic', 'Pro', 'Premium'],
    required: true
  },
  planAmount: { type: Number },
  paymentStatus: {
    type: String,
    enum: ['pending_payment', 'paid', 'failed'],
    default: 'pending_payment'
  },
  paymentId: { type: String },
  orderId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);
