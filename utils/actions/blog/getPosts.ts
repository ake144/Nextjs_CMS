'use sever'

import prisma from "@/utils/db";

interface CreateCategoryArgs {
  category: string;
}

export async function createCategory({ category }: CreateCategoryArgs) {
  try {
    const newCat = await prisma.category.create({
      data: { category }
    });
    return newCat;
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: "category creation failed" };
  }
}


export async function getPostsByApiKey(apiKey: string) {
  const posts = await prisma.user.findMany({
    where: {
      apiKey,
    },
    include: {
      posts: true,
    },

  });

  return posts;
  
}

export async function getOnePostByApi(apiKey: string, id: string) {
  const user = await prisma.user.findFirst({
    where: {
      apiKey,
    },
    include: {
      posts: {
        where: {
          id,
        },
      },
    },
  });

  if (!user || !user.posts.length) {
    return null;
  }

  return user.posts[0];
}