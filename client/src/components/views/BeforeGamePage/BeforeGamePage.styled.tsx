import styled from "styled-components";
import { FlexWrapper } from "../../wrapper/FlexCenter/FlexWrapper.style";

export const ShortReminder = styled.p`
  color: #fff;
`;

export const LobbyName = styled.p`
  margin-top: 1rem;
  color: #fff;
  font-size: ${({ theme }) => theme.size.desktop.mdl}px;
`;

export const BeforeGameWrapper = styled(FlexWrapper)`
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.card.linecolor};
  width: 30vw;
  margin-left: 10rem;
`;
