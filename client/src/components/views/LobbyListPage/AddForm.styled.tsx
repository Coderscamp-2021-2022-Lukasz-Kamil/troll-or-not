import styled from "styled-components";

import { FlexWrapper } from "../../wrapper/FlexCenter/FlexWrapper.style";

export const AddGameWrapper = styled(FlexWrapper)`
  background-color: ${({ theme }) => theme.colors.card.linecolor};
  flex-direction: column;
  padding: 1rem;
  margin-top: 1rem;
`;
