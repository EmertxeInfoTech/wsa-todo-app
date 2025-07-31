import React, { useState } from "react";
import checkedBlue from "../assets/blue-checked.svg";
import { AlarmClockCheck, FilePenLine, Trash2, X } from "lucide-react";
import { Modal } from "./ui/Modal";
import { DeleteTask } from "./ui/DeleteTask";
import moment from "moment";

export const ViewTask = ({
  task,
  showTaskListScreen,
  fetchAllTasks,
  setActiveTask,
  showEditTaskScreen,
}) => {
  const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);

  const handleEditTask = function () {
    setActiveTask(task);
    showEditTaskScreen();
  };

  const openDeleteTask = () => setShowDeleteTaskPopup(true);
  const closeDeleteTask = () => setShowDeleteTaskPopup(false);

  return (
    <Modal isOpen={true} onClose={showTaskListScreen}>
      <div className="flex justify-between view-task-header">
        <div className="flex">
          <span className="task-icon-wrapper">
            <img src={checkedBlue} alt="task icon" className="task-icon" />
          </span>
          <h2 className="view-task-title">{task.title}</h2>
        </div>
        <div className="close-modal-btn">
          {" "}
          <X style={{ color: "black" }} onClick={showTaskListScreen} />{" "}
        </div>
      </div>

      <div className="flex">
        <pre className="view-task-description">{task.description}</pre>
        <div className="view-task-right-section">
          {task.due_date && (
            <div className="view-task-info-box">
              <p className="label-14">Due Date</p>
              <div className="flex date-container">
                <AlarmClockCheck style={{ color: "blue" }} />
                <p className="date-text">
                  {moment(task.due_date).format("DD MMM YYYY")}
                </p>
              </div>
            </div>
          )}
          <div
            className="view-task-info-box flex cursor-pointer"
            onClick={handleEditTask}
          >
            <FilePenLine style={{ color: "green", marginRight: "10px" }} />
            <p className="label-12 ">Edit Task</p>
          </div>

          <div
            className="view-task-info-box flex cursor-pointer"
            onClick={openDeleteTask}
          >
            <Trash2 style={{ color: "red", marginRight: "10px" }} />
            <p className="label-12">Delete Task</p>
          </div>
        </div>
      </div>
      {showDeleteTaskPopup && (
        <DeleteTask
          isOpen={showDeleteTaskPopup}
          onClose={closeDeleteTask}
          task={task}
          fetchAllTasks={fetchAllTasks}
        />
      )}
    </Modal>
  );
};
