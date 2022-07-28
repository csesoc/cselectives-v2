import Joi from "joi";

export const UpdateCourseSchema = Joi.object({
  course: Joi.object({
    courseCode: Joi.string().required(),
    archived: Joi.boolean().required(),
    attributes: Joi.array().items(Joi.string()).required(),
    calendar: Joi.string().required(),
    campus: Joi.string().required(),
    description: Joi.string().required(),
    enrolmentRules: Joi.string().required(),
    equivalents: Joi.array().items(Joi.string()).required(),
    exclusions: Joi.array().items(Joi.string()).required(),
    faculty: Joi.string().required(),
    fieldOfEducation: Joi.string().required(),
    genEd: Joi.boolean().required(),
    level: Joi.number().required(),
    school: Joi.string().required(),
    studyLevel: Joi.string().required(),
    terms: Joi.array().items(Joi.number()).required(),
    title: Joi.string().required(),
    uoc: Joi.number().required(),
    rating: Joi.number().required(),
  }).required(),
});

export const BookmarkCourseSchema = Joi.object({
  courseCode: Joi.string().required(),
  zid: Joi.string().required(),
  bookmark: Joi.boolean().required(),
});
