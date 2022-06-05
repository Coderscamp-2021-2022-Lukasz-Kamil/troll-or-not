import React from "react";
import styled from "styled-components";
import Form from "../../views/QuizRoomTrollPage/Form";
import { FlexWrapper } from "../../wrapper/FlexCenter/FlexWrapper.style";
import { Button } from "../Button/Button.style";
import { Input } from "../Input/Input";
import { Typography } from "../Typography/Typography";
import { useNavigate } from "react-router-dom";



const ModalFlexWrapper = styled(FlexWrapper)`
    margin: 20px 0 50px; 
`

const TypographyModal = styled(Typography)`
    margin-bottom:50px;
`

const ModalContainer = styled.div`
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width: 95vw;
    height: 100vh;
    border-radius: 12px;
    background: ${({ theme}) =>
     theme.colors.button.primary};
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    flex-direction: column;
    padding: 25px;
`

const TypographAboveForm = styled(Typography)`
    margin-bottom: 20px;
`

function Modal({ setOpenModal }: {setOpenModal: any}) {
      const navigate = useNavigate();

        const navigateToLobby = () => {
    navigate("/lobby-list");
  };

const handleChange =  () => {
      return navigateToLobby();

  }

  return (
 
      <ModalContainer>
        <div>
          
        </div>
        <div >
          <TypographyModal fontSize="xxl">Ankieta o rozpoznawania kłamstw na podstawie obserwacji motoryki</TypographyModal>
        </div>
        <div >
        </div>
        <div>
              <Typography>Jakie zastosowałeś techniki manipulacyjne?</Typography>
            <ModalFlexWrapper>
                <Input width={80} height={13} />
            </ModalFlexWrapper>
              <TypographAboveForm>Jakie odruchy zaobserwowałeś u Szulera?</TypographAboveForm>    
            <Form/>
            <ModalFlexWrapper>
                     <Button onClick={() => handleChange()}>Pomiń</Button>

            <Button>Wyślij</Button> 
            </ModalFlexWrapper>
          
        </div>
      </ModalContainer>

  );
}

export default Modal;
