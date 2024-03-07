
//geting current user without using any api

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";  
import prisma from "@/app/libs/prismadb"

export async function getSession() {
    return await getServerSession(authOptions);
}
export default async function getCurrentUser() {
    try {
        const session = await getSession();

        if(!session?.user?.email){
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where:{
                email: session.user.email as string
            }
        });

        if(!currentUser){
            return null;
        }
        // omit on index.ts
        return{
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        };
    }
    catch (error: any){
        return null;
    }
}