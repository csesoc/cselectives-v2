import { getCourseEntity, getMockCourses } from "../utils/testData";
import {
  convertCourseEntityToInterface,
  convertCourseInterfaceToEntity,
} from "./Course.converter";

describe("convertCourseEntityToInterface", () => {
  it("should convert CourseEntity to ICourse", () => {
    const course = getMockCourses()[0];
    const entity = getCourseEntity();
    expect(convertCourseEntityToInterface(entity)).toEqual(course);
  });
});

describe("convertCourseInterfaceToEntity", () => {
  it("should convert ICourse to CourseEntity", () => {
    const course = getMockCourses()[0];
    const entity = getCourseEntity();
    expect(convertCourseInterfaceToEntity(course)).toEqual(entity);
  });
});
