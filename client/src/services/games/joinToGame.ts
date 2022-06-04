import { arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";
import { getGame } from "./getGame";
import { JoinToGameInput } from "./types";

export async function joinToGame({gameId, userId}: JoinToGameInput) {
    const {gameRef} = await getGame(gameId);

    await updateDoc(gameRef, {
        participants: arrayUnion({
            user: userId,
            isReady: false,
            failures: 0
        })
    })
}

export async function leaveFromGame({gameId, userId}: JoinToGameInput) {
    const {gameRef} = await getGame(gameId);

    await updateDoc(gameRef, {
        participants: arrayRemove({
            user: userId,
        })
    })
}