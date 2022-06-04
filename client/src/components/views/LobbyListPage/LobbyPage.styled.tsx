import styled from "styled-components";
import { Button } from "../../ui/Button/Button.style";
import { FlexWrapper } from "../../wrapper/FlexCenter/FlexWrapper.style";

export const LobbyPageWrapper = styled(FlexWrapper)`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const TableWrapper = styled(FlexWrapper)`
  flex-direction: column;
  align-items: center;
  justify-content: "center";
  gap: 0.5rem;
  width: 50%;
  align-items: center;
  padding: 2rem 1rem;
`;

export const Table = styled.table`
  display: block;
  max-width: fit-content;
  min-height: 30vh;
  margin: 0 auto;
  overflow-x: auto;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.common.textColor};
  background-color: ${({ theme }) => theme.colors.common.backgroundcolor};
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  font-size: ${({ theme }) => theme.size.desktop.md}px;
`;

export const TableBody = styled.tbody`
  font-size: ${({ theme }) => theme.size.desktop.sm}px;
`;

export const TableRow = styled.tr`
  &:nth-child(odd) {
    background: ${({ theme }) => theme.colors.common.backgroundcolor};
  }
`;

export const TableHeader = styled.th`
  align-items: center;
  padding: 0.8rem;
  font-weight: normal;
  text-transform: capitalize;
  border: 2px solid ${({ theme }) => theme.colors.card.linecolor};
  background: ${({ theme }) => theme.colors.common.backgroundcolor};
`;

export const TableData = styled.td`
  padding: 1.2rem;
  border: 2px solid ${({ theme }) => theme.colors.card.linecolor};
`;

export const ButtonGame = styled(Button)`
  width: 10vw;
  height: 6vh;
  font-size: ${({ theme }) => theme.size.desktop.sm}px;
  margin-top: 1rem;
`;
