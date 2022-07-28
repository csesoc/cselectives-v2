import { ReportEntity } from "../entity/Report";
import { IReport } from "../interfaces/IReport";
import {
  convertReviewEntityToInterface,
  convertReviewInterfaceToEntity,
} from "./Review.converter";

export const convertReportEntityToInterface = (
  entity: ReportEntity
): IReport => {
  return {
    reportId: entity.reportId,
    review: convertReviewEntityToInterface(entity.review),
    zid: entity.zid,
    reason: entity.reason,
    status: entity.status,
    createdTimestamp: entity.createdTimestamp,
    updatedTimestamp: entity.updatedTimestamp,
  };
};

export const convertReportInterfaceToEntity = (
  report: IReport
): ReportEntity => {
  return {
    reportId: report.reportId,
    review: convertReviewInterfaceToEntity(report.review),
    zid: report.zid,
    reason: report.reason,
    status: report.status,
    createdTimestamp: report.createdTimestamp,
    updatedTimestamp: report.updatedTimestamp,
  };
};
