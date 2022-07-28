import { IHttpError } from "../interfaces/IApiResponses";
import { HTTPError } from "./Errors";

export const envVars: string[] = [
  "POSTGRESQL_HOST",
  "POSTGRESQL_USER",
  "POSTGRESQL_PASSWORD",
  "POSTGRESQL_DATABASE",
  "JWT_SECRET",
];

export const unauthorizedError: IHttpError = {
  errorCode: 401,
  errorMessage: "Unauthorized error occured",
};

export const badRequest: IHttpError = {
  errorCode: 400,
  errorMessage: "Bad request",
};

export const timeoutError: IHttpError = {
  errorCode: 408,
  errorMessage: "Timeout, the transaction hasn't completed yet, please retry",
};

export const internalServerError: IHttpError = {
  errorCode: 500,
  errorMessage: "An internal server error occurred",
};

export const getResponseFromHttpError = (error: HTTPError): IHttpError => {
  return {
    errorCode: error.errorCode,
    errorMessage: error.errorMessage,
  };
};
