import { BaseRouter } from "../common/base_router";
import express from "express";
//import { ManifestSearchRequest, ManifestSearchResult } from "./query";
import { collections } from "../common/database";
import {
  CreateManifestSearchResponseSchema,
  CreatePackageManifestForSingleResponse,
  ManifestSearchRequestSchemaSchema,
  ManifestSearchResultSchemaSchema,
  ManifestSingleResponseSchemaSchema,
  PackageManifest,
} from "./api";
import { z } from "zod";

export class QueryRoutes extends BaseRouter {
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
          const query = ManifestSearchRequestSchemaSchema.parse(search);

          var orConditions: any = [];

          query.Inclusions?.forEach((i) => {
            var match: any = {};
            if (i.RequestMatch.MatchType == "Exact") {
              match[i.PackageMatchField] = i.RequestMatch.KeyWord;
              orConditions.push(match);
            } else if (i.RequestMatch.MatchType == "CaseInsensitive") {
              match[i.PackageMatchField] = {
                $regex: i.RequestMatch.KeyWord,
                $options: "i",
              };
              orConditions.push(match);
            } else console.log("UNSUPPORTED MATCH TYPE!"); //TODO support the others
          });

          //TODO make this support filters which are apparently a real thing?
          var condition: any = { $or: orConditions };

          const packages = await collections.manifests
            ?.find(condition)
            .toArray();
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
          } else {
            console.log(err);
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
