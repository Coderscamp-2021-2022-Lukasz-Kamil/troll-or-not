import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../ui/Button/Button.style";
import { TitlePic } from "../../ui/title/Title";
import { FlexWrapper } from "../../wrapper/FlexCenter/FlexWrapper.style";
import { theme } from "../../../theme/theme";
import { Typography } from "../../ui/Typography/Typography";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { SlideOutPanel } from "../../ui/SlideOutPanel/SlideOutPanel";
import VideoFrame from "../../video/VideoFrame";
import { MeetContext } from "../../video/meetContext";
import { GameModel } from "../../../services/games/types";
import { QuestionModel } from "../../../services/questions/types";
import { addTurnToGameAsViewer } from "../../../services/games/addTurnToGame";
import { usePagination } from "react-table";
import { useParams } from "react-router";
import { auth } from "../../../services/firebase";
declare var JitsiMeetExternalAPI: any;


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

const QuizRoomPlayerPage = ({currentAnswer, currentTurn, currentQuestion, question}: {currentAnswer: string, currentTurn: string, currentQuestion: number, question: QuestionModel | undefined}) => {
	const [isPlaying, setIsPlaying] = useState(true);
    const [name, setName] = useContext(MeetContext);

    const { gameId } = useParams();

    const authed = auth.currentUser;

    const userId = authed?.uid || "";

    setName("imie");

	const answers = question?.answers;
	const observers = [
		{ name: "Kamil", ID: "1" },
		{ name: "Donata", ID: "2" },
		{ name: "Rafał", ID: "3" },
	];

    const handleAnswer = async (bet: boolean) => {
        await addTurnToGameAsViewer({gameId: gameId || "", userId, bet });
    }
	const player = { name: "Mateusz", ID: "4" };

        // const domain = "meet.jit.si";
        //     const options = {
        //       roomName: "nowa-gra",
        //       width: 666,
        //       height: 400,
        //       parentNode: document.querySelector(`#player${player.ID}`),
        //       configOverwrite: {
        //         prejoinPageEnabled: false,
        //         toolbarButtons: [],
        //       },
        //       userInfo: {
        //         displayName: player.name,
        //       },
        //     };
        //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
        //     const api = new JitsiMeetExternalAPI(domain, options);



	return (
		<FlexWrapper justifyContent='center'>
			<GameViewContainer>
				<FlexWrapper direction='column' align-items='center'>
					<TitlePic marginBottom='0px' />
                    {/* <VideoFrame /> */}
					{/* <Video id={`player${player.ID}`}width={666} height={400}>
						VideoComponent
					</Video> */}
                    {currentTurn === "observer" && <Typography fontSize="mds">Teraz twoja kolej!</Typography>}
					<Typography fontSize='mds'>{player?.name}</Typography>
					<FlexWrapper direction='column'>
						<Typography fontSize='lg'>{question?.content}</Typography>
						<AnswersContainer>
							{answers?.map((answer: any) => {
                                return currentAnswer === answer.content ?
								<Button
									background='primary'
									width={300}
									height={77}
									fontSize='lg'
                                    shouldNotHover={true}>
									{answer?.content}
								</Button>
                                :
                                <Button
									background='answer'
									width={300}
									height={77}
									fontSize='lg'
                                    shouldNotHover={true}>
									{answer?.content}
								</Button>
})}
						</AnswersContainer>
						{currentTurn === "observer" && <FlexWrapper justifyContent='space-between'>
							<Button
								background='true'
								hoverBackground='trueHover'
								width={280}
								height={70}
								fontSize='lg'
                                onClick={() => handleAnswer(true)}>
								Prawda
							</Button>
							<Button
								background='false'
								hoverBackground='falseHover'
								width={280}
								height={70}
								fontSize='lg'
                                onClick={() => handleAnswer(false)}
                                >
								Fałsz
							</Button>
							<CountdownCircleTimer
								isPlaying
								size={70}
								duration={10}
								colors={["#236B11", "#004777", "#F7B801", "#A30000", "#A30000"]}
								colorsTime={[30, 15, 12, 5, 0]}
								onComplete={() => {
									setIsPlaying(false);
								}}>
								{({ remainingTime }) => remainingTime}
							</CountdownCircleTimer>
						</FlexWrapper>}
					</FlexWrapper>
				</FlexWrapper>
				<FlexWrapper direction='column' justifyContent='flex-start'>
					{observers.map(observer => (
						<>
							<Video id={`observer${observer.ID}`} width={244} height={244}>
							</Video>
							<Typography fontSize='mds'>{observer.name}</Typography>
						</>
					))}
				</FlexWrapper>
			</GameViewContainer>
		</FlexWrapper>
	);
};

export default QuizRoomPlayerPage;
