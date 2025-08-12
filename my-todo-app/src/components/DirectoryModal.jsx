import { useState } from "react";
import "../styles/AddTaskModal.css";

function DirectoryModal({ show, onClose, onAdd }) {
  const [name, setName] = useState("");
  if (!show) return null;

  const handle = () => {
    if (name.trim()) {
      onAdd(name.trim());
      setName("");
      onClose();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h5>New Directory</h5>
        <input
          className="form-control mb-3"
          placeholder="Directory name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handle}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default DirectoryModal;
