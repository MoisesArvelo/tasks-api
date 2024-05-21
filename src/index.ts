import App from "./app";
import log from "./utils/log/Log";
import config from "config";
import swagger from "./utils/swagger/Swager";
import connection from "./utils/db/Connection";

const app = config.get<string>("appName");
const port = config.get<number>("port");

App.listen(port, async () => {
  log.info(`${app} is running on port ${port}`);
  await connection();
  swagger(App, port);
});
