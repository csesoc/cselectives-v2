import { HTTPError } from "../../utils/Errors";
import { badRequest } from "../../utils/Constants";
import { ReportService } from "./Report.service";
import {
  getReportEntity,
  getMockReports,
  getReviewEntity,
  getMockReview,
} from "../../utils/testData";
import { EntityManager, DataSource } from "typeorm";
import { IPostReportRequestBody } from "IApiResponses";

describe("ReportService", () => {
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

  const reportService = () => new ReportService(manager);

  describe("getAllReports", () => {
    it("should resolve and return report", () => {
      const service = reportService();
      const reports = getMockReports();
      manager.find = jest.fn().mockReturnValue(reports);
      expect(service.getAllReports()).resolves.toEqual({
        reports,
      });
    });
  });

  describe("createReport", () => {
    it("should throw HTTP 400 error if user attempted to report the same review in database", () => {
      const service = reportService();
      const entity = getReportEntity();
      const report = getMockReports()[0];
      const reportRequest: IPostReportRequestBody = {
        reviewId: report.review.reviewId,
        reason: report.reason,
        zid: report.zid,
      };

      manager.findOneBy = jest.fn().mockReturnValue(entity);
      const errorResult = new HTTPError(badRequest);
      expect(service.createReport(reportRequest)).rejects.toThrow(errorResult);
    });

    it("should throw HTTP 400 error if review is not in database", () => {
      const service = reportService();
      const entity = getReportEntity();
      const report = getMockReports()[0];
      const reportRequest: IPostReportRequestBody = {
        reviewId: report.review.reviewId,
        reason: report.reason,
        zid: report.zid,
      };

      manager.findOneBy = jest
        .fn()
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(null);

      const errorResult = new HTTPError(badRequest);
      expect(service.createReport(reportRequest)).rejects.toThrow(errorResult);
    });

    it("should resolve and return new created report", async () => {
      const service = reportService();
      const reportEntity = getReportEntity();
      const report = getMockReports()[0];
      const reviewEntity = getReviewEntity();
      const review = getMockReview();
      const reportRequest: IPostReportRequestBody = {
        reviewId: report.review.reviewId,
        reason: report.reason,
        zid: report.zid,
      };

      manager.findOneBy = jest
        .fn()
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(reviewEntity);
      manager.save = jest.fn().mockReturnValue(reportEntity);

      const reportResult = await service.createReport(reportRequest);
      expect(reportResult.report.status).toEqual("UNSEEN");
      expect(reportResult.report.zid).toEqual(report.zid);
      expect(reportResult.report.reason).toEqual(report.reason);
      expect(reportResult.report.review).toEqual(review);
    });
  });
});