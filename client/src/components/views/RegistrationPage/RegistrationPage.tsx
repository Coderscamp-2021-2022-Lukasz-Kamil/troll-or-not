import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../ui/Button/Button.style";
import { Input } from "../../ui/Input/Input";
import Title from "../../ui/title/Title";
import { FlexWrapper } from "../../wrapper/FlexCenter/FlexWrapper.style";
import { GridContainer } from "../../wrapper/FlexCenter/GridContainter.style";
import { Typography, TypographyGrid } from "../../ui/Typography/Typography";
import { LeftSideContainer } from "../../wrapper/FlexCenter/LeftSideContainer";
import { signUp } from "../../../services/user/auth";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SiteTitle = styled(Typography)`
  color: ${({ theme }) => theme.colors.common.textColorGold};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.size.desktop.mdl}px;
`;

const Link = styled.a`
  color: ${({ theme }) => theme.colors.common.textColorGold};
  text-decoration: none;
  font-size: ${({ theme }) => theme.size.desktop.md}px;
`;

const FlexWrapperLink = styled(FlexWrapper)`
  gap: 20px;
  margin: 10px;
`;

const RegistrationPage = () => {
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [uid, setUid] = useCookies();

  const navigate = useNavigate();

  const navigateToLobby = () => {
    navigate("/lobby-list");
  };

  const handleSignUp = async () => {
    try {
      const user = await signUp({
        nickname,
        email,
        password,
        confirmPassword,
      });
      setUid("TON_uid", user.uid);
      navigateToLobby();
    } catch (err: any) {
      const message = err.message ? err.message : "Nie udało się zarejestrować";
      return toast.error(message);
    }
  };

  const handleOnChange = (e: any) => {
    switch (e.target.name) {
      case "nickname":
        setNickname(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirmPassword":
        setConfirmPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Title showButton={false} />
      <ToastContainer />
      <LeftSideContainer>
        <FlexWrapper direction="column">
          <GridContainer
            GridColumnLeftWidth={1}
            GridColumnRightWidth={2}
            GridGap="40"
          >
            <p></p>
            <SiteTitle>Rejestracja</SiteTitle>
            <TypographyGrid marginRight={30}>Nazwa użytkownika</TypographyGrid>
            <Input
              type="text"
              name="nickname"
              onChange={(e) => handleOnChange(e)}
              value={nickname}
            />
            <TypographyGrid marginRight={30}>E-mail</TypographyGrid>
            <Input
              type="text"
              name="email"
              onChange={(e) => handleOnChange(e)}
              value={email}
            />
            <TypographyGrid marginRight={30}>Hasło</TypographyGrid>
            <Input
              type="password"
              name="password"
              onChange={(e) => handleOnChange(e)}
              value={password}
            />
            <TypographyGrid marginRight={30}>Powtórz hasło</TypographyGrid>
            <Input
              type="password"
              name="confirmPassword"
              onChange={(e) => handleOnChange(e)}
              value={confirmPassword}
            />
            <p></p>
            <Button height={3} onClick={handleSignUp}>Stwórz konto!</Button>
          </GridContainer>
        </FlexWrapper>
      </LeftSideContainer>
      <FlexWrapperLink justifyContent="flex-start">
        <Typography>Masz już konto?</Typography>
        <Link href="/login">Zaloguj się</Link>
      </FlexWrapperLink>
    </>
  );
};

export default RegistrationPage;
