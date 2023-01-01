import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";
import { collections } from "../common/database";
import {
  VersionMultipleResponseSchemaSchema,
  VersionSchemaSchema,
} from "./api";
import { z } from "zod";

export class VersionsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "VersisonsRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/packages/:packageIdentifier/versions`)
      //PACKAGES/IDENTIFIER/VERSIONS/GET
      .get(async (req: express.Request, res: express.Response) => {
        const packageIdentifier = req.params.packageIdentifier;
        try {
          let pack = await collections.manifests?.findOne({
            PackageIdentifier: packageIdentifier,
          });
          const response = { Data: pack?.Versions, ContinuationToken: "" };
          VersionMultipleResponseSchemaSchema.parse(response);
          res.status(200).send(response);
        } catch (err) {
          if (err instanceof z.ZodError) {
            console.log(err.issues);
          }
          res
            .status(500)
            .send({ ErrorCode: 0, ErrorMessage: "Server fell over and died" });
        }
      })
      .post(async (req: express.Request, res: express.Response) => {
        //TODO check if the package exists and make it if it doesnt
        //TODO check the API token is valid and return 401 if not
        //TODO check if the version exists and return a 409 if it does
        //put the version in the package[versions] and return a 201 with the version in it

        const packageIdentifier = req.params.packageIdentifier;
        const versionInformation = req.body;
        const packageVersion = versionInformation.PackageVersion;
        try {
          VersionSchemaSchema.parse(versionInformation);
        } catch (err) {
          if (err instanceof z.ZodError) {
            console.log(err.issues);
          }
          res
            .status(400)
            .send({ ErrorCode: 0, ErrorMessage: "Invalid request body" });
          return;
        }

        let pack = await collections.manifests?.findOne({
          PackageIdentifier: packageIdentifier,
        });

        const result = await collections.manifests?.updateOne(
          { PackageIdentifier: packageIdentifier },
          {
            $push: {
              Versions: versionInformation,
            },
          }
        );

        res.status(201).send({ Data: versionInformation });
      });

    this.app
      .route(`/packages/:packageIdentifier/versions/:versionIdentifier`)
      .get(async (req: express.Request, res: express.Response) => {
        const packageIdentifier = req.params.packageIdentifier;
        const versionIdentifier = req.params.versionIdentifier;

        let pack = await collections.manifests?.findOne({
          PackageIdentifier: packageIdentifier,
        });

        let version = pack?.Versions?.find(
          (v) => v.PackageVersion == versionIdentifier
        );
        if (version !== undefined) {
          res.status(200).send({ Data: version });
        } else {
          res.status(404).send([
            {
              ErrorCode: 0,
              ErrorMessage: "Version not found",
            },
          ]);
        }
      });
    return this.app;
  }
}
