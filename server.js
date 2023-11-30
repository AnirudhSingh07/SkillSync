
// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/kunwaranirudhsingh7', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Handle form submissions
app.post('/submit-form', async (req, res) => {
    try {
        const formData = req.body;
        const user = new User(formData);
        await user.save();
        res.json({ success: true, data: formData });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Route to get demographics data
app.get('/demographics', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // Extract and send relevant demographics data
        const demographicsData = {
            totalUsers: users.length,
            averageAge: calculateAverage(users.map(user => user.age)),
            // Add other demographics calculations as needed
        };

        res.json(demographicsData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:3000`);
});

// Function to calculate average age
function calculateAverage(ages) {
    const sum = ages.reduce((acc, age) => acc + age, 0);
    return sum / ages.length || 0;
}
