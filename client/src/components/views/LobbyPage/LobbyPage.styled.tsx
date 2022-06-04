import styled from "styled-components";

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: "center";
  gap: 0.5rem;
  overflow-x: scroll;
  min-height: 80vh;
  width: 100%;
  align-items: center;
  padding: 2rem 1rem;

  .align-right {
    text-align: right;
    line-height: 100%;
  }

  .align-center {
    text-align: center;
  }

  .offer-photo {
    text-align: center;
  }
  .offer-photo img {
    width: 100px;
    height: 100px;
  }
`;

export const Table = styled.table`
  display: block;
  max-width: fit-content;
  min-height: 50vh;
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
  border: 1px solid #ddd;
  background: ${({ theme }) => theme.colors.common.backgroundcolor};
`;

export const TableData = styled.td`
  padding: 1.2rem;
  border: 1px solid #ddd;
`;
