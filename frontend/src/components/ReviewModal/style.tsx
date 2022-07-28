import styled from "styled-components";
import { palette } from "src/components/palette/palette";

export const Dim = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: ${palette.dayCream};
  padding: 2rem;
  border-radius: 0.6rem;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const CloseLockup = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 0;
  margin-right: 0.3rem;
  margin-top: 0.3rem;
  cursor: pointer;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: .5rem;
  width: 29%;
`;

export const MiddleVerticalLine = styled.div`
  display: flex;
  flex-direction: column;
  padding: .5rem;
  width: 1%;
  margin: 0.2rem;
  padding: 0.5rem 0.5rem 0.5rem 0rem;
  border-left: 1px solid #CED9DD;
  flex-wrap: wrap;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: .5rem;
  margin-right: 0.9rem;
  width: 70%;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  border-top: none;
  border-right: none;
  border-left: none;
	border-bottom: none;
  border-color: ${palette.dayNavy};
  border-width: 0.1rem;
  box-sizing: border-box;
  margin-bottom: 1rem;
`;

export const Item = styled.div`
  display: flex
  justify-content: center
  padding: .5rem
  background: #dbdbdb;
`;

export const WholeContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: .5rem;
  justify-content: space-evenly;
`;

export const CourseField = styled.textarea`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  background-color: white;
  border-radius: 0.6rem;
  height: 2rem;
  resize: none;
  outline: none;
  border: none;
  font-family: "Inter", sans-serif;
  padding: 0.5rem;
  font-size: 1rem;
`;

export const TermAndGradeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 1rem;
`;

export const TermField = styled.textarea`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: white;
  width: 45%;
  height: 1.8rem;
  border-radius: 0.6rem;
`;

export const LeftFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
  justify-content: flex-start;
  height: 2rem;

`;

export const SubmitButton = styled.button`
  background-color: #41434A;
  color: white;
  border-radius: 0.6rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 20%;
  height: 2.2rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-left: auto;
`;

export const ReviewTitleInput = styled.textarea`
  border: none;
  border-width: 0.1rem;
  box-sizing: border-box;
  margin-bottom: 1rem;
  margin-top: 1.2rem;
  width: 100%;
  height: 2.4rem;
  font-size: 1rem;
  padding: 0.5rem;
  background-color: white;
  placeholder: "Enter your review here";
  font-family: "Inter", sans-serif;
  border-radius: 0.7rem;
  resize: none;
  outline: none;
  padding : 0.7rem;
`;

export const ReviewBodyInput = styled.textarea`
  border: none;
  border-width: 0.1rem;
  box-sizing: border-box;
  margin-bottom: 1rem;
  width: 100%;
  height: 20rem;
  font-size: 1rem;
  padding: 0.5rem;
  background-color: white;
  placeholder: "Title";
  placeholder-color: #CED9DD;
  font-family: "Inter", sans-serif;
  border-radius: 0.7rem;
  resize: none;
  outline: none;
  padding : 1rem;
  ::-webkit-scrollbar {
    width: 1rem;
  }
`;

export const RatingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 0.1rem;
  padding: 0rem 0.5rem 0.5rem 0.5rem;
  height: 100%;
`;
