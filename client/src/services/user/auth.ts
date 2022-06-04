import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { UserCreateInput, UserSignInInput } from "./types";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";

async function createNewUser(nickname: string, authID: string) {
  await addDoc(collection(db, "user_test"), {
    nickname,
    authID,
    finishedGames: 0,
    startGames: 0,
    points: 0,
    wins: 0,
    isAdmin: false,
  });
}

async function getUser(uid: string): Promise<DocumentData[]> {
  const q = query(collection(db, "user_test"), where("authID", "==", uid));
  const users = await getDocs(q);

  const data = await Promise.all(
    users.docs.map(async (doc) => await doc.data())
  );
  return data;
}

export async function signUp({
  email,
  password,
  confirmPassword,
  nickname,
}: UserCreateInput): Promise<User> {
  if (password !== confirmPassword) {
    throw new Error("Hasła muszą być identyczne");
  }
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await createNewUser(nickname, user.uid);
  return user;
}

export async function signIn({
  email,
  password,
}: UserSignInInput): Promise<User> {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}
// auth observer
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log("uid: " + uid);
  } else {
    console.log("no user");
  }
});

export async function googleSignIn(): Promise<User> {
  const { user } = await signInWithPopup(auth, new GoogleAuthProvider());

  const existingUser = await getUser(user.uid);

  if (!existingUser.length) {
    await createNewUser(user.email!, user.uid);
  }
  return user;
}

export async function userSignOut() {
  try {
    await signOut(auth);
  } catch (err) {
    console.log(err);
  }
}
