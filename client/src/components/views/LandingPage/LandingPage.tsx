import React from "react";
import styled from "styled-components";
import Title from "../../ui/title/Title";
import { Button } from "../../ui/Button/Button.style";
import { FlexWrapper } from "../../wrapper/FlexCenter/FlexWrapper.style";
import { SlideOutPanel } from "../../ui/SlideOutPanel/SlideOutPanel";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


const LandingWrapper = styled(FlexWrapper)`
  width: 50vw;
  height: 80vh;
`;

const LandingPage = () => {
  const navigate = useNavigate();
  const [uid] = useCookies();

  const navigateToLoginPage = () => {
    navigate("/login");
  };

  const navigateToLobbyPage = () => {
    navigate("/current-lobby");
  };


  const handleChange =  () => {
    if(uid) {
      return navigateToLobbyPage();
    } else {
      return navigateToLoginPage();
    };
  }


  return (
    <>
      <LandingWrapper direction={"column"}>
        <Title showButton={false}/>
        <Button onClick={() => handleChange()}>Sprawdź!</Button>
      </LandingWrapper>
      <SlideOutPanel />
    </>
  );
};

export default LandingPage;
