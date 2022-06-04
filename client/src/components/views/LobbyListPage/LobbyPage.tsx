/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Column, useTable, useFilters } from "react-table";
import { useMemo } from "react";
import { DefaultColumnFilter } from "./DefaultColumnFilter";
import Title from "../../ui/title/Title";
import { SlideOutPanel } from "../../ui/SlideOutPanel/SlideOutPanel";
import {
  TableWrapper,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
  ButtonGame,
  PageWrapper,
} from "./LobbyPage.styled";
import { auth, db } from "../../../services/firebase";
import {
  query,
  collection,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { GameModel } from "../../../services/games/types";
import { Button } from "../../ui/Button/Button.style";
import { joinToGame } from "../../../services/games/joinToGame";

interface Lobby {
  id: string;
  name: string;
  numOfGamers: string;
  state: string;
}

export const LobbyPage = () => {
  const [games, setGames] = useState<Lobby[]>([]);

  const data = useMemo<Lobby[]>(() => games, [games]);

  const handleJoinGame = async (gameId: string) => {
    joinToGame({ gameId, userId: auth.currentUser!.uid });
  };
  const columns = useMemo<Column<Lobby>[]>(
    () => [
      {
        Header: "Nazwa Lobby",
        columns: [
          {
            Header: "",
            accessor: "name",
            Filter: DefaultColumnFilter,
          },
        ],
      },
      {
        Header: "Lb graczy",
        columns: [
          {
            Header: "",
            accessor: "numOfGamers",
            Filter: DefaultColumnFilter,
          },
        ],
      },
      {
        Header: "Stan gry",
        columns: [
          {
            Header: "",
            accessor: "state",
            Cell: ({ cell }: any) => {
              console.log(cell.row.original.id);
              return cell.value === "open" ? (
                <div className="align-center">
                  {cell.value}
                  <Button
                    className="activate align-center"
                    value={cell.row.values.id}
                    onClick={() => handleJoinGame(cell.row.original.id)}
                  >
                    Dołącz
                  </Button>
                </div>
              ) : (
                <>{cell.value}</>
              );
            },
            Filter: DefaultColumnFilter,
          },
        ],
      },
    ],
    [data]
  );

  useEffect(() => {
    const q = query(collection(db, "games_test"));

    onSnapshot(q, (querySnapshot) => {
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ data: doc.data(), id: doc.id });
      });
      setGames(
        data.map((game) => {
          return {
            id: game.id,
            name: game.data.name,
            numOfGamers: `${game.data.participants.length}/${game.data.players}`,
            state: game.data.status,
          };
        })
      );
    });
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useFilters);

  return (
    <>
      <PageWrapper>
        <Title />
        <TableWrapper>
          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => {
                const { key, ...restHeaderGroup } =
                  headerGroup.getHeaderGroupProps();
                return (
                  <TableRow {...restHeaderGroup} key={key}>
                    {headerGroup.headers.map((column: any) => {
                      const { key, ...restAttributes } =
                        column.getHeaderProps();
                      return (
                        <TableHeader {...restAttributes} key={key}>
                          {column.render("Header")}
                          <div>
                            {column.canFilter ? column.render("Filter") : null}
                          </div>
                        </TableHeader>
                      );
                    })}
                  </TableRow>
                );
              })}
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
          <ButtonGame>Stwórz grę</ButtonGame>
        </TableWrapper>
      </PageWrapper>
      <SlideOutPanel />
    </>
  );
};
