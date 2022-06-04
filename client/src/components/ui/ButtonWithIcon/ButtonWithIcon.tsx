import React from "react";
import styled from "styled-components";
import { Button } from "../Button/Button.style";
import { Typography } from "../Typography/Typography";

interface IconProps{
  width?: number;
  heigth?: number;
  marginRight?: string;
}

export const Icon = styled.img<IconProps>`
  display: flex;
  transition: 0.2s;
  width: ${({ width }) => (width ? width : 40)}px;
  height: ${({ height }) => (height ? height : 40)}px;
`;

export const Add = styled(Button)`
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 32px;
  color: black;
`;

const GoogleTypography = styled(Typography)`
    width:100%;
`

export const ButtonWithIcon = (props: {src: string; }) => {
  return (
    <Add background="google" width={450} height={60}>
      <Icon src={props.src} marginRight="10px" />
      <GoogleTypography>Zaloguj przez Google</GoogleTypography>
    </Add>
  );
};
