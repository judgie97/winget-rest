import { BaseRouter } from "../common/base_router";
import express from "express";
import { InformationResponseSchemaSchema } from "./api";
import { z } from "zod";
import { UsersRoutes } from "../users/users";

export class ServerRoutes extends BaseRouter {
  constructor(app: express.Application) {
    super(app, "ServerRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/information`)
      .get((req: express.Request, res: express.Response) => {
        try {
          const serverInformation = {
            Data: {
              SourceIdentifier: "Laptop",
              ServerSupportedVersions: ["1.1.0"],
              UnsupportedPackageMatchFields: [],
              RequiredPackageMatchFields: [],
              UnsupportedQueryParameters: [],
              RequiredQueryParameters: [],
            },
            ContinuationToken: "",
          };
          InformationResponseSchemaSchema.parse(serverInformation);
          res.status(200).send(serverInformation);
        } catch (err) {
          if (err instanceof z.ZodError) {
            console.log(err.issues);
          }
          res.status(500).send({
            ErrorCode: 0,
            ErrorMessage: "Server fell over and died",
          });
        }
      });

    return this.app;
  }
}
