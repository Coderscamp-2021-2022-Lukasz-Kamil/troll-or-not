import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { getQuestion } from "./getQuestion";

export async function confirmQuestion(questionId: string) {
  const authed = auth.currentUser;

  if (!authed) {
    throw new Error("Musisz być zalogowany");
  }

  const user = await getDoc(doc(db, "users_test", authed.uid));

  const userData = await user.data();

  if (!userData?.isAdmin) {
    throw new Error("Tylko admin moe zatwierdzić pytanie");
  }

  const { questionRef, questionData } = await getQuestion(questionId);

  if (!questionRef || !questionData) {
    throw new Error("Nie ma takiego pytania");
  }

  await updateDoc(questionRef, {
    confirmed: true,
  });
}
