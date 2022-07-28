import { ICourse } from "ICourse";
import { CourseEntity } from "../entity/Course";

export const convertCourseEntityToInterface = (
  entity: CourseEntity
): ICourse => {
  return {
    courseCode: entity.courseCode,
    archived: entity.archived,
    attributes: entity.attributes,
    calendar: entity.calendar,
    campus: entity.campus,
    description: entity.description,
    enrolmentRules: entity.enrolmentRules,
    equivalents: entity.equivalents,
    exclusions: entity.exclusions,
    faculty: entity.faculty,
    fieldOfEducation: entity.fieldOfEducation,
    genEd: entity.genEd,
    level: entity.level,
    school: entity.school,
    studyLevel: entity.studyLevel,
    terms: entity.terms,
    title: entity.title,
    uoc: entity.uoc,
    rating: entity.rating,
  };
};

export const convertCourseInterfaceToEntity = (
  course: ICourse
): CourseEntity => {
  return {
    courseCode: course.courseCode,
    archived: course.archived,
    attributes: course.attributes,
    calendar: course.calendar,
    campus: course.campus,
    description: course.description,
    enrolmentRules: course.enrolmentRules,
    equivalents: course.equivalents,
    exclusions: course.exclusions,
    faculty: course.faculty,
    fieldOfEducation: course.fieldOfEducation,
    genEd: course.genEd,
    level: course.level,
    school: course.school,
    studyLevel: course.studyLevel,
    terms: course.terms,
    title: course.title,
    uoc: course.uoc,
    rating: course.rating,
  };
};
