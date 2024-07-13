'use server'


import prisma from "@/utils/db"



export async function GetPostById(id:any) {
    const user = await prisma.user.findUnique({
        where: { id },
        include: { posts: true },
      });
    
      if (!user) {
        throw new Error('Invalid API key');
      }
    
      return user.posts;
         

}