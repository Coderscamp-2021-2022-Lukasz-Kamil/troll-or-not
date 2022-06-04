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
import { addQuestion } from "./services/questions/addQuestion";
import { startGame } from "./services/games/startGame";
import { joinToGame } from "./services/games/joinToGame";
import { addTurnToGameAsAnswering, addTurnToGameAsViewer } from "./services/games/addTurnToGame";

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

  const handleQuestion = async () => {

    let questions = [];

    for (let i = 0; i < 30; i++) {
      const data = {
        content: `Pytanie ${i}`,
        answers: [
          {
            content: "Odpowiedź 1",
            isCorrect: true
          },
          {
            content: "Odpowiedź 2",
            isCorrect: false
          },
          {
            content: "Odpowiedź 3",
            isCorrect: false
          },
          {
            content: "Odpowiedź 4",
            isCorrect: false
          }
        ]
      }
      questions.push(data)
    }
    try {
      for(const element of questions) {
        await addQuestion(element);
      }
    } catch(err) {
      console.log(err)
    }
  }

  const handleRound = async () => {
    await startGame({gameId: "5ENIGqZvHdyVD6l8Czr0"});
  }

  const handleJoin = async () => {
    await joinToGame({gameId: "5ENIGqZvHdyVD6l8Czr0", userId: "L5SlHzbsQgfMn5zUY0K1B4hFx3F3"})
  }

  const handleAnswer = async () => {
    await addTurnToGameAsAnswering({gameId: "5ENIGqZvHdyVD6l8Czr0", userId: "ikKoGQsXSTQbey0HLL7joMLV4Y73", round: 1, answer: true});
  }

  const handleViewer = async () => {
    await addTurnToGameAsViewer({gameId: "5ENIGqZvHdyVD6l8Czr0", userId: "L5SlHzbsQgfMn5zUY0K1B4hFx3F3", round: 1, bet: true});
  }

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<h3>Hello Troll :)</h3>
      <button onClick={handleCreateUser}>REGISTER</button>
        <button onClick={handleGoogle}>GOOGLE</button>
        <button onClick={userSignOut}>SIGN OUT</button>
        <button onClick={handleRound}>ROUNDS</button>
        <button onClick={handleQuestion}>ADD QUESTIIOn</button>
        <button onClick={handleJoin}>JOIN TO GAME</button>
        <button onClick={handleSignIn}>SIGN IN</button>
        <button onClick={handleAnswer}>ANSWER</button>
        <button onClick={handleViewer}>VIEWER</button>
        <button onClick={() => addGame({name: "superName", host: auth.currentUser?.uid || "", players: 4})}>ADD GAME</button>
        {games.length ? (games.map((game: any, index: any) => {
        return (<p key={index}>{game.name}</p>)
})): <></>}
			<LandingPage />
		</ThemeProvider>
	);
}


export default App;
