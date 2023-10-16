import { AppError } from "@/protocols";

export function emailAlreadyInUseError(): AppError {
    return {
        name: "EmailAlreadyInUseError",
        message: "E-mail address is already in use!",
    };
}