'use server'

import prisma from "../../db"

export async function getUsers() {
    return prisma.user.findMany({ where: { role: 'AUTHOR' } })
}