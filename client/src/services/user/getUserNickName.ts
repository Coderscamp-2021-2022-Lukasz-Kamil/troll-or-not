import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export async function getUserNickName(userId: string) {
  const q = query(collection(db, "user_test"), where("authID", "==", userId));
  const userRef = await getDocs(q);

  const data = await userRef.docs[0].data();

  return data?.nickname;
}
