import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";
// since prisma is linked to db POST() will post the data into db
//POST is used to send data to a server to create a resource.
// The data sent to the server with POST is stored in the request body of the HTTP request. Post is widely used to submit forms to the server.
export async function POST(
    request:Request
    ) {
    
        const body = await request.json();
        const {
            email,
            name,
            password
        }= body;

        const hashedPassword = await bcrypt.hash(password,12); 
        // reflecting the data inside the db
        const user = await prisma.user.create({
            data:{
                email,
                name,
                hashedPassword
            }
        });

        return NextResponse.json(user); //Produce a response with the given JSON body.
}