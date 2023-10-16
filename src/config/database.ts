import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

export default prisma;

/*

export function connectDb(): void {
  prisma = new PrismaClient();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}

*/