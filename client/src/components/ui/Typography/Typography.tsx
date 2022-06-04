import styled from "styled-components";

interface TypographyProps{
    fontSize?: | "mds" | "mdl" | "lg" | "xxl";
}

export const Typography = styled.p<TypographyProps>`
   font-size: ${({ theme, fontSize }) =>
    fontSize ? theme.size.desktop[fontSize] : theme.size.desktop.lg}px;
`