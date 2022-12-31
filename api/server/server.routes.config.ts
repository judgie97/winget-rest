import { CommonRoutesConfig } from "../../common/common.routes.config";
import express from "express";
import { InformationResponseSchemaSchema } from "../api";
import { z } from "zod";

export class ServerRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ServerRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/information`)
      .get((req: express.Request, res: express.Response) => {
        try {
          const serverInformation: InformationResponse = {
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
          res
            .status(500)
            .send({ ErrorCode: 0, ErrorMessage: "Server fell over and died" });
        }
      });

    return this.app;
  }
}
