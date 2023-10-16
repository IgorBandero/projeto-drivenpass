import prisma from "@/config/database";
import { Credential } from "@prisma/client";
import { NewCredentialData } from "@/protocols";
import httpStatus from "http-status";

async function createCredential(newCredential: NewCredentialData): Promise<Credential> {
    const credentialNew = await prisma.credential.create({
        data: newCredential,
    })
    return credentialNew;
}

async function checkRepeatedTitle(userId:number, title:string): Promise<Credential>{
    const repeatedTitle = await prisma.credential.findFirst({
        where: {
            title,
            userId
        }
    })
    return repeatedTitle;
}

async function getCredentials(userId:number): Promise<Credential[]>{
    const credentials = await prisma.credential.findMany({
        where: {
            userId
        }
    })
    return credentials;
}

async function getCredentialById(idCredential:number): Promise<Credential>{
    const credential = await prisma.credential.findUnique({
        where: {
            id: idCredential
        }
    })
    return credential;
}

async function deleteCredentialById(idCredential:number): Promise<void>{
    await prisma.credential.deleteMany({
        where: {
            id: idCredential
        }
    });
}

export const credentialRepository = {
    createCredential,
    checkRepeatedTitle,
    getCredentials,
    getCredentialById,
    deleteCredentialById
};