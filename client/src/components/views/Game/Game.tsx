import { onSnapshot, doc } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { auth, db } from "../../../services/firebase";
import { leaveFromGame } from "../../../services/games/joinToGame";
import { CurrentPoints, GameModel } from "../../../services/games/types";
import { QuestionModel } from "../../../services/questions/types";
import { MeetContext } from "../../video/meetContext";
import VideoFrame from "../../video/VideoFrame";
import BeforeGamePage from "../BeforeGamePage/BeforeGamePage";
import GameFinished from "../GameFinished/GameFisnished";
import QuizRoomPlayerPage from "../QuizRoomPlayerPage/QuizRoomPlayerPage";
import QuizRoomTrollPage from "../QuizRoomTrollPage/QuizRoomTrollPage";

const Game = () => {
  const [game, setGame] = useState<GameModel | undefined>(undefined);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [answering, setAnswering] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [question, setQuestion] = useState<QuestionModel | undefined>(
    undefined
  );
  const cleanRef = useRef(false);

  const [loading, setLoading] = useState(true);
  const [turn, setTurn] = useState("answering");
  const [isFinished, setIsFinished] = useState(false);
  const [isOngoing, setIsOngoing] = useState(false);

  const [currentPoints, setCurrentPoints] = useState<CurrentPoints[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [uid] = useCookies();
  const [authedItem, setAuthedItem] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [name, setName] = useContext(MeetContext);

  setName(uid["TON_uid"]);

  const navigate = useNavigate();

  const { gameId } = useParams();

  useEffect(() => {
    const authed = auth.currentUser;

    const userId = authed?.uid;

    window.addEventListener("unload", (ev) => {
      ev.preventDefault();
      leaveFromGame({ gameId: gameId || "", userId: uid["TON_uid"] });
    });

    setAuthedItem(userId || "");
    const unsub = onSnapshot(
      doc(db, "games_test", gameId!),
      (querySnapshot) => {
        const data = querySnapshot.data() as GameModel;
        setGame(data);
        if (!data) {
          navigate("/lobby-list");
        }
        if (data.status === "ongoing") {
          setIsOngoing(true);
          setCurrentRound(data.currentRound);
          setAnswering(data.rounds[data.currentRound - 1].answeringPlayer);
          const currentQuesiton =
            data.rounds[data.currentRound - 1].currentQuestion;
          setCurrentQuestion(currentQuesiton);
          setQuestion(
            data.rounds[data.currentRound - 1].questions[currentQuesiton - 1]
          );
          setTurn(data.currentTurn);
          setCurrentPoints(data.currentPoints);
          setCurrentAnswer(data.currentAnswer);
        }
        setLoading(false);
        if (data.status === "finished") {
          setIsFinished(true);
        }
        cleanRef.current = true;
      }
    );

    return function cleanup() {
      if (cleanRef.current) {
        leaveFromGame({ gameId: gameId || "", userId: uid["TON_uid"] });
        unsub();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <></>;
  }

  if (isFinished) {
    return <GameFinished currentPoints={currentPoints} />;
  }

  return (
    <>
      {isOngoing ? (
        <>
          <VideoFrame gameId={gameId} />
          {authedItem === answering ? (
            <QuizRoomTrollPage
              currentTurn={turn}
              currentRound={currentRound}
              currentQuestion={currentQuestion}
              question={question}
              currentPoints={currentPoints}
            />
          ) : (
            <QuizRoomPlayerPage
              answering={answering}
              currentRound={currentRound}
              currentAnswer={currentAnswer}
              currentTurn={turn}
              currentQuestion={currentQuestion}
              question={question}
              currentPoints={currentPoints}
            />
          )}
        </>
      ) : (
        <BeforeGamePage game={game} />
      )}
    </>
  );
};

export default Game;
