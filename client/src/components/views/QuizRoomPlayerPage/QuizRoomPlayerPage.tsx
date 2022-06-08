import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../ui/Button/Button.style";
import { TitlePic } from "../../ui/title/Title";
import { FlexWrapper } from "../../wrapper/FlexCenter/FlexWrapper.style";
import { theme } from "../../../theme/theme";
import { Typography } from "../../ui/Typography/Typography";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { CurrentPoints } from "../../../services/games/types";
import { QuestionModel } from "../../../services/questions/types";
import { addTurnToGameAsViewer } from "../../../services/games/addTurnToGame";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";

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

const QuizRoomPlayerPage = ({
  answering,
  currentAnswer,
  currentTurn,
  currentQuestion,
  currentRound,
  question,
  currentPoints,
}: {
  answering: string;
  currentAnswer: string;
  currentTurn: string;
  currentRound: number;
  currentQuestion: number;
  question: QuestionModel | undefined;
  currentPoints: CurrentPoints[];
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPlaying, setIsPlaying] = useState(true);
  const [uid] = useCookies();

  const { gameId } = useParams();

  const userId = uid["TON_uid"];

  const answers = question?.answers;

  const handleAnswer = async (bet?: boolean) => {
    await addTurnToGameAsViewer({ gameId: gameId || "", userId, bet });
  };

  return (
    <FlexWrapper padding={30} justifyContent="center">
      <GameViewContainer>
        <FlexWrapper>
          <FlexWrapper direction="column" align-items="center">
            <TitlePic marginBottom="0px" />
            {currentTurn === "observer" && (
              <Typography fontSize="mds">Teraz twoja kolej!</Typography>
            )}
            <Typography fontSize="mds">Obecna runda: {currentRound}</Typography>
            <Typography fontSize="mds">
              Pytanie nr: {currentQuestion}
            </Typography>
            <FlexWrapper direction="column">
              <Typography fontSize="lg">{question?.content}</Typography>
              <AnswersContainer>
                {answers?.map((answer: any) => {
                  return currentAnswer === answer.content ? (
                    <Button
                      background="primary"
                      width={30}
                      height={6}
                      fontSize="lg"
                      shouldNotHover={true}
                    >
                      {answer?.content}
                    </Button>
                  ) : (
                    <Button
                      background="answer"
                      width={30}
                      height={6}
                      fontSize="lg"
                      shouldNotHover={true}
                    >
                      {answer?.content}
                    </Button>
                  );
                })}
              </AnswersContainer>
              {currentTurn === "observer" && (
                <FlexWrapper justifyContent="space-between">
                  <Button
                    background="true"
                    hoverBackground="trueHover"
                    width={10}
                    height={4}
                    fontSize="lg"
                    onClick={() => handleAnswer(true)}
                  >
                    Prawda
                  </Button>
                  <Button
                    background="false"
                    hoverBackground="falseHover"
                    width={10}
                    height={4}
                    fontSize="lg"
                    onClick={() => handleAnswer(false)}
                  >
                    Fałsz
                  </Button>
                  <CountdownCircleTimer
                    isPlaying
                    size={70}
                    duration={10}
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
                </FlexWrapper>
              )}
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

export default QuizRoomPlayerPage;
