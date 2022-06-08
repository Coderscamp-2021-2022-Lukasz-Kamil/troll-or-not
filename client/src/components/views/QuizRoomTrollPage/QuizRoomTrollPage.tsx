import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../ui/Button/Button.style";
import { TitlePic } from "../../ui/title/Title";
import { FlexWrapper } from "../../wrapper/FlexCenter/FlexWrapper.style";
import { theme } from "../../../theme/theme";
import { Typography } from "../../ui/Typography/Typography";
import { CurrentPoints } from "../../../services/games/types";
import { QuestionModel } from "../../../services/questions/types";
import { addTurnToGameAsAnswering } from "../../../services/games/addTurnToGame";
import { useParams } from "react-router";
import { auth } from "../../../services/firebase";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

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

interface VideoProps {
  height?: number;
  width?: number;
}

export const Video = styled.div<VideoProps>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: ${({ width }) => (width ? width : 350)}px;
  height: ${({ height }) => (height ? height : 350)}px;
  place-items: start;
  border: 2px solid;
  border-color: ${theme.colors.card.primary};
  border-radius: 10px;
`;

const QuizRoomTrollPage = ({
  currentTurn,
  currentQuestion,
  question,
  currentRound,
  currentPoints,
}: {
  currentTurn: string;
  currentQuestion: number;
  currentRound: number;
  question: QuestionModel | undefined;
  currentPoints: CurrentPoints[];
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPlaying, setIsPlaying] = useState(true);

  const { gameId } = useParams();

  const answers = question?.answers;

  const authed = auth.currentUser;

  const userId = authed?.uid || "";

  const handleAnswer = async (isCorrect?: boolean, e?: any) => {
    await addTurnToGameAsAnswering({
      gameId: gameId || "",
      userId,
      answer: isCorrect,
      answerText: e ? e.target.value : "",
    });
  };

  return (
    <FlexWrapper justifyContent="center">
      <GameViewContainer>
        <FlexWrapper>
          <FlexWrapper direction="column" align-items="center">
            <TitlePic marginBottom="0px" />
            {currentTurn === "answering" && (
              <Typography fontSize="mds">Teraz twoja kolej!</Typography>
            )}
            <Typography fontSize="mds">Obecna runda: {currentRound}</Typography>
            <Typography fontSize="mds">
              Pytanie nr: {currentQuestion}
            </Typography>
            <FlexWrapper direction="column">
              <Typography fontSize="lg">{question?.content}</Typography>
              <AnswersContainer>
                {answers?.map((answer: any) => (
                  <Button
                    onClick={(e) => handleAnswer(answer.isCorrect, e)}
                    background="answer"
                    width={30}
                    height={6}
                    fontSize="lg"
                  >
                    {answer?.content}
                  </Button>
                ))}
              </AnswersContainer>
              <Typography fontSize="lg">{`Poprawna odpowiedź: ${
                question?.answers.find((answer) => answer.isCorrect)?.content
              }`}</Typography>

              <FlexWrapper justifyContent="space-between">
                {currentTurn === "answering" && (
                  <CountdownCircleTimer
                    isPlaying
                    size={70}
                    duration={20}
                    colors={[
                      "#236B11",
                      "#004777",
                      "#F7B801",
                      "#A30000",
                      "#A30000",
                    ]}
                    colorsTime={[30, 15, 12, 5, 0]}
                    onComplete={() => {
                      setIsPlaying(false);
                      handleAnswer();
                    }}
                  >
                    {({ remainingTime }) => remainingTime}
                  </CountdownCircleTimer>
                )}
              </FlexWrapper>
            </FlexWrapper>
          </FlexWrapper>
          <div>
            {currentPoints.map((point) => {
              return (
                <div>
                  {point.player.nickname} - {point.points}
                </div>
              );
            })}
          </div>
        </FlexWrapper>
      </GameViewContainer>
    </FlexWrapper>
  );
};

export default QuizRoomTrollPage;
