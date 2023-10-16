import { Credential } from "@prisma/client";
import Cryptr from "cryptr";
import { NewCredentialData } from "@/protocols";
import { titleAlreadyInUseError, notFoundError, forbiddenError } from "@/errors";
import { credentialRepository, userRepository } from "@/repositories";

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

async function validateTitle(userId:number, title:string): Promise<void> {
    const isRepeated = await credentialRepository.checkRepeatedTitle(userId, title);
    if (isRepeated) {
        throw titleAlreadyInUseError();
    }
}

async function getCredentials (userId:number): Promise<Credential[] | null>{
    let credentialsList = await credentialRepository.getCredentials(userId);
    if(credentialsList.length === 0){
        return null;
    }
    const crypt = new Cryptr(process.env.JWT_SECRET);
    credentialsList.forEach(credential => {
        let decryptedPassword = crypt.decrypt(credential.password);
        credential.password = decryptedPassword;
    });
    return credentialsList;
}

async function getCredentialById (userId:number, idCredential:number): Promise<Credential> {
    let credential = await credentialRepository.getCredentialById(idCredential);
    if(!credential){
        throw notFoundError();
    }
    if (credential.userId !== userId){
        throw forbiddenError();
    }
    const crypt = new Cryptr(process.env.JWT_SECRET);
    const decryptedPassword = crypt.decrypt(credential.password);
    credential.password = decryptedPassword;
    return credential;
}

export const credentialService = {
    createCredential,
    getCredentials,
    getCredentialById
};