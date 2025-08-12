const express = require("express");
const router = express.Router();
const Directory = require("../models/Directory");
const Task = require("../models/Task");

router.post("/", async (req, res) => {
  try {
    const directory = new Directory(req.body);
    const saved = await directory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const directories = await Directory.find().sort({ name: 1 });
  res.json(directories);
});

router.put("/:id", async (req, res) => {
  const updated = await Directory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const dir = await Directory.findById(req.params.id);
  if (!dir) return res.status(404).json({ error: "Directory not found" });

  await Task.deleteMany({ directory: dir.name });
  await Directory.findByIdAndDelete(req.params.id);
  res.json({ message: "Directory and its tasks deleted" });
});

router.get("/:id/tasks", async (req, res) => {
  const dir = await Directory.findById(req.params.id);
  if (!dir) return res.status(404).json({ error: "Directory not found" });

  const tasks = await Task.find({ directory: dir.name }).sort({
    createdAt: -1,
  });
  res.json(tasks);
});

module.exports = router;
