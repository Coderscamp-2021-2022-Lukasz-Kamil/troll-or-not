import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import styled from 'styled-components';


export interface FormProps {
  readonly value: string;
  readonly label: string;
}

const AnswersList = styled.div`
    color: black;
    font-size: 20px
`

export const Answers: readonly FormProps[] = [
  { value: 'nieregularny oddech', label: 'nieregularny oddech'},
  { value: 'niepokój', label: 'niepokój' },
  { value: 'dotykanie szyi', label: 'dotykanie szyi' },
  { value: 'gryzienie paznokci', label: 'gryzienie paznokci' },
  { value: 'zakrywanie ust', label: 'zakrywanie ust' },
  { value: 'krzyżowanie ramion', label: 'krzyżowanie ramion' },
  { value: 'zmiana barwy skóry', label: 'zmiana barwy skóry' },
  { value: 'nadmierne pocenie', label: 'nadmierne pocenie' },
  { value: 'wzruszanie ramionami', label: 'wzruszanie ramionami' },
  { value: 'grożenie palcem', label: 'grożenie palcem' },
];


const animatedComponents = makeAnimated();

const Form = () => {
    return (
        <AnswersList>
            <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={[Answers[4]]}
      isMulti
      options={Answers}
      
    />
        </AnswersList>
    )
}

export default Form;

