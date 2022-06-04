import React, { useState } from "react";
import { Button } from "../../ui/Button/Button.style";
import { Input } from "../../ui/Input/Input";
import Title from "../../ui/title/Title";
import { FlexWrapper } from "../../wrapper/FlexCenter/FlexWrapper.style";
import { GridContainer } from "../../wrapper/FlexCenter/GridContainter.style";
import { Typography, TypographyGrid } from "../../ui/Typography/Typography";
import { LeftSideContainer } from "../../wrapper/FlexCenter/LeftSideContainer";
import { addQuestion } from "../../../services/questions/addQuestion";
import { toast } from "react-toastify";
import styled from "styled-components";

const AddQuestionPage = () => {
    const [question, setQuestion] = useState<string>("");
    const [goodAnswer, setGoodAnswer] = useState<string>("");
    const [badAnswer1, setBadAnswer1] = useState<string>("");
    const [badAnswer2, setBadAnswer2] = useState<string>("");
    const [badAnswer3, setBadAnswer3] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean>(true);
   

    const handleOnChange = (e: any) => {
        switch (e.target.name) {
          case "question":
            setQuestion(e.target.value);
            break;
          case "goodAnswer":
            setGoodAnswer(e.target.value);
            break;
          case "badAnswer1":
            setBadAnswer1(e.target.value);
            break;
          case "badAnswer2":
            setBadAnswer2(e.target.value);
            break;
          case "badAnswer3":
            setBadAnswer3(e.target.value);
            break;
          default:
            break;
        }
      };
    
      const GoldText = styled(Typography)`
        color: ${({ theme }) => theme.colors.common.textColorGold};
    `;

      const createQuestion = async () => {
        if (!question || !goodAnswer || !badAnswer1 || !badAnswer2 || !badAnswer3){
            setIsValid(false);
        } else {
          try {
              await addQuestion({
                content: question,
                answers: [{content: goodAnswer, isCorrect:true}, {content: badAnswer1, isCorrect:false}, {content: badAnswer2, isCorrect:false}, {content: badAnswer3, isCorrect:false}],
            }); 
            setDefaultValues();
        } catch (err) {
            return toast.error('Nie udało się dodać pytania');
        }}};

        const setDefaultValues = () => {
            setQuestion('');
            setGoodAnswer('');
            setBadAnswer1('');
            setBadAnswer2('');
            setBadAnswer3('');
        }

        return (

        <>
        <Title />
        <LeftSideContainer>
            <FlexWrapper direction="column">
                <GridContainer>
                    <Typography>Pytanie</Typography>
                    <Input 
                        type="text"
                        name="question"
                        onChange={(e) => handleOnChange(e)}
                        value={question}
                    />
                    <p></p>
                    <p></p>
                    <TypographyGrid>Opdowiedź Prawidłowa</TypographyGrid>
                    <Input 
                        type="text"
                        name="goodAnswer"
                        onChange={(e) => handleOnChange(e)}
                        value={goodAnswer}
                    />
                    <TypographyGrid>Odpowiedź Błędna</TypographyGrid>
                    <Input 
                        type="text"
                        name="badAnswer1"
                        onChange={(e) => handleOnChange(e)}
                        value={badAnswer1}
                    />
                    <TypographyGrid>Odpowiedź Błędna</TypographyGrid>
                    <Input 
                        type="text"
                        name="badAnswer2"
                        onChange={(e) => handleOnChange(e)}
                        value={badAnswer2}
                    />
                    <TypographyGrid>Odpowiedź Błędna</TypographyGrid>
                    <Input 
                        type="text"
                        name="badAnswer3"
                        onChange={(e) => handleOnChange(e)}
                        value={badAnswer3}
                    />

                    {isValid ? "" : <GoldText >Uzupełnij wszystkie pola!</GoldText>}
                    <Button onClick={createQuestion}>Dodaj pytanie!</Button>
                </GridContainer>
                
            </FlexWrapper>
        </LeftSideContainer>
        </>
    )
}

export default AddQuestionPage;