import { updateDoc } from "firebase/firestore";
import { getGame } from "./getGame";
import { Participant } from "./types";

export async function setReady(gameId: string, userId: string) {
  const { gameRef, gameData } = await getGame(gameId);

  if (!gameData || !gameRef) {
    throw new Error("Nie ma takiej gry!");
  }

  const participants: Participant[] = gameData?.participants.map(
    (participant) => {
      if (participant.player.id === userId) {
        return {
          player: {
            id: participant.player.id,
            nickname: participant.player.nickname,
          },
          failures: participant.failures,
          isReady: true,
        };
      } else {
        return participant;
      }
    }
  );

  await updateDoc(gameRef, {
    participants,
  });
}
