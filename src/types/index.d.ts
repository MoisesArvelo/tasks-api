import { UserDocument } from "../models/user.model";

declare global {
  namespace Express {
    interface User {
      sub: string;
    }

    interface Request {
      user: User;
    }
  }
}
