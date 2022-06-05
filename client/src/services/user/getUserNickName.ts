import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function getUserNickName(userId: string) {
    const userRef = await getDoc(doc(db, "user_test", userId));

    const data = await userRef.data();

    console.log(data);

    return data?.nickname;

}