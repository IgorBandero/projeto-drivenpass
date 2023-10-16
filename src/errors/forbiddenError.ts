import { AppError } from "@/protocols";

export function forbiddenError(): AppError {

    return {
        name: "ForbiddenError",
        message: "Access denied!",
    };
    
}