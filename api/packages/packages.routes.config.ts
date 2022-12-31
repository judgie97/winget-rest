import { CommonRoutesConfig } from "../../common/common.routes.config";
import express from "express";
import { collections } from "../../common/database";
import {
  CreateManifestSearchResponseSchema,
  PackageManifest,
  PackageMultipleResponseSchemaSchema,
  PackageSingleResponseSchemaSchema,
  VersionMultipleResponseSchemaSchema,
} from "../api";
import { z } from "zod";

export class PackagesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "PackagesRoutes");
  }

  configureRoutes(): express.Application {
    //------------------PACKAGES------------------//
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

    //------------------VERSIONS------------------//
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

    /** this.app
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
      **/

    //------------------LOCALES------------------//
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

    //------------------INSTALLERS------------------//
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
