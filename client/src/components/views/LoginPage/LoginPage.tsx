import React, { useState } from "react";
import styled from "styled-components";
import { ButtonWithIcon } from "../../ui/ButtonWithIcon/ButtonWithIcon";
import { Input } from "../../ui/Input/Input";
import Title from "../../ui/title/Title";
import { Typography, TypographyGrid } from "../../ui/Typography/Typography";
import { LeftSideContainer } from "../../wrapper/FlexCenter/LeftSideContainer";
import googleIcon from "../../../assets/googleIcon.svg";
import { Button } from "../../ui/Button/Button.style";
import { FlexWrapper } from "../../wrapper/FlexCenter/FlexWrapper.style";
import { signIn } from "../../../services/user/auth";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Grid } from "../AddQuestionPage/AddQuestionPage.styled";
import "react-toastify/dist/ReactToastify.css";

const SiteTitle = styled(Typography)`
  color: ${({ theme }) => theme.colors.common.textColorGold};
  text-transform: uppercase;
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.common.textColorGold};
  text-decoration: none;
  font-size: ${({ theme }) => theme.size.desktop.md}px;
`;
const FlexWrapperLink = styled(FlexWrapper)`
  gap: 20px;
  margin: 20px 0 20px 20px;
`;

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [uid, setUid] = useCookies();

  const navigate = useNavigate();

  const navigateToLobby = () => {
    navigate("/lobby-list");
  };

  const handleOnChange = (e: any) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSignIn = async () => {
    try {
      const user = await signIn({
        email,
        password,
      });
      setUid("TON_uid", user.uid);
      navigateToLobby();
    } catch (err: any) {
      const message = err.message ? err.message : "Nie uda??o si?? zalogowa??";
      return toast.error(message);
    }
  };
  return (
    <>
      <Title showButton={false} />
      <ToastContainer />
      <LeftSideContainer>
        <Grid>
          <div></div>
          <SiteTitle fontSize="xl">Logowanie</SiteTitle>
          <TypographyGrid>E-mail</TypographyGrid>
          <Input
            type="text"
            name="email"
            onChange={(e) => handleOnChange(e)}
            value={email}
          />
          <TypographyGrid>Has??o</TypographyGrid>
          <Input
            type="password"
            name="password"
            onChange={(e) => handleOnChange(e)}
            value={password}
          />
          <div></div>
          <Button
            height={3}
            background="secondary"
            onClick={() => handleSignIn()}
          >
            Zaloguj si??
          </Button>
          <div></div>
          <ButtonWithIcon src={googleIcon} />
        </Grid>
      </LeftSideContainer>
      <FlexWrapperLink justifyContent="flex-start">
        <Typography>Nie masz konta?</Typography>
        <Link href="/registration">Zarejestruj si??</Link>
      </FlexWrapperLink>
    </>
  );
};

export default LoginPage;
