// Prisma client for SQL

import { PrismaClient } from "@prisma/client"

declare const globalThis: any;

const client = globalThis?.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
