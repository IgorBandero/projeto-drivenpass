import { Request, Response } from "express";
import { userService } from "@/services";
import { NewUserData } from "@/protocols";
import httpStatus from "http-status";

export async function registerUser(req: Request, res: Response) {
    const newUser = req.body as NewUserData;
    const result = await userService.signUp(newUser);
    return res.status(httpStatus.OK).send(result);
}