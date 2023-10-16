import prisma from "@/config/database";
import { NewUserData, LoginData } from "@/protocols";
import { User } from "@prisma/client";
import { Session } from "@prisma/client";

async function registerNewUser(newUser: NewUserData): Promise<User> {
    const userNew = await prisma.user.create({
        data: newUser,
    })
    return userNew;
}

async function findUserByEmail(email: string): Promise<User | null> {
    const userFound  = await prisma.user.findFirst({
        where: {
            email,
        }
    })
    return userFound;
}

async function newSession(newLogin: LoginData): Promise<Session> {
    const sessionNew = await prisma.session.create({
        data: newLogin,
    });
    return sessionNew;
}

async function findSession(token: string) {
    return prisma.session.findFirst({
        where: {
            token
        }
    });
}

export const userRepository = {
    registerNewUser,
    findUserByEmail,
    newSession,
    findSession
};