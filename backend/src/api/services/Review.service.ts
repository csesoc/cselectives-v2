import {
  IGetReviewsSuccessResponse,
  IPostReviewRequestBody,
  IPutReviewRequestBody,
  IPostReviewSuccessResponse,
  IPutReviewSuccessResponse,
  IPostReviewsBookmarkRequestBody,
  IDeleteReviewRequestBody,
  IPostReviewUpvoteSuccessResponse,
  IPostReviewUpvoteRequestBody,
} from "IApiResponses";
import { ReviewRepository } from "../../repositories/Review.repository";
import { getLogger } from "../../utils/Logger";
import { ReviewEntity } from "../../entity/Review";
import { convertReviewEntityToInterface } from "../../converters/Review.converter";
import { HTTPError } from "../../utils/Errors";
import { internalServerError, badRequest } from "../../utils/Constants";
import { UserRepository } from "../../repositories/User.repository";
import { EntityManager } from "typeorm";

export class ReviewService {
  private logger = getLogger();
  constructor(private readonly manager: EntityManager) {}
  private reviewRepository = new ReviewRepository(this.manager);
  private userRepository = new UserRepository(this.manager);

  async getAllReviews(): Promise<IGetReviewsSuccessResponse | undefined> {
    const reviews: ReviewEntity[] = await this.reviewRepository.getAllReviews();
    if (reviews.length === 0) {
      this.logger.error("Database returned with no reviews.");
      throw new HTTPError(internalServerError);
    }
    return {
      reviews: reviews.map(convertReviewEntityToInterface),
    };
  }

  async getCourseReviews(
    courseCode: string
  ): Promise<IGetReviewsSuccessResponse | undefined> {
    const reviews: ReviewEntity[] =
      await this.reviewRepository.getCourseReviews(courseCode);
    if (reviews.length === 0) {
      this.logger.error("Database returned with no reviews.");
      throw new HTTPError(internalServerError);
    }
    return {
      reviews: reviews.map(convertReviewEntityToInterface),
    };
  }

  async postReview(
    reviewDetails: IPostReviewRequestBody
  ): Promise<IPostReviewSuccessResponse | undefined> {
    // Convert reviewDetails to a reviewEntity
    const reviewEntity = new ReviewEntity();
    reviewEntity.zid = reviewDetails.zid;
    reviewEntity.courseCode = reviewDetails.courseCode;
    reviewEntity.authorName = reviewDetails.authorName;
    reviewEntity.description = reviewDetails.description;
    reviewEntity.grade = reviewDetails.grade;
    reviewEntity.termTaken = reviewDetails.termTaken;
    reviewEntity.upvotes = [];

    const review = await this.reviewRepository.save(reviewEntity);

    return {
      review: convertReviewEntityToInterface(review),
    };
  }

  async updateReview(
    updatedReviewDetails: IPutReviewRequestBody,
    reviewId: string
  ): Promise<IPutReviewSuccessResponse | undefined> {
    // Get review entity by review id
    let review = await this.reviewRepository.getReview(reviewId);

    if (!review) {
      this.logger.error(`There is no review with reviewId ${reviewId}.`);
      throw new HTTPError(badRequest);
    }

    // Convert reviewDetails to a reviewEntity
    review.authorName = updatedReviewDetails.authorName;
    review.grade = updatedReviewDetails.grade;

    review = await this.reviewRepository.save(review);

    return {
      review: convertReviewEntityToInterface(review),
    };
  }

  async deleteReview(reviewId: string) {
    const review = await this.reviewRepository.getReview(reviewId);
    if (!review) {
      this.logger.error(`There is no review with reviewId ${reviewId}.`);
      throw new HTTPError(badRequest);
    }

    return await this.reviewRepository.deleteReview(review.reviewId);
  }

  async bookmarkReview(
    reviewDetails: IPostReviewsBookmarkRequestBody
  ): Promise<IPutReviewSuccessResponse | undefined> {
    const review = await this.reviewRepository.getReview(
      reviewDetails.reviewId
    );

    if (!review) {
      this.logger.error(
        `There is no course with courseCode ${reviewDetails.reviewId}.`
      );
      throw new HTTPError(badRequest);
    }

    let user = await this.userRepository.getUser(reviewDetails.zid);

    if (!user) {
      this.logger.error(`There is no user with zid ${reviewDetails.zid}.`);
      throw new HTTPError(badRequest);
    }

    if (reviewDetails.bookmark) {
      user.bookmarkedReviews = [
        ...user.bookmarkedReviews,
        reviewDetails.reviewId,
      ];
    } else {
      user.bookmarkedReviews.filter(
        (review) => review !== reviewDetails.reviewId
      );
    }

    user = await this.userRepository.saveUser(user);

    this.logger.info(
      `Successfully ${
        reviewDetails.bookmark ? "bookmarked" : "removed bookmarked"
      } review with reviewId ${reviewDetails.reviewId} for user with zID ${
        reviewDetails.zid
      }.`
    );
    return {
      review: convertReviewEntityToInterface(review),
    };
  }

  async upvoteReview(
    upvoteDetails: IPostReviewUpvoteRequestBody
  ): Promise<IPostReviewUpvoteSuccessResponse | undefined> {
    let review = await this.reviewRepository.getReview(upvoteDetails.reviewId);

    if (!review) {
      this.logger.error(
        `There is no review with reviewId ${upvoteDetails.reviewId}.`
      );
      throw new HTTPError(badRequest);
    }

    if (upvoteDetails.upvote) {
      review.upvotes = [...review.upvotes, upvoteDetails.zid];
    } else {
      review.upvotes.filter((zid) => zid !== upvoteDetails.zid);
    }

    review = await this.reviewRepository.save(review);

    this.logger.info(
      `Successfully ${
        upvoteDetails.upvote ? "upvoted" : "removed upvote from"
      } review with reviewId ${upvoteDetails.reviewId} for user with zID ${
        upvoteDetails.zid
      }.`
    );

    return {
      review: convertReviewEntityToInterface(review),
    };
  }
}
