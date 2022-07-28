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
  max-height: 90vh;
  z-index: 101;
  background-color: ${palette.dayCream};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  border-radius: 0.5rem;
  position: fixed;
  min-width: 400px;
`;

export const CloseLockup = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 0;
  margin-right: 0.3rem;
  margin-top: 0.3rem;
`;
