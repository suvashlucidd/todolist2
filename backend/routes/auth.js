 // routes/auth.js
const router = require('express').Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// REGISTER USER
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        // Hash the password
        const hashpassword = bcrypt.hashSync(password);

        // Create and save the new user
        const user = new User({ email, username, password: hashpassword });
        await user.save();

        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Failed to register user" });
    }
});

// SIGN IN USER
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found. Please sign up." });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password." });
        }

        // If credentials are correct, return user data (excluding password)
        const { password: _, ...userData } = user._doc;
        res.status(200).json({ user: userData });
    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ message: "Failed to sign in. Please try again later." });
    }
});

module.exports = router;
