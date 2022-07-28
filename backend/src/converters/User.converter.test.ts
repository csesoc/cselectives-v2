import { getUserEntity, getMockUser, getCourseEntity } from "../utils/testData";
import { convertUserEntityToInterface } from "./User.converter";

describe("convertUserEntityToInterface", () => {
  it("should convert UserEntity to IUser", () => {
    const course = getCourseEntity();
    const entity = getUserEntity();
    const user = getMockUser();
    expect(convertUserEntityToInterface(entity, [course])).toEqual(user);
  });
});
