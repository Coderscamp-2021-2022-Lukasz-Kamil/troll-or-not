import React from "react";
import styled from "styled-components";
import { Input } from "../../ui/Input/Input";
import Title from "../../ui/title/Title";
import { Typography } from "../../ui/Typography/Typography";
import { FlexWrapper } from "../../wrapper/FlexCenter/FlexWrapper.style";
import { GridContainer } from "../../wrapper/FlexCenter/GridContainter.style";
import { LeftSideContainer } from "../../wrapper/FlexCenter/LeftSideContainer";

const SiteTitle = styled.h1`
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.common.textColorGold};;
`

const LoginPage = () => {
    return (
        <div>
            <Title />
        <FlexWrapper>
            <SiteTitle>Logowanie</SiteTitle>
        </FlexWrapper>    
        <LeftSideContainer>
            <GridContainer>
                <Typography>E-mail</Typography>
                <Input type="text" />
            </GridContainer>
            </LeftSideContainer>  
        </div>
      
    )
}

export default LoginPage;