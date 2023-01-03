import { BaseRouter } from "../common/base_router";
import express from "express";
import { randomBytes } from "crypto";
import { collections } from "../common/database";
import * as bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";

export class UsersRoutes extends BaseRouter {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
    UsersRoutes.secret = randomBytes(64).toString("hex");
  }

  private static secret: string;

  public static authenticate = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const token = req.headers["authorization"];

    if (token == null) return res.sendStatus(401);
    var decoded: any = verify(token, this.secret);
    res.locals.access = decoded.access;
    next();
  };

  public static admin = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (res.locals.access != "admin") return res.sendStatus(401);
    next();
  };

  public static packageadmin = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (res.locals.access != "admin" && res.locals.access != "packageadmin")
      return res.sendStatus(401);
    next();
  };

  configureRoutes(): express.Application {
    this.app
      .route(`/users`)
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`List of users`);
      })
      .post(async (req: express.Request, res: express.Response) => {
        let { username, password, access } = req.body;
        let existing = await collections.users?.findOne({ username: username });
        if (existing) {
          res.status(409).send({
            ErrorCode: 0,
            ErrorMessage: "Username is not unique",
          });
        } else {
          const salt = bcrypt.genSaltSync(10);
          const bcryptHash = bcrypt.hashSync(password, salt);
          collections.users?.insertOne({
            username: username,
            access: access,
            hashedPassword: bcryptHash,
          });
          res.status(200).send({ username: username, access: access });
        }
      });

    this.app
      .route(`/users/:userId`)
      .all(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          next();
        }
      )
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`GET request for id ${req.params.userId}`);
      })
      .put((req: express.Request, res: express.Response) => {
        res.status(200).send(`PUT request for id ${req.params.userId}`);
      })
      .patch((req: express.Request, res: express.Response) => {
        res.status(200).send(`PATCH request for id ${req.params.userId}`);
      })
      .delete((req: express.Request, res: express.Response) => {
        res.status(200).send(`DELETE request for id ${req.params.userId}`);
      });

    this.app
      .route(`/login`)
      .post(async (req: express.Request, res: express.Response) => {
        let { username, password } = req.body;

        let user = await collections.users?.findOne({ username: username });
        if (!user) res.status(401).send();
        else {
          var targetHash = user.hashedPassword;
          if (bcrypt.compareSync(password, targetHash)) {
            var token = sign(
              { username: username, access: user.access },
              UsersRoutes.secret,
              { expiresIn: "1800s" }
            );
            res.status(200).send({ token: token });
          } else {
            res.status(401).send();
          }
        }
      });

    return this.app;
  }
}
