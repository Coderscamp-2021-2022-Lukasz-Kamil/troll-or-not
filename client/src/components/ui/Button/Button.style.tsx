import React from "react";
import styled from "styled-components";

interface ButtonProps{
    background?: | "primary" | "secondary" | "false" | "true" | "answer";
    height?: number;
    width?: number;
    fontSize?: | "lg" | "xxl";
    hoverBackground?: | "hover" | "falseHover" | "trueHover";
}

export const Button = styled.button<ButtonProps>`
    width: ${({ width })=> (width ? width : 350)}px;
    height: ${({ height })=> (height ? height : 85)}px;
    background: ${({ theme, background }) =>
    background ? theme.colors.button[background] : theme.colors.button.primary};
    font-size: ${({ theme, fontSize }) =>
    fontSize ? theme.size.desktop[fontSize] : theme.size.desktop.xxl}px;
    border-radius: ${({ theme }) => theme.size.common.borderRadius};
    color: ${({ theme }) => theme.colors.common.textColor};
    border: 1px transparent;
    transition: 0.2s;
    cursor: pointer;
     &:hover {
    background: ${({ theme , hoverBackground}) =>
    hoverBackground ? theme.colors.button[hoverBackground] : theme.colors.button.hover};
  }
`