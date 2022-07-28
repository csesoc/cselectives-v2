import {
  ApiError,
  IGetCoursesResponse,
} from "src/interfaces/ResponseInterface";
import { get } from "../createRequest";

export const getCourses = async (): Promise<IGetCoursesResponse | ApiError> => {
  return get("/api/v1/courses") as Promise<
    IGetCoursesResponse | ApiError
  >;
};
