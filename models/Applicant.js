const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Applicant schema definition
const applicantSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
}, {
    timestamps: true
});

// Hash password before saving to DB
applicantSchema.pre('save', async function (next) {
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
applicantSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;
