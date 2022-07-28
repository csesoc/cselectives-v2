import Joi from "joi";

export const CreateUserSchema = Joi.object({
  zid: Joi.string().required(),
}).required();
