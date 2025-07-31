import React, { useCallback, useEffect, useState } from "react";
import { NoTask } from "./NoTask";
import { TaskList } from "./TaskList";
import { CreateTask } from "./CreateTask";
import { ViewTask } from "./ViewTask";
import { EditTask } from "./EditTask";
import { Loading } from "./ui/Loading";
import fetchTaskAPI from "./api/fetchTask";

export const TaskMain = () => {
  const [currComponent, setCurrComponent] = useState("loading");
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState();

  const showNoTaskScreen = useCallback(function () {
    setCurrComponent("noTask");
  }, []);
  const showCreateTaskScreen = useCallback(function () {
    setCurrComponent("createTask");
  }, []);
  const showTaskListScreen = useCallback(function () {
    setCurrComponent("taskList");
  }, []);
  const showEditTaskScreen = useCallback(function () {
    setCurrComponent("editTask");
  }, []);
  const showViewTaskScreen = useCallback(function () {
    console.log("set");

    setCurrComponent("viewTask");
  }, []);

  const handleResponse = useCallback(
    function (responseData) {
      const extractedTasks = responseData.tasks;
      setTasks(extractedTasks);
      if (extractedTasks.length) {
        showTaskListScreen();
      } else {
        showNoTaskScreen();
      }
    },
    [showTaskListScreen, showNoTaskScreen]
  );

  const handleError = useCallback(function (errorMsg) {
    alert(errorMsg);
    console.error(errorMsg);
  }, []);

  const fetchAllTasks = useCallback(
    function () {
      fetchTaskAPI(handleResponse, handleError);
    },
    [handleResponse, handleError]
  );

  // Initial effect
  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  console.log(currComponent);

  return (
    <>
      {currComponent === "loading" && <Loading />}
      <div id="container-div">
        {currComponent === "noTask" && (
          <NoTask showCreateTaskScreen={showCreateTaskScreen} />
        )}
        {currComponent === "taskList" && (
          <TaskList
            tasks={tasks}
            setActiveTask={setActiveTask}
            fetchAllTasks={fetchAllTasks}
            showCreateTaskScreen={showCreateTaskScreen}
            showViewTaskScreen={showViewTaskScreen}
            showEditTaskScreen={showEditTaskScreen}
          />
        )}
        {currComponent === "createTask" && (
          <CreateTask
            fetchAllTasks={fetchAllTasks}
            showTaskListScreen={showTaskListScreen}
          />
        )}
        {currComponent === "viewTask" && (
          <ViewTask
            task={activeTask}
            showTaskListScreen={showTaskListScreen}
            fetchAllTasks={fetchAllTasks}
            setActiveTask={setActiveTask}
            showEditTaskScreen={showEditTaskScreen}
          />
        )}
        {currComponent === "editTask" && (
          <EditTask
            showTaskListScreen={showTaskListScreen}
            task={activeTask}
            fetchAllTasks={fetchAllTasks}
          />
        )}
      </div>
    </>
  );
};
