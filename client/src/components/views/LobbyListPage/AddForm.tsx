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
import { Select } from "../../ui/Select/Select.style";
import { toast, ToastContainer } from "react-toastify";

export const AddNewGame = () => {
  const [lobbyName, setLobbyName] = useState<string>("");
  const [gamersAmount, setGamersAmount] = useState<number>(2);

  const authed = auth.currentUser;
  const userId = authed?.uid || "";

  const handleAddLobby = (event: any) => {
    event.preventDefault();
    setLobbyName(event.target.value);
  };

  const handleGamersAmount = (event: any) => {
    event.preventDefault();
    setGamersAmount(+event.target.value);
  };

  const navigate = useNavigate();

  const handleCreateGame = async () => {
    if (lobbyName.trim() === "") {
      return toast.error("Musisz podać nazwę gry");
    }
    const id = await addGame({
      name: lobbyName,
      host: userId,
      players: gamersAmount,
    });
    navigate(`/game/${id}`);
  };

  return (
    <>
      <AddGameWrapper>
        <ToastContainer />
        <Grid>
          <TypographyGrid>Nazwa Lobby</TypographyGrid>
          <Input
            type="text"
            name="lobbyName"
            onChange={handleAddLobby}
            value={lobbyName}
          />
          <TypographyGrid>Ilość graczy</TypographyGrid>
          <Select name="amountOfGamers" onChange={handleGamersAmount}>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </Select>
          <ButtonGame onClick={handleCreateGame}>Dodaj rozgrywkę</ButtonGame>
        </Grid>
      </AddGameWrapper>
    </>
  );
};
