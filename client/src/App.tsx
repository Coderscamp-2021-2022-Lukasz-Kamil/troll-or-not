import React from "react";
import GlobalStyles from "./global-styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import LandingPage from "./components/views/LandingPage/LandinPage";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<h3>Hello Troll :)</h3>
			<LandingPage />
		</ThemeProvider>
	);
}

export default App;
