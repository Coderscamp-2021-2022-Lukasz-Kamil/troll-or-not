import React from "react";
import styled from "styled-components";

interface ButtonProps{
  background?:
    | "primary"
    | "secondary"
    | "false"
    | "true"
    | "answer"
    | "google"
    | "facebook";
    height?: number;
    width?: number;
    fontSize?: "mds" | "lg" | "xxl";
    hoverBackground?: | "hover" | "falseHover" | "trueHover";
    margin?: string;
    shouldNotHover?: boolean;
}

export const Button = styled.button<ButtonProps>`
  width: ${({ width }) => (width ? width : 15)}vw;
  height: ${({ height }) => (height ? height : 8)}vw;
  background: ${({ theme, background }) =>
    background ? theme.colors.button[background] : theme.colors.button.primary};
  font-size: ${({ theme, fontSize }) =>
  fontSize ? theme.size.desktop[fontSize] : theme.size.desktop.md}px;
    border-radius: ${({ theme }) => theme.size.common.borderRadius};
    color: ${({ theme }) => theme.colors.common.textColor};
    border: 1px transparent;
    transition: 0.2s;
    cursor: pointer;
    margin: ${({ margin }) => (margin ? margin : 0)};
    font-family: 'Kaushan Script', cursive;
;
    &:hover {
      background: ${({ theme , hoverBackground, shouldNotHover}) =>
      shouldNotHover ? '' : hoverBackground ? theme.colors.button[hoverBackground] : theme.colors.button.hover};
  }
`;
