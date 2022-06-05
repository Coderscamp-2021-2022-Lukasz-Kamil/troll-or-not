import styled from "styled-components";

interface GridColumnProps {
  GridColumnLeftWidth?: number;
  GridColumnRightWidth?: number;

  GridGap?: string;
}

export const GridContainer = styled.div<GridColumnProps>`
  display: grid;
  grid-template-rows: auto;
  grid-auto-flow: dense;
  grid-template-columns: ${({ GridColumnLeftWidth, GridColumnRightWidth }) =>
    GridColumnLeftWidth && GridColumnRightWidth
      ? `${GridColumnLeftWidth}fr ${GridColumnRightWidth}fr`
      : `1fr 1fr`};
  justify-items: center;
  row-gap: ${({ GridGap }) => (GridGap ? GridGap : "50")}px;
`;
