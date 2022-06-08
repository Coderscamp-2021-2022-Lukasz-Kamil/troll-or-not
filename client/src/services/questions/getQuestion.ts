import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { QuestionModel } from "./types";

export async function getQuestion(
  questionId: string
): Promise<{
  questionRef: DocumentReference<DocumentData>;
  questionData: QuestionModel | undefined;
}> {
  const questionRef = doc(db, "questions_test", questionId);

  const game = await getDoc(questionRef);

  const questionData = (await game.data()) as QuestionModel;

  return { questionRef, questionData };
}
