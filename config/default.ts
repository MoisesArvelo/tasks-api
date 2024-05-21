import { configDotenv } from "dotenv";
configDotenv();

export default {
  appName: process.env.APP_NAME ?? "TASKS API",
  port: process.env.PORT ?? 3000,
  stage: process.env.STAGE ?? "development",
  pinoLogLevel: process.env.PINO_LOG_LEVEL ?? "debug",
  dbUrl: process.env.DB_URL ?? "",
};
