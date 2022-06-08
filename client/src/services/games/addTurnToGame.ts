import { updateDoc } from "firebase/firestore";
import { getGame } from "./getGame";
import { turnDecider } from "./turnDecider";
import { AnsweringTurnInput, ViewerTurnInput } from "./types";

export async function addTurnToGameAsAnswering({
  gameId,
  userId,
  answer,
  answerText,
}: AnsweringTurnInput) {
  const { gameRef, gameData } = await getGame(gameId);

  if (!gameRef || !gameData) {
    throw new Error("Nie ma takiej gry!");
  }

  const currentRound = gameData.currentRound;

  if (userId !== gameData.rounds[currentRound - 1].answeringPlayer) {
    throw new Error("To nie Twoja runda!");
  }

  const rounds = gameData.rounds;

  if (answer === undefined) {
    rounds[currentRound - 1].turns.push({
      notAnswered: true,
      viewers: [],
      questionWin: false,
    });
  } else {
    rounds[currentRound - 1].turns.push({
      answer,
      viewers: [],
      questionWin: false,
    });
  }

  await updateDoc(gameRef, {
    rounds,
    currentTurn: "observer",
    currentAnswer: answerText,
  });

  if (answer === undefined) {
    const promises = gameData.participants
      .filter((part) => part.player.id !== userId)
      .map(async (participant) => {
        await addTurnToGameAsViewer({
          gameId,
          userId: participant.player.id,
        });
      });

    await Promise.all(promises);
  }
}

export async function addTurnToGameAsViewer({
  gameId,
  userId,
  bet,
}: ViewerTurnInput) {
  const { gameRef, gameData } = await getGame(gameId);

  if (!gameRef || !gameData) {
    throw new Error("Nie ma takiej gry!");
  }

  const currentRound = gameData.currentRound;

  if (userId === gameData.rounds[currentRound - 1].answeringPlayer) {
    throw new Error("To nie Twoja runda!");
  }

  const rounds = gameData.rounds;
  const currentQuestion = gameData.rounds[currentRound - 1].currentQuestion;

  if (bet !== undefined) {
    rounds[currentRound - 1].turns[currentQuestion - 1].viewers.push({
      player: userId,
      bet,
    });
  } else {
    rounds[currentRound - 1].turns[currentQuestion - 1].viewers.push({
      player: userId,
      notAnswered: true,
    });
  }

  const participants =
    bet === undefined
      ? gameData.participants.map((participant) => {
          if (participant.player.id === userId) {
            return { ...participant, failures: participant.failures + 1 };
          }
          return participant;
        })
      : gameData.participants;

  await updateDoc(gameRef, {
    rounds,
    participants,
  });
  return await turnDecider(gameId);
}
