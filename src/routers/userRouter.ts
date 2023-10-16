import { Router } from "express";
import { userSchema } from "@/schemas";
import { validateSchema } from "@/middlewares";
import { registerUser } from "@/controllers";

const userRouter = Router();

userRouter
  // .all("/*", authToken)
  .post("/signup", validateSchema(userSchema), registerUser)
  
export { userRouter };