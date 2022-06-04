/* eslint-disable react/prop-types */
import React from "react";
import { Column, useTable, useFilters } from "react-table";
import { useMemo } from "react";
import { DefaultColumnFilter } from "./DefaultColumnFilter";
import Title from "../../ui/title/Title";
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

interface Lobby {
  name: string;
  numOfGamers: string;
  state: string;
}

export const LobbyPage = () => {
  const data = useMemo<Lobby[]>(
    () => [
      {
        name: "Super Lobby",
        numOfGamers: "4/4",
        state: "Trwa",
      },
      {
        name: "Lobby",
        numOfGamers: "1/4",
        state: "Dołącz",
      },
    ],
    []
  );

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
            Filter: DefaultColumnFilter,
          },
        ],
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useFilters);

  return (
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
                    const { key, ...restAttributes } = column.getHeaderProps();
                    return (
                      <TableHeader {...restAttributes} key={key}>
                        {column.render("Header")}
                        <div>
                          {/* {column.canFilter ? column.render("Filter") : null} */}
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
  );
};
