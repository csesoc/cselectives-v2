import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../../utils/Logger";
import { IRouter } from "../../interfaces/IRouter";
import { ReportService } from "../services/Report.service";
import validationMiddleware from "../middlewares/validation";
import {
  CreateReportSchema,
  UpdateReportStatusSchema,
} from "../schemas/Report.schema";
import {
  IPostReportRequestBody,
  IUpdateReportRequestBody,
} from "IApiResponses";

export class ReportRouter implements IRouter {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly reportService: ReportService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router()
      .get(
        "/reports",
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received GET request in /reports`);
          try {
            const result = await this.reportService.getAllReports();
            this.logger.info(`Responding to client in /reports`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /reports ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .post(
        "/reports",
        validationMiddleware(CreateReportSchema, "body"),
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received POST request in /reports`, req.body);
          try {
            const request = req.body as IPostReportRequestBody;
            const result = await this.reportService.createReport(request);
            this.logger.info(`Responding to client in /reports`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST /reports ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .put(
        "/reports",
        validationMiddleware(UpdateReportStatusSchema, "body"),
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received PUT request in /reports`, req.body);
          try {
            const request = req.body as IUpdateReportRequestBody;
            const result = await this.reportService.updateReport(request);
            this.logger.info(`Responding to client in /reports`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to PUT /reports ${formatError(
                err
              )}`
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
