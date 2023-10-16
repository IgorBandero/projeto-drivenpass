import { Router } from "express";
import { credentialSchema } from "@/schemas";
import { validateSchema, authToken } from "@/middlewares";
import { createCredential, showUsersCredentials, showCredential } from "@/controllers";

const credentialRouter = Router();

credentialRouter
    .all("/*", authToken)
    .post("/create", validateSchema(credentialSchema), createCredential)
    .get("/mycredentials", showUsersCredentials)
    .get("/mycredentials/:id", showCredential)

export { credentialRouter };