const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/user')

const app = express()
app.use(express.json())

// Enable CORS for your frontend
app.use(cors({
    origin: 'http://localhost:5173', // The URL of your frontend app
    credentials: true,               // Enable cookies and other credentials (if needed)
}));

mongoose.connect('mongodb://localhost:27017/users')
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    UserModel.findOne({ email })
        .then(user => {
            if (!user) {
                // No user found with the provided email
                return res.status(404).json({ message: "No record existing" });
            }

            // Check if the password is correct
            if (user.password === password) {
                return res.status(200).json({ message: "Success" });  // Login successful
            } else {
                return res.status(401).json({ message: "The password is incorrect" });  // Incorrect password
            }
        })
        .catch(err => {
            // Handle any errors from the database
            return res.status(500).json({ message: "An error occurred during login", error: err.message });
        });
});


app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Check if the user already exists
    UserModel.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            // Create the new user
            UserModel.create({ email, password })
                .then(() => res.json({ message: "User registered successfully" }))
                .catch(err => res.status(500).json({ error: "Failed to register user", details: err }));
        })
        .catch(err => res.status(500).json({ error: "Database error", details: err }));
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
