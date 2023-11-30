// backendscript.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path as needed

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://kunwaranirudhsingh7:12345678K@ani.5bonde9.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Handle form submissions
app.post('/submit-form', async (req, res) => {
    try {
        // Process the form data
        const formData = req.body;

        // Save the form data to MongoDB
        const user = new User(formData);
        await user.save();

        // Send a success response
        res.json({ success: true, data: formData });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:$3500`);
});
