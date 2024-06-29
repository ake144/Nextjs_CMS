

import prisma from "@/utils/db"

export async function getCategories() {
    return prisma.category.findMany()
}