import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SideBar.css";

function SideBar({
  onAddClick,
  directories,
  onNewDirectory,
  onDeleteDirectory,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  function openLogout() {
    setShowLogout(true);
  }
  function closeLogout() {
    setShowLogout(false);
  }
  function doLogout() {
    localStorage.removeItem("token");
    setShowLogout(false);
    setIsOpen(false);
    navigate("/login", { replace: true });
  }

  return (
    <>
      <button
        className="hamburger-btn btn d-md-none"
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>

      <div className={`sidebar d-flex flex-column ${isOpen ? "open" : ""}`}>
        <div className="sidebar-title">
          <h4>Todo App</h4>
        </div>

        <div className="sidebar-body flex-grow-1 d-flex flex-column">
          <button
            className="add-task-btn btn w-100 mb-3"
            onClick={() => {
              setIsOpen(false);
              onAddClick();
            }}
          >
            + Add Task
          </button>

          <button
            className="btn btn-outline-primary w-100 mb-3"
            onClick={() => {
              setIsOpen(false);
              onNewDirectory();
            }}
          >
            New Directory
          </button>

          <div className="list-group mb-3">
            <Link
              to="/"
              className="sidebar-link"
              onClick={() => setIsOpen(false)}
            >
              All tasks
            </Link>
            <Link
              to="/important"
              className="sidebar-link"
              onClick={() => setIsOpen(false)}
            >
              Important tasks
            </Link>
            <Link
              to="/completed"
              className="sidebar-link"
              onClick={() => setIsOpen(false)}
            >
              Completed tasks
            </Link>
            <Link
              to="/uncompleted"
              className="sidebar-link"
              onClick={() => setIsOpen(false)}
            >
              Uncompleted tasks
            </Link>
          </div>

          <div className="directories mb-3">
            <div className="px-3 pb-2 fw-semibold">Directories</div>
            {directories.map((dir) => (
              <div key={dir} className="directory-item">
                <Link
                  to={`/${dir.toLowerCase()}`}
                  className="sidebar-link flex-grow-1"
                  onClick={() => setIsOpen(false)}
                >
                  {dir}
                </Link>
                <button
                  className="btn btn-sm btn-outline-danger ms-2"
                  onClick={() => onDeleteDirectory(dir)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-2">
            <button
              className="btn  w-100 mb-3 "
              style={{ backgroundColor: "#b02933", color: "#fff" }}
              onClick={openLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {showLogout && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
          }}
        >
          <div className="card shadow-sm" style={{ width: 360 }}>
            <div className="card-body">
              <h5 className="mb-3">Are you sure?</h5>
              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-secondary" onClick={closeLogout}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={doLogout}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SideBar;
