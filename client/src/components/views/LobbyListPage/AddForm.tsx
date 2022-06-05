import React from "react";
import { Input } from "../../ui/Input/Input";
import { TypographyGrid } from "../../ui/Typography/Typography";
import { Grid } from "../AddQuestionPage/AddQuestionPage.styled";
import { useState } from "react";
import { auth } from "../../../services/firebase";
import { addGame } from "../../../services/games/createGame";
import { useNavigate } from "react-router";
import { AddGameWrapper } from "./AddForm.styled";
import { ButtonGame } from "./LobbyPage.styled";

export const AddNewGame = () => {
  const [lobbyName, setLobbyName] = useState<string>("");
  const [gamersAmount, setGamersAmount] = useState<number>(2);

  const authed = auth.currentUser;
  const userId = authed?.uid || "";

  const handleAddLobby = (event: any) => {
    event.preventDefault();
    setLobbyName(event.target.value);
    console.log("ustawiamyLobby", lobbyName);
  };

  const handleGamersAmount = (event: any) => {
    event.preventDefault();
    setGamersAmount(event.target.value);
  };

  const navigate = useNavigate();

  const handleCreateGame = async () => {
    console.log("tworzenieGry", lobbyName);
    const id = await addGame({
      name: lobbyName,
      host: userId,
      players: gamersAmount,
    });
    navigate(`/before-game/${id}`);
  };

  console.log(lobbyName);
  return (
    <>
      <AddGameWrapper>
        <Grid>
          <TypographyGrid>Nazwa Lobby</TypographyGrid>
          <Input
            type="text"
            name="lobbyName"
            onChange={handleAddLobby}
            value={lobbyName}
          />
          <TypographyGrid>Ilość graczy</TypographyGrid>
          <Input
            type="number"
            name="amountOfGamers"
            onChange={handleGamersAmount}
            value={gamersAmount}
          />
          <ButtonGame onClick={handleCreateGame}>Dodaj rozgrywkę</ButtonGame>
        </Grid>
      </AddGameWrapper>
    </>
  );
};
