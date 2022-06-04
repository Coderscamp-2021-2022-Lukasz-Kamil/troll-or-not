import React from "react";
import { Button } from "../../ui/Button/Button.style";
import { Input } from "../../ui/Input/Input";
import Title from "../../ui/title/Title";
import { FlexWrapper } from "../../wrapper/FlexCenter/FlexWrapper.style";
import { GridContainer } from "../../wrapper/FlexCenter/GridContainter.style";
import { Typography, TypographyGrid } from "../../ui/Typography/Typography";
import { LeftSideContainer } from "../../wrapper/FlexCenter/LeftSideContainer";

const AddQuestionPage = () => {
    return (
        <>
        <Title />
        <LeftSideContainer>
            <FlexWrapper direction="column">
                <GridContainer GridColumnLeftWidth={1} GridColumnRightWidth={2} GridGap="40">
                    <Typography>Pytanie</Typography>
                    <Input />
                    <p></p>
                    <p></p>
                    <TypographyGrid>Opdowiedź A</TypographyGrid>
                    <Input />
                    <TypographyGrid>Odpowiedź B</TypographyGrid>
                    <Input />
                    <TypographyGrid>Odpowiedź C</TypographyGrid>
                    <Input />
                    <TypographyGrid>Odpowiedź D</TypographyGrid>
                    <Input />
                    <p></p>
                    <Button>Dodaj pytanie!</Button>
                </GridContainer>

            </FlexWrapper>
        </LeftSideContainer>
        </>
    )
}

export default AddQuestionPage;