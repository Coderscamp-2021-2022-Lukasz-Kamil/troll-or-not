import { updatePassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, auth} from "../firebase";

export async function editUser(
  userId: string,
  nickname: string,
  email: string
) {
  const query1 = query(
    collection(db, "user_test"),
    where("nickname", "==", nickname),
    where("authID", "!=", userId)
  );
  const query2 = query(
    collection(db, "user_test"),
    where("email", "==", email),
    where("authID", "!=", userId)
  );

  const data1 = await getDocs(query1);
  const data2 = await getDocs(query2);

  const nickNameExists = await Promise.all(
    data1.docs.map(async (doc) => await doc.data())
  );

  if (nickNameExists.length) {
    throw new Error("Taka nazwa gracza już istnieje.");
  }

  const emailExists = await Promise.all(
    data2.docs.map(async (doc) => await doc.data())
  );

  if (emailExists.length) {
    throw new Error("Taki email już istnieje.");
  }

  const userRef = doc(db, "users_test", userId);

  await updateDoc(userRef, {
    nickname,
  });

  return {
      success: true
  }
}

export async function editPassword(
  userId: string,
  newPassword: string,
  confirmPassword: string
) {
    const userRef = doc(db, "users_test", userId);

    if (newPassword !== confirmPassword) {
        throw new Error("Hasła muszą być identyczne");
    }

    const user = auth.currentUser;

    if(!user) {
        throw new Error("Musisz być zalogowany")
    }

    await updatePassword(user, newPassword)

    return {
        success: true
    };

}
