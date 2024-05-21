import mongoose from "mongoose";
import config from "config";
import log from "../log/Log";

async function connection() {
  const db_url = config.get<string>("dbUrl");
  const stage = config.get<string>("stage");
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(db_url);
    log.info(`DB connected at ${stage}`);
  } catch (error) {
    log.error("Could not connect to db");
    process.exit(1);
  }
}

export default connection;
