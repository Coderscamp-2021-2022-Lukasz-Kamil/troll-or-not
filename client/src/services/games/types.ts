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
  answer?: boolean;
  answerText: string;
};

export type ViewerTurnInput = {
  gameId: string;
  userId: string;
  bet?: boolean;
};
export type Player = {
  id: string;
  nickname: string;
};

export type Participant = {
  player: Player;
  isReady: boolean;
  failures: number;
};

export type CurrentPoints = {
  player: Player;
  points: number;
};

export type Viewer = {
  player: string;
  bet?: boolean;
  notAnswered?: boolean;
};

export type Turn = {
  answer?: boolean;
  notAnswered?: boolean;
  viewers: Viewer[];
  questionWin: boolean;
};

export type Round = {
  currentQuestion: number;
  answeringPlayer: string;
  questions: QuestionModel[];
  turns: Turn[];
};

export type GameModel = {
  createdAt: number;
  name: string;
  status: "open" | "ongoing" | "finished";
  host: Player;
  players: number;
  participants: Participant[];
  currentPoints: CurrentPoints[];
  currentRound: number;
  rounds: Round[];
  currentTurn: "answering" | "observer";
  currentAnswer: string;
};

export type PointsForQuestions = {
  [key: number]: number;
};
