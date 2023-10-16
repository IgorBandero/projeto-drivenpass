import { Request, Response } from "express";
import { userService } from "@/services";
import { NewUserData, UserLoginData } from "@/protocols";
import httpStatus from "http-status";

export async function registerUser(req: Request, res: Response) {
    const newUser = req.body as NewUserData;
    const result = await userService.signUp(newUser);
    return res.status(httpStatus.OK).send(result);
}

export async function loginUser(req: Request, res: Response) {
    const userData = req.body as UserLoginData;
    const loginToken = await userService.signIn(userData);
    return res.status(httpStatus.OK).send(loginToken);
}