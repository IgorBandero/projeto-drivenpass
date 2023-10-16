import Joi from "joi";
import { NewCredentialData } from "@/protocols";

export const credentialSchema = Joi.object<NewCredentialData>({
    title: Joi.string().min(3).max(30).required(),
    url: Joi.string().uri().required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(1).required(),
    userId: Joi.number().required()
});