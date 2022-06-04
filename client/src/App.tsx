import React, { useEffect, useState } from "react";
import GlobalStyles from "./global-styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import AddQuestionPage from "./components/views/AddQuestionPage/AddQuestionPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegistrationPage from "./components/views/LobbyListPage/LobbyListPage";
import LobbyListPage from "./components/views/LobbyListPage/LobbyListPage";
import BeforeGamePage from "./components/views/BeforeGamePage/BeforeGamePage";
import QuizRoomPlayerPage from "./components/views/QuizRoomPlayerPage/QuizRoomPlayerPage";
import QuizRoomTrollPage from "./components/views/QuizRoomTrollPage/QuizRoomTrollPage";
import NotFoundPage from "./components/views/NotFound/NotFoundPage";

function App() {
 

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/add-question"  element={<AddQuestionPage/>}/>
          <Route path ="/login" element={<LoginPage/>}/>
          <Route path ="/registration" element={<RegistrationPage/>}/>
          <Route path ="/lobby-list" element={<LobbyListPage/>}/>
          <Route path="/current-lobby" element={<BeforeGamePage/>}/>
          <Route path ="/current-lobby/player" element={<QuizRoomPlayerPage/>}/>
          <Route path ="/current-lobby/troll" element={<QuizRoomTrollPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>

        </Routes>
      </Router>
  
		</ThemeProvider>
	);
}


export default App;
