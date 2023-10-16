import { Request, Response, NextFunction } from "express";
import { AppError, ReqError } from "@/protocols";
import httpStatus from "http-status";

export function handleErrors(error: ReqError | AppError | Error,
req: Request, res: Response, next: NextFunction) {

  if (error.name === "EmailAlreadyInUseError") {
    return res.status(httpStatus.CONFLICT).send({
      message: error.message
    });
  }

  if (error.name === "InvalidDataError"){
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: error.message
    })
  }

  if (error.name === "InvalidLoginError"){
    return res.status(httpStatus.FORBIDDEN).send({
      message: error.message
    })
  }

  if (error.name === "UnauthorizedError") {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: error.message,
    });
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}