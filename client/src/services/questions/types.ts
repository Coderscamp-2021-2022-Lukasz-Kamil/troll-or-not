type Answer = {
    content: string;
    isCorrect: boolean;
}

export type CreateQuestionInput = {
    content: string;
    answers: Answer[];
    confirmed?: boolean;
}

export type QuestionModel = {
    content: string;
    answers: Answer[];
    confirmed: boolean;
}