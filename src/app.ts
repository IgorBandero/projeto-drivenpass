import "reflect-metadata";
import "express-async-errors";
import { handleErrors } from "@/middlewares";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "@/routers";
import httpStatus from "http-status";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
app.get("/health", (req: Request, res: Response) => {
    res.status(httpStatus.OK).send("OK!");
});
app.use("/user", userRouter);
app.use(handleErrors);

const port: number = Number(process.env.PORT) || 5000;
app.listen(port, () => console.log(`Running server on port ${port}`));

export default app;