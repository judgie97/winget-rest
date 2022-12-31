import { CommonRoutesConfig } from "../../common/common.routes.config";
import express from "express";
//import { ManifestSearchRequest, ManifestSearchResult } from "./query";
import { collections } from "../../common/database";
import {
  CreateManifestSearchResponseSchema,
  CreatePackageManifestForSingleResponse,
  ManifestSearchResultSchemaSchema,
  ManifestSingleResponseSchemaSchema,
  PackageManifest,
} from "../api";
import { z } from "zod";

export class QueryRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "QueryRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/manifestSearch`)
      //MANIFESTSEARCH/POST
      .post(async (req: express.Request, res: express.Response) => {
        try {
          const search = req.body;
          const packages = await collections.manifests?.find({}).toArray();
          const msr = packages?.map((p) =>
            CreateManifestSearchResponseSchema(p)
          );
          const response = {
            Data: msr,
            ContinuationToken: "",
          };
          ManifestSearchResultSchemaSchema.parse(response);
          if (packages) res.status(200).send(response);
          else res.status(204).send();
        } catch (err) {
          if (err instanceof z.ZodError) {
            console.log(err.issues);
          }
          res
            .status(500)
            .send({ ErrorCode: 0, ErrorMessage: "Server fell over and died" });
        }
      });
    this.app
      .route(`/packageManifests/:packageIdentifier`)
      //MANIFESTSEARCH/PACKAGEIDENTIFER/GET
      .get(async (req: express.Request, res: express.Response) => {
        try {
          const search = req.body;
          const packageManifest = (await collections.manifests?.findOne(
            {
              PackageIdentifier: req.params.packageIdentifier,
            },
            { projection: { _id: 0 } }
          )) as PackageManifest;
          if (packageManifest) {
            const msr = CreatePackageManifestForSingleResponse(packageManifest);
            const response = {
              Data: msr,
              ContinuationToken: "",
            };
            console.log("-----------------------");
            console.log(packageManifest.Versions?.at(0)?.DefaultLocale);
            console.log("-----------------------");
            console.log(response);
            console.log("-----------------------");
            console.log(response.Data.Versions);
            console.log("-----------------------");

            ManifestSingleResponseSchemaSchema.parse(response);
            res.status(200).send(response);
          } else res.status(404).send();
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
