import { doc, DocumentData, DocumentReference, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { GameModel } from "./types";

export async function getGame(gameId: string): Promise<{gameRef: DocumentReference<DocumentData>, gameData: GameModel | undefined }> {
    const gameRef = doc(db, "games_test", gameId);

    const game = await getDoc(gameRef);

    const gameData = await game.data() as GameModel;

    return {gameRef, gameData};
}