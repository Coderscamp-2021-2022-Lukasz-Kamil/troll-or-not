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
import { GameModel } from "../../../services/games/types";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";
import { setReady } from "../../../services/games/setReady";
import { startGame } from "../../../services/games/startGame";
import { toast, ToastContainer } from "react-toastify";

const BeforeGamePage = ({ game }: { game?: GameModel }) => {
  interface StartGame {
    gamerName: string;
    readiness: string;
  }

  const [uid] = useCookies();

  const user = uid["TON_uid"];

  const [participants, setParticipants] = useState<StartGame[]>([]);

  const { gameId } = useParams();

  const handleSetReady = async () => {
    await setReady(gameId || "", user);
  };

  const handleStartGame = async () => {
    try {
      await startGame({ gameId: gameId || "" });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    console.log("inside use effect");
    setParticipants(
      game?.participants?.map((participant) => {
        return {
          gamerName: `${participant.player.nickname} ${
            game.host.id === participant.player.id ? "- HOST" : ""
          }`,
          readiness: participant.isReady ? "GOTOWY" : "NIEGOTOWY",
        };
      }) || []
    );
  }, [game]);

  const data = useMemo<StartGame[]>(() => participants, [participants]);

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
        <ToastContainer />
        <Title showButton={true} />
        <BeforeGameWrapper>
          <LobbyName>{game?.name}</LobbyName>

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
            {user === game?.host.id && (
              <ButtonGame onClick={() => handleStartGame()}>
                Rozpocznij grę!
              </ButtonGame>
            )}
            <ShortReminder onClick={() => handleSetReady()}>
              Zaznacz gotowość!
            </ShortReminder>
          </TableWrapper>
        </BeforeGameWrapper>
      </PageWrapper>
      <SlideOutPanel />
    </>
  );
};

export default BeforeGamePage;
