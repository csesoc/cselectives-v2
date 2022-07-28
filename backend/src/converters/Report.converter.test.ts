import {
  getReportEntity,
  getMockReports,
  getMockReview,
} from "../utils/testData";
import {
  convertReportEntityToInterface,
  convertReportInterfaceToEntity,
} from "./Report.converter";

describe("convertReportEntityToInterface", () => {
  it("should convert ReportEntity to IReport", () => {
    const entity = getReportEntity();
    const report = getMockReports(entity.createdTimestamp)[0];
    expect(convertReportEntityToInterface(entity)).toEqual(report);
  });
});

describe("convertReportInterfaceToEntity", () => {
  it("should convert IReport to ReportEntity", () => {
    const entity = getReportEntity();
    const report = getMockReports(entity.createdTimestamp)[0];
    expect(convertReportInterfaceToEntity(report)).toEqual(entity);
  });
});
