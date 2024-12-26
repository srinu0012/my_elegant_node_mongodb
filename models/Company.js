// models/Company.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Company schema definition
const companySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    gstNumber: { type: String, required: true, unique: true },
    certificate_number: { type: String, required: true, unique: true },
    companyPanNumber: { type: String, required: true },
    uniqueCompanyIdentifier: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});

// Hash password before saving to DB
companySchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare passwords
companySchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
