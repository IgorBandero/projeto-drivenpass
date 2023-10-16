import Joi from "joi";
import { NewUserData } from "@/protocols";

export const userSchema = Joi.object<NewUserData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
});