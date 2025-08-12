import { useState } from "react";
import "../styles/NewDirectoryModal.css";

function NewDirectoryModal({ show, onClose, onCreate }) {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      onCreate(title.trim());
      setTitle("");
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div className="modal-header">
          <h5>Add New Directory</h5>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Directory title"
          className="modal-input"
        />
        <button className="create-btn" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
}

export default NewDirectoryModal;
