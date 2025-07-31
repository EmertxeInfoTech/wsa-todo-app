import express from "express";
import {
  deleteTask,
  getLabels,
  getTasks,
  newTask,
  updateLabels,
  updateStatus,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/task", newTask);
router.get("/tasks", getTasks);
router.put("/task/:id", updateTask);
router.get("/labels", getLabels);
router.put("/task/:id/labels", updateLabels);
router.put("/task/:id/status", updateStatus);
router.delete("/task/:id", deleteTask);

export default router;
