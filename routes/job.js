const express = require('express');
const { filterJobsBySkill } = require('../controllers/jobController');

const router = express.Router();

// Route to filter jobs by skill
router.get('/filter', filterJobsBySkill);

module.exports = router;
