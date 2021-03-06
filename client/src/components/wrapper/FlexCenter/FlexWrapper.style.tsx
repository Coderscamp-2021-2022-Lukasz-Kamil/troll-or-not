import styled from "styled-components";

interface FlexCenter {
  direction?: "column" | "row" | "column-reverse" | "row-reverse";
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-around"
    | "space-between"
    | "stretch";
  padding?: number;
}

export const FlexWrapper = styled.div<FlexCenter>`
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  align-items: center;
  padding-bottom: ${({ padding }) => padding || 0}px;
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  gap: 0.5rem;
`;
