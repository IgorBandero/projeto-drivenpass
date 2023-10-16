import { AppError } from "@/protocols";

export function titleAlreadyInUseError(): AppError {
    return {
        name: "TitleAlreadyInUseError",
        message: "Credential title is already in use!",
    };
}