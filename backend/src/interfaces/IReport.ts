import { IReview } from "IReview";

export type ReportStatus = "UNSEEN" | "SEEN" | "REMOVED" | "SETTLED";

export interface IReport {
  reportId: string;
  review: IReview;
  zid: string;
  status: ReportStatus;
  reason: string;
  createdTimestamp: Date;
  updatedTimestamp: Date;
}
