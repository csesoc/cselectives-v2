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
