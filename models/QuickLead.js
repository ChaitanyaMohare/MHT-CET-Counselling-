const mongoose = require('mongoose');

const quickLeadSchema = new mongoose.Schema({
  fullName:    { type: String, required: true, trim: true },
  mobile:      { type: String, required: true, trim: true },
  email:       { type: String, required: true, trim: true, lowercase: true },
  mhtCetScore: { type: String, trim: true },
  jeeScore:    { type: String, trim: true },
  branches:    [{ type: String }],   // multi-select checkboxes
  cities:      [{ type: String }],   // multi-select checkboxes
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuickLead', quickLeadSchema);
