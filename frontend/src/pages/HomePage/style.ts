import styled from "styled-components";
import landingCurve from "src/assets/curves/fullScreen.svg";

export const Content = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${landingCurve});
  background-size: cover;
  background-position: top right;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  align-items: left;
`;

export const SmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HomeHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-bottom: 10vh;
  justify-content: flex-end;
  justify-content: space-between;
`;

export const Logo = styled.img`
  margin-left: 5rem;
  margin-top: 1rem;
`;

export const LoginButton = styled.button<ButtonProps>`
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 550;
  padding: 10x 10px;
  background: none;
  border:  2px solid white;
  color:  #FFF;
  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
  margin-right: 5rem;
  margin-top: 1rem;
`;

export const Graphic = styled.img`
  max-width: 90%;

  @media (max-width: 950px) {
    display: none;
  }
`;

export const Flexbox = styled.div`
  display: flex;
  flex-direction: row;
`;

interface FlexboxProps {
  padding ?: string;
  padding_top ?: string;
  width ?: string;
}

export const FlexboxComponent = styled.div<FlexboxProps>`
  justify-content: center;
  align-items: center;
  padding-left: ${props => props.padding};
  padding-top: ${props => props.padding};
  width: ${props => props.width};
`;

/** Landing Page CSS for Text  */
export const TextFlexbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface TextProps {
  fontFamily ?: string;
  fontWeight ?: string;
  fontSize ?: string;
  color ?: string;
}

export const HomeText = styled.text<TextProps>`
  align-items: center;
  text-align: start;
  font-family: ${(props) => props.fontFamily}, sans-serif;
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`;

/**Button CSS */
export const ButtonFlexbox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

interface ButtonProps {
  bg ?: string;
  color ?: string;
  justify ?: string;
}

export const Button = styled.button<ButtonProps>`
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 550;
  padding: 13px 28px;
  margin-top: 18px;
  background-color: ${props => props.bg || '#333'};
  color:  ${props => props.color || '#FFF'};
  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
  float: right;
`;
