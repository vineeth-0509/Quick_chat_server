import prisma from "../config/db.config.js";

export async function createChat({message,name,groupId}:{message?:string; name:string;groupId: string}){
    return await prisma.chats.create({
        data:{
            message,
            name,
            groupId
        }
    })
}