import React, { useCallback, useState } from "react";
import { DeleteTask } from "./ui/DeleteTask";
import CheckedBlue from "../assets/blue-checked.svg";
import { AlarmClock, TagsIcon } from "lucide-react";
import { Pencil } from "lucide-react";
import { Delete } from "lucide-react";
import { TagIcon } from "lucide-react";
import moment from "moment";
import StatusDropDown from "./StatusDropDown";

const TaskTile = ({
  task,
  onClick,
  fetchAllTasks,
  changeTaskStatus,
  setActiveTaskId,
  showEditTaskScreen,
  boardView,
}) => {
  const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);

  const handleEditTask = useCallback(
    (e) => {
      e.stopPropagation();
      setActiveTaskId(task._id);
      showEditTaskScreen();
    },
    [setActiveTaskId, showEditTaskScreen, task._id]
  );

  const handleDeleteTask = useCallback((event) => {
    event.stopPropagation();
    setShowDeleteTaskPopup(true);
  }, []);

  const closeDeleteTaskPopup = useCallback(
    () => setShowDeleteTaskPopup(false),
    []
  );

  return (
    <>
      <div className="task-tile-container" onClick={onClick}>
        <div>
          <div className="flex">
            <span className="task-icon-wrapper">
              <img src={CheckedBlue} alt="Task Icon" className="task-icon" />
            </span>
            <div className="task-text-wrapper">
              <p className="task-primary-text">{task?.title}</p>
              <p className="task-secondary-text">{task?.description}</p>
            </div>
          </div>
          {!boardView && task.labels.length ? (
            <span className="labels-icon-wrapper">
              <TagIcon />
              <span className="labels-row">
                {task.labels.map((label) => (
                  <span key={`${task._id}-${label}`}>{label}</span>
                ))}
              </span>
            </span>
          ) : null}
        </div>
        {/* Drop down button */}
        <div className="status-action-items">
          <StatusDropDown
            value={task.status}
            taskId={task._id}
            changeTaskStatus={changeTaskStatus}
          />
          <div className="action-items-container">
            {task.due_date && (
              <div className="flex date-container">
                <AlarmClock />
                <p className="date-text">
                  {moment(task.due_date).format("DD-MM-YYYY")}
                </p>
              </div>
            )}
            <div
              className="edit-container cursor-pointer"
              onClick={handleEditTask}
            >
              <Pencil />
            </div>

            <div
              className="delete-container cursor-pointer"
              onClick={handleDeleteTask}
            >
              <Delete />
            </div>
          </div>
        </div>
        {!boardView && task.labels.length ? (
          <span className="labels-icon-wrapper">
            <img src={TagsIcon} alt="Label icon" />
            <span className="labels-row">
              {task.labels.map((label) => (
                <span key={`${task._id}-${label}`}>{label}</span>
              ))}
            </span>
          </span>
        ) : null}
      </div>

      {/* Delete Task */}
      <DeleteTask
        isOpen={showDeleteTaskPopup}
        onClose={closeDeleteTaskPopup}
        task={task}
        fetchAllTasks={fetchAllTasks}
      />
    </>
  );
};

export default TaskTile;
