import styled from "styled-components";

interface InputProps {
  background?: "primary" | "secondary";
  height?: number;
  width?: number;
  color?: "textColor" | "backgroundcolor";
}

export const Input = styled.input<InputProps>`
  width: ${({ width }) => (width ? width : 30)}vw;
  height: ${({ height }) => (height ? height : 6)}vh;
  background: ${({ theme, background }) =>
    background ? theme.colors.input[background] : theme.colors.input.primary};
  color: ${({ theme, color }) =>
    color ? theme.colors.common[color] : theme.colors.common.backgroundcolor};
  font-size: ${({ theme }) => theme.size.desktop.md}px;
  font-family: "Kaushan Script", cursive;
  border: 1px transparent;
  outline: none;
  padding-left: 20px;
  border-radius: 10px;
`;
