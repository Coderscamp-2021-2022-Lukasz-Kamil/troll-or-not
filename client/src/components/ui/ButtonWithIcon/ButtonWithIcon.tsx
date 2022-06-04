import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { googleSignIn } from "../../../services/user/auth";
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

export const ButtonWithIcon = (props: {src: string }) => {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [uid, setUid] = useCookies();

  const navigate = useNavigate();

  const navigateToLobby = () => {
    navigate("/lobby-list");
  };


  const handleGoogle = async () => {
    console.log("google");
    try {
        const user = await googleSignIn();
        setUid("TON_uid", user.uid);
        navigateToLobby();
    } catch (err: any) {
      const message = err.message ? err.message : "Nie udało się zalogować";
      return toast.error(message);
    }
}
  return (
    <Add onClick={() => handleGoogle()} background="google" width={450} height={60}>
      <Icon src={props.src} marginRight="10px" />
      <GoogleTypography>Zaloguj przez Google</GoogleTypography>
    </Add>
  );
};
