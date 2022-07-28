import { Options } from "ky";
import { ApiError, IPostUserResponse } from "src/interfaces/ResponseInterface";
import { post } from "../createRequest";

export const postLogin = async (
  zid: string
): Promise<IPostUserResponse | ApiError> => {
  const options: Options = {
    body: JSON.stringify({ zid }),
  };

  return post("/api/v1/user/login", options) as Promise<
    IPostUserResponse | ApiError
  >;
};
