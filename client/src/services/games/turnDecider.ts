import { getGame } from "./getGame";
import { turnFinish } from "./turnFinish";

export async function turnDecider(gameId: string) {
    const { gameRef, gameData } = await getGame(gameId);

    if(!gameRef || !gameData) {
        throw new Error("Nie ma takiej gry!");
    }

    const currentRoundNumber = gameData?.currentRound;

    const currentQuestion = gameData?.rounds[currentRoundNumber!-1].currentQuestion;

    const currentTurn = gameData?.rounds[currentRoundNumber!-1].turns[currentQuestion!-1];

    if (currentTurn?.viewers.length === gameData!.participants!.length -1) {
        const response = await turnFinish({gameRef, gameData})

        return response;
    }

}