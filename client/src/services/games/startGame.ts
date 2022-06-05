import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { getGame } from "./getGame";
import { StartGameInput } from "./types";

const QUESTIONS_PER_ROUND = 6;

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

//   const random = randomQuestions(questionsInGameAmount, questionsAmount);

  const promises = questions.docs.map(async (doc, index) => {
      return await doc.data();
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

  const sortedA = questionsResponse.sort((a, b) => {
      return a.order - b.order;
  })

  const sortedB = questionsResponse.sort((a, b) => {
    return b.order - a.order;
})

  sortedA.forEach((question, index) => {
    // sortedA indexForRound = Math.floor(index / 6);
    rounds[0].questions.push(question);
    rounds[1].questions.push(question);
  });

  sortedB.forEach((question, index) => {
    // sortedA indexForRound = Math.floor(index / 6);
    if (roundsAmount >= 3) {
        rounds[2].questions.push(question);
    }

    if (roundsAmount >= 4) {
        rounds[3].questions.push(question);
    }
  });

  rounds[0].questions.push(sortedA[0])
  rounds[1].questions.push(sortedA[0])
  if(roundsAmount >= 3) {
    rounds[2].questions.push(sortedA[0])

  }
  if(roundsAmount >= 3) {
    rounds[3].questions.push(sortedA[0])
  }

  return rounds;
}

export async function startGame({ gameId }: StartGameInput) {
  const {gameRef, gameData} = await getGame(gameId);

  if (!gameData) {
    throw new Error("Ta gra nie istnieje!");
  }

  if (gameData.participants.some((participant: any) => !participant.isReady)) {
    throw new Error("Nie wszyscy gracze są gotowi!");
  }
  const gameRoundsAmount = gameData.participants.length;
  const userIds = gameData.participants.map((participant: any) => participant.user);

  const rounds = await createRounds(gameRoundsAmount, userIds);
  console.log(rounds);

    await updateDoc(gameRef, {
      status: "ongoing",
      currentRound: 1,
      rounds,
      currentPoints: userIds.map((userId: string) => ({player: userId, points: 0})),
      currentTurn: "answering",
      currentAnswer: ""
    });
}
