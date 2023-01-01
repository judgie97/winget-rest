import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";
import { collections } from "../common/database";
import {
  PackageMultipleResponseSchemaSchema,
  PackageSingleResponseSchemaSchema,
} from "./api";
import { z } from "zod";

export class PackagesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "PackagesRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/packages`)
      //PACKAGES/GET
      .get(async (req: express.Request, res: express.Response) => {
        try {
          const packages = await collections.manifests
            ?.find({}, { projection: { _id: 0, Versions: 0 } })
            .toArray();
          const packagesResponse = {
            Data: packages,
            ContinuationToken: "string",
          };
          PackageMultipleResponseSchemaSchema.parse(packagesResponse);
          res.status(200).send(packagesResponse);
        } catch (err) {
          if (err instanceof z.ZodError) {
            console.log(err.issues);
          }
          res
            .status(500)
            .send({ ErrorCode: 0, ErrorMessage: "Server fell over and died" });
        }
      })
      //PACKAGES/POST
      .post(async (req: express.Request, res: express.Response) => {
        const packageIdentifier = req.body.PackageIdentifier;
        //TODO check its valid
        //TODO check if the thing already exists 409 if it does
        //TODO check if there is an API token 401 if not
        //TODO create it in a database or something.
        try {
          const result = await collections.manifests?.insertOne({
            PackageIdentifier: packageIdentifier,
          });
          if (result) {
            const packageManifest = {
              Data: {
                PackageIdentifier: packageIdentifier,
              },
            };
            res.status(201).send(packageManifest);
          } else {
            res.status(500).send({
              ErrorCode: 0,
              ErrorMessage: "Failed to create new package",
            });
          }
        } catch (error) {
          console.error(error);
          res
            .status(400)
            .send({ ErrorCode: 0, ErrorMessage: "Something went wrong" });
        }
      });

    this.app
      .route(`/packages/:packageIdentifier`)
      .get(async (req: express.Request, res: express.Response) => {
        try {
          let pack = await collections.manifests?.findOne(
            {
              PackageIdentifier: req.params.packageIdentifier,
            },
            { projection: { _id: 0, Versions: 0 } }
          );
          const packageResponse = {
            Data: pack,
            ContinuationToken: "",
          };
          PackageSingleResponseSchemaSchema.parse(packageResponse);
          res.status(200).send(packageResponse);
        } catch (err) {
          if (err instanceof z.ZodError) {
            console.log(err.issues);
          }
          res
            .status(500)
            .send({ ErrorCode: 0, ErrorMessage: "Server fell over and died" });
        }
      })
      .delete(async (req: express.Request, res: express.Response) => {
        const packageIdentifier = req.params.packageIdentifier;
        await collections.manifests?.deleteOne({
          PackageIdentifier: packageIdentifier,
        });
        res.status(204).send();
      });
    return this.app;
  }
}
