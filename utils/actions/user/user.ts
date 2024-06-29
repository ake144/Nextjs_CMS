'use server'

import prisma from "@/utils/db";


export async function getUsers() {
    return prisma.user.findMany()
}