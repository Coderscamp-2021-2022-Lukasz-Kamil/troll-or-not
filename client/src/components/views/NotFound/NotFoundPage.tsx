import React from "react";
import styled from "styled-components";
import { Button } from "../../ui/Button/Button.style";
import { Input } from "../../ui/Input/Input";

const LandingWrapper = styled.div`
    background-color: lightblue;
    height: 100vh;
`;

const AnswerButtonContainer = styled.div`
    width: 700px;
`

const AnswerButtonsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat( 2, 1fr);
    justify-items: center;
    row-gap: 50px;
`

const NotFoundPage = () => {
    return (
        <LandingWrapper>NotFoundPage
            <Button>Sprawdź!</Button>
            <AnswerButtonContainer>
                <AnswerButtonsWrapper>
                    <Button background="false" hoverBackground="falseHover" width={300} height={77} fontSize="lg">Fałsz</Button>
                    <Button background="true" hoverBackground="trueHover" width={300} height={77} fontSize="lg">Prawda</Button>
                </AnswerButtonsWrapper>
            </AnswerButtonContainer>
           

            <Button width={410} height={55} background="secondary" fontSize="lg">Stwórz grę</Button>

            <Button width={300} height={55} background="secondary" fontSize="lg">Zaloguj się</Button>

            <AnswerButtonContainer>
                <AnswerButtonsWrapper>
                      <Button background="answer" width={300} height={77} fontSize="lg">Answer 1</Button>
                      <Button background="answer" width={300} height={77} fontSize="lg">Answer 2</Button>
                      <Button background="answer" width={300} height={77} fontSize="lg">Answer 3</Button>
                      <Button background="answer" width={300} height={77} fontSize="lg">Answer 4</Button>
                </AnswerButtonsWrapper>
            </AnswerButtonContainer>
            
            <Input/>
            <Input background="secondary" width={540} height={54} color="textColor" placeholder="Nazwa lobby"/>
        </LandingWrapper>
    )
}

export default NotFoundPage;