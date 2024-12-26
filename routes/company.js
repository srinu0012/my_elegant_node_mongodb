// routes/company.js
const express = require('express');
const Company = require('../models/Company');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

// Register Company
router.post('/register', async (req, res) => {
    const { companyName, gstNumber, certificate_number, companyPanNumber, uniqueCompanyIdentifier, password } = req.body;

    try {
        // Check if company already exists
        const existingCompany = await Company.findOne({ $or: [{ gstNumber }, { certificate_number }, { uniqueCompanyIdentifier }] });
        if (existingCompany) {
            return res.status(400).json({ error: 'Company with given details already exists' });
        }

        // Create new company
        const company = new Company({
            companyName,
            gstNumber,
            certificate_number,
            companyPanNumber,
            uniqueCompanyIdentifier,
            password,
        });

        // Save company to database
        await company.save();

        res.status(201).json({ message: 'Company registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Company Login
router.post('/login', async (req, res) => {
    const { uniqueCompanyIdentifier, password } = req.body;

    try {
        // Check if the company exists
        const company = await Company.findOne({ uniqueCompanyIdentifier });
        if (!company) {
            return res.status(400).json({ error: 'Invalid unique company identifier' });
        }

        // Compare passwords
        const isMatch = await company.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
