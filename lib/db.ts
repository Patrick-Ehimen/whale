/* This TypeScript code snippet is setting up a connection to a database using Prisma Client. Here's a
breakdown of what each part of the code is doing: */
// import { PrismaClient } from "@prisma/client/";
import { PrismaClient } from "../prisma/app/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const db = prisma;
