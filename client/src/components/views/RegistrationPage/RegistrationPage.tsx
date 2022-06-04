import styled from "styled-components";
import { Button } from "../../ui/Button/Button.style";
import { Input } from "../../ui/Input/Input";
import Title from "../../ui/title/Title";
import { FlexWrapper } from "../../wrapper/FlexCenter/FlexWrapper.style";
import { GridContainer } from "../../wrapper/FlexCenter/GridContainter.style";
import { Typography, TypographyGrid } from "../../ui/Typography/Typography";
import { LeftSideContainer } from "../../wrapper/FlexCenter/LeftSideContainer";

const SiteTitle = styled(Typography)`
    color: ${({ theme }) => theme.colors.common.textColorGold};
    text-transform: uppercase;
`

const Link = styled.a`
    color: ${({ theme }) => theme.colors.common.textColorGold};
    text-decoration: none;
    font-size: ${({ theme }) =>
    theme.size.desktop.lg}px;
`

const FlexWrapperLink = styled(FlexWrapper)`
    gap:20px;
    margin: 20px 0 20px 20px;
`

const RegistrationPage = () => {
    return (
        <>
        <Title />
        <LeftSideContainer>
            <FlexWrapper direction="column">
                <GridContainer GridColumnLeftWidth={1} GridColumnRightWidth={2} GridGap="40"> 
                    <p></p>
                    <SiteTitle>Rejestracja</SiteTitle>
                    <TypographyGrid marginRight={30}>Nazwa użytkownika</TypographyGrid>
                    <Input />
                    <TypographyGrid marginRight={30}>E-mail</TypographyGrid>
                    <Input />
                    <TypographyGrid marginRight={30}>Hasło</TypographyGrid>
                    <Input />
                    <TypographyGrid marginRight={30}>Powtórz hasło</TypographyGrid>
                    <Input />
                    <p></p>
                    <Button>Stwórz konto!</Button>
                </GridContainer>
            </FlexWrapper>
        </LeftSideContainer>
        <FlexWrapperLink justifyContent="flex-start">
            <Typography>Masz już konto?</Typography>
            <Link href="/login">Zaloguj się</Link>
        </FlexWrapperLink>
        </>
    )
}

export default RegistrationPage;