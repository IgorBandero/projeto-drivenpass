import { Router } from "express";
import { credentialSchema } from "@/schemas";
import { validateSchema, authToken } from "@/middlewares";
import { createCredential } from "@/controllers/credentialControllers";

const credentialRouter = Router();

credentialRouter
    .all("/*", authToken)
    .post("/create", validateSchema(credentialSchema), createCredential)

export { credentialRouter };