import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { QUESTIONS_PER_ROUND } from "./constants";
import { getGame } from "./getGame";
import { Participant, StartGameInput } from "./types";

function randomQuestions(numberOfQuestions: number, questionsAmount: number) {
  const arr = [];
  while (arr.length < numberOfQuestions) {
    const r = Math.floor(Math.random() * (questionsAmount - 1));
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}

export async function createRounds(roundsAmount: number, userIds: string[]) {
  const q = query(
    collection(db, "questions_test"),
    where("isConfirmed", "==", true)
  );
  const questions = await getDocs(q);

  const questionsInGameAmount = roundsAmount * QUESTIONS_PER_ROUND;

  const questionsAmount = questions.size;

  const random = randomQuestions(questionsInGameAmount, questionsAmount);

  const promises = questions.docs.map(async (doc, index) => {
    if (random.indexOf(index) !== -1) {
      return await doc.data();
    }
  });

  const questionsResponse = await (
    await Promise.all(promises)
  ).filter((doc) => doc);

  let rounds: any = [];
  for (let i = 0; i < roundsAmount; i++) {
    rounds.push({
      currentQuestion: 1,
      answeringPlayer: userIds[i],
      questions: [],
      turns: [],
    });
  }

  questionsResponse.forEach((question, index) => {
    const indexForRound = Math.floor(index / 6);
    rounds[indexForRound].questions.push(question);
  });

  return rounds;
}

export async function startGame({ gameId }: StartGameInput) {
  const { gameRef, gameData } = await getGame(gameId);

  if (!gameData) {
    throw new Error("Ta gra nie istnieje!");
  }

  if (gameData.participants.length < gameData.players) {
    throw new Error("Nie ma wystarczającej liczby graczy!");
  }

  if (gameData.participants.some((participant: any) => !participant.isReady)) {
    throw new Error("Nie wszyscy gracze są gotowi!");
  }
  const gameRoundsAmount = gameData.participants.length;
  const users = gameData.participants.map(
    (participant: Participant) => participant.player
  );

  const rounds = await createRounds(
    gameRoundsAmount,
    users.map((user) => user.id)
  );

  await updateDoc(gameRef, {
    status: "ongoing",
    currentRound: 1,
    rounds,
    participants: gameData.participants,
    currentPoints: users.map((user) => ({ player: user, points: 0 })),
    currentTurn: "answering",
    currentAnswer: "",
  });
}
