import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  googleSignIn,
  signIn,
  signUp,
  userSignOut,
} from "./services/user/auth";
import { useCookies } from "react-cookie";
import { addGame } from "./services/games/createGame";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db, auth } from "./services/firebase";

function App() {
  // const [accessToken, setAccessToken] = useCookies();
  const [uid, setUid] = useCookies();
  const [games, setGames] = useState<any>([]);
  const handleCreateUser = async () => {
    try {
      const user = await signUp({
        email: "superuser1@email.com",
        password: "12345678",
        confirmPassword: "12345678",
        nickname: "krulikos"
      });
      setUid("TON_uid", user.uid);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignIn = async () => {
    try {
      const credentials = {
        email: "superuser1@email.com",
        password: "12345678"
      };

      const user = await signIn(credentials);
      setUid("TON_uid", user.uid);
    } catch(err) {
      console.log(err);
    }
  } 

  useEffect(() => {
    const q = query(collection(db, "games_test"));

    onSnapshot(q, (querySnapshot) => {
      const data: any = [];
      querySnapshot.forEach((doc) => {
          data.push(doc.data());
      });
      setGames(data);
    });

  }, []);

  const handleGoogle = async () => {
    try {
      const user = await googleSignIn();
      setUid("TON_uid", user.uid);
    } catch(err) {
      console.log(err);
    }


  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={handleCreateUser}>REGISTER</button>
        <button onClick={handleGoogle}>GOOGLE</button>
        <button onClick={userSignOut}>SIGN OUT</button>
        <button onClick={handleSignIn}>SIGN IN</button>
        <button onClick={() => addGame({name: "superName", host: auth.currentUser?.uid || "", players: 4})}>ADD GAME</button>
        {games.length ? (games.map((game: any, index: any) => {
        return (<p key={index}>{game.name}</p>)
})): <></>}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
