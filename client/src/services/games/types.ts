import { QuestionModel } from "../questions/types";

export type CreateGameInput = {
  name: string;
  host: string;
  players: number;
};

export type StartGameInput = {
  gameId: string;
};

export type JoinToGameInput = {
  gameId: string;
  userId: string;
};

export type AnsweringTurnInput = {
  gameId: string;
  userId: string;
  answer: boolean;
  answerText: string;
};

export type ViewerTurnInput = {

	gameId: string;
	userId: string;
	bet?: boolean;
};

type Participant = {
  user: string;
  isReady: boolean;
  failures: number;
};


export type CurrentPoints = {
	player: string;
	points: number;
};

type Viewer = {
	player: string;
	bet?: boolean;
    notAnswered?: boolean;
};

type Turn = {
  answer: boolean;
  viewers: Viewer[];
  questionWin: boolean;
};

type Round = {
  currentQuestion: number;
  answeringPlayer: string;
  questions: QuestionModel[];
  turns: Turn[];
};

export type GameModel = {
  createdAt: Date;
  name: string;
  status: "open" | "ongoing" | "finished";
  host: string;
  players: number;
  participants: Participant[];
  currentPoints: CurrentPoints[];
  currentRound: number;
  rounds: Round[];
  currentTurn: "answering" | "observer";
  currentAnswer: string;
};
