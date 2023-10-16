import { AppError } from "@/protocols";

export function invalidLoginError(): AppError {
  return {
    name: "InvalidLoginError",
    message: "Login data (email or password) are incorrect!"
  };
}