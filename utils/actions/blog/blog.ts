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



export async function getPostByPostId(id:any){
    const post = await prisma.post.findUnique({
        where:{id}
    })
    
    if(!post){
       throw new Error('error while fetching')
    }
  
    return post

}


export async function getUserById(id:any){
    const user = await prisma.user.findUnique({
        where:{id}
    })

    return user
}