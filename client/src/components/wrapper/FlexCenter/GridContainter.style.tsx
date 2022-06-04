import styled from "styled-components";


interface GridColumnProps {
    GridColumnNum?: number;
    GridGap?: string;
  }

export const GridContainer = styled.div<GridColumnProps>`
    display: grid;
    grid-template-rows: auto;
    grid-auto-flow: dense;
    grid-template-columns: ${({ GridColumnNum }) =>
    GridColumnNum ? `repeat(${GridColumnNum}, 1fr)` : `repeat(2, 1fr)`};
    justify-items: center;
    row-gap: ${({ GridGap }) => (GridGap ? GridGap : "50")}px;
`