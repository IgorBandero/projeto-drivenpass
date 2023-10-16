import { AppError } from "@/protocols";

export function notFoundError(): AppError {
  return {
    name: "NotFoundError",
    message: "Credential not found!"
  };
}