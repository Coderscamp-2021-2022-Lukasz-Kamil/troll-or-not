export type UserCreateInput = {
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type UserSignInInput = {
    email: string;
    password: string;
}