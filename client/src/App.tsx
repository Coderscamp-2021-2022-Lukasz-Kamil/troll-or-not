import React, { useEffect, useState } from "react";
import GlobalStyles from "./global-styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import LandingPage from "./components/views/LandingPage/LandinPage";
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
		<ThemeProvider theme={theme}>
			<GlobalStyles />
      {/* <button onClick={handleCreateUser}>REGISTER</button>
        <button onClick={handleGoogle}>GOOGLE</button>
        <button onClick={userSignOut}>SIGN OUT</button>
        <button onClick={handleSignIn}>SIGN IN</button>
        <button onClick={() => addGame({name: "superName", host: auth.currentUser?.uid || "", players: 4})}>ADD GAME</button>
        {games.length ? (games.map((game: any, index: any) => {
        return (<p key={index}>{game.name}</p>)
})): <></>} */}
			<LandingPage />
		</ThemeProvider>
	);
}


export default App;
