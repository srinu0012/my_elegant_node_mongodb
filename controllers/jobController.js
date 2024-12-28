const Job = require('../models/JobPost');

// Controller function for filtering jobs by skill
const filterJobsBySkill = async (req, res) => {
    const { skill } = req.query; // Extract skill from query string

    try {
        // Check if the skill parameter is provided
        if (!skill) {
            return res.status(400).json({ error: 'Skill parameter is required' });
        }

        // Find jobs where skillsRequired contains the given skill
        const jobs = await Job.find({ Skill: skill });

        // If no jobs are found for the skill
        if (jobs.length === 0) {
            return res.status(404).json({ error: 'No jobs found for this skill' });
        }

        // Return the filtered jobs
        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { filterJobsBySkill };
