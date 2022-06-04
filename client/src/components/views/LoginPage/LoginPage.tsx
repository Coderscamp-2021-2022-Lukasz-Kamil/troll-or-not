import React from "react";
import styled from "styled-components";
import { ButtonWithIcon } from "../../ui/ButtonWithIcon/ButtonWithIcon";
import { Input } from "../../ui/Input/Input";
import Title from "../../ui/title/Title";
import {  Typography, TypographyGrid } from "../../ui/Typography/Typography";
import { GridContainer } from "../../wrapper/FlexCenter/GridContainter.style";
import { LeftSideContainer } from "../../wrapper/FlexCenter/LeftSideContainer";
import googleIcon from "../../../assets/googleIcon.svg"
import { Button } from "../../ui/Button/Button.style";
import { FlexWrapper } from "../../wrapper/FlexCenter/FlexWrapper.style";

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


const LoginPage = () => {
    return (
        <div>
            <Title />
        <LeftSideContainer>
            <GridContainer >
                <div></div>
                 <SiteTitle fontSize="xl" >Logowanie</SiteTitle>
                <TypographyGrid>E-mail</TypographyGrid>
                <Input />
                 <TypographyGrid>Hasło</TypographyGrid>
                <Input />
                <div></div>
                <Button width={300} height={55} background="secondary" fontSize="lg">Zaloguj się</Button>
                <div></div>
            <ButtonWithIcon src={googleIcon} />
            </GridContainer>
            </LeftSideContainer>  
            <FlexWrapperLink justifyContent="flex-start">
                <Typography>Nie masz konta?</Typography>
                <Link href="/registration">Zarejestruj się</Link>
            </FlexWrapperLink>
            
        </div>
      
    )
}

export default LoginPage;