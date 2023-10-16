import { Request, Response } from "express";
import { credentialService } from "@/services";
import { NewCredentialData} from "@/protocols";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";

export async function createCredential(req: AuthenticatedRequest, res: Response) {
    const newCredential = req.body as NewCredentialData;
    const result = await credentialService.createCredential(newCredential);
    return res.status(httpStatus.OK).send(result);
}
