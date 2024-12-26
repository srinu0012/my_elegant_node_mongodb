const express = require('express');
const Applicant = require('../models/Applicant');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

// Register Applicant
router.post('/register', async (req, res) => {
    const { username, email, password, phone } = req.body;

    try {
        // Check if applicant already exists
        const existingApplicant = await Applicant.findOne({ email });
        if (existingApplicant) {
            return res.status(400).json({ error: 'Applicant already exists' });
        }

        // Create new applicant
        const applicant = new Applicant({ username, email, password, phone });
        await applicant.save();

        res.status(201).json({ message: 'Applicant registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login Applicant
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find applicant by username
        const applicant = await Applicant.findOne({ username });
        if (!applicant) {
            console.log("no username")
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Compare input password with stored password
        const isMatch = await applicant.comparePassword(password);
        if (!isMatch) {
            console.log("password")
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign(
            { id: applicant._id, email: applicant.username },
            process.env.JWT_SECRET
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
