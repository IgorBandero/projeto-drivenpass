import prisma from "@/config/database";
import { Credential } from "@prisma/client";
import { NewCredentialData } from "@/protocols";

async function createCredential(newCredential: NewCredentialData): Promise<Credential> {
    const credentialNew = await prisma.credential.create({
        data: newCredential,
    })
    return credentialNew;
}

async function checkRepeatedTitle(userId:number, title:string){
    const repeatedTitle = await prisma.credential.findFirst({
        where: {
            title,
            userId
        }
    })
    return repeatedTitle;
}

export const credentialRepository = {
    createCredential,
    checkRepeatedTitle
};