import { query, collection, onSnapshot, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { auth, db } from '../../../services/firebase';
import { CurrentPoints, GameModel } from '../../../services/games/types';
import { QuestionModel } from '../../../services/questions/types';
import GameFinished from '../GameFinished/GameFisnished';
import QuizRoomPlayerPage from '../QuizRoomPlayerPage/QuizRoomPlayerPage';
import QuizRoomTrollPage from '../QuizRoomTrollPage/QuizRoomTrollPage';

const Game = () => {

    const [game, setGame] = useState<GameModel | undefined>(undefined)
    const [currentRound, setCurrentRound] = useState(0);
    const [answering, setAnswering] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [question, setQuestion] = useState<QuestionModel | undefined>(undefined)
    const [loading, setLoading] = useState(true);
    const [turn, setTurn] = useState("answering");
    const [isFinished, setIsFinished] = useState(false);
    const [currentPoints, setCurrentPoints] = useState<CurrentPoints[]>([]);
    const [currentAnswer, setCurrentAnswer] = useState("");


    const authed = auth.currentUser;

    const userId = authed?.uid;


    const { gameId } = useParams()
    console.log(currentRound);
    useEffect(() => {
        onSnapshot(doc(db, "games_test", gameId!), (querySnapshot) => {
            console.log("snapshot")
          const data = querySnapshot.data() as GameModel;
          setGame(data);
          setCurrentRound(data.currentRound);
          console.log(data.currentRound);
          setAnswering(data.rounds[data.currentRound-1].answeringPlayer)
          const currentQuesiton = data.rounds[data.currentRound-1].currentQuestion
          setCurrentQuestion(currentQuesiton)
          setQuestion(data.rounds[data.currentRound-1].questions[currentQuesiton -1]);
          setLoading(false);
          setTurn(data.currentTurn);
          setCurrentPoints(data.currentPoints)
          setCurrentAnswer(data.currentAnswer)
          console.log("no loading")
          if(data.status === "finished") {
              setIsFinished(true);
          }
        });
      }, []);



    if (loading) {
        console.log("loading")
        return <></>
    }

    if (isFinished) {
        return <GameFinished currentPoints={currentPoints}/>
    }

    return <>{userId === answering ? <QuizRoomTrollPage currentTurn={turn} currentQuestion={currentQuestion} question={question}/> : <QuizRoomPlayerPage currentAnswer={currentAnswer} currentTurn={turn} currentQuestion={currentQuestion} question={question}/>}</>
}

export default Game;