import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";
import { collections } from "../common/database";

export class LocalesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "LocalesRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/packages/:packageIdentifier/versions/:versionIdentifier/locales`)
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
          res.status(200).send({ Data: version.Locales });
        } else {
          res.status(404).send([
            {
              ErrorCode: 0,
              ErrorMessage: "Version not found",
            },
          ]);
        }
      })
      .post(async (req: express.Request, res: express.Response) => {
        const packageIdentifier = req.params.packageIdentifier;
        const versionIdentifier = req.params.versionIdentifier;
        const locale = req.body;

        await collections.manifests?.findOneAndUpdate(
          {
            PackageIdentifier: packageIdentifier,
            "Versions.PackageVersion": versionIdentifier,
          },
          {
            $push: {
              "Versions.$.Locales": locale,
            },
          }
        );
        res.status(201).send(locale);
      });
    return this.app;
  }
}
