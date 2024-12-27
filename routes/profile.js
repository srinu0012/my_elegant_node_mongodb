// routes/profile.js
const express = require('express');
const Profile = require('../models/Profile');

const router = express.Router();

// Create a new profile
router.post('/', async (req, res) => {
    const { fullName, email, phone, education, workExperience, professionalSummary, skill, achievements, certifications } = req.body;

    try {
        // Check if a profile with the same email already exists
        const existingProfile = await Profile.findOne({ email });
        if (existingProfile) {
            return res.status(400).json({ error: 'Profile with this email already exists' });
        }

        // Create and save the profile
        const profile = new Profile({
            fullName,
            email,
            phone,
            education,
            workExperience,
            professionalSummary,
            skill,
            achievements,
            certifications
        });

        await profile.save();

        res.status(201).json({ message: 'Profile created successfully', profile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get profile by email
router.get('/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const profile = await Profile.findOne({ email });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update profile
router.put('/:email', async (req, res) => {
    const { email } = req.params;
    const updateData = req.body;

    try {
        const profile = await Profile.findOneAndUpdate({ email }, updateData, { new: true });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', profile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
