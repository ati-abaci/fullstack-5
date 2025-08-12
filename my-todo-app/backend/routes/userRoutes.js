const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Task = require("../models/Task");

// Signup
router.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const saved = await user.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign({ userId: user._id }, "your_jwt_secret");
  res.json({ token });
});

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Update
router.put("/:id", async (req, res) => {
  const updateData = { ...req.body };
  if (req.body.password) {
    updateData.password = await bcrypt.hash(req.body.password, 10);
  }
  const updated = await User.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });
  res.json(updated);
});

// Delete
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// Get
router.get("/:id/tasks", async (req, res) => {
  const tasks = await Task.find({ userId: req.params.id });
  res.json(tasks);
});

module.exports = router;
