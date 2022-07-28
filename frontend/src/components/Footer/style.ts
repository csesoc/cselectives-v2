import styled from "styled-components";
import { FooterWave } from "../image/imageIndex";

export const FooterWrapper = styled.div`
  background-image: url(${FooterWave});
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: 2rem;
  display: flex;
  padding: 2rem 2rem;
  // position: absolute;
  left: 0;
  // bottom: 0;
  right: 0;
`;

export const Logo = styled.img`
  margin-top: 2.75rem;
`;

export const TCsLink = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 2rem;
  margin-top: 2rem;
`;

export const LinkText = styled.p`
  color: white;
  font-size: smaller;
`;
