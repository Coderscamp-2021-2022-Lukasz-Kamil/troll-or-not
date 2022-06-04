import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { CreateQuestionInput } from "./types";

export async function addQuestion({content, answers}: CreateQuestionInput) {
        await addDoc(collection(db, "questions_test"), {
            content,
            answers,
            isConfirmed: true
        });

}