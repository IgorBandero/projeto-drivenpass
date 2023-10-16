import { AppError } from "@/protocols";

export function unauthorizedError(): AppError {

    return {
        name: "UnauthorizedError",
        message: "Not signed in user!",
    };
    
}