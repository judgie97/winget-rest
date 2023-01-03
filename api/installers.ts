import { BaseRouter } from "../common/base_router";
import express from "express";
import { collections } from "../common/database";

export class InstallersRoutes extends BaseRouter {
  constructor(app: express.Application) {
    super(app, "InstallersRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(
        `/packages/:packageIdentifier/versions/:versionIdentifier/installers`
      )
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
          res.status(200).send({ Data: version.Installers });
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
        const installer = req.body;

        await collections.manifests?.findOneAndUpdate(
          {
            PackageIdentifier: packageIdentifier,
            "Versions.PackageVersion": versionIdentifier,
          },
          {
            $push: {
              "Versions.$.Installers": installer,
            },
          }
        );
        res.status(201).send(installer);
      });

    this.app
      .route(
        `/packages/:packageIdentifier/versions/:versionIdentifier/installers/:installerIdentifier`
      )
      .get(async (req: express.Request, res: express.Response) => {
        const packageIdentifier = req.params.packageIdentifier;
        const versionIdentifier = req.params.versionIdentifier;
        const installerIdentifier = req.params.installerIdentifier;

        const packageWithInstaller = await collections.manifests?.findOne({
          PackageIdentifier: packageIdentifier,
          "Versions.PackageVersion": versionIdentifier,
          "Versions.Installers.InstallerIdentifier": installerIdentifier,
        });
        const installer = packageWithInstaller?.Versions?.find(
          (v) => v.PackageVersion === versionIdentifier
        )?.Installers?.find(
          (i) => i.InstallerIdentifier === installerIdentifier
        );

        if (installer) {
          res.status(200).send({ Data: installer });
        } else {
          res.status(404).send({
            ErrorCode: 0,
            ErrorMessage: "Installer not found",
          });
        }
      });
    return this.app;
  }
}
