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
  { value: 'purple', label: 'Purple'},
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'forest', label: 'Forest' },
  { value: 'slate', label: 'Slate' },
  { value: 'silver', label: 'Silver' },
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

