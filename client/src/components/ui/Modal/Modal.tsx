import React from "react";
import styled from "styled-components";
import Form from "../../views/QuizRoomTrollPage/Form";
import { FlexWrapper } from "../../wrapper/FlexCenter/FlexWrapper.style";
import { GridContainer } from "../../wrapper/FlexCenter/GridContainter.style";
import { Button } from "../Button/Button.style";
import { Input } from "../Input/Input";
import { Typography } from "../Typography/Typography";


const ModalFlexWrapper = styled(FlexWrapper)`
    margin: 50px 0; 
`

const ModalContainer = styled.div`
    width: 100vw;
    height: 500px;
    border-radius: 12px;
    background: ${({ theme}) =>
     theme.colors.button.primary};
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    flex-direction: column;
    padding: 25px;
`


function Modal({ setOpenModal }: {setOpenModal: any}) {
  return (
 
      <ModalContainer>
        <div>
          
        </div>
        <div >
          <Typography>Ankieta o rozpoznawania kłamstw na podstawie obserwacji motoryki</Typography>
        </div>
        <div >
          <Typography>Jakie zastosowałeś techniki manipulacyjne?</Typography>
        </div>
        <div>
            <ModalFlexWrapper>
                <Input width={1000} height={48} />
            </ModalFlexWrapper>
                 
            <Form/>
            <ModalFlexWrapper>
               <Button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Pomiń
            </Button>
            <Button>Wyślij</Button> 
            </ModalFlexWrapper>
          
        </div>
      </ModalContainer>

  );
}

export default Modal;
