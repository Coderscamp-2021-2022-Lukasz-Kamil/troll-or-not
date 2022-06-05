import React, { useState } from "react";
import styled from "styled-components";
import Title from "../../ui/title/Title";
import { Button } from "../../ui/Button/Button.style";
import { FlexWrapper } from "../../wrapper/FlexCenter/FlexWrapper.style";
import { SlideOutPanel } from "../../ui/SlideOutPanel/SlideOutPanel";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Modal from "../../ui/Modal/Modal"


const LandingWrapper = styled(FlexWrapper)`
  width: 50vw;
  height: 80vh;
`;

const LandingPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [uid] = useCookies();

  const navigateToLoginPage = () => {
    navigate("/login");
  };

  const navigateToLobbyPage = () => {
    navigate("/lobby-list");
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
  
 
     
       { <Modal setOpenModal={setModalOpen} />} 
      <SlideOutPanel />
    </>
  );
};

export default LandingPage;
