import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { ValidationType } from "@/protocols";
import { notValidDataError } from "@/errors";


export function validateSchema<T>(schema: ObjectSchema<T>): ValidationType {

    return (req: Request, res: Response, next: NextFunction) => {

        const validation = schema.validate(req.body, { abortEarly: false });

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message);
            const messageError = errors.join(", ");
            throw notValidDataError(messageError);
        } 
        else {
            next();
        }
    };
}