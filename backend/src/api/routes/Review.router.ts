import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../../utils/Logger";
import { IRouter } from "../../interfaces/IRouter";
import { ReviewService } from "../services/Review.service";
import validationMiddleware from "../middlewares/validation";
import {
  PostReviewSchema,
  BookmarkReviewSchema,
  UpvoteReviewSchema,
} from "../schemas/Review.schema";
import { HTTPError } from "../../utils/Errors";
import { badRequest } from "../../utils/Constants";
import {
  IPostReviewRequestBody,
  IPutReviewRequestBody,
  IPostReviewsBookmarkRequestBody,
  IPostReviewUpvoteRequestBody,
} from "IApiResponses";
export class ReviewRouter implements IRouter {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly reviewService: ReviewService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router()
      .get(
        "/reviews",
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received request in /reviews`);
          try {
            const result = await this.reviewService.getAllReviews();
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /reviews ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .get(
        "/reviews/:courseCode",
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received request in /reviews/specific_course`);
          try {
            const courseCode: string = req.params.courseCode;
            const result = await this.reviewService.getCourseReviews(
              courseCode
            );
            this.logger.info(
              `Responding to client in GET /reviews/specific_course`
            );
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /reviews ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .post(
        "/reviews",
        validationMiddleware(PostReviewSchema, "body"),
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received request in POST /reviews`);
          try {
            const reviewDetails = req.body as IPostReviewRequestBody;
            if (!reviewDetails) throw new HTTPError(badRequest);
            const result = await this.reviewService.postReview(reviewDetails);
            this.logger.info(`Responding to client in POST /reviews`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST /reviews ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .put(
        "/reviews/:reviewId",
        validationMiddleware(PostReviewSchema, "body"),
        async (req: Request, res: Response, next: NextFunction) => {
          const { reviewId } = req.params;
          this.logger.debug(`Received request in PUT /reviews/${reviewId}`);
          try {
            const updatedReviewDetails = req.body as IPutReviewRequestBody;
            if (!updatedReviewDetails) throw new HTTPError(badRequest);
            const result = await this.reviewService.updateReview(
              updatedReviewDetails,
              reviewId
            );
            this.logger.info(
              `Responding to client in PUT /reviews/${reviewId}`
            );
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST /reviews ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .delete(
        "/reviews/:reviewId",
        async (req: Request, res: Response, next: NextFunction) => {
          const { reviewId } = req.params;
          this.logger.debug(`Received request in DELETE /reviews/${reviewId}`);
          try {
            const reviewId: string = req.params.reviewId;
            const result = await this.reviewService.deleteReview(reviewId);
            this.logger.info(
              `Responding to client in DELETE /reviews/${reviewId}`
            );
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to DELETE /reviews ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .post(
        "/reviews/bookmark",
        validationMiddleware(BookmarkReviewSchema, "body"),
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received request in POST /reviews/bookmark`);
          try {
            const reviewDetails = req.body as IPostReviewsBookmarkRequestBody;
            if (!reviewDetails) throw new HTTPError(badRequest);
            const result = await this.reviewService.bookmarkReview(
              reviewDetails
            );
            this.logger.info(`Responding to client in POST /reviews/bookmark`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST /reviews/bookmark ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .post(
        "/reviews/upvote",
        validationMiddleware(UpvoteReviewSchema, "body"),
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received request in POST /reviews/upvote`);
          try {
            const reviewDetails = req.body as IPostReviewUpvoteRequestBody;
            const result = await this.reviewService.upvoteReview(reviewDetails);
            this.logger.info(`Responding to client in POST /reviews/upvote`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST /reviews/upvote ${formatError(
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
