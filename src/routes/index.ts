import { Response, Router } from "express";
import { formatResponse } from "../utils/response/Response";

// Routes Stacks Imports
import taskRoute from "./task.route";

import passport from "passport";
import passportConfig, { authenticate } from "../utils/passport/Passport";
passportConfig(passport);

const router = Router();

router.get("/", (_res, res: Response) =>
  formatResponse(res, 200, "Hello API", {}),
);
router.use("/api/v1/task", authenticate(), taskRoute);

export default router;
