const mongoose = require('mongoose');

// Define the schema
const jobPostSchema = new mongoose.Schema({
  JobTitle: { type: String, required: true },
  JobDescription: { type: String, required: true },
  JobLocation: {
    type: {
      address: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    required: true,
  },
  EmploymentType: { type: String, required: true },
  SalaryCompensation: { type: String, required: true },
  RequiredQualifications: { type: String, required: true },
  ExperienceLevel: { type: String, required: true },
  Skill: { type: String, required: true },
  JobPostingDate: { type: Date, required: true },
  ApplicationDeadline: { type: Date, required: true },
  ApplicationInstructions: { type: String, required: true },
  BenefitsAndPerks: { type: [String], required: true },
  CompanyName: { type: String, required: true },
  CompanyDescription: { type: String, required: true },
});

// Create and export the model
module.exports = mongoose.model('JobPost', jobPostSchema);
