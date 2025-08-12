import { useState } from "react";
import { Link } from "react-router-dom";
import TaskCard from "./TaskCard";
import "../styles/TaskBoard.css";

function TaskBoard({
  filter,
  tasks,
  onAddClick,
  onToggleCompleted,
  onToggleImportant,
  onEditClick,
  onDeleteTask,
}) {
  const [sortOption, setSortOption] = useState("Order added");

  const filtered = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "uncompleted") return !task.completed;
    if (filter === "important") return task.important;
    return true;
  });

  let sorted = [...filtered];
  if (sortOption === "Earlier first") {
    sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortOption === "Later first") {
    sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortOption === "Completed first") {
    sorted.sort((a, b) => b.completed - a.completed);
  } else if (sortOption === "UnCompleted first") {
    sorted.sort((a, b) => a.completed - b.completed);
  }

  return (
    <div className="taskboard-body container-fluid py-4 px-3 h-100">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="Search task"
          className="search-bar flex-grow-1"
          style={{ maxWidth: "320px" }}
        />
        <div className="text-muted text-center flex-grow-1">
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
        <button className="addtask-btn btn" onClick={onAddClick}>
          Add new task
        </button>

        {/* 🔐 Auth Buttons */}
        <div className="d-flex gap-2">
          <Link to="/signup" className="btn btn-outline-primary">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-outline-secondary">
            Log In
          </Link>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <h5 className="mb-2">
          All tasks <span className="text-muted">({sorted.length})</span>
        </h5>
        <select
          className="form-select dropdown-sortby"
          style={{ width: "180px" }}
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option>Order added</option>
          <option>Earlier first</option>
          <option>Later first</option>
          <option>Completed first</option>
          <option>UnCompleted first</option>
        </select>
      </div>

      <div className="row g-4">
        {sorted.map((task, index) => (
          <div
            key={task.id}
            className="col-12 col-sm-6 col-lg-4 col-xl-3 position-relative"
          >
            <span
              className="task-directory-label"
              style={{
                position: "absolute",
                top: "-30px",
                right: "15px",
                zIndex: 0,
                backgroundColor: "#F2C2BF",
                color: "#9B5153",
                padding: "6px 14px",
                borderRadius: " 12px 12px 0 0 ",
                fontWeight: "500",
                fontSize: "14px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {task.directory}
            </span>

            <TaskCard
              task={task}
              isFirst={index === 0}
              onToggleCompleted={onToggleCompleted}
              onToggleImportant={onToggleImportant}
              onEditClick={onEditClick}
              onDeleteTask={onDeleteTask}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskBoard;
