import { getReviewEntity, getMockReview } from "../utils/testData";
import {
  convertReviewEntityToInterface,
  convertReviewInterfaceToEntity,
} from "./Review.converter";

describe("convertReviewEntityToInterface", () => {
  it("should convert ReviewEntity to IReview", () => {
    const review = getMockReview();
    const entity = getReviewEntity();
    expect(convertReviewEntityToInterface(entity)).toEqual(review);
  });
});

describe("convertReviewInterfaceToEntity", () => {
  it("should convert IReview to ReviewEntity", () => {
    const review = getMockReview();
    const entity = getReviewEntity();
    expect(convertReviewInterfaceToEntity(review)).toEqual(entity);
  });
});
