const authMiddleware = require('./middleware/authMiddleware');

app.get('/api/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Protected data accessed' });
});
