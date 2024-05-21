import express, { Application } from "express";
import session from "express-session";
import cors from "cors";
import router from "./routes";

const App: Application = express();

App.use(
  session({
    secret: "no-one-will-find-out",
    resave: true,
    saveUninitialized: true,
  }),
);

App.use(cors());
App.use(express.urlencoded({ extended: false }));
App.use(express.json());
App.use(router);

export default App;
