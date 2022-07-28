import { HTTPError } from "../../utils/Errors";
import { badRequest, internalServerError } from "../../utils/Constants";
import { ReviewService } from "./Review.service";
import {
  getUserEntity,
  getReviewEntity,
  getMockReviews,
  getMockCOMP2521Reviews,
} from "../../utils/testData";
import { EntityManager, DataSource } from "typeorm";
import {
  IPostReviewRequestBody,
  IPutReviewRequestBody,
  IPostReviewsBookmarkRequestBody,
} from "IApiResponses";

describe("ReviewService", () => {
  let manager: EntityManager;
  let connection: DataSource;

  beforeEach(() => {
    connection = new DataSource({ type: "postgres" });
    manager = new EntityManager(connection);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const reviewService = () => new ReviewService(manager);

  describe("getAllReviews", () => {
    it("should return all reviews", () => {
      const service = reviewService();
      const reviews = getMockReviews();
      manager.find = jest.fn().mockReturnValue(reviews);
      expect(service.getAllReviews()).resolves.toEqual({
        reviews,
      });
    });

    it("should throw HTTP 500 error if no reviews in database", () => {
      const service = reviewService();
      manager.find = jest.fn().mockReturnValue([]);
      const errorResult = new HTTPError(internalServerError);
      expect(service.getAllReviews()).rejects.toThrow(errorResult);
    });
  });

  describe("getCourseReviews", () => {
    it("should return all reviews associated with course", () => {
      const service = reviewService();
      const reviews = getMockCOMP2521Reviews();
      manager.find = jest.fn().mockReturnValue(reviews);
      expect(service.getCourseReviews("COMP2521")).resolves.toEqual({
        reviews,
      });
    });
  });

  describe("postReview", () => {
    it("should resolve and post a new review", async () => {
      const service = reviewService();
      const reviewEntity = getReviewEntity();
      const review = getMockReviews()[0];

      const reviewRequest: IPostReviewRequestBody = {
        zid: reviewEntity.zid,
        courseCode: reviewEntity.courseCode,
        authorName: reviewEntity.authorName,
        description: reviewEntity.description,
        grade: reviewEntity.grade,
        termTaken: reviewEntity.termTaken,
      };

      manager.findOneBy = jest
        .fn()
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(reviewEntity);
      manager.save = jest.fn().mockReturnValue(reviewEntity);

      expect(service.postReview(reviewRequest)).resolves.toEqual({
        review: review,
      });
    });
  });

  describe("updateReview", () => {
    it("should throw HTTP 400 error if no review in database", () => {
      const service = reviewService();
      const review = getMockReviews()[0];
      manager.findOneBy = jest.fn().mockReturnValue(undefined);

      const errorResult = new HTTPError(badRequest);
      expect(service.updateReview(review, review.reviewId)).rejects.toThrow(
        errorResult
      );
    });

    it("should resolve and update an existing review", () => {
      const service = reviewService();
      const reviewEntity = getReviewEntity();
      const review = getMockReviews()[0];

      const reviewRequest: IPutReviewRequestBody = {
        authorName: reviewEntity.authorName,
        grade: reviewEntity.grade,
      };

      manager.findOneBy = jest.fn().mockReturnValue(reviewEntity);
      manager.save = jest.fn().mockReturnValue(reviewEntity);

      expect(
        service.updateReview(reviewRequest, reviewEntity.reviewId)
      ).resolves.toEqual({
        review: review,
      });
    });
  });

  describe("deleteReview", () => {
    it("should resolve and delete an existing review", () => {
      const service = reviewService();
      const reviewEntity = getReviewEntity();
      const id = reviewEntity.reviewId;

      manager.findOneBy = jest.fn().mockReturnValue(reviewEntity);
      manager.delete = jest.fn().mockReturnValue(reviewEntity);
      // Should this have an empty toEqual()?
      expect(service.deleteReview(id)).resolves.toEqual(reviewEntity);
    });
  });

  describe("bookmarkReview", () => {
    it("should throw HTTP 400 error if no reviews in database", () => {
      const service = reviewService();
      const reviews = getMockReviews()[0];
      manager.findOneBy = jest.fn().mockReturnValue(undefined);
      const request: IPostReviewsBookmarkRequestBody = {
        reviewId: reviews.reviewId,
        zid: reviews.zid,
        bookmark: true,
      };

      const errorResult = new HTTPError(badRequest);
      expect(service.bookmarkReview(request)).rejects.toThrow(errorResult);
    });

    it("should throw HTTP 400 error if no user in database", () => {
      const service = reviewService();
      const reviews = getMockReviews();
      manager.findOneBy = jest
        .fn()
        .mockReturnValue(reviews[0])
        .mockReturnValue(undefined);
      const request: IPostReviewsBookmarkRequestBody = {
        reviewId: reviews[0].reviewId,
        zid: reviews[0].zid,
        bookmark: true,
      };

      const errorResult = new HTTPError(badRequest);
      expect(service.bookmarkReview(request)).rejects.toThrow(errorResult);
    });

    it("should resolve and return bookmarked review", () => {
      const service = reviewService();
      const reviews = getMockReviews();
      const user = getUserEntity();
      manager.findOneBy = jest
        .fn()
        .mockReturnValueOnce(reviews[0])
        .mockReturnValueOnce(user);
      manager.save = jest.fn().mockReturnValue(user);
      const request: IPostReviewsBookmarkRequestBody = {
        reviewId: reviews[0].reviewId,
        zid: reviews[0].zid,
        bookmark: true,
      };

      expect(service.bookmarkReview(request)).resolves.toEqual({
        review: reviews[0],
      });
    });

    it("should resolve and remove bookmarked review", () => {
      const service = reviewService();
      const reviews = getMockReviews();
      const user = getUserEntity();
      manager.findOneBy = jest
        .fn()
        .mockReturnValueOnce(reviews[0])
        .mockReturnValueOnce(user);
      manager.save = jest.fn().mockReturnValueOnce(user);
      const request: IPostReviewsBookmarkRequestBody = {
        reviewId: reviews[0].reviewId,
        zid: reviews[0].zid,
        bookmark: false,
      };
      expect(service.bookmarkReview(request)).resolves.toEqual({
        review: reviews[0],
      });
    });
  });
});
