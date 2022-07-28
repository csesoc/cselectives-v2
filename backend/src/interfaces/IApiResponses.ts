import { IReview } from "IReview";
import { ICourse } from "ICourse";
import { IReport, ReportStatus } from "IReport";
import { IUser } from "IUser";
import { ITokenData } from "IToken";

export interface IHttpError {
  errorCode: number;
  errorMessage: string;
}

export interface IPostReviewRequestBody {
  zid: string;
  courseCode: string;
  authorName: string;
  description: string;
  grade: number;
  termTaken: string;
}

export interface IPostReviewSuccessResponse {
  review: IReview;
}

export interface IGetReviewsSuccessResponse {
  reviews: IReview[];
}

export interface IPutReviewRequestBody {
  authorName: string;
  grade: number;
}

export interface IDeleteReviewRequestBody {
  reviewId: string;
}

export type IPutReviewSuccessResponse = IPostReviewSuccessResponse;

export interface IPostReviewsBookmarkRequestBody {
  reviewId: string;
  zid: string;
  bookmark: boolean;
}
export interface IGetCoursesSuccessResponse {
  courses: ICourse[];
}

export interface IGetUserSuccessResponse {
  user: IUser;
}

export interface IPostUserSuccessResponse {
  user: IUser;
  token: ITokenData;
}

export interface IPostUserRequestBody {
  zid: string;
}

export interface IPostReportRequestBody {
  reviewId: string;
  zid: string;
  reason: string;
}

export interface IGetAllReportsSuccessResponse {
  reports: IReport[];
}

export interface IPostReportSuccessResponse {
  report: IReport;
}

export interface IUpdateReportRequestBody {
  reportId: string;
  zid: string;
  status: ReportStatus;
}

export interface IGetCoursesSuccessResponse {
  courses: ICourse[];
}

export interface IPutCoursesRequestBody {
  course: ICourse;
}

export type IPutCoursesSuccessResponse = IPutCoursesRequestBody;

export interface IPostCoursesBookmarkRequestBody {
  courseCode: string;
  zid: string;
  bookmark: boolean;
}

export interface IPostCoursesBookmarkRequestBody {
  courseCode: string;
  zid: string;
  bookmark: boolean;
}

export type IPostCoursesBookmarkSuccessResponse = IPutCoursesSuccessResponse;

export interface IPostReviewUpvoteRequestBody {
  reviewId: string;
  zid: string;
  upvote: boolean;
}

export interface IPostReviewUpvoteSuccessResponse {
  review: IReview;
}
