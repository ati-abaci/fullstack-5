import calendarIcon from "../assets/date.svg";
import starIcon from "../assets/star-line.svg";
import trashIcon from "../assets/trash.svg";
import optionsIcon from "../assets/options.svg";
import { FaRegStar, FaStar } from "react-icons/fa";
import "../styles/Cards.css";

function TaskCard({
  task,
  isFirst,
  onToggleCompleted,
  onToggleImportant,
  onEditClick,
  onDeleteTask,
}) {
  return (
    <div className={`card shadow-sm task-card ${isFirst ? "first-task" : ""}`}>
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{task.title}</h5>
          <p className={`card-text ${isFirst ? "text-light" : "text-muted"}`}>
            {task.description}
          </p>
        </div>
        <div className="task-footer mt-auto pt-3">
          <div className="d-flex align-items-center mb-2">
            <img src={calendarIcon} alt="date" width={16} className="me-2" />
            <small className={isFirst ? "text-light" : "text-muted"}>
              {task.date}
            </small>
          </div>
          <hr className="dashed-line my-3" />
          <div className="d-flex justify-content-between align-items-center">
            <span
              className={`badge px-3 py-2 ${
                !task.completed ? "text-dark" : ""
              }`}
              style={{
                cursor: "pointer",
                backgroundColor: task.completed ? "#93DDC1" : "#FCDE80",
                color: "black",
                borderRadius: "15px",
              }}
              onClick={() => onToggleCompleted(task.id)}
            >
              {task.completed ? "completed" : "uncompleted"}
            </span>
            <div className="d-flex align-items-center">
              {task.important ? (
                <FaStar
                  size={18}
                  color="#F44852"
                  style={{ cursor: "pointer" }}
                  onClick={() => onToggleImportant(task.id)}
                  className={`me-2 icon-img`}
                />
              ) : (
                <FaRegStar
                  size={18}
                  style={{
                    cursor: "pointer",
                    color: isFirst ? "#ffffff" : "#000000",
                  }}
                  onClick={() => onToggleImportant(task.id)}
                  className={`me-2 icon-img`}
                />
              )}

              <img
                src={trashIcon}
                alt="delete"
                width={18}
                className={`me-2 icon-img ${isFirst ? "white-icon" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => onDeleteTask(task.id)}
              />
              <img
                src={optionsIcon}
                alt="options"
                width={4}
                className={`me-2 icon-img ${isFirst ? "white-icon" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => onEditClick(task)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
