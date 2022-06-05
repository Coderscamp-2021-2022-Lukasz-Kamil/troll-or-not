import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { CreateGameInput } from "./types";

export async function addGame({name, host, players}: CreateGameInput) {
        const docRef = await addDoc(collection(db, "games_test"), {
          createdAt: new Date(),
          name,
          status: "open",
          host,
          players,
          participants: [{
              user: host,
              isReady: false,
              failures: 0,
          }],
        });
        console.log("Document written with ID: ", docRef.id);

        return docRef.id;
}