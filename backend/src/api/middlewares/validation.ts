import { NextFunction, Request, Response } from "express";
import { getLogger } from "../../utils/Logger";
import Joi from "joi";

const logger = getLogger();

const validationMiddleware =
  (schema: Joi.ObjectSchema, property: "body" | "query") =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.validate(req[property]);
    const { error } = result;
    const valid = error == null;
    if (!valid) {
      logger.info(
        `Invalid request was made - Error: ${
          error.message
        } - Data: ${JSON.stringify(req[property])}`
      );
      res.status(400).json({
        message: `Invalid request was made - Error: ${error.message}`,
        data: req.body,
      });
      return;
    }

    next();
  };

export default validationMiddleware;
