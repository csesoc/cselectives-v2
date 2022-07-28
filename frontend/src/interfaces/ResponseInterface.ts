// Courses
export interface ICourse {
  courseCode: string;
  archived: boolean;
  attributes: string[];
  calendar: string;
  campus: string;
  description: string;
  enrolmentRules: string;
  equivalents: string[];
  exclusions: string[];
  faculty: string;
  fieldOfEducation: string;
  genEd: boolean;
  level: number;
  school: string;
  studyLevel: string;
  terms: number[];
  title: string;
  uoc: number;
  rating: number;
}

// Reviews
export interface IReview {
  reviewId: string;
  zid: string;
  courseCode: string;
  authorName: string;
  description: string;
  grade: number;
  termTaken: string;
  createdTimestamp: Date;
  updatedTimestamp: Date;
  upvotes: string[];
  manageability: number;
  enjoyability: number;
  usefulness: number;
  overallRating: number;
}

// Reports
export enum ReportStatus {
  UNSEEN = "UNSEEN",
  SEEN = "SEEN",
  REMOVED = "REMOVED",
  SETTLED = "SETTLED",
}

export interface IReport {
  reportId: string;
  review: IReview;
  zid: string;
  status: ReportStatus;
  reason: string;
  createdTimestamp: Date;
  updatedTimestamp: Date;
}

// Users
export interface IUser {
  zid: string;
  isAdmin: boolean;
  bookmarkedCourses: ICourse[];
  bookmarkedReviews: IReview[];
  reports: IReport[];
  reviews: IReview[];
}

// Tokens
export interface ITokenData {
  expiresIn: string;
  token: string;
}

export interface IToken {
  zid: string;
}

// API Responses

// Errors
export interface ApiError {
  errorCode: string;
  errorMessage: string;
}

export interface IPostUserResponse {
  user: IUser;
  token: ITokenData;
}

export interface IGetCoursesResponse {
  courses: ICourse[];
}
