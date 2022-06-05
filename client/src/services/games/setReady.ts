import { updateDoc } from "firebase/firestore";
import { getGame } from "./getGame";

export async function setReady(gameId: string, userId: string) {
    const {gameRef, gameData} = await getGame(gameId);

    const participants = gameData?.participants.map(participant => {
        if(participant.user === userId) {
            return {
                user: participant.user,
                failures: participant.failures,
                isReady: true,
            }
        } else {
            return participant;
        }
    })

    await updateDoc(gameRef, {
        participants,
    })
}