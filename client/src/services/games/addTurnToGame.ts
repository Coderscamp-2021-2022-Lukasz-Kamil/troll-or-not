import { updateDoc } from "firebase/firestore";
import { getGame } from "./getGame";
import { turnDecider } from "./turnDecider";
import { AnsweringTurnInput, ViewerTurnInput } from "./types";

export async function addTurnToGameAsAnswering({gameId, userId, answer, answerText}: AnsweringTurnInput) {
    const {gameRef, gameData} = await getGame(gameId);

    if(!gameRef || !gameData) {
        throw new Error("Nie ma takiej gry!");
    }

    const currentRound = gameData.currentRound;

    if (userId !== gameData.rounds[currentRound-1].answeringPlayer) {
        throw new Error("To nie Twoja runda!");
    }

    const rounds = gameData.rounds;

    rounds[currentRound-1].turns.push({answer, viewers: [], questionWin: false});

    await updateDoc(gameRef, {
        rounds,
        currentTurn: "observer",
        currentAnswer: answerText
    })
}

export async function addTurnToGameAsViewer({gameId, userId, bet}: ViewerTurnInput) {
    const {gameRef, gameData} = await getGame(gameId);

    if(!gameRef || !gameData) {
        throw new Error("Nie ma takiej gry!");
    }

    const currentRound = gameData.currentRound;

    if (userId === gameData.rounds[currentRound-1].answeringPlayer) {
        throw new Error("To nie Twoja runda!");
    }

    const rounds = gameData.rounds;
    const currentQuestion = gameData.rounds[currentRound-1].currentQuestion;


    rounds[currentRound-1].turns[currentQuestion-1].viewers.push({player: userId, bet});

    await updateDoc(gameRef, {
        rounds
    })
    return await turnDecider(gameId);

}