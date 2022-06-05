import React, { useEffect, useState } from "react";
import {
  TableWrapper,
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableData,
  ButtonGame,
  TableHead,
  PageWrapper,
} from "../LobbyListPage/LobbyPage.styled";
import { SlideOutPanel } from "../../ui/SlideOutPanel/SlideOutPanel";

import {
  ShortReminder,
  LobbyName,
  BeforeGameWrapper,
} from "./BeforeGamePage.styled";
import { useMemo } from "react";
import { useTable, Column } from "react-table";
import Title from "../../ui/title/Title";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { GameModel } from "../../../services/games/types";
import { useNavigate, useParams } from "react-router";
import { useCookies } from "react-cookie";
import { setReady } from "../../../services/games/setReady";
import { startGame } from "../../../services/games/startGame";

const BeforeGamePage = () => {
  interface StartGame {
    gamerName: string;
    readiness: string;
  }

  const [uid] = useCookies();

  const user = uid["TON_uid"];

  const [game, setGame] = useState<GameModel | undefined>(undefined);
  const [participants, setParticipants] = useState<StartGame[]>([]);

  const { gameId } = useParams();

  const navigate = useNavigate();


  const handleSetReady = async () => {
    await setReady(gameId || "", user);
  }

  const handleStartGame = async () => {
    await startGame({gameId: gameId || ""});
    navigate(`/current-lobby/${gameId}`);

  }

  const users = ["Wesoły Stefan", "Kolorowy Marian", "Zimny Łokiec", "Rudolf Czerowononosy"];

  useEffect(() => {
    onSnapshot(doc(db, "games_test", gameId || ""), (querySnapshot) => {
      const data = querySnapshot.data() as GameModel;
      setGame(data)
      setParticipants(data.participants.map((participant, index) => {
        return {
          gamerName: users[index],
          readiness: participant.isReady ? "GOTOWY" : "NIEGOTOWY"
        }
      }))
      if (data.status === "ongoing") {
        navigate(`/current-lobby/${gameId}`);
      }
    });
  }, []);

  const data = useMemo<StartGame[]>(
    () => participants,
    [participants]
  );

  const columns = useMemo<Column<StartGame>[]>(
    () => [
      {
        Header: "Nazwa gracza",
        accessor: "gamerName",
      },
      {
        Header: "Gotowość",
        accessor: "readiness",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <PageWrapper>
        <Title showButton={true} />
        <BeforeGameWrapper>
          <LobbyName>Nazwa Lobby</LobbyName>

          <TableWrapper>
            <Table {...getTableProps()}>
              <TableHead>
                {headerGroups.map((headerGroup) => (
                  <TableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <TableHeader {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </TableHeader>
                    ))}
                  </TableRow>
                ))}
              </TableHead>

              <TableBody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  const { key, ...restRowProps } = row.getRowProps();
                  return (
                    <TableRow {...restRowProps} key={key}>
                      {row.cells.map((cell) => {
                        const { key, ...restCellProps } = cell.getCellProps();
                        return (
                          <TableData {...restCellProps} key={key}>
                            {cell.render("Cell")}
                          </TableData>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {user === game?.host && (<ButtonGame onClick={() => handleStartGame()}>Rozpocznij grę!</ButtonGame>)}
            <ShortReminder onClick={() => handleSetReady()}>Zaznacz gotowość!</ShortReminder>
          </TableWrapper>
        </BeforeGameWrapper>
      </PageWrapper>
      <SlideOutPanel />
    </>
  );
};

export default BeforeGamePage;
