import { updateDoc } from "firebase/firestore";
import { getGame } from "./getGame";
import { turnDecider } from "./turnDecider";
import { AnsweringTurnInput, ViewerTurnInput } from "./types";

export async function addTurnToGameAsAnswering({gameId, userId, answer, round}: AnsweringTurnInput) {
    const {gameRef, gameData} = await getGame(gameId);

    if(!gameRef || !gameData) {
        throw new Error("Nie ma takiej gry!");
    }

    if (userId !== gameData.rounds[round-1].answeringPlayer) {
        throw new Error("To nie Twoja runda!");
    }

    const rounds = gameData.rounds;

    rounds[round-1].turns.push({answer, viewers: [], questionWin: false});

    await updateDoc(gameRef, {
        rounds
    })
}

export async function addTurnToGameAsViewer({gameId, userId, bet, round}: ViewerTurnInput) {
    const {gameRef, gameData} = await getGame(gameId);

    if(!gameRef || !gameData) {
        throw new Error("Nie ma takiej gry!");
    }

    if (userId === gameData.rounds[round-1].answeringPlayer) {
        throw new Error("To nie Twoja runda!");
    }

    const rounds = gameData.rounds;
    const currentQuestion = gameData.rounds[round-1].currentQuestion;


    rounds[round-1].turns[currentQuestion-1].viewers.push({player: userId, bet});

    await updateDoc(gameRef, {
        rounds
    })
    return await turnDecider(gameId);

}