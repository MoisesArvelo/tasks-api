import { Router } from "express";
import TaskController from "../controllers/task.controller";

const router = Router();
const controller = new TaskController();

//***********************//
//// STANDARD CRUD
//***********************//
router.post("/", controller.create.bind(controller));
router.get("/:id", controller.readOne.bind(controller));
router.get("/", controller.readAll.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;
