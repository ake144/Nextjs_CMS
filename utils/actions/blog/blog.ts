'use server'

import prisma from "@/utils/db"


interface posts {
    slug?: string,
    title: string,
    content: string,
    featureImage: string,
    authorId: number

}


export async function getAllPost() {
    return prisma.post.findMany()
}

