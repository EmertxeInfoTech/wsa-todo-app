import Task from "../models/taskModels.js";

const newTask = async (req, res) => {
  try {
    //1. extract data from the body
    const { title, description, due_date } = req.body;

    //validation on the incoming data
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description not found" });
    }

    //create document based on the schema
    const newTask = await Task.create({ title, description, due_date });

    //Success Response
    res.status(201).json({
      success: true,
      message: "Task Created successfully",
      task: newTask,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "Failed to Create task",
    });
  }
};

const getTasks = async (req, res) => {
  try {
    //Get all the task from mongodb
    const tasks = await Task.find({});

    res.status(200).json({
      success: true,
      tasks,
      message: "fetched all task successfully",
    });
  } catch (error) {
    console.error("Failed to fetch error", error);
    res.status(400).json({
      success: false,
      message: "Failed to Create task",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    //get the id from params
    const { id } = req.params;
    //get the data to update, from body
    const { title, description, due_date } = req.body;
    //validation on body and id
    if (!id) {
      return res.status(400).json({ message: "task id required" });
    }
    //find the document according to the id
    // const task = await Task.findById(id);

    // //update the document
    // if (title) task.title = title;
    // if (description) task.description = description;
    // if (due_date) task.due_date = due_date;
    // if (!due_date) task.due_date = null;

    // // save the document
    // const updatedTask = await task.save();

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, due_date: due_date || null },
      { returnDocument: "after" }
    );

    //send a response
    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Failed to update the task", error);

    res.status(400).json({
      success: false,
      message: "Failed to update the task",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "No Id provided" });
    }

    await Task.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    console.error("Error in deleting task", error);
    res.status(400).json({
      success: false,
      message: "Task Deleted Unsuccessfully",
    });
  }
};

export { newTask, getTasks, updateTask, deleteTask };
