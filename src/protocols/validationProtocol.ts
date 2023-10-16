import { NextFunction, Request, Response } from "express";

export type ValidationType = (req: Request, res: Response, next: NextFunction) => void;