import { Icon } from "../icon/Icon";
import { CloseIcon } from "../icon/iconIndex";
import Text from "../text/Text";
import {
  CloseLockup,
  Dim,
  ModalContent,
  ReviewTitleInput,
  LeftFooter,
  MiddleVerticalLine,
  SubmitButton,
  ReviewBodyInput,
  RatingsContainer,
  RightContainer,
  CourseField,
  LeftContainer,
  WholeContainer,
  TermAndGradeContainer,
} from "./style";
import { Checkbox } from "@mui/material";
import ReviewRating from "../ReviewRating/ReviewRating";

type DialogProps = {
  close: () => void;
  modalSize?: number;
};

const Dialog = ({ close, modalSize }: DialogProps) => {
  return (
    <Dim>
      Hello
      <ModalContent style={{ width: modalSize ? `${modalSize}%` : "50%" }}>
        <CloseLockup>
          <Icon src={CloseIcon} size={2} onClick={close} />
        </CloseLockup>
        <Text
          noMargin
          fontSize="1.7rem"
          style={{ margin: "0.8rem 0.8rem 0rem 1rem" }}
        >
          Submit a Review.
        </Text>
        <WholeContainer>
          <LeftContainer>
            <ReviewTitleInput placeholder="Title"></ReviewTitleInput>
            <ReviewBodyInput placeholder="Enter review here" />
            <LeftFooter>
              <Text fontSize="0.95rem" style={{ marginLeft: "0rem" }}>
                Display as anonymous
              </Text>
              <Checkbox
                defaultChecked
                sx={{
                  color: "#2f302f",
                  "&.Mui-checked": {
                    color: "#2f302f",
                  },
                }}
              />
              <SubmitButton>Submit</SubmitButton>
            </LeftFooter>
          </LeftContainer>
          <MiddleVerticalLine />
          <RightContainer>
            <Text noMargin fontSize="1rem" style={{ padding: "0.3rem" }}>
              Course Code
            </Text>
            <CourseField placeholder="COMP1511" />
            Term Taken
            <TermAndGradeContainer>
              {/* <TermField placeholder="Term"/> */}
              <CourseField
                placeholder="Term"
                style={{ width: "50%", margin: "0.2rem", height: "1.2rem" }}
              />
              <CourseField
                placeholder="Grade"
                style={{ width: "50%", margin: "0.2rem", height: "1.2rem" }}
              />
            </TermAndGradeContainer>
            <RatingsContainer>
              <Text noMargin fontSize="1rem" style={{ padding: "0.3rem" }}>
                Overall Rating
              </Text>
              <div>
                <ReviewRating icon="star" />
              </div>
              <Text noMargin fontSize="1rem" style={{ padding: "0.3rem" }}>
                Enjoyability
              </Text>
              <div style={{ padding: "0.3rem" }}>
                <ReviewRating icon="circle" />
              </div>
              <Text noMargin fontSize="1rem" style={{ padding: "0.3rem" }}>
                Usefulness
              </Text>
              <div style={{ padding: "0.3rem" }}>
                <ReviewRating icon="circle" />
              </div>
              <Text noMargin fontSize="1rem" style={{ padding: "0.3rem" }}>
                Manageability
              </Text>
              <div style={{ padding: "0.3rem" }}>
                <ReviewRating icon="circle" />
              </div>
            </RatingsContainer>
          </RightContainer>
        </WholeContainer>
      </ModalContent>
    </Dim>
  );
};

export default Dialog;
