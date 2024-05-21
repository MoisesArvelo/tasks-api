import { Response, Router } from "express";
import { formatResponse } from "../utils/response/Response";

// Routes Stacks
import taskRoute from "./task.route";

// Routes Stacks Imports
const router = Router();

router.get("/", (_res, res: Response) =>
  formatResponse(res, 200, "Hello API", {}),
);
router.use("/api/v1/task", taskRoute);

export default router;
