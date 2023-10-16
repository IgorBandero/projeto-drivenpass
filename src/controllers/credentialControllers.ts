import { Response } from "express";
import { credentialService } from "@/services";
import { NewCredentialData} from "@/protocols";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";

export async function createCredential(req: AuthenticatedRequest, res: Response) {
    const newCredential = req.body as NewCredentialData;
    const result = await credentialService.createCredential(newCredential);
    return res.status(httpStatus.OK).send(result);
}

export async function showUsersCredentials(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    const credentialsList = await credentialService.getCredentials(userId);
    return res.status(httpStatus.OK).send(credentialsList);
}

export async function showCredential(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    const idCredential = Number(req.params.id);
    const credential = await credentialService.getCredentialById(userId, idCredential);
    return res.status(httpStatus.OK).send(credential);
}

export async function deleteCredentialById(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;
    const idCredential = Number(req.params.id);
    const credential = await credentialService.deleteCredentialById(userId, idCredential);
    return res.status(httpStatus.NO_CONTENT).send("DELETED!");
}