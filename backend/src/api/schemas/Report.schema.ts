import Joi from "joi";

export const CreateReportSchema = Joi.object({
  reviewId: Joi.string().guid().required(),
  zid: Joi.string().required(),
  reason: Joi.string().required(),
});

export const UpdateReportStatusSchema = Joi.object({
  reportId: Joi.string().guid().required(),
  zid: Joi.string().required(),
  status: Joi.valid("UNSEEN", "SEEN", "REMOVED", "SETTLED").required(),
});
