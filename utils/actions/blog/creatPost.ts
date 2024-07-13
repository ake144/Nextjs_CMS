'use server'

import prisma from '@/utils/db';

interface Post {
  slug?: string;
  title: string;
  content: string;
  image?: string;
  authorId: string;
}

export async function CreatePost(data: Post) {
  try {
    const { title, slug, content, image, authorId }: Post = data;

    if (!title || !content || !image || !authorId) {
      return { error: "Title, content, feature image, and author ID are required" };
    }

    const newPost = await prisma.post.create({
      data: {
        slug,
        title,
        content,
        image,
        author_id: authorId, // Use authorId directly
      },
    });

    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: "Post creation failed" };
  }
}
