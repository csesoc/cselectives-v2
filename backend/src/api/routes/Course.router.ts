import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../../utils/Logger";
import { IRouter } from "../../interfaces/IRouter";
import { CourseService } from "../services/Course.service";
import {
  BookmarkCourseSchema,
  UpdateCourseSchema,
} from "../schemas/Course.schema";
import validationMiddleware from "../middlewares/validation";
import { HTTPError } from "../../utils/Errors";
import { badRequest } from "../../utils/Constants";
import {
  IPostCoursesBookmarkRequestBody,
  IPutCoursesRequestBody,
} from "IApiResponses";

export class CourseRouter implements IRouter {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly courseService: CourseService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router()
      .get(
        "/courses",
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received request in GET /courses`);
          try {
            const result = await this.courseService.getCourses();
            this.logger.info(`Responding to client in GET /courses`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /courses ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .put(
        "/courses/:courseCode",
        validationMiddleware(UpdateCourseSchema, "body"),
        async (req: Request, res: Response, next: NextFunction) => {
          const { courseCode } = req.params;
          this.logger.debug(`Received request in PUT /courses/${courseCode}`);
          try {
            const { course } = req.body as IPutCoursesRequestBody;
            if (courseCode !== course.courseCode)
              throw new HTTPError(badRequest);
            const result = await this.courseService.updateCourse(course);
            this.logger.info(
              `Responding to client in PUT /courses/${courseCode}`
            );
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to PUT /courses/${courseCode} ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .post(
        "/courses/bookmark",
        validationMiddleware(BookmarkCourseSchema, "body"),
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received request in POST /courses/bookmark`);
          try {
            const bookmarkDetails = req.body as IPostCoursesBookmarkRequestBody;
            if (!bookmarkDetails) throw new HTTPError(badRequest);
            const result = await this.courseService.bookmarkCourse(
              bookmarkDetails
            );
            this.logger.info(`Responding to client in POST /courses/bookmark`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST /courses/bookmark ${formatError(
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
