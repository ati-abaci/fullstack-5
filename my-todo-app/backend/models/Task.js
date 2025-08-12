const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    completed: { type: Boolean, default: false },
    important: { type: Boolean, default: false },
    date: { type: String },
    directory: { type: String, default: "Main" },
    dirId: { type: mongoose.Schema.Types.ObjectId, ref: "Directory" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
