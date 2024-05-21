import { Request } from "express";
import { GetUserByDoc } from "../services/auth.service";
import { signin } from "../validators/auth.validator";
import log from "../utils/log/Log";
import { createHash } from "crypto";

export default class AuthController {
  public async signIn(req: Request) {
    log.debug("METHOD: Sign In");
    try {
      const validator = signin.parse(req);
      const { username, password } = validator.body;

      const user = await GetUserByDoc(username);

      if (!user || !user.length)
        return { error: "Invalid username or password." };

      if (user[0].status !== 1) return { error: "Restricted access." };

      const user_id = createHash("md5")
        .update(user[0].id_per.toString())
        .digest("hex");

      const passwordHash = createHash("md5")
        .update(user_id + password)
        .digest("hex");

      if (passwordHash !== user[0].password_per)
        return { error: "Invalid username or password." };

      return user[0];
    } catch (error) {
      throw error;
    }
  }
}
