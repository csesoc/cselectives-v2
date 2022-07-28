import config from "config";
import Database from "./modules/Database";
import { getLogger } from "./utils/Logger";
import { ExpressWrapper } from "./modules/ExpressWrapper";
import { ReviewService } from "./api/services/Review.service";
import { ReviewRouter } from "./api/routes/Review.router";
import { CourseService } from "./api/services/Course.service";
import { CourseRouter } from "./api/routes/Course.router";
import { UserService } from "./api/services/User.service";
import { UserRouter } from "./api/routes/User.router";
import { ReportRouter } from "./api/routes/Report.router";
import { ReportService } from "./api/services/Report.service";
import { AuthService } from "./modules/Auth";

export default class App {
  readonly logger = getLogger();
  private ex = new ExpressWrapper();
  private db = new Database("default");

  // db manager
  private readonly manager = this.db.get().manager;

  // auth
  private readonly auth = new AuthService();

  // add services here
  private readonly courseService = new CourseService(this.manager);
  private readonly userService = new UserService(this.manager, this.auth);
  private readonly reportService = new ReportService(this.manager);
  private readonly reviewService = new ReviewService(this.manager);

  constructor() {
    // add routers here .. e.g.
    const reviewRouter = new ReviewRouter(this.reviewService);
    const courseRouter = new CourseRouter(this.courseService);
    const userRouter = new UserRouter(this.userService);
    const reportRouter = new ReportRouter(this.reportService);

    this.ex.addRouters(
      // ... add routers here
      reviewRouter,
      courseRouter,
      userRouter,
      reportRouter
    );
  }

  async start(): Promise<void> {
    this.logger.info("Starting up...");
    await this.db.start();
    await this.ex.start(config.get("api.port"));
    this.logger.info("Started HTTP Server and Database");
  }

  async stop(): Promise<void> {
    await this.ex.stop();
    await this.db.stop();
  }
}
