import { IReview } from "IReview";
import { ReviewEntity } from "../entity/Review";

export const convertReviewEntityToInterface = (
  entity: ReviewEntity
): IReview => {
  return {
    reviewId: entity.reviewId,
    zid: entity.zid,
    courseCode: entity.courseCode,
    authorName: entity.authorName,
    description: entity.description,
    grade: entity.grade,
    termTaken: entity.termTaken,
    createdTimestamp: entity.createdTimestamp,
    updatedTimestamp: entity.updatedTimestamp,
    upvotes: entity.upvotes,
    manageability: entity.manageability,
    enjoyability: entity.enjoyability,
    usefulness: entity.usefulness,
    overallRating: entity.overallRating,
  };
};

export const convertReviewInterfaceToEntity = (
  review: IReview
): ReviewEntity => {
  return {
    reviewId: review.reviewId,
    zid: review.zid,
    courseCode: review.courseCode,
    authorName: review.authorName,
    description: review.description,
    grade: review.grade,
    termTaken: review.termTaken,
    createdTimestamp: review.createdTimestamp,
    updatedTimestamp: review.updatedTimestamp,
    upvotes: review.upvotes,
    manageability: review.manageability,
    enjoyability: review.enjoyability,
    usefulness: review.usefulness,
    overallRating: review.overallRating,
  };
};
