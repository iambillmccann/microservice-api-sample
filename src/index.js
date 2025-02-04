const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const users = {};

// Create a new user (POST /users)
app.post("/users", (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    const id = uuidv4();
    users[id] = { id, name, email };

    res.status(201).json(users[id]);
});

// Retrieve a user by ID (GET /users/:id)
app.get("/users/:id", (req, res) => {
    const user = users[req.params.id];
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
});

// Update a user by ID (PUT /users/:id)
app.put("/users/:id", (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    const user = users[req.params.id];
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    users[req.params.id] = { id: req.params.id, name, email };

    res.json(users[req.params.id]);
});

// Delete a user by ID (DELETE /users/:id)
app.delete("/users/:id", (req, res) => {
    if (!users[req.params.id]) {
        return res.status(404).json({ error: "User not found" });
    }

    delete users[req.params.id];
    res.status(204).send();
});

// ✅ Fix: Properly start the server only if running manually
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; // Export for testing
