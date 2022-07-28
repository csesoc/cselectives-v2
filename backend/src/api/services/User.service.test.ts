import { HTTPError } from "../../utils/Errors";
import { badRequest } from "../../utils/Constants";
import { UserService } from "./User.service";
import {
  getUserEntity,
  getMockNewUser,
  getMockUser,
  getMockCourses,
} from "../../utils/testData";
import { EntityManager } from "typeorm/entity-manager/EntityManager";
import { DataSource } from "typeorm";
import { AuthService } from "../../modules/Auth";

describe("UserService", () => {
  let manager: EntityManager;
  let auth: AuthService;
  let connection: DataSource;

  beforeEach(() => {
    connection = new DataSource({ type: "postgres" });
    manager = new EntityManager(connection);
    auth = new AuthService();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const userService = () => new UserService(manager, auth);

  describe("createUser", () => {
    it("should throw HTTP 400 error if could user exists in database", () => {
      const service = userService();
      const entity = getUserEntity();
      const user = getMockUser();
      manager.findOneBy = jest.fn().mockReturnValue(entity);
      const errorResult = new HTTPError(badRequest);
      expect(service.createUser(user.zid)).rejects.toThrow(errorResult);
    });

    it("should resolve and return new created user", async () => {
      const service = userService();
      const entity = getUserEntity();
      const user = getMockNewUser();
      manager.findOneBy = jest.fn().mockReturnValue(null);
      manager.save = jest.fn().mockReturnValue(entity);
      const result = await service.createUser(user.zid);
      expect(result.user).toEqual(user);
    });
  });

  describe("getUser", () => {
    it("should throw HTTP 400 error if could user not in database", () => {
      const service = userService();
      const user = getMockNewUser();
      manager.findOneBy = jest.fn().mockReturnValue(null);
      const errorResult = new HTTPError(badRequest);
      expect(service.getUser(user.zid)).rejects.toThrow(errorResult);
    });

    it("should resolve and return existing user", async () => {
      const service = userService();
      const entity = getUserEntity();
      const user = getMockUser();
      const course = getMockCourses()[0];
      manager.findOneBy = jest.fn().mockReturnValue(entity);
      manager.findBy = jest
        .fn()
        .mockReturnValueOnce([])
        .mockReturnValueOnce([course]);
      const result = await service.getUser(user.zid);
      expect(result.user).toEqual(user);
    });
  });
});
