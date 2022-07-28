import { PrimaryColumn, Column, Entity } from "typeorm";

@Entity({ name: "courses", schema: "cselectives" })
export class CourseEntity {
  @PrimaryColumn("text", { name: "course_code" })
  courseCode: string;

  @Column("boolean", { name: "archived", nullable: false })
  archived: boolean;

  @Column("text", { array: true, name: "attributes", nullable: false })
  attributes: string[];

  @Column("text", { name: "calendar", nullable: false })
  calendar: string;

  @Column("text", { name: "campus", nullable: false })
  campus: string;

  @Column("text", { name: "description", nullable: false })
  description: string;

  @Column("text", { name: "enrolment_rules", nullable: false })
  enrolmentRules: string;

  @Column("text", { array: true, name: "equivalents", nullable: false })
  equivalents: string[];

  @Column("text", { array: true, name: "exclusions", nullable: false })
  exclusions: string[];

  @Column("text", { name: "faculty", nullable: false })
  faculty: string;

  @Column("text", { name: "field_of_education", nullable: false })
  fieldOfEducation: string;

  @Column("boolean", { name: "gen_ed", nullable: false })
  genEd: boolean;

  @Column("integer", { name: "level", nullable: false })
  level: number;

  @Column("text", { name: "school", nullable: false })
  school: string;

  @Column("text", { name: "study_level", nullable: false })
  studyLevel: string;

  @Column("integer", { array: true, name: "terms", nullable: false })
  terms: number[];

  @Column("text", { name: "title", nullable: false })
  title: string;

  @Column("integer", { name: "uoc", nullable: false })
  uoc: number;

  @Column("float", { name: "rating", nullable: false })
  rating: number;
}
