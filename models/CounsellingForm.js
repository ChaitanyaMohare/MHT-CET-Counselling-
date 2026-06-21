const mongoose = require('mongoose');

const counsellingFormSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },

  // Section A: Branch Preferences
  branchPrimary: { type: String, required: true },
  branchSecondary: [{ type: String }],
  lateralEntry: { type: String, enum: ['Yes', 'No'], default: 'No' },

  // Section B: College Type
  collegeType: [{ type: String }],
  minorityOk: { type: String, enum: ['Yes', 'No'], default: 'No' },
  deemedOk: { type: String, enum: ['Yes', 'No'], default: 'No' },

  // Section C: Location Preferences
  preferredCities: [{ type: String }],
  maxDistance: { type: String, enum: ['50km', '100km', '200km', 'Any'], default: 'Any' },
  homeDistrict: { type: String, trim: true },

  // Section D: College Quality
  rankingPreference: {
    type: String,
    enum: ['Top 10', 'Top 25', 'Top 50', 'Any Accredited'],
    default: 'Any Accredited'
  },
  naacGrade: { type: String, enum: ['A++', 'A+', 'A', 'B++', 'Any'], default: 'Any' },
  nbaRequired: { type: String, enum: ['Yes', 'No'], default: 'No' },
  placementPriority: {
    type: String,
    enum: ['>90%', '>75%', '>60%', 'Not a priority'],
    default: 'Not a priority'
  },

  // Section E: Financial
  feeBudget: {
    type: String,
    enum: ['Under ₹1L', '₹1L–1.5L', '₹1.5L–2L', 'Above ₹2L', 'No Limit'],
    default: 'No Limit'
  },
  hostelRequired: { type: String, enum: ['Yes', 'No'], default: 'No' },
  hostelType: { type: String, enum: ['Boys', 'Girls', 'Any', ''], default: '' },
  scholarshipNeeded: { type: String, enum: ['Yes', 'No'], default: 'No' },

  // Section F: Priority Ranking
  priorityRanking: {
    collegeReputation: { type: Number, min: 1, max: 5 },
    branch: { type: Number, min: 1, max: 5 },
    location: { type: Number, min: 1, max: 5 },
    fee: { type: Number, min: 1, max: 5 },
    placement: { type: Number, min: 1, max: 5 }
  },

  // Section G: Special Preferences
  sportsQuota: { type: String, enum: ['Yes', 'No'], default: 'No' },
  managementQuota: { type: String, enum: ['Yes', 'No'], default: 'No' },
  targetCollege: { type: String, trim: true },
  excludeCollege: { type: String, trim: true },

  // Section H: Career Goals
  careerPlan: {
    type: String,
    enum: ['Job', 'GATE-Masters', 'MBA', 'Startup', 'Not Sure'],
    default: 'Not Sure'
  },
  dreamCompanies: { type: String, trim: true },
  notes: { type: String, trim: true },

  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CounsellingForm', counsellingFormSchema);
