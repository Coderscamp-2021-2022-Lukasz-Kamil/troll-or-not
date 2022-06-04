import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../ui/Button/Button.style";
import { TitlePic } from "../../ui/title/Title";
import { FlexWrapper } from "../../wrapper/FlexCenter/FlexWrapper.style";
import { theme } from "../../../theme/theme";
import { Typography } from "../../ui/Typography/Typography";

export const GameViewContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  max-width: 1440px;
  place-items: center;
  color: ${theme.colors.common.textColor};
`;

export const AnswersContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    margin-bottom: 20px;

`;

interface VideoProps{
    height?: number;
    width?: number;
}

export const Video = styled.div<VideoProps>`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: ${({ width })=> (width ? width : 350)}px;
    height: ${({ height })=> (height ? height : 350)}px;
    place-items: start;
    border: 2px solid; 
    border-color: ${theme.colors.card.primary};
    border-radius: 10px;
`;


const QuizRoomTrollPage= () => {
    const [isCurrentPlayer, setCurrentPlayer] = useState(true);
    const answers = ["Answer 1", "Answer 2", "Answer 3", "Answer 4"]; 
    const observers = [{name: "Kamil", ID: "222333"}, {name: "Donata", ID: "222333"}, {name: "Rafał", ID: "222333"}];
    const player = {name: "Mateusz", chatID: "222333"};

    return (
    <FlexWrapper justifyContent="center">
        <GameViewContainer>
            <FlexWrapper direction="column" align-items="center">
                <TitlePic marginBottom="0px"/>
                {isCurrentPlayer ? "" :
                <Video width={666} height={400}>VideoComponent</Video>}
                <Typography fontSize="mds">{player.name}</Typography>
                <FlexWrapper direction="column">
                    <Typography fontSize="lg">Pytanie</Typography>
                    <AnswersContainer>
                        {answers.map((answer) => (
                            <Button background="answer" width={300} height={77} fontSize="lg">{answer}</Button>
                        ))}
                    </AnswersContainer>
                    <FlexWrapper justifyContent="space-between">
                        <Button background="true" hoverBackground="trueHover" width={300} height={70} fontSize="lg">Prawda</Button>
                        <Button background="false" hoverBackground="falseHover" width={300} height={70} fontSize="lg">Fałsz</Button>
                    </FlexWrapper>
                </FlexWrapper>
            </FlexWrapper>
            <FlexWrapper direction="column" justifyContent="flex-start">
                {observers.map((observer) => (
                    <>
                    <Video width={244} height={244}>{observer.ID}</Video>
                    <Typography fontSize="mds">{observer.name}</Typography>
                    </>)
                )}
                <div>Timer</div> 
            </FlexWrapper>
        </GameViewContainer>
    </FlexWrapper>
    )
}

export default QuizRoomTrollPage;
