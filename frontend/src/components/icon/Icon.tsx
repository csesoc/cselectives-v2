import styled from "styled-components";
import { palette } from "../palette/palette";

type IconProps = {
  isRotated?: boolean;
  size?: number;
};

type IconWrapperProps = {
  color?: string;
  size?: number;
};

export const Icon = styled.img<IconProps>`
  height: ${(props: IconProps) => props.size || 1.5}rem;
  width: ${(props: IconProps) => props.size || 1.5}rem;
  transform: rotate(${(props: IconProps) => (props.isRotated ? 180 : 0)}deg);
  transition: transform 0.2s linear;
`;

export const IconWrapper = styled.div`
  height: 2.125rem;
  width: 2.125rem;
  border-radius: 50%;
  background-color: ${palette.dayWhite};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RoundedIcon = styled.img<IconProps>`
  height: ${(props: IconProps) => props.size || 3}rem;
  width: ${(props: IconProps) => props.size || 3}rem;
  transform: rotate(${(props: IconProps) => (props.isRotated ? 180 : 0)}deg);
  transition: transform 0.2s linear;
`;

export const RoundedIconWrapper = styled.div<IconWrapperProps>`
  height: ${(props: IconWrapperProps) => props.size || 1.5}rem;
  width: ${(props: IconWrapperProps) => props.size || 1.5}rem;
  background-color: ${(props: IconWrapperProps) =>
    props.color || palette.dayWhite};
  border-radius: 50%;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
