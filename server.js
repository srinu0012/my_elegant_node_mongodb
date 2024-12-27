const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./db/db');
const applicantRoutes = require('./routes/applicant');
const companyRoutes = require('./routes/company');
const jobPostRoutes = require('./routes/jobPostRoutes');
const profileRoutes = require('./routes/profile');
const cors=require("cors")


dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors())
// Database connection
connectDB();
// Routes
app.use('/api/applicant', applicantRoutes);

// Register company routes
app.use('/api/company', companyRoutes);


app.use('/api/job-posts', jobPostRoutes);


app.use('/api/profile', profileRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
