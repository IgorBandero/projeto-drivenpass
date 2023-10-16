import { User } from "@prisma/client";

export type NewUserData = Omit <User,"id">