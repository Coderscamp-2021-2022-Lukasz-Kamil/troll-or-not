import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { getUserNickName } from "../user/getUserNickName";
import { CreateGameInput } from "./types";

export async function addGame({ name, host, players }: CreateGameInput) {
  if (players > 4) {
    throw new Error("Maksymalna liczba graczy to 4!");
  }

  if (players < 2) {
    throw new Error("Minimalna liczba graczy to 2!");
  }

  const nickname = await getUserNickName(host);

  if (!nickname) {
    throw new Error("Nie ma takiego gracza!");
  }

  const docRef = await addDoc(collection(db, "games_test"), {
    createdAt: Date.now(),
    name: name,
    status: "open",
    host: {
      id: host,
      nickname,
    },
    players: players,
    participants: [
      {
        player: {
          id: host,
          nickname,
        },
        isReady: false,
        failures: 0,
      },
    ],
  });

  return docRef.id;
}
