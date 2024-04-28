 // routes/list.js
const router = require('express').Router();
const User = require("../models/user");
const List = require("../models/list");

router.post("/addTask", async (req, res) => {
    try {
        const { title, body, email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const list = new List({ title, body, user: existingUser });
            await list.save();

            // Ensure existingUser.list is an array before pushing
            if (!existingUser.list || !Array.isArray(existingUser.list)) {
                existingUser.list = [];
            }

            existingUser.list.push(list);
            await existingUser.save();

            res.status(200).json({ list });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("An error occurred", error);
        res.status(500).json({ error: "An error occurred" });
    }
});

module.exports = router;
