import { DocumentData, DocumentReference, updateDoc } from "firebase/firestore";
import { GameModel } from "./types";

type PointsForQuestions = {
  [key: number]: number;
};

const POINTS_FOR_QUESTIONS: PointsForQuestions = {
  0: 0,
  1: 1,
  2: 3,
  3: 5,
  4: 10,
  5: 15,
  6: 20,
};

export async function turnFinish({gameRef, gameData}: {gameRef: DocumentReference<DocumentData>, gameData: GameModel}) {

  let response = {
      nextRound: false,
      nextQuestion: false,
      gameFinish: false,
  };

  if (!gameRef || !gameData) {
    throw new Error("Nie ma takiej gry!");
  }

  let status = "ongoing";

  let currentRoundNumber = gameData.currentRound;

  const rounds = gameData.rounds;

  const round = gameData.rounds[currentRoundNumber - 1];

  const currentQuestion =
    gameData.rounds[currentRoundNumber - 1].currentQuestion;

  const currentTurn =
    gameData.rounds[currentRoundNumber - 1].turns[currentQuestion - 1];

  const answeringAnswer = currentTurn.answer;

  const currentPoints = gameData.currentPoints;

  const winQuestion = currentTurn.viewers.some(
    (viewer: any) => viewer.bet !== answeringAnswer
  );

  rounds[currentRoundNumber - 1].turns[currentQuestion - 1].questionWin =
    winQuestion;

  let pointsUpdated = currentPoints.map((point) => {
    const playerAnswer = currentTurn.viewers.find(
      (viewer) => viewer.player === point.player
    );
    if (playerAnswer?.bet === answeringAnswer) {
      return {
        player: point.player,
        points: point.points + 1,
      };
    } else if (point.player === round.answeringPlayer && !winQuestion) {
      return {
        player: point.player,
        points:
          point.points +
          POINTS_FOR_QUESTIONS[
            (currentQuestion - 1) as keyof PointsForQuestions
          ],
      };
    } else {
      return point;
    }
  });
  // wygrał pytanie
  if (winQuestion) {
    // idziemy do nastepnej rundy, gdy pytanie nie jest 6
    if (currentQuestion < 6) {
      rounds[currentRoundNumber - 1].currentQuestion = currentQuestion + 1;
      response.nextQuestion = true;
    } else {
      pointsUpdated = pointsUpdated.map((point) => {
        if (point.player === round.answeringPlayer) {
          return {
            player: point.player,
            points: point.points + POINTS_FOR_QUESTIONS[currentQuestion + 1],
          };
        } else {
          return point;
        }
      });
      if (currentRoundNumber < gameData.participants.length) {
        currentRoundNumber += 1;
        response.nextRound = true;
      } else {
        status = "finished";
        response.gameFinish = true;
      }
    }
  } else {
    if (currentRoundNumber < gameData.participants.length) {
        currentRoundNumber += 1;
        response.nextRound = true;
      } else {
          status = "finished";
          response.gameFinish = true;
      }
  }

    await updateDoc(gameRef, {
      rounds,
      currentPoints: pointsUpdated,
      currentRound: currentRoundNumber,
      status,
    });

    return response;
}
