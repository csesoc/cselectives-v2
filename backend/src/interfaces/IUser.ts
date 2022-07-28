import { ICourse } from "ICourse";
import { IReview } from "IReview";
import { IReport } from "./IReport";

export interface IUser {
  zid: string;
  isAdmin: boolean;
  bookmarkedCourses: ICourse[];
  bookmarkedReviews: IReview[];
  reports: IReport[];
  reviews: IReview[];
}
