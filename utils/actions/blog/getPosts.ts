'use server'

import prisma from "@/utils/db";


export async function getPostsByApiKey(apiKey: string) {
  const user = await prisma.user.findUnique({
    where: { apiKey },
    include: { posts: true },
  });

  if (!user) {
    throw new Error('Invalid API key');
  }

  return user.posts;
}
