import { Response, Router } from "express";
import { formatResponse } from "../utils/response/Response";

// Routes Stacks Imports
const router = Router();

router.get("/", (_res, res: Response) =>
  formatResponse(res, 200, "Hello API", {}),
);

export default router;
