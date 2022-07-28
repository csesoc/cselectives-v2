import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../../utils/Logger";
import { IRouter } from "../../interfaces/IRouter";
import { UserService } from "../services/User.service";
import validationMiddleware from "../middlewares/validation";
import { CreateUserSchema } from "../schemas/User.schema";
import verifyToken from "../middlewares/auth";

export class UserRouter implements IRouter {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly userService: UserService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router()
      .post(
        "/user/register",
        validationMiddleware(CreateUserSchema, "body"),
        async (req: Request, res: Response, next: NextFunction) => {
          const { zid } = req.body;
          this.logger.debug(
            `Received POST request in /user/register`,
            req.body
          );
          try {
            const result = await this.userService.createUser(zid);
            this.logger.info(`Responding to client in /user/register`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST /user/register ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .post(
        "/user/login",
        validationMiddleware(CreateUserSchema, "body"),
        async (req: Request, res: Response, next: NextFunction) => {
          const { zid } = req.body;
          this.logger.debug(`Received POST request in /user/login`, req.body);
          try {
            const result = await this.userService.loginUser(zid);
            this.logger.info(`Responding to client in /user/login`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST /user/login ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .get(
        "/user/:zid",
        [verifyToken],
        async (req: Request, res: Response, next: NextFunction) => {
          const { zid } = req.params;
          this.logger.debug(`Received GET request in /user`, req.params);
          try {
            const result = await this.userService.getUser(zid);
            this.logger.info(`Responding to client in /user/${zid}`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /user ${formatError(err)}`
            );
            return next(err);
          }
        }
      );
  }

  getPrefix(): string {
    return this.prefix;
  }

  getRouter(): Router {
    return this.router;
  }
}
