import React from "react";
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

import {
  ShortReminder,
  LobbyName,
  BeforeGameWrapper,
} from "./BeforeGamePage.styled";
import { useMemo } from "react";
import { useTable, Column } from "react-table";
import Title from "../../ui/title/Title";

const BeforeGamePage = () => {
  interface StartGame {
    gamerName: string;
    readiness: string;
  }

  const data = useMemo<StartGame[]>(
    () => [
      {
        gamerName: "Ewelina",
        readiness: "gotowy",
      },
      {
        gamerName: "Donata",
        readiness: "gotowy",
      },
    ],
    []
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
    <PageWrapper>
      <Title showButton={true}/>
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
          <ButtonGame>Rozpocznij grę!</ButtonGame>
          <ShortReminder>Zaznacz gotowość!</ShortReminder>
        </TableWrapper>
      </BeforeGameWrapper>
    </PageWrapper>
  );
};

export default BeforeGamePage;
