import { AppError } from "@/protocols";

export function notValidDataError(details: string): AppError {
    return {
        name: "InvalidDataError",
        message: `Invalid data: ${details}`,
    };
}