import styled from "styled-components";

interface TypographyProps{
    fontSize?: | "mds" | "mdl" | "lg" | "xxl";
    marginRight?: number;
}

export const Typography = styled.p<TypographyProps>`
   font-size: ${({ theme, fontSize }) =>
    fontSize ? theme.size.desktop[fontSize] : theme.size.desktop.lg}px;
`

export const TypographyGrid = styled(Typography)`
 margin-left: auto;
 margin-right: ${({ marginRight }) => marginRight? marginRight: 50}px;
`