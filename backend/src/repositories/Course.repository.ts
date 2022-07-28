import { CourseEntity } from "../entity/Course";
import { EntityManager, In } from "typeorm";

export class CourseRepository {
  constructor(private readonly manager: EntityManager) {}

  async getAllCourses(): Promise<CourseEntity[]> {
    return await this.manager.find(CourseEntity);
  }

  async getCoursesById(courseCodes: string[]): Promise<CourseEntity[]> {
    return await this.manager.findBy(CourseEntity, {
      courseCode: In(courseCodes),
    });
  }

  async getCourse(courseCode: string): Promise<CourseEntity | null> {
    return await this.manager.findOneBy(CourseEntity, {
      courseCode,
    });
  }

  async save(course: CourseEntity): Promise<CourseEntity> {
    return await this.manager.save(CourseEntity, course);
  }
}
