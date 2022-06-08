export type UserCreateInput = {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UserSignInInput = {
  email: string;
  password: string;
};

export type UserModel = {
  authID: string;
  nickname: string;
  startedGames: number;
  finishedGames: number;
  wins: number;
  points: number;
  isAdmin: boolean;
};
