import express from "express";
import * as http from "http";

import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import { CommonRoutesConfig } from "./common/common.routes.config";
import { UsersRoutes } from "./users/users.routes.config";
import debug from "debug";
import { ServerRoutes } from "./api/server";
import { PackagesRoutes } from "./api/packages";
import { VersionsRoutes } from "./api/versions";
import { InstallersRoutes } from "./api/installers";
import { LocalesRoutes } from "./api/locales";
import { connectToDatabase } from "./common/database";
import { QueryRoutes } from "./api/query";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

app.use(express.json());
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));
routes.push(new UsersRoutes(app));
routes.push(new ServerRoutes(app));
routes.push(new PackagesRoutes(app));
routes.push(new QueryRoutes(app));
routes.push(new InstallersRoutes(app));
routes.push(new VersionsRoutes(app));
routes.push(new LocalesRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`;
app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage);
});

server.listen(port, () => {
  connectToDatabase();
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });

  console.log(runningMessage);
});
