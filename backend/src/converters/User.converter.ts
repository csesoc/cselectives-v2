import { IUser } from "IUser";
import { CourseEntity } from "../entity/Course";
import { ReviewEntity } from "../entity/Review";
import { UserEntity } from "../entity/User";
import { convertCourseEntityToInterface } from "./Course.converter";
import { convertReportEntityToInterface } from "./Report.converter";
import { convertReviewEntityToInterface } from "./Review.converter";

export const convertUserEntityToInterface = (
  userEntity: UserEntity,
  bookmarkedCourseEntities: CourseEntity[] = [],
  bookmarkedReviewEntities: ReviewEntity[] = []
): IUser => {
  return {
    zid: userEntity.zid,
    bookmarkedReviews: bookmarkedReviewEntities.map(
      convertReviewEntityToInterface
    ),
    bookmarkedCourses: bookmarkedCourseEntities.map(
      convertCourseEntityToInterface
    ),
    isAdmin: userEntity.isAdmin,
    reviews: userEntity.reviews.map(convertReviewEntityToInterface),
    reports: userEntity.reports.map(convertReportEntityToInterface),
  };
};
