import { User } from "@prisma/client";
import { Session } from "@prisma/client";

export type NewUserData = Omit <User,"id">;
export type UserLoginData = Pick <User,"email" | "password">;

export type UserToken = {
    user: Pick <User, "id" | "email">;
    token: string;
};

export type LoginData = Pick <Session, "userId" | "token">;