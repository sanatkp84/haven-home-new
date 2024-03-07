import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if(process.env.NODE_ENV != 'production') globalThis.prisma = client

export default client;

// next js creates warning for new PrismaClient() so
// thtat is why PrismaClient is assigned to global which is not affected by hot reload 
//import { PrismaClient } from "@prisma/client";
// instead of importing to every code modules write in a separate file and export to other files