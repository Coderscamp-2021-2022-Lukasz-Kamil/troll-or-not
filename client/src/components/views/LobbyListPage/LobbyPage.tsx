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
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { Button } from "../../ui/Button/Button.style";
import { joinToGame } from "../../../services/games/joinToGame";
import { useNavigate } from "react-router";
import { AddNewGame } from "./AddForm";
import { GameModel } from "../../../services/games/types";
import { toast, ToastContainer } from "react-toastify";

interface Lobby {
  id: string;
  name: string;
  numOfGamers: string;
  state: string;
  createdAt: number;
}

export const LobbyPage = () => {
  const [games, setGames] = useState<Lobby[]>([]);
  const [showForm, setShowForm] = useState(false);

  const showAddForm = () => {
    setShowForm(!showForm);
  };

  const navigate = useNavigate();

  const data = useMemo<Lobby[]>(() => games, [games]);

  const handleJoinGame = async (gameId: string) => {
    try {
      await joinToGame({ gameId, userId: auth.currentUser!.uid });
      navigate(`/game/${gameId}`);
    } catch (err: any) {
      toast.error(err.message || "Coś poszło nie tak");
    }
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
              return cell.value === "open" ? (
                <div>
                  <Button
                    width={8}
                    height={3}
                    margin="0 15px"
                    fontSize="mds"
                    className="activate align-center"
                    value={cell.row.values.id}
                    onClick={() => handleJoinGame(cell.row.original.id)}
                  >
                    Dołącz
                  </Button>
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>TRWA</div>
              );
            },
            Filter: DefaultColumnFilter,
          },
        ],
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const q = query(
      collection(db, "games_test"),
      where("status", "!=", "finished")
    );

    onSnapshot(q, (querySnapshot) => {
      const data: { data: GameModel; id: string }[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ data: doc.data() as GameModel, id: doc.id });
      });

      setGames(
        data
          .map((game) => {
            return {
              id: game.id,
              name: game.data.name,
              numOfGamers: `${game.data.participants.length}/${game.data.players}`,
              state: game.data.status,
              createdAt: game.data.createdAt,
            };
          })
          .sort((a, b) => b.createdAt - a.createdAt)
      );
    });
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useFilters);

  return (
    <>
      <PageWrapper>
        <ToastContainer />
        <Title showButton={true} />
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
          <ButtonGame onClick={() => showAddForm()}>Stwórz grę</ButtonGame>
          {showForm ? <AddNewGame /> : <div></div>}
        </TableWrapper>
      </PageWrapper>
      <SlideOutPanel />
    </>
  );
};
