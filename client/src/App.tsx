import React from "react";
import GlobalStyles from "./global-styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import AddQuestionPage from "./components/views/AddQuestionPage/AddQuestionPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegistrationPage from "./components/views/RegistrationPage/RegistrationPage";
import { LobbyPage } from "./components/views/LobbyListPage/LobbyPage";
import NotFoundPage from "./components/views/NotFound/NotFoundPage";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRouts";
import { MeetProvider } from "./components/video/meetContext";
import Game from "./components/views/Game/Game";

function App() {
  return (
    <MeetProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<ProtectedRoutes />}>
              <Route path="/add-question" element={<AddQuestionPage />} />

              <Route path="/lobby-list" element={<LobbyPage />} />
              <Route
                path="/game/:gameId"
                element={<Game />}
              />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </MeetProvider>
  );
}

export default App;
