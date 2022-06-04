import styled from "styled-components";

export const TogglePanel = styled.div`
  display: flex;
  position: fixed;
  width: 400px;
  height: 100vh;
  top: 0;
  right: -350px;
  text-align: center;

  .open {
    background-color: ${({ theme }) => theme.colors.card.primary};
    transform: translateX(-400px);
  }
`;

export const GameRulesTitle = styled.div`
  font-size: ${({ theme }) => theme.size.desktop.mdl}px;
  height: 100%;
  width: 50px;
  text-align: center;
  writing-mode: vertical-lr;
  padding-left: 5px;
  background-color: ${({ theme }) => theme.colors.card.linecolor};
  cursor: pointer;
`;

export const Rules = styled.div`
  padding: 1rem;
  font-size: ${({ theme }) => theme.size.desktop.mds}px;
`;
