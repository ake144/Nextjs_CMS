'use server'

import prisma from "@/utils/db";


export async function getUsers() {
    return prisma.user.findMany()
}


export async function getByClerkId(id:string){
    return prisma.user.findUnique({
        where: { clerkUserId: id },
    });
}