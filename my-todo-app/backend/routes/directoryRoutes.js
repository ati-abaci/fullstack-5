const express = require("express");
const router = express.Router();
const Directory = require("../models/Directory");
const Task = require("../models/Task");

// POST
router.post("/", async (req, res) => {
  try {
    const directory = new Directory(req.body);
    const saved = await directory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET
router.get("/", async (req, res) => {
  const directories = await Directory.find();
  res.json(directories);
});

// PUT
router.put("/:id", async (req, res) => {
  const updated = await Directory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Task.deleteMany({ dirId: req.params.id });
  await Directory.findByIdAndDelete(req.params.id);
  res.json({ message: "Directory and its tasks deleted" });
});

// GET
router.get("/:dirId/tasks", async (req, res) => {
  const tasks = await Task.find({ dirId: req.params.dirId });
  res.json(tasks);
});

module.exports = router;
