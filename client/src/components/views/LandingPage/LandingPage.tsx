import React from "react";
import styled from "styled-components";
import Title from "../../ui/title/Title";
import { Button } from "../../ui/Button/Button.style";
import { FlexWrapper } from "../../wrapper/FlexCenter/FlexWrapper.style";

const LandingWrapper = styled(FlexWrapper)`
    width: 50vw;
    height: 80vh;
`;


const LandingPage = () => {
    return (
        <LandingWrapper direction={"column"}>
            <Title showButton={false}/>
            <Button>Sprawdź!</Button>
        </LandingWrapper>
    )
}

export default LandingPage;