import { Router } from "express";
import { userSchema } from "@/schemas";
import { validateSchema } from "@/middlewares";
import { loginUser, registerUser } from "@/controllers";

const userRouter = Router();

userRouter
  .post("/signup", validateSchema(userSchema), registerUser)
  .post("/signin", validateSchema(userSchema), loginUser)
export { userRouter };