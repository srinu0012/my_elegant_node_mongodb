const JobPost = require('../models/JobPost');

// Create a job post
exports.createJobPost = async (req, res) => {
  try {
    const jobPost = new JobPost(req.body);
    const savedJobPost = await jobPost.save();
    res.status(201).json(savedJobPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all job posts
exports.getJobPosts = async (req, res) => {
  try {
    const jobPosts = await JobPost.find();
    res.status(200).json(jobPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific job post by ID
exports.getJobPostById = async (req, res) => {
  try {
    const jobPost = await JobPost.findById(req.params.id);
    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' });
    }
    res.status(200).json(jobPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a job post
exports.updateJobPost = async (req, res) => {
  try {
    const jobPost = await JobPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' });
    }
    res.status(200).json(jobPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a job post
exports.deleteJobPost = async (req, res) => {
  try {
    const jobPost = await JobPost.findByIdAndDelete(req.params.id);
    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' });
    }
    res.status(200).json({ message: 'Job post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

