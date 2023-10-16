import { Credential } from "@prisma/client";

export type NewCredentialData = Omit <Credential, "id">;