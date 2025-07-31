import React, { useCallback, useEffect, useMemo, useState } from "react";
import Loading from "./ui/Loading";
import NoTask from "./NoTask";
import TaskList from "./TaskList";
import CreateTask from "./CreateTask";
import ViewTask from "./ViewTask";
import EditTask from "./EditTask";
import fetchTasksAPI from "../api/fetchTask.js";

const TaskMain = () => {
  // We manage current screen/routing through state in a single page application
  const [currComponent, setCurrComponent] = useState("loading");
  const [tasks, setTasks] = useState([]);
  const [activeTaskId, setActiveTaskId] = useState("");
  const [boardView, setBoardView] = useState(false);

  const activeTask = useMemo(
    () => tasks.find((task) => task._id === activeTaskId),
    [tasks, activeTaskId]
  );

  const showNoTaskScreen = useCallback(function () {
    setCurrComponent("noTask");
  }, []);

  const showTaskListScreen = useCallback(function () {
    setCurrComponent("taskList");
  }, []);

  const showCreateTaskScreen = useCallback(function () {
    setCurrComponent("createTask");
  }, []);

  const showEditTaskScreen = useCallback(function () {
    setCurrComponent("editTask");
  }, []);

  const showViewTaskScreen = useCallback(function () {
    setCurrComponent("viewTask");
  }, []);

  // Api handling
  const handleResponse = useCallback(function (responseData) {
    const extractedTasks = responseData.tasks;
    setTasks(extractedTasks);
    if (extractedTasks.length) {
      showTaskListScreen();
    } else {
      showNoTaskScreen();
    }
  }, []);

  const handleError = useCallback((errorMessage) => {
    alert(errorMessage);
    console.log(errorMessage);
  }, []);

  const fetchAllTasks = useCallback(() => {
    fetchTasksAPI(handleResponse, handleError);
  }, [handleResponse, handleError]);

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  const changeTaskStatus = useCallback(function (status, taskId) {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task._id === taskId) {
          return { ...task, status };
        }
        return task;
      });
    });
  }, []);

  return (
    <>
      {currComponent === "loading" && <Loading />}
      <div id="continer-div">
        {currComponent === "noTask" && (
          <NoTask showCreateTaskScreen={showCreateTaskScreen} />
        )}
        {currComponent === "taskList" && (
          <TaskList
            tasks={tasks}
            fetchAllTasks={fetchAllTasks}
            showViewTaskScreen={showViewTaskScreen}
            showEditTaskScreen={showEditTaskScreen}
            setActiveTaskId={setActiveTaskId}
            setTasks={setTasks}
            changeTaskStatus={changeTaskStatus}
            boardView={boardView}
            setBoardView={setBoardView}
            showCreateTaskScreen={showCreateTaskScreen}
          />
        )}
        {currComponent === "createTask" && (
          <CreateTask
            showTaskListScreen={showTaskListScreen}
            fetchAllTasks={fetchAllTasks}
          />
        )}
        {currComponent === "viewTask" && (
          <ViewTask
            task={activeTask}
            setActiveTaskId={setActiveTaskId}
            fetchAllTasks={fetchAllTasks}
            showEditTaskScreen={showEditTaskScreen}
            showTaskListScreen={showTaskListScreen}
            changeTaskStatus={changeTaskStatus}
          />
        )}
        {currComponent === "editTask" && (
          <EditTask
            task={activeTask}
            fetchAllTasks={fetchAllTasks}
            showTaskListScreen={showTaskListScreen}
          />
        )}
      </div>
    </>
  );
};

export default TaskMain;
