// models/Profile.js
const mongoose = require('mongoose');

// Profile schema definition
const profileSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    education: {
        tenth: { type: String },
        inter: { type: String },
        graduate: { type: String }
    },
    workExperience: { type: String },
    professionalSummary: { type: String },
    skill: { type: String },
    achievements: { type: String },
    certifications: { type: String }
}, {
    timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
