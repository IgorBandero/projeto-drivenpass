import prisma from "@/config/database";
import { NewUserData } from "@/protocols";
import { User } from "@prisma/client";

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

async function findSession(token: string) {
    
}

export const userRepository = {
    registerNewUser,
    findUserByEmail,
    findSession
};