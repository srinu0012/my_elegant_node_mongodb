const express = require('express');
const router = express.Router();
const jobPostController = require('../controllers/jobPostController');

// Define routes
router.post('/', jobPostController.createJobPost);
router.get('/', jobPostController.getJobPosts);
router.get('/:id', jobPostController.getJobPostById);
router.put('/:id', jobPostController.updateJobPost);
router.delete('/:id', jobPostController.deleteJobPost);

module.exports = router;
