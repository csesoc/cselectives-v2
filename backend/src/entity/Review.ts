import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./User";

@Entity({ name: "reviews", schema: "cselectives" })
export class ReviewEntity {
  @PrimaryGeneratedColumn("uuid", { name: "review_id" })
  reviewId: string;

  @ManyToOne(() => UserEntity, (user) => user.zid)
  @JoinColumn({ name: "zid" })
  zid: string;

  @Column("text", { name: "course_code", nullable: false })
  courseCode: string;

  @Column("text", { name: "author_name", nullable: false })
  authorName: string;

  @Column("text", { name: "description", nullable: true })
  description: string;

  @Column("integer", { name: "grade", nullable: true })
  grade: number;

  @Column("text", { name: "term_taken", nullable: false })
  termTaken: string;

  @CreateDateColumn({
    name: "created_timestamp",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdTimestamp: Date;

  @UpdateDateColumn({
    name: "updated_timestamp",
    type: "timestamp without time zone",
    onUpdate: "CURRENT_TIMESTAMP(6)",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  updatedTimestamp: Date;

  @Column("text", {
    array: true,
    name: "upvotes",
    nullable: false,
    default: () => "array[]::text[]",
  })
  upvotes: string[];

  @Column("float", { name: "manageability", nullable: false })
  manageability: number;

  @Column("float", { name: "usefulness", nullable: false })
  usefulness: number;

  @Column("float", { name: "enjoyability", nullable: false })
  enjoyability: number;

  @Column("float", { name: "overall_rating", nullable: false })
  overallRating: number;
}
