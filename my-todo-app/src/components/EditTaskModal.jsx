import { useState, useEffect } from "react";
import "../styles/AddTaskModal.css";

function EditTaskModal({ show, onClose, task, onEdit, directories }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [directory, setDirectory] = useState("Main");
  const [important, setImportant] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDate(task.date);
      setDirectory(task.directory);
      setImportant(task.important);
      setCompleted(task.completed);
    }
  }, [task]);

  if (!show) return null;

  const handleSubmit = () => {
    if (!title || !date) return alert("Title and Date are required!");
    const updatedTask = {
      ...task,
      title,
      description,
      date,
      directory,
      important,
      completed,
    };
    onEdit(updatedTask);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h5>Edit Task</h5>
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
            id="importantEditCheck"
          />
          <label className="form-check-label" htmlFor="importantEditCheck">
            Mark as Important
          </label>
        </div>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
            id="completedEditCheck"
          />
          <label className="form-check-label" htmlFor="completedEditCheck">
            Mark as Completed
          </label>
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;
