import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getUserNickName } from "../user/getUserNickName";
import { getGame } from "./getGame";
import { JoinToGameInput } from "./types";

export async function joinToGame({ gameId, userId }: JoinToGameInput) {
  const { gameData, gameRef } = await getGame(gameId);

  if (!gameData || !gameRef) {
    throw new Error("Nie ma takiej gry");
  }

  if (gameData?.players <= gameData?.participants.length) {
    throw new Error("Nie mozesz dołaczyć do tej gry, pokój jest pełen.");
  }

  const nickname = await getUserNickName(userId);

  await updateDoc(gameRef, {
    participants: arrayUnion({
      player: {
        id: userId,
        nickname,
      },
      isReady: false,
      failures: 0,
    }),
  });
}

export async function leaveFromGame({ gameId, userId }: JoinToGameInput) {
  const { gameData, gameRef } = await getGame(gameId);

  if (!gameRef || !gameData) {
    throw new Error("Nie ma takiej gry");
  }

  if (gameData.status === "finished") {
    return;
  }

  if (gameData.participants.length === 1) {
    return await deleteDoc(gameRef);
  }

  const host =
    gameData.host.id === userId
      ? gameData.participants[1].player
      : gameData.host;

  const playerToDelete = gameData.participants.find(
    (participant) => participant.player.id === userId
  );

  console.log(playerToDelete);
  await updateDoc(gameRef, {
    participants: arrayRemove(playerToDelete),
    host,
  });
}
