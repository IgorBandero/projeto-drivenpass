import { Credential } from "@prisma/client";
import Cryptr from "cryptr";
import { NewCredentialData } from "@/protocols";
import { titleAlreadyInUseError } from "@/errors";
import { credentialRepository, userRepository } from '@/repositories';

export async function createCredential(newCredential: NewCredentialData): Promise<Credential> {
    await validateTitle(newCredential.userId, newCredential.title);
    const crypt = new Cryptr(process.env.JWT_SECRET);
    const cryptedPassword = crypt.encrypt(newCredential.password);
    const credential: NewCredentialData = {
        title: newCredential.title,
        url: newCredential.url,
        username: newCredential.username,
        password: cryptedPassword,
        userId: newCredential.userId
    }
    return credentialRepository.createCredential(credential);
}

async function validateTitle(userId:number, title:string) {
    const isRepeated = await credentialRepository.checkRepeatedTitle(userId, title);
    if (isRepeated) {
        throw titleAlreadyInUseError();
    }
}

export const credentialService = {
    createCredential,
};