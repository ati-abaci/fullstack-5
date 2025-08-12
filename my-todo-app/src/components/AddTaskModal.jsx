import { useState } from "react";
import "../styles/AddTaskModal.css";

function AddTaskModal({ show, onClose, onAdd, directories }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [directory, setDirectory] = useState("Main");
  const [important, setImportant] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = () => {
    if (!title || !date) return alert("Title and Date are required!");

    const newTask = {
      id: Date.now(),
      title,
      description,
      date,
      directory,
      important,
      completed,
    };

    onAdd(newTask);
    onClose();
    setTitle("");
    setDescription("");
    setDate("");
    setImportant(false);
    setCompleted(false);
    setDirectory("Main");
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h5>Add New Task</h5>
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="form-control mb-2"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          className="form-select mb-2"
          value={directory}
          onChange={(e) => setDirectory(e.target.value)}
        >
          {directories.map((dir, i) => (
            <option key={i} value={dir}>
              {dir}
            </option>
          ))}
        </select>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={important}
            onChange={() => setImportant(!important)}
            id="importantCheck"
          />
          <label className="form-check-label" htmlFor="importantCheck">
            Mark as Important
          </label>
        </div>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
            id="completedCheck"
          />
          <label className="form-check-label" htmlFor="completedCheck">
            Mark as Completed
          </label>
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;
