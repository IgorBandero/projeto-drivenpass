import { NextFunction, Request, Response } from "express";
import { unauthorizedError } from "@/errors";
import * as jwt from "jsonwebtoken";
import { userRepository } from '@/repositories';

export async function authToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {

    const token = req.header("Authorization");
    if (!token) throw unauthorizedError();
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
    const session = await userRepository.findSession(token);
    if (!session) throw unauthorizedError();
    req.userId = userId;
    next();
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
    userId: number;
};