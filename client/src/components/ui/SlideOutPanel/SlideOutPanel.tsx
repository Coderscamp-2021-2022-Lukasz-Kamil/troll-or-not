import React, { useState } from "react";
import { GameRulesTitle, TogglePanel, Rules } from "./SlideOutPanel.styled";

export const SlideOutPanel = () => {
	const [isActive, setIsActive] = useState(false);

	const togglePanel = () => {
		setIsActive(!isActive);
	};
	return (
		<TogglePanel className={isActive ? "open" : "closed"}>
			<GameRulesTitle onClick={togglePanel}>Zasady gry</GameRulesTitle>

			<Rules className={isActive ? "open" : "closed"}>
				<Rules>
					Maksymalnie 4 graczy w pokoju 1 gracz gra - <strong>Szuler</strong>, a
					1-3 graczy obserwuje grę - <strong>Inwigilator</strong>.
					<strong> Szuler</strong> otrzymuje pytanie i 4 warianty odpowiedzi.
					Wie, która jest poprawna (wyświetla się na ekranie) i wybiera swoją
					(prawidłową lub nieprawidłową). Ma 30 sekund na jej udzielenie i
					ewentualne uzasadnienie. Zadaniem <strong>Inwigilatorów</strong> jest
					wybranie czy podana odpowiedź przez <strong>Szulera</strong> jest
					poprawna czy niepoprawna, mają na to 10 sekund. Zadaniem
					<strong> Szulera</strong> jest “namówić” co najmniej jedną
					osobę do tego, by <b>nie</b> wytypowała czy dana odpowiedź jest poprawna.
					Czyli gdy odpowiada poprawnie, to żeby ktoś z
					<strong> Inwigilatorów</strong>, odpowiedział że to niepoprawna
					odpowiedź, a jeżeli odpowiada niepoprawnie, żeby ktoś z
					<strong> Inwigilatorów</strong> stwierdził, że to poprawna odpowiedź.
				</Rules>
				<Rules>
					Możliwe przypadki: <br></br>1. <strong>Szuler</strong> wybiera poprawną
					odpowiedź: - wszyscy
					<strong> Inwigilatorzy</strong> typują, że odpowiedź jest poprawna;
					<strong> Szuler</strong> “przegrywa” pytanie i odpada z dalszej gry
					jako <strong>Szuler</strong>. - jeden lub więcej
					<strong> Inwigilatorów</strong> typuje, że odpowiedź jest niepoprawna;
					<strong> Szuler</strong> “wygrywa” pytanie i przechodzi do kolejnego
					pytania. <br></br>2. <strong>Szuler</strong> wybiera niepoprawną odpowiedź: -
					wszyscy <strong>Inwigilatorzy</strong> typują, że odpowiedź jest
					niepoprawna; <strong>Szuler</strong> “przegrywa” pytanie i odpada z
					dalszej gry jako <strong>Szuler</strong>. - jeden lub więcej
					<strong> Inwigilatorów</strong> typuje, że odpowiedź jest poprawna;
					<strong> Szuler</strong> “wygrywa” pytanie i przechodzi do kolejnego
					pytania. <br></br>W trakcie gry jako <strong>Szuler</strong> przypada
					maksymalnie 6 pytań.
				</Rules>
			</Rules>
		</TogglePanel>
	);
};
